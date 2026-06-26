import type {
  NormalizedCatalog,
  OriginalImportedTranscript,
  PrerequisiteEvaluation,
  PrerequisiteExpression,
  TranscriptEntry,
} from '../types'

function satisfied(satisfiedBy: string[] = []): PrerequisiteEvaluation {
  return {
    satisfied: true,
    missingCourseCodes: [],
    unknownPrerequisites: [],
    satisfiedBy,
  }
}

function missingCourse(code: string): PrerequisiteEvaluation {
  return {
    satisfied: false,
    missingCourseCodes: [code],
    unknownPrerequisites: [],
    satisfiedBy: [],
  }
}

function missingCredits(amount: number): PrerequisiteEvaluation {
  return {
    satisfied: false,
    missingCourseCodes: [],
    missingCreditHours: amount,
    unknownPrerequisites: [],
    satisfiedBy: [],
  }
}

function unknownPrereq(raw: string): PrerequisiteEvaluation {
  return {
    satisfied: false,
    missingCourseCodes: [],
    unknownPrerequisites: [raw],
    satisfiedBy: [],
  }
}

export function isCourseCompleted(
  courseCode: string,
  transcript: OriginalImportedTranscript | null
): boolean {
  if (!transcript) return false
  return transcript.entries.some(
    (e) =>
      (e.matchedCourseCode === courseCode || e.name.toUpperCase() === courseCode) &&
      e.status === 'completed'
  )
}

export function findTranscriptEntryByCourseCode(
  courseCode: string,
  transcript: OriginalImportedTranscript | null
): TranscriptEntry | undefined {
  if (!transcript) return undefined
  return transcript.entries.find((e) => e.matchedCourseCode === courseCode)
}

export function getPassedCredits(
  transcript: OriginalImportedTranscript | null,
  catalog: NormalizedCatalog
): number {
  if (!transcript) return 0
  return transcript.entries
    .filter((e) => e.status === 'completed')
    .reduce((sum, entry) => {
      const catalogCredits = entry.matchedCourseCode
        ? catalog.byCode[entry.matchedCourseCode]?.creditHours
        : undefined
      return sum + (catalogCredits ?? entry.hours)
    }, 0)
}

export function evaluatePrerequisites(
  expr: PrerequisiteExpression,
  transcript: OriginalImportedTranscript | null,
  catalog: NormalizedCatalog
): PrerequisiteEvaluation {
  switch (expr.kind) {
    case 'none':
      return satisfied()
    case 'course':
      return isCourseCompleted(expr.courseCode, transcript)
        ? satisfied([expr.courseCode])
        : missingCourse(expr.courseCode)
    case 'creditHours': {
      const passed = getPassedCredits(transcript, catalog)
      return passed >= expr.minimumPassedCredits
        ? satisfied([`${expr.minimumPassedCredits} credits`])
        : missingCredits(expr.minimumPassedCredits - passed)
    }
    case 'and': {
      const results = expr.all.map((child) =>
        evaluatePrerequisites(child, transcript, catalog)
      )
      const satisfiedBy = results.flatMap((r) => r.satisfiedBy)
      const missingCourseCodes = results.flatMap((r) => r.missingCourseCodes)
      const unknownPrerequisites = results.flatMap((r) => r.unknownPrerequisites)
      const missingCreditHours = results.reduce(
        (max, r) => Math.max(max, r.missingCreditHours ?? 0),
        0
      )
      return {
        satisfied: results.every((r) => r.satisfied),
        missingCourseCodes,
        missingCreditHours: missingCreditHours || undefined,
        unknownPrerequisites,
        satisfiedBy,
      }
    }
    case 'or': {
      const results = expr.any.map((child) =>
        evaluatePrerequisites(child, transcript, catalog)
      )
      const winner = results.find((r) => r.satisfied)
      if (winner) return satisfied(winner.satisfiedBy)
      return {
        satisfied: false,
        missingCourseCodes: results.flatMap((r) => r.missingCourseCodes),
        unknownPrerequisites: results.flatMap((r) => r.unknownPrerequisites),
        satisfiedBy: [],
      }
    }
    case 'unknown':
      return unknownPrereq(expr.raw)
  }
}
