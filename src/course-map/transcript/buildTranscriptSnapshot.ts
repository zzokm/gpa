import type { Course } from '../../types/Course'
import { normalizeCourseName } from '../catalog/normalizeCourseName'
import type {
  NormalizedCatalog,
  OriginalImportedTranscript,
  ParsedHtmlCourseRow,
  TranscriptCourseStatus,
  TranscriptEntry,
  TranscriptParseWarning,
} from '../types'

const PARSER_VERSION = '1.0.0'

function deriveTranscriptStatus(grade: TranscriptEntry['grade']): TranscriptCourseStatus {
  if (grade === null) return 'in_progress'
  if (grade === 'F') return 'failed'
  return 'completed'
}

function simpleHash(input: string): string {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash).toString(36)
}

function matchCourseCode(
  courseName: string,
  catalog: NormalizedCatalog | null
): { code?: string; confidence: TranscriptEntry['matchedCourseConfidence'] } {
  if (!catalog) {
    return { confidence: 'unmatched' }
  }

  const canonical = normalizeCourseName(courseName)
  const byName = catalog.byCanonicalName[canonical]
  if (byName?.length === 1) {
    return { code: byName[0].code, confidence: 'exact-name' }
  }

  const codeCandidate = courseName.trim().toUpperCase()
  if (catalog.byCode[codeCandidate]) {
    return { code: codeCandidate, confidence: 'exact-code' }
  }

  const fuzzy = Object.values(catalog.byCanonicalName).flat().filter((c) => {
    const n = normalizeCourseName(c.name)
    return n === canonical || n.includes(canonical) || canonical.includes(n)
  })

  if (fuzzy.length === 1) {
    return { code: fuzzy[0].code, confidence: 'normalized-name' }
  }

  return { confidence: 'unmatched' }
}

export function buildTranscriptSnapshot(
  rows: ParsedHtmlCourseRow[],
  rawHtml: string,
  catalog: NormalizedCatalog | null
): OriginalImportedTranscript {
  const parseWarnings: TranscriptParseWarning[] = []
  const entries: TranscriptEntry[] = rows.map((row, index) => {
    const match = matchCourseCode(row.name, catalog)
    if (match.confidence === 'unmatched') {
      parseWarnings.push({
        rowIndex: row.originalRowIndex,
        message: 'Could not match course to catalog',
        rawValue: row.name,
      })
    }

    const canonicalName = normalizeCourseName(row.name)
    const entry: TranscriptEntry = {
      id: `entry-${index}-${simpleHash(row.name)}`,
      originalRowIndex: row.originalRowIndex,
      source: 'imported-html',
      rawName: row.name,
      rawCreditHours: String(row.hours),
      rawGrade: row.grade,
      name: row.name,
      canonicalName,
      matchedCourseCode: match.code,
      matchedCourseConfidence: match.confidence,
      hours: row.hours,
      grade: row.grade,
      level: row.level,
      term: row.term,
      status: deriveTranscriptStatus(row.grade),
    }
    return entry
  })

  return {
    schemaVersion: 1,
    importId: `import-${Date.now()}-${simpleHash(rawHtml)}`,
    importedAt: new Date().toISOString(),
    source: 'fcai-html',
    rawHtmlHash: simpleHash(rawHtml),
    parserVersion: PARSER_VERSION,
    entries,
    parseWarnings,
  }
}

export function transcriptToSessionCourses(transcript: OriginalImportedTranscript): Course[] {
  return transcript.entries.map((entry) => ({
    id: entry.id,
    name: entry.name,
    hours: entry.hours,
    grade: entry.grade,
    term: entry.term,
    level: entry.level,
    isImported: true,
  }))
}

export function buildLegacyTranscriptFromCourses(courses: Course[]): OriginalImportedTranscript {
  const imported = courses.filter((c) => c.isImported)
  const rows: ParsedHtmlCourseRow[] = imported.map((course, index) => ({
    name: course.name,
    hours: course.hours,
    grade: course.grade,
    term: course.term,
    level: course.level,
    originalRowIndex: index,
  }))

  return buildTranscriptSnapshot(rows, `legacy-migration-${imported.length}`, null)
}
