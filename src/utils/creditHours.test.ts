import { describe, expect, it } from 'vitest'
import { Course } from '../types/Course'
import {
  CREDIT_HOURS_OPTIONS,
  getCreditHoursBreakdown,
  getNextCreditHours,
  getPrevCreditHours,
  getNextCreditHoursWrap,
  getPrevCreditHoursWrap,
  isValidCreditHours,
  normalizeCreditHours,
} from './creditHours'

describe('credit hour options', () => {
  it('only allows 0, 2, and 3', () => {
    expect(CREDIT_HOURS_OPTIONS).toEqual([0, 2, 3])
    expect(isValidCreditHours(1)).toBe(false)
    expect(isValidCreditHours(2)).toBe(true)
  })

  it('normalizes invalid values', () => {
    expect(normalizeCreditHours(1)).toBe(2)
    expect(normalizeCreditHours(-1)).toBe(0)
    expect(normalizeCreditHours(5)).toBe(3)
  })

  it('steps through options without 1', () => {
    expect(getPrevCreditHours(2)).toBe(0)
    expect(getNextCreditHours(2)).toBe(3)
    expect(getNextCreditHours(3)).toBeNull()
    expect(getPrevCreditHours(0)).toBeNull()
  })

  it('wraps through options', () => {
    expect(getNextCreditHoursWrap(3)).toBe(0)
    expect(getPrevCreditHoursWrap(0)).toBe(3)
    expect(getNextCreditHoursWrap(2)).toBe(3)
  })
})

describe('getCreditHoursBreakdown', () => {
  const course = (hours: number, grade: Course['grade']): Course => ({
    name: 'C',
    hours,
    grade,
  })

  it('returns zeros when no graded courses', () => {
    expect(getCreditHoursBreakdown([course(3, null)])).toEqual({
      totalCredits: 0,
      passedCredits: 0,
      failedCredits: 0,
    })
  })

  it('counts passed and failed hours separately', () => {
    const courses = [course(3, 'A'), course(2, 'F'), course(1, null)]
    expect(getCreditHoursBreakdown(courses)).toEqual({
      totalCredits: 5,
      passedCredits: 3,
      failedCredits: 2,
    })
  })
})
