import courseCatalog from '../../data/Courses.json'
import { normalizeCourseName } from './normalizeCourseName'
import { parsePrerequisiteList } from '../prerequisites/parsePrerequisites'
import type {
  CatalogCourse,
  CatalogCourseMembership,
  CatalogDiagnostic,
  MajorKey,
  NormalizedCatalog,
  RequirementScope,
  RequirementType,
} from '../types'

const COURSE_CODE_PATTERN = /^[A-Z]{2,4}\d{2,3}$/i

interface RawCourse {
  code: string
  name: string
  credit_hours: number
  prerequisites?: string[]
  type: RequirementType
  description?: string
  id?: number
}

interface RequirementGroup {
  title?: string
  credit_hours?: number
  courses?: RawCourse[]
  [key: string]: unknown
}

function inferScope(path: string[]): RequirementScope {
  if (path.includes('general_requirements')) return 'general'
  if (path.includes('university_requirements_no_credit')) return 'university_no_credit'
  if (path.includes('college_requirements')) return 'college'
  return 'major'
}

function walkRequirementGroups(
  node: RequirementGroup,
  path: string[],
  titlePath: string[],
  scope: RequirementScope,
  majorKey: MajorKey | undefined,
  requirementCreditHours: number | undefined,
  memberships: CatalogCourseMembership[],
  byCode: Record<string, CatalogCourse>,
  byCanonicalName: Record<string, CatalogCourse[]>,
  diagnostics: CatalogDiagnostic[]
): void {
  if (Array.isArray(node.courses)) {
    for (const raw of node.courses) {
      registerCourse(
        raw,
        scope,
        majorKey,
        path,
        titlePath,
        requirementCreditHours ?? node.credit_hours,
        memberships,
        byCode,
        byCanonicalName,
        diagnostics
      )
    }
  }

  for (const [key, value] of Object.entries(node)) {
    if (key === 'courses' || key === 'title' || key === 'credit_hours' || key === 'total_credit_hours') {
      continue
    }
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const child = value as RequirementGroup
      const childTitle = typeof child.title === 'string' ? child.title : key
      walkRequirementGroups(
        child,
        [...path, key],
        [...titlePath, childTitle],
        scope,
        majorKey,
        child.credit_hours ?? requirementCreditHours,
        memberships,
        byCode,
        byCanonicalName,
        diagnostics
      )
    }
  }
}

function registerCourse(
  raw: RawCourse,
  scope: RequirementScope,
  majorKey: MajorKey | undefined,
  requirementPath: string[],
  requirementTitlePath: string[],
  requirementCreditHours: number | undefined,
  memberships: CatalogCourseMembership[],
  byCode: Record<string, CatalogCourse>,
  byCanonicalName: Record<string, CatalogCourse[]>,
  diagnostics: CatalogDiagnostic[]
): void {
  const code = raw.code.trim().toUpperCase()
  const canonicalName = normalizeCourseName(raw.name)
  const membership: CatalogCourseMembership = {
    courseCode: code,
    scope,
    majorKey,
    requirementPath,
    requirementTitlePath,
    type: raw.type,
    requirementCreditHours,
  }
  memberships.push(membership)

  const existing = byCode[code]
  const course: CatalogCourse = {
    code,
    name: raw.name,
    creditHours: raw.credit_hours,
    prerequisites: raw.prerequisites ?? [],
    parsedPrerequisites: parsePrerequisiteList(raw.prerequisites ?? [], new Set(Object.keys(byCode))),
    type: raw.type,
    description: raw.description,
    catalogId: raw.id,
    scope,
    majorKey,
    requirementPath,
    requirementTitlePath,
    requirementCreditHours,
    canonicalCode: code,
    canonicalName,
  }

  if (existing) {
    const same =
      existing.name === course.name &&
      existing.creditHours === course.creditHours &&
      JSON.stringify(existing.prerequisites) === JSON.stringify(course.prerequisites)
    if (!same) {
      diagnostics.push({
        kind: 'duplicate_code',
        courseCode: code,
        message: `Duplicate catalog code ${code} with conflicting metadata`,
      })
    }
  } else {
    byCode[code] = course
    if (!byCanonicalName[canonicalName]) {
      byCanonicalName[canonicalName] = []
    }
    byCanonicalName[canonicalName].push(course)
  }
}

function attachParsedPrerequisites(catalog: NormalizedCatalog): void {
  const codes = new Set(Object.keys(catalog.byCode))
  for (const course of Object.values(catalog.byCode)) {
    course.parsedPrerequisites = parsePrerequisiteList(course.prerequisites, codes)
  }
}

function validatePrerequisites(catalog: NormalizedCatalog): void {
  for (const course of Object.values(catalog.byCode)) {
    for (const raw of course.prerequisites) {
      const trimmed = raw.trim()
      if (/^Passing\s+\d+\s+Credit\s+Hours$/i.test(trimmed)) continue
      if (trimmed.includes(' OR ') || trimmed.includes('|') || trimmed.includes('/')) {
        const parts = trimmed.split(/\s+OR\s+|\||\//i).map((p) => p.trim())
        for (const part of parts) {
          if (COURSE_CODE_PATTERN.test(part) && !catalog.byCode[part.toUpperCase()]) {
            catalog.diagnostics.push({
              kind: 'missing_prereq',
              courseCode: course.code,
              message: `Prerequisite ${part} not found in catalog`,
            })
          }
        }
        continue
      }
      if (COURSE_CODE_PATTERN.test(trimmed)) {
        const upper = trimmed.toUpperCase()
        if (!catalog.byCode[upper]) {
          catalog.diagnostics.push({
            kind: 'missing_prereq',
            courseCode: course.code,
            message: `Prerequisite ${upper} not found in catalog`,
          })
        }
      }
    }
  }
}

export function normalizeCatalog(): NormalizedCatalog {
  const memberships: CatalogCourseMembership[] = []
  const byCode: Record<string, CatalogCourse> = {}
  const byCanonicalName: Record<string, CatalogCourse[]> = {}
  const diagnostics: CatalogDiagnostic[] = []

  const data = courseCatalog as {
    program_requirements: Record<string, RequirementGroup>
    majors: Record<MajorKey, RequirementGroup & { title: string }>
  }

  for (const [key, group] of Object.entries(data.program_requirements)) {
    const scope = inferScope([key])
    walkRequirementGroups(
      group,
      ['program_requirements', key],
      [group.title ?? key],
      scope,
      undefined,
      group.credit_hours,
      memberships,
      byCode,
      byCanonicalName,
      diagnostics
    )
  }

  const majorKeys = Object.keys(data.majors) as MajorKey[]
  const majorTitles = {} as Record<MajorKey, string>

  for (const majorKey of majorKeys) {
    const major = data.majors[majorKey]
    majorTitles[majorKey] = major.title ?? majorKey
    walkRequirementGroups(
      major,
      ['majors', majorKey],
      [major.title ?? majorKey],
      'major',
      majorKey,
      major.credit_hours,
      memberships,
      byCode,
      byCanonicalName,
      diagnostics
    )
  }

  const catalog: NormalizedCatalog = {
    byCode,
    byCanonicalName,
    memberships,
    majorKeys,
    majorTitles,
    diagnostics,
  }

  attachParsedPrerequisites(catalog)
  validatePrerequisites(catalog)

  return catalog
}

let cachedCatalog: NormalizedCatalog | null = null

export function getNormalizedCatalog(): NormalizedCatalog {
  if (!cachedCatalog) {
    cachedCatalog = normalizeCatalog()
  }
  return cachedCatalog
}
