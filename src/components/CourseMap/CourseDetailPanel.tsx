'use client'

import './CourseDetailPanel.css'
import Link from 'next/link'
import { useLocale } from '../../i18n/LocaleContext'
import { WesternDigits } from '../LocaleDisplay'
import { isCourseCompleted } from '../../course-map/prerequisites/evaluatePrerequisites'
import type { CourseMapNode, NormalizedCatalog, OriginalImportedTranscript } from '../../course-map/types'
import { getPrerequisiteCoursesForNode } from '../../course-map/graph/buildGraph'

interface CourseDetailPanelProps {
  node: CourseMapNode | null
  catalog: NormalizedCatalog
  transcript: OriginalImportedTranscript | null
  open: boolean
  onClose: () => void
  onPanToPrereq: (courseCode: string) => void
  onHighlightPrereq: (courseCode: string | null) => void
}

export default function CourseDetailPanel({
  node,
  catalog,
  transcript,
  open,
  onClose,
  onPanToPrereq,
  onHighlightPrereq,
}: CourseDetailPanelProps) {
  const { t, translateLevelOrTerm } = useLocale()

  if (!open || !node) return null

  const entry = node.transcriptEntry
  const prereqCodes = getPrerequisiteCoursesForNode(node)

  return (
    <>
      <button
        type="button"
        className="course-detail-backdrop"
        onClick={onClose}
        aria-label={t('common.close')}
      />
      <aside
        className="course-detail-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="course-detail-title"
      >
        <header className="course-detail-header">
          <button
            type="button"
            className="course-detail-close"
            onClick={onClose}
            aria-label={t('common.close')}
          >
            ×
          </button>
          <div className="course-detail-title-wrap">
            <h2 id="course-detail-title" className="course-detail-title">
              <span className="western-digits">{node.courseCode}</span> · {node.name}
            </h2>
          </div>
        </header>

        <div className="course-detail-body">
          <p className="course-detail-meta">
            {t(`courseMap.type.${node.type.toLowerCase()}`)} ·{' '}
            <WesternDigits>{node.creditHours}</WesternDigits> {t('courseMap.creditHours')} ·{' '}
            {t(`courseMap.scope.${node.scope}`)}
          </p>

          <div className="course-detail-grade-block">
            <span className="course-detail-grade-label">{t('courseMap.importedGrade')}</span>
            {entry?.grade ? (
              <>
                <span className="course-detail-grade-value grade-ltr">{entry.grade}</span>
                {entry.term && (
                  <span className="course-detail-grade-source">
                    {t('courseMap.fromTranscript', {
                      term: translateLevelOrTerm(entry.term),
                    })}
                  </span>
                )}
              </>
            ) : entry && entry.status === 'in_progress' ? (
              <span className="course-detail-grade-empty">{t('courseMap.status.in_progress')}</span>
            ) : entry && entry.status === 'failed' ? (
              <span className="course-detail-grade-empty grade-ltr">
                F — {t('courseMap.failedGrade')}
              </span>
            ) : (
              <span className="course-detail-grade-empty">{t('courseMap.notInTranscript')}</span>
            )}
          </div>

          {prereqCodes.length > 0 && (
            <section className="course-detail-section">
              <h3 className="course-detail-section-title">{t('courseMap.prerequisites')}</h3>
              <ul className="course-detail-prereq-list">
                {prereqCodes.map((code) => {
                  const prereqCourse = catalog.byCode[code]
                  const satisfied = isCourseCompleted(code, transcript)
                  return (
                    <li key={code}>
                      <button
                        type="button"
                        className="course-detail-prereq-item"
                        onClick={() => onPanToPrereq(code)}
                        onMouseEnter={() => onHighlightPrereq(code)}
                        onMouseLeave={() => onHighlightPrereq(null)}
                        onFocus={() => onHighlightPrereq(code)}
                        onBlur={() => onHighlightPrereq(null)}
                      >
                        <span
                          className={`course-detail-prereq-status${satisfied ? ' course-detail-prereq-status--ok' : ''}`}
                          aria-hidden
                        >
                          {satisfied ? '✓' : '○'}
                        </span>
                        <span className="course-detail-prereq-text">
                          <span className="western-digits">{code}</span>
                          {prereqCourse ? ` — ${prereqCourse.name}` : ''}
                        </span>
                        <span className="course-detail-prereq-arrow" aria-hidden>↗</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </section>
          )}

          {node.catalog.description && (
            <section className="course-detail-section">
              <h3 className="course-detail-section-title">{t('courseMap.description')}</h3>
              <p className="course-detail-description">{node.catalog.description}</p>
            </section>
          )}

          <Link href="/" className="course-detail-cta">
            {t('courseMap.viewInCalculator')} ↗
          </Link>
        </div>
      </aside>
    </>
  )
}
