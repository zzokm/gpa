import { Course } from '../types/Course'

/** Valid FCAI credit-hour values (1 is not used). */
export const CREDIT_HOURS_OPTIONS = [0, 2, 3] as const

export type CreditHourOption = (typeof CREDIT_HOURS_OPTIONS)[number]

export function isValidCreditHours(hours: number): hours is CreditHourOption {
  return (CREDIT_HOURS_OPTIONS as readonly number[]).includes(hours)
}

export function normalizeCreditHours(hours: number): CreditHourOption {
  if (isValidCreditHours(hours)) return hours
  if (hours === 1) return 2
  if (hours <= 0) return 0
  return 3
}

export function getNextCreditHours(current: number): number | null {
  const options = CREDIT_HOURS_OPTIONS as readonly number[]
  const idx = options.indexOf(current)
  const startIdx = idx === -1 ? 0 : idx
  if (startIdx >= options.length - 1) return null
  return options[startIdx + 1]
}

export function getPrevCreditHours(current: number): number | null {
  const options = CREDIT_HOURS_OPTIONS as readonly number[]
  const idx = options.indexOf(current)
  const startIdx = idx === -1 ? 0 : idx
  if (startIdx <= 0) return null
  return options[startIdx - 1]
}

export function getNextCreditHoursWrap(current: number): CreditHourOption {
  const options = CREDIT_HOURS_OPTIONS
  const idx = options.indexOf(current as CreditHourOption)
  const startIdx = idx === -1 ? 0 : idx
  return options[(startIdx + 1) % options.length]
}

export function getPrevCreditHoursWrap(current: number): CreditHourOption {
  const options = CREDIT_HOURS_OPTIONS
  const idx = options.indexOf(current as CreditHourOption)
  const startIdx = idx === -1 ? 0 : idx
  return options[(startIdx - 1 + options.length) % options.length]
}

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
