'use client'

import './CourseMapControls.css'
import type { CSSProperties } from 'react'
import { useLocale } from '../../i18n/LocaleContext'
import type { MajorKey } from '../../course-map/types'

const shellGlassStyle: CSSProperties = {
  backdropFilter: 'blur(12px) saturate(1.15)',
  WebkitBackdropFilter: 'blur(12px) saturate(1.15)',
}

interface CourseMapControlsProps {
  majors: { key: MajorKey; title: string }[]
  selectedMajor: MajorKey | null
  showCompleted: boolean
  zoomLevel: number
  onMajorChange: (major: MajorKey) => void
  onToggleCompleted: (show: boolean) => void
  onZoomIn: () => void
  onZoomOut: () => void
  onFitView: () => void
}

export default function CourseMapControls({
  majors,
  selectedMajor,
  showCompleted,
  zoomLevel,
  onMajorChange,
  onToggleCompleted,
  onZoomIn,
  onZoomOut,
  onFitView,
}: CourseMapControlsProps) {
  const { t } = useLocale()

  return (
    <div
      className="course-map-controls-shell"
      style={shellGlassStyle}
      role="toolbar"
      aria-label={t('courseMap.controls')}
    >
      <div className="course-map-controls">
        <label className="course-map-controls-major">
          <span className="course-map-controls-label">{t('courseMap.major')}</span>
          <select
            className="course-map-controls-select"
            value={selectedMajor ?? ''}
            onChange={(e) => onMajorChange(e.target.value as MajorKey)}
            aria-label={t('courseMap.majorSelect')}
          >
            {majors.map((m) => (
              <option key={m.key} value={m.key}>
                {m.title}
              </option>
            ))}
          </select>
        </label>

        <label className="course-map-controls-toggle">
          <span className="course-map-controls-label">{t('courseMap.showCompleted')}</span>
          <button
            type="button"
            role="switch"
            className={`course-map-switch${showCompleted ? ' course-map-switch--on' : ''}`}
            aria-checked={showCompleted}
            onClick={() => onToggleCompleted(!showCompleted)}
          >
            <span className="course-map-switch-thumb" />
          </button>
        </label>

        <div className="course-map-controls-zoom" aria-label={t('courseMap.zoomControls')}>
          <button type="button" className="course-map-zoom-btn" onClick={onZoomOut} aria-label={t('courseMap.zoomOut')}>
            −
          </button>
          <span className="course-map-zoom-level" aria-live="polite">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button type="button" className="course-map-zoom-btn" onClick={onZoomIn} aria-label={t('courseMap.zoomIn')}>
            +
          </button>
          <button type="button" className="course-map-zoom-btn" onClick={onFitView} aria-label={t('courseMap.fitView')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M15 3l2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3h-6zM3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3v6zm6 12l-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6h6zm12-6l-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87L15 21h6v-6z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
