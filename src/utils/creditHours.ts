import { Course } from '../types/Course'

export interface CreditHoursBreakdown {
  totalCredits: number
  passedCredits: number
  failedCredits: number
}

/** Sum graded hours: total, passed (non-F), and failed (F only). */
export function getCreditHoursBreakdown(courses: Course[]): CreditHoursBreakdown {
  const graded = courses.filter((c) => c.grade != null)
  const totalCredits = graded.reduce((sum, c) => sum + c.hours, 0)
  const passedCredits = graded
    .filter((c) => c.grade !== 'F')
    .reduce((sum, c) => sum + c.hours, 0)
  const failedCredits = graded
    .filter((c) => c.grade === 'F')
    .reduce((sum, c) => sum + c.hours, 0)
  return { totalCredits, passedCredits, failedCredits }
}
