import { sendGAEvent } from '@next/third-parties/google'
import type { Course } from '../types/Course'
import type { Locale } from '../i18n/LocaleContext'
import { calculateGPA } from '../utils/gradeUtils'
import {
  courseCountBucket,
  importedCourseRatioBucket,
  ratioPercentBucket,
  roundGpa,
  textLengthBucket,
} from './buckets'

export type AnalyticsParams = Record<string, string | number | boolean>

export { courseCountBucket, importErrorKeyToParam, durationSecondsBucket, suggestionCountBucket } from './buckets'

export function getMeasurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  return id && id.trim() !== '' ? id.trim() : undefined
}

export function isAnalyticsEnabled(): boolean {
  return typeof window !== 'undefined' && Boolean(getMeasurementId())
}

export function track(event: string, params?: AnalyticsParams): void {
  if (!isAnalyticsEnabled()) return
  sendGAEvent('event', event, params ?? {})
}

export function setUserProperties(props: Record<string, string | boolean>): void {
  if (!isAnalyticsEnabled()) return
  window.gtag?.('set', 'user_properties', props)
}

export function syncUserPropertiesFromCourses(locale: Locale, courses: Course[]): void {
  setUserProperties({
    app_locale: locale,
    course_count_bucket: courseCountBucket(courses.length),
    has_imported_data: courses.some((c) => c.isImported),
  })
}

export function trackImportSuccess(
  importedCourses: Course[],
  options: { replacedExisting: boolean; locale: Locale },
): void {
  const withGrades = importedCourses.filter((c) => c.grade !== null).length
  const gradesRatio = importedCourses.length > 0 ? withGrades / importedCourses.length : 0

  track('import_success', {
    gpa: roundGpa(calculateGPA(importedCourses)),
    courses_imported: importedCourses.length,
    courses_imported_bucket: courseCountBucket(importedCourses.length),
    replaced_existing: options.replacedExisting,
    with_grades_ratio_bucket: ratioPercentBucket(gradesRatio),
    locale: options.locale,
  })
}

export function trackSessionEngagementSnapshot(locale: Locale, courses: Course[]): void {
  track('session_engagement_snapshot', {
    course_count_bucket: courseCountBucket(courses.length),
    locale,
    imported_course_ratio_bucket: importedCourseRatioBucket(courses),
  })
}

export function trackTextLengthSuccess(length: number): void {
  track('import_paste_success', { text_length_bucket: textLengthBucket(length) })
}
