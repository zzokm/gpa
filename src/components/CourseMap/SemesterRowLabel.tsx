'use client'

import './SemesterRowLabel.css'
import { memo } from 'react'
import type { NodeProps } from '@xyflow/react'
import { useLocale } from '../../i18n/LocaleContext'
import type { SemesterLabelNode } from '../../course-map/graph/toReactFlow'

function SemesterRowLabelComponent({ data }: NodeProps<SemesterLabelNode>) {
  const { t, translateLevelOrTerm } = useLocale()

  let label = t(data.labelKey, data.labelReplacements)
  if (data.labelReplacements?.level) {
    label = t(data.labelKey, {
      level: translateLevelOrTerm(data.labelReplacements.level),
      term: data.labelReplacements.term
        ? translateLevelOrTerm(data.labelReplacements.term)
        : '',
    })
  }

  return (
    <div className="semester-row-label" aria-hidden>
      {label}
    </div>
  )
}

export default memo(SemesterRowLabelComponent)
