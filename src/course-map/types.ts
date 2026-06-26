import type { Grade, Level, Term } from '../types/Course'

export type MajorKey =
  | 'Computer_Science'
  | 'Information_Technology'
  | 'Information_Systems'
  | 'Decision_Support_and_Operations_Research'
  | 'Artificial_Intelligence'

export type RequirementScope =
  | 'general'
  | 'university_no_credit'
  | 'college'
  | 'major'

export type RequirementType = 'Mandatory' | 'Elective'

export type TranscriptCourseStatus =
  | 'completed'
  | 'in_progress'
  | 'failed'
  | 'withdrawn_or_unknown'

export type CourseNodeStatus =
  | 'completed'
  | 'in_progress'
  | 'available'
  | 'locked'

export type PrerequisiteExpression =
  | { kind: 'none' }
  | { kind: 'course'; courseCode: string }
  | { kind: 'creditHours'; minimumPassedCredits: number }
  | { kind: 'and'; all: PrerequisiteExpression[] }
  | { kind: 'or'; any: PrerequisiteExpression[] }
  | { kind: 'unknown'; raw: string; reason: string }

export interface CatalogCourse {
  code: string
  name: string
  creditHours: number
  prerequisites: string[]
  parsedPrerequisites: PrerequisiteExpression
  type: RequirementType
  description?: string
  catalogId?: number
  scope: RequirementScope
  majorKey?: MajorKey
  requirementPath: string[]
  requirementTitlePath: string[]
  requirementCreditHours?: number
  canonicalCode: string
  canonicalName: string
}

export interface CatalogCourseMembership {
  courseCode: string
  scope: RequirementScope
  majorKey?: MajorKey
  requirementPath: string[]
  requirementTitlePath: string[]
  type: RequirementType
  requirementCreditHours?: number
}

export interface CatalogDiagnostic {
  kind: 'duplicate_code' | 'missing_prereq' | 'unknown_prereq' | 'cycle'
  message: string
  courseCode?: string
}

export interface NormalizedCatalog {
  byCode: Record<string, CatalogCourse>
  byCanonicalName: Record<string, CatalogCourse[]>
  memberships: CatalogCourseMembership[]
  majorKeys: MajorKey[]
  majorTitles: Record<MajorKey, string>
  diagnostics: CatalogDiagnostic[]
}

export interface TranscriptParseWarning {
  rowIndex?: number
  message: string
  rawValue?: string
}

export interface TranscriptEntry {
  id: string
  originalRowIndex: number
  source: 'imported-html'
  rawName: string
  rawCreditHours: string
  rawGrade: string | null
  name: string
  canonicalName: string
  matchedCourseCode?: string
  matchedCourseConfidence:
    | 'exact-code'
    | 'exact-name'
    | 'normalized-name'
    | 'manual-review'
    | 'unmatched'
  hours: number
  grade: Grade | null
  level?: Level
  term?: Term
  status: TranscriptCourseStatus
}

export interface OriginalImportedTranscript {
  schemaVersion: 1
  importId: string
  importedAt: string
  source: 'fcai-html'
  rawHtmlHash: string
  parserVersion: string
  entries: TranscriptEntry[]
  parseWarnings: TranscriptParseWarning[]
}

export interface PrerequisiteEvaluation {
  satisfied: boolean
  missingCourseCodes: string[]
  missingCreditHours?: number
  unknownPrerequisites: string[]
  satisfiedBy: string[]
}

export interface CourseMapNode {
  id: string
  courseCode: string
  label: string
  name: string
  creditHours: number
  type: RequirementType
  scope: RequirementScope
  status: CourseNodeStatus
  prerequisiteState: PrerequisiteEvaluation
  catalog: CatalogCourse
  transcriptEntry?: TranscriptEntry
  isGeneral: boolean
  isMajorRequirement: boolean
  position?: { x: number; y: number }
  semesterRowId?: string
  creditHourGates?: Array<{ minimumPassedCredits: number; satisfied: boolean }>
}

export interface CourseMapEdge {
  id: string
  source: string
  target: string
  satisfied: boolean
  label?: string
  kind: 'prerequisite' | 'credit_gate' | 'or_option' | 'unknown'
}

export interface GeneralRuleResult {
  showGeneralCourses: boolean
  generalCompletion: {
    mandatoryComplete: boolean
    electivesComplete: boolean
    incompleteMandatoryCodes: string[]
  }
}

export interface ParsedHtmlCourseRow {
  name: string
  hours: number
  grade: Grade | null
  term?: Term
  level?: Level
  originalRowIndex: number
}
