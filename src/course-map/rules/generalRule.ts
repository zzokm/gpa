import type {
  GeneralRuleResult,
  MajorKey,
  NormalizedCatalog,
  OriginalImportedTranscript,
} from '../types'
import { isCourseCompleted } from '../prerequisites/evaluatePrerequisites'

interface ElectiveGroup {
  requirementPath: string[]
  requiredCredits: number
  courseCodes: string[]
}

function groupElectiveMemberships(
  catalog: NormalizedCatalog
): ElectiveGroup[] {
  const groups = new Map<string, ElectiveGroup>()

  for (const m of catalog.memberships) {
    if (m.scope !== 'general' || m.type !== 'Elective') continue
    const key = m.requirementPath.join('/')
    const existing = groups.get(key)
    if (existing) {
      if (!existing.courseCodes.includes(m.courseCode)) {
        existing.courseCodes.push(m.courseCode)
      }
    } else {
      groups.set(key, {
        requirementPath: m.requirementPath,
        requiredCredits: m.requirementCreditHours ?? 0,
        courseCodes: [m.courseCode],
      })
    }
  }

  return Array.from(groups.values())
}

function sumCompletedElectiveCredits(
  courseCodes: string[],
  transcript: OriginalImportedTranscript | null,
  catalog: NormalizedCatalog
): number {
  return courseCodes.reduce((sum, code) => {
    if (!isCourseCompleted(code, transcript)) return sum
    return sum + (catalog.byCode[code]?.creditHours ?? 0)
  }, 0)
}

export function evaluateGeneralRule(
  catalog: NormalizedCatalog,
  transcript: OriginalImportedTranscript | null
): GeneralRuleResult {
  const generalMemberships = catalog.memberships.filter((m) => m.scope === 'general')
  const mandatory = generalMemberships.filter((m) => m.type === 'Mandatory')
  const electiveGroups = groupElectiveMemberships(catalog)

  const incompleteMandatory = mandatory.filter(
    (m) => !isCourseCompleted(m.courseCode, transcript)
  )

  const electivesComplete = electiveGroups.every((group) => {
    const completedCredits = sumCompletedElectiveCredits(
      group.courseCodes,
      transcript,
      catalog
    )
    return completedCredits >= group.requiredCredits
  })

  const allMandatoryComplete = incompleteMandatory.length === 0

  return {
    showGeneralCourses: !(allMandatoryComplete && electivesComplete),
    generalCompletion: {
      mandatoryComplete: allMandatoryComplete,
      electivesComplete,
      incompleteMandatoryCodes: incompleteMandatory.map((m) => m.courseCode),
    },
  }
}

export function getVisibleCourseCodes(
  selectedMajor: MajorKey,
  catalog: NormalizedCatalog,
  transcript: OriginalImportedTranscript | null
): string[] {
  const majorCodes = catalog.memberships
    .filter((m) => m.scope === 'major' && m.majorKey === selectedMajor)
    .map((m) => m.courseCode)

  const generalRule = evaluateGeneralRule(catalog, transcript)
  const generalCodes = generalRule.showGeneralCourses
    ? catalog.memberships.filter((m) => m.scope === 'general').map((m) => m.courseCode)
    : []

  return [...new Set([...generalCodes, ...majorCodes])]
}

export function expandWithPrerequisiteAncestors(
  visibleCodes: string[],
  catalog: NormalizedCatalog
): string[] {
  const expanded = new Set(visibleCodes)
  let changed = true

  while (changed) {
    changed = false
    for (const code of [...expanded]) {
      const course = catalog.byCode[code]
      if (!course) continue
      for (const prereq of course.prerequisites) {
        const trimmed = prereq.trim()
        if (/^[A-Z]{2,4}\d{2,3}$/i.test(trimmed)) {
          const upper = trimmed.toUpperCase()
          if (!expanded.has(upper) && catalog.byCode[upper]) {
            expanded.add(upper)
            changed = true
          }
        }
      }
    }
  }

  return [...expanded]
}
