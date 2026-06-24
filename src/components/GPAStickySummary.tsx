'use client'

import { Course } from '../types/Course'
import { calculateGPA } from '../utils/gradeUtils'
import { getCreditHoursBreakdown } from '../utils/creditHours'
import { getGPAAssessment } from '../utils/gpaAssessment'
import { useLocale } from '../i18n/LocaleContext'
import './GPAStickySummary.css'

interface GPAStickySummaryProps {
  courses: Course[]
}

export default function GPAStickySummary({ courses }: GPAStickySummaryProps) {
  const { t } = useLocale()
  const gpa = calculateGPA(courses)
  const creditHoursBreakdown = getCreditHoursBreakdown(courses)
  const { passedCredits } = creditHoursBreakdown
  const assessment = getGPAAssessment(gpa)
  const creditTooltip = t('table.creditHoursTooltip', {
    total: creditHoursBreakdown.totalCredits,
    failed: creditHoursBreakdown.failedCredits,
    passed: creditHoursBreakdown.passedCredits,
  })

  if (courses.length === 0) {
    return null;
  }

  return (
    <section
      className="gpa-sticky-summary"
      aria-label={t('summary.ariaLabel')}
      aria-live="polite"
    >
      <div className="gpa-sticky-metric">
        <span className="gpa-sticky-label">{t('gpa.label')}</span>
        <span className="gpa-sticky-value">{gpa.toFixed(2)}</span>
        <span className="gpa-sticky-scale">{t('gpa.outOf')}</span>
      </div>

      <div className="gpa-sticky-divider" aria-hidden="true" />

      <div className="gpa-sticky-metric gpa-sticky-credits">
        <span className="gpa-sticky-label">{t('table.totalHoursCompleted')}</span>
        <span
          className="gpa-sticky-info-icon"
          title={creditTooltip}
          aria-label={creditTooltip}
          role="img"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
        </span>
        <span className="gpa-sticky-value gpa-sticky-credits-value">
          {passedCredits}
          <span className="gpa-sticky-unit">{t('table.hrs')}</span>
        </span>
      </div>

      {gpa !== 0 && (
        <span
          className="gpa-sticky-assessment"
          style={{
            color: assessment.color,
            backgroundColor: `${assessment.color}18`,
            borderColor: `${assessment.color}40`,
          }}
        >
          {t(assessment.key)}
        </span>
      )}
    </section>
  )
}
