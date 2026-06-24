'use client'

import type { CSSProperties } from 'react'
import { useLocale } from '../i18n/LocaleContext'
import './HeaderFloatBtn.css'

interface HowToButtonProps {
  onClick: () => void
}

const headerGlassStyle: CSSProperties = {
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
}

function HelpIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="20"
      height="20"
      aria-hidden
    >
      <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
    </svg>
  )
}

export default function HowToButton({ onClick }: HowToButtonProps) {
  const { t } = useLocale()

  return (
    <div className="header-float-btn how-to-btn" style={headerGlassStyle}>
      <button
        type="button"
        className="header-float-btn-inner"
        onClick={onClick}
        title={t('howTo.buttonTitle')}
        aria-label={t('howTo.buttonTitle')}
      >
        <HelpIcon />
        <span className="how-to-btn-label">{t('howTo.buttonLabel')}</span>
      </button>
    </div>
  )
}
