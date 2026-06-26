'use client'

import '../header-float.css'
import './HamburgerMenu.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { useLocale } from '../../i18n/LocaleContext'
import type { CSSProperties } from 'react'

const headerGlassStyle: CSSProperties = {
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
}

interface HamburgerMenuProps {
  activeRoute: 'calculator' | 'map'
}

export default function HamburgerMenu({ activeRoute }: HamburgerMenuProps) {
  const { t } = useLocale()
  const [open, setOpen] = useState(false)
  const drawerRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    document.body.classList.add('modal-open')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('modal-open')
    }
  }, [open, close])

  useEffect(() => {
    if (open && drawerRef.current) {
      const firstLink = drawerRef.current.querySelector('a')
      if (firstLink instanceof HTMLElement) firstLink.focus()
    }
    if (!open && triggerRef.current) {
      triggerRef.current.focus()
    }
  }, [open])

  return (
    <>
      <div className="header-float-btn hamburger-btn" style={headerGlassStyle}>
        <button
          ref={triggerRef}
          type="button"
          className="header-float-btn-inner hamburger-trigger"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="nav-drawer"
          aria-label={t('nav.openMenu')}
        >
          <span className={`hamburger-icon${open ? ' hamburger-icon--open' : ''}`} aria-hidden>
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {open &&
        createPortal(
          <>
            <button
              type="button"
              className="nav-drawer-backdrop"
              onClick={close}
              aria-label={t('common.close')}
            />
            <nav
              ref={drawerRef}
              id="nav-drawer"
              className="nav-drawer"
              aria-label={t('nav.siteNavigation')}
            >
              <div className="nav-drawer-header">
                <span className="nav-drawer-brand">{t('app.title')}</span>
              </div>
              <ul className="nav-drawer-list">
                <li>
                  <Link
                    href="/"
                    className={`nav-drawer-link${activeRoute === 'calculator' ? ' nav-drawer-link--active' : ''}`}
                    onClick={close}
                  >
                    {t('nav.calculator')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/map"
                    className={`nav-drawer-link${activeRoute === 'map' ? ' nav-drawer-link--active' : ''}`}
                    onClick={close}
                  >
                    {t('nav.courseMap')}
                  </Link>
                </li>
              </ul>
            </nav>
          </>,
          document.body
        )}
    </>
  )
}
