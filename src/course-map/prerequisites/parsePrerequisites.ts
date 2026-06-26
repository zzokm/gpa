import type { PrerequisiteExpression } from '../types'

const COURSE_CODE_PATTERN = /^[A-Z]{2,4}\d{2,3}$/i
const CREDIT_HOURS_PATTERN = /^Passing\s+(\d+)\s+Credit\s+Hours$/i

function parseSinglePrerequisite(raw: string, knownCodes: Set<string>): PrerequisiteExpression {
  const trimmed = raw.trim()
  if (!trimmed) return { kind: 'none' }

  const creditMatch = trimmed.match(CREDIT_HOURS_PATTERN)
  if (creditMatch) {
    return {
      kind: 'creditHours',
      minimumPassedCredits: parseInt(creditMatch[1], 10),
    }
  }

  if (/\s+OR\s+|\||\//i.test(trimmed)) {
    const parts = trimmed.split(/\s+OR\s+|\||\//i).map((p) => p.trim()).filter(Boolean)
    return {
      kind: 'or',
      any: parts.map((p) => parseSinglePrerequisite(p, knownCodes)),
    }
  }

  if (COURSE_CODE_PATTERN.test(trimmed)) {
    const code = trimmed.toUpperCase()
    if (knownCodes.has(code)) {
      return { kind: 'course', courseCode: code }
    }
    return { kind: 'unknown', raw: trimmed, reason: 'course_code_not_in_catalog' }
  }

  return { kind: 'unknown', raw: trimmed, reason: 'unrecognized_prerequisite' }
}

export function parsePrerequisiteList(
  prerequisites: string[],
  knownCodes: Set<string>
): PrerequisiteExpression {
  if (!prerequisites.length) return { kind: 'none' }
  if (prerequisites.length === 1) {
    return parseSinglePrerequisite(prerequisites[0], knownCodes)
  }
  return {
    kind: 'and',
    all: prerequisites.map((p) => parseSinglePrerequisite(p, knownCodes)),
  }
}

export function collectPrerequisiteCourseCodes(expr: PrerequisiteExpression): string[] {
  switch (expr.kind) {
    case 'none':
    case 'creditHours':
    case 'unknown':
      return []
    case 'course':
      return [expr.courseCode]
    case 'and':
      return expr.all.flatMap(collectPrerequisiteCourseCodes)
    case 'or':
      return expr.any.flatMap(collectPrerequisiteCourseCodes)
  }
}
