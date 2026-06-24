import { describe, expect, it } from 'vitest'
import { Course } from '../types/Course'
import { getCreditHoursBreakdown } from './creditHours'

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
