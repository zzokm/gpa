'use client'

import type { CSSProperties } from 'react'
import { useLocale } from '../i18n/LocaleContext'
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

function HowToButtonStyles() {
  return <style jsx global>{`/* Glass shell for fixed header controls – separate file ensures backdrop-filter is emitted */
.header-float-btn {
  position: fixed;
  top: var(--space-md);
  z-index: var(--z-header-float);
  display: inline-flex;
  align-items: center;
  padding: var(--space-sm) var(--space-md);
  min-height: 36px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xs);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  transition: var(--transition-base);
}

.header-float-btn:hover {
  background: rgba(255, 255, 255, 0.75);
  border-color: rgba(255, 121, 85, 0.4);
}

.header-float-btn-inner {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--text-color);
  font-size: var(--text-sm);
  font-weight: 500;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
}

.header-float-btn-inner:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
  border-radius: var(--radius-xs);
}

.how-to-btn {
  left: var(--space-md);
}

.language-switcher {
  right: var(--space-md);
  font-family: var(--font-rubik), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

[dir='rtl'] .language-switcher,
html[lang='ar'] .language-switcher {
  font-family: var(--font-bricolage), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.language-switcher-label {
  font-variant-numeric: tabular-nums;
}

@media (max-width: 480px) {
  .header-float-btn {
    padding: var(--space-sm) var(--space-md);
    min-height: 36px;
  }

  .header-float-btn-inner {
    font-size: var(--text-sm);
  }

  .header-float-btn-inner svg {
    width: 18px;
    height: 18px;
  }
}`}</style>
}

export default function HowToButton({ onClick }: HowToButtonProps) {
  const { t } = useLocale()

  return (
    <>
      <HowToButtonStyles />
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
    </>
  )
}
