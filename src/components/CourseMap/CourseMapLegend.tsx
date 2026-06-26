'use client'

import './CourseMapLegend.css'
import type { CSSProperties } from 'react'
import { useLocale } from '../../i18n/LocaleContext'

const legendGlassStyle: CSSProperties = {
  backdropFilter: 'blur(12px) saturate(1.15)',
  WebkitBackdropFilter: 'blur(12px) saturate(1.15)',
}

export default function CourseMapLegend() {
  const { t } = useLocale()

  return (
    <div
      className="course-map-legend"
      style={legendGlassStyle}
      role="note"
      aria-label={t('courseMap.legend')}
    >
      <span className="course-map-legend-item">
        <span className="course-map-legend-icon course-map-legend-icon--completed" aria-hidden>✓</span>
        {t('courseMap.status.completed')}
      </span>
      <span className="course-map-legend-item">
        <span className="course-map-legend-icon course-map-legend-icon--pending" aria-hidden>◷</span>
        {t('courseMap.status.in_progress')}
      </span>
      <span className="course-map-legend-item">
        <span className="course-map-legend-icon course-map-legend-icon--available" aria-hidden />
        {t('courseMap.status.available')}
      </span>
      <span className="course-map-legend-item">
        <span className="course-map-legend-icon course-map-legend-icon--locked" aria-hidden>🔒</span>
        {t('courseMap.status.locked')}
      </span>
      <span className="course-map-legend-divider" aria-hidden />
      <span className="course-map-legend-item">
        <span className="course-map-legend-line course-map-legend-line--ok" aria-hidden />
        {t('courseMap.edgeSatisfied')}
      </span>
      <span className="course-map-legend-item">
        <span className="course-map-legend-line course-map-legend-line--no" aria-hidden />
        {t('courseMap.edgeUnsatisfied')}
      </span>
    </div>
  )
}
