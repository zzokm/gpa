'use client'

import './CourseNode.css'
import { memo } from 'react'
import type { NodeProps } from '@xyflow/react'
import { Handle, Position } from '@xyflow/react'
import { useLocale } from '../../i18n/LocaleContext'
import { WesternDigits } from '../LocaleDisplay'
import type { CourseFlowNode } from '../../course-map/graph/toReactFlow'

function StatusBadge({ status }: { status: CourseFlowNode['data']['status'] }) {
  if (status === 'completed') {
    return (
      <span className="course-node-badge course-node-badge--completed" aria-hidden>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      </span>
    )
  }
  if (status === 'locked') {
    return (
      <span className="course-node-badge course-node-badge--locked" aria-hidden>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
        </svg>
      </span>
    )
  }
  if (status === 'in_progress') {
    return (
      <span className="course-node-badge course-node-badge--pending" aria-hidden title="Pending grade">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </span>
    )
  }
  if (status === 'available') {
    return <span className="course-node-badge course-node-badge--available" aria-hidden />
  }
  return null
}

function CourseNodeComponent({ data, selected }: NodeProps<CourseFlowNode>) {
  const { t } = useLocale()
  const stateClass = `course-node--${data.status}`
  const hiddenClass = data.hidden ? ' course-node--hidden' : ''
  const selectedClass = selected ? ' course-node--selected' : ''

  const ariaLabel = t('courseMap.nodeAria', {
    code: data.courseCode,
    name: data.name,
    status: t(`courseMap.status.${data.status}`),
  })

  return (
    <div
      className={`course-node ${stateClass}${hiddenClass}${selectedClass}`}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
    >
      <Handle type="target" position={Position.Top} className="course-node-handle" />
      <div className="course-node-header">
        <span className="course-node-code western-digits">{data.courseCode}</span>
        <StatusBadge status={data.status} />
      </div>
      <p className="course-node-name">{data.name}</p>
      <div className="course-node-footer">
        <span className="course-node-credits">
          <WesternDigits>{data.creditHours}</WesternDigits> {t('courseMap.credits')}
        </span>
        {data.type === 'Elective' && (
          <span className="course-node-elective">E</span>
        )}
      </div>
      {data.creditHourGates?.map((gate) => (
        <div
          key={gate.minimumPassedCredits}
          className={`course-node-credit-gate${gate.satisfied ? ' course-node-credit-gate--ok' : ''}`}
        >
          {t('courseMap.creditGate', { n: gate.minimumPassedCredits })}
        </div>
      ))}
      <Handle type="source" position={Position.Bottom} className="course-node-handle" />
    </div>
  )
}

export default memo(CourseNodeComponent)
