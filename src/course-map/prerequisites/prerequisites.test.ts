import { describe, expect, it } from 'vitest'
import { parsePrerequisiteList, collectPrerequisiteCourseCodes } from './parsePrerequisites'
import { evaluatePrerequisites, isCourseCompleted } from './evaluatePrerequisites'
import type { OriginalImportedTranscript } from '../types'

const codes = new Set(['CS112', 'CS213', 'MA113'])

describe('parsePrerequisiteList', () => {
  it('parses empty prerequisites', () => {
    expect(parsePrerequisiteList([], codes)).toEqual({ kind: 'none' })
  })

  it('parses course code', () => {
    expect(parsePrerequisiteList(['CS112'], codes)).toEqual({
      kind: 'course',
      courseCode: 'CS112',
    })
  })

  it('parses credit hours gate', () => {
    expect(parsePrerequisiteList(['Passing 30 Credit Hours'], codes)).toEqual({
      kind: 'creditHours',
      minimumPassedCredits: 30,
    })
  })

  it('parses AND from multiple entries', () => {
    const expr = parsePrerequisiteList(['CS112', 'MA113'], codes)
    expect(expr.kind).toBe('and')
    if (expr.kind === 'and') {
      expect(expr.all).toHaveLength(2)
    }
  })

  it('collects course codes from expression', () => {
    const expr = parsePrerequisiteList(['CS112', 'MA113'], codes)
    expect(collectPrerequisiteCourseCodes(expr)).toEqual(['CS112', 'MA113'])
  })
})

describe('evaluatePrerequisites', () => {
  const transcript: OriginalImportedTranscript = {
    schemaVersion: 1,
    importId: 'test',
    importedAt: new Date().toISOString(),
    source: 'fcai-html',
    rawHtmlHash: 'abc',
    parserVersion: '1',
    entries: [
      {
        id: '1',
        originalRowIndex: 0,
        source: 'imported-html',
        rawName: 'Intro',
        rawCreditHours: '3',
        rawGrade: 'A',
        name: 'Intro',
        canonicalName: 'intro',
        matchedCourseCode: 'CS112',
        matchedCourseConfidence: 'exact-code',
        hours: 3,
        grade: 'A',
        status: 'completed',
      },
      {
        id: '2',
        originalRowIndex: 1,
        source: 'imported-html',
        rawName: 'Failed',
        rawCreditHours: '3',
        rawGrade: 'F',
        name: 'Failed',
        canonicalName: 'failed',
        matchedCourseCode: 'MA113',
        matchedCourseConfidence: 'exact-code',
        hours: 3,
        grade: 'F',
        status: 'failed',
      },
    ],
    parseWarnings: [],
  }

  it('marks completed course as satisfied', () => {
    expect(isCourseCompleted('CS112', transcript)).toBe(true)
  })

  it('does not count failed grade as completed', () => {
    expect(isCourseCompleted('MA113', transcript)).toBe(false)
  })

  it('evaluates course prerequisite', () => {
    const result = evaluatePrerequisites(
      { kind: 'course', courseCode: 'CS112' },
      transcript,
      { byCode: {}, byCanonicalName: {}, memberships: [], majorKeys: [], majorTitles: {} as never, diagnostics: [] }
    )
    expect(result.satisfied).toBe(true)
  })
})
