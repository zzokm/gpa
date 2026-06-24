'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useLocale } from '../i18n/LocaleContext'

type TabId = 'desktop' | 'android' | 'ios'

function detectDeviceTab(): TabId {
  if (typeof navigator === 'undefined') return 'desktop'
  const ua = navigator.userAgent
  if (/Android/i.test(ua)) return 'android'
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios'
  return 'desktop'
}

interface HowToModalProps {
  show: boolean
  onHide: () => void
}

const COPY_HTML_EXTENSION_URL =
  'https://chromewebstore.google.com/detail/copy-html/indfogjkdbmkihaohndcnkoaheopbhjf?hl=en'
const REGISTERED_COURSES_URL = 'http://newecom.fci.cu.edu.eg/#/courses-per-students'
const REGISTERED_COURSES_ALT_URL = 'http://193.227.14.58/'
const LEMUR_BROWSER_PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.lemurbrowser.exts'
const IOS_COPY_HTML_SHORTCUT_URL =
  'https://www.icloud.com/shortcuts/ed70823ea1384571ad90507bcd62dec7'

export default function HowToModal({ show, onHide }: HowToModalProps) {
  const { t } = useLocale()
  const [activeTab, setActiveTab] = useState<TabId>('desktop')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (show) {
      setActiveTab(detectDeviceTab())
      document.body.classList.add('modal-open')
      setTimeout(() => setMounted(true), 10)
    } else {
      document.body.classList.remove('modal-open')
      setTimeout(() => setMounted(false), 0)
    }
    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [show])

  if (!show) return null

  const tabs: { id: TabId; label: string }[] = [
    { id: 'desktop', label: t('howTo.tabDesktop') },
    { id: 'android', label: t('howTo.tabAndroid') },
    { id: 'ios', label: t('howTo.tabIos') },
  ]

  return createPortal(
    <div
      className={`modal-overlay how-to-modal-overlay ${mounted ? 'modal-visible' : ''}`}
      onClick={onHide}
    >
      <div className="modal-content how-to-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{t('howTo.title')}</h2>
          <button className="modal-close" onClick={onHide} aria-label={t('common.close')}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M14.7 1.3c-.4-.4-1-.4-1.4 0L8 6.6 2.7 1.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4L6.6 8l-5.3 5.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L8 9.4l5.3 5.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L9.4 8l5.3-5.3c.4-.4.4-1 0-1.4z" />
            </svg>
          </button>
        </div>

        <div className="how-to-tabs">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={`how-to-tab ${activeTab === id ? 'active' : ''}`}
              onClick={() => setActiveTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="modal-body how-to-body">
          {activeTab === 'desktop' && (
            <ol className="how-to-steps">
              <li>
                {t('howTo.desktop.install')}{' '}
                <a href={COPY_HTML_EXTENSION_URL} target="_blank" rel="noopener noreferrer">
                  {t('howTo.copyHtmlExtension')}
                </a>
              </li>
              <li>
                {t('howTo.desktop.open')}{' '}
                <a href={REGISTERED_COURSES_URL} target="_blank" rel="noopener noreferrer">
                  {t('import.registeredCourses')}
                </a>{' '}
                {t('howTo.orAlternative')}{' '}
                <a href={REGISTERED_COURSES_ALT_URL} target="_blank" rel="noopener noreferrer">
                  {t('howTo.alternativeLink')}
                </a>{' '}
                {t('howTo.desktop.openSuffix')}
              </li>
              <li>{t('howTo.desktop.tapCopy')}</li>
              <li>{t('howTo.desktop.paste')}</li>
            </ol>
          )}
          {activeTab === 'android' && (
            <ol className="how-to-steps">
              <li>{t('howTo.android.step1')}</li>
              <li>
                {t('howTo.android.download')}{' '}
                <a href={LEMUR_BROWSER_PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
                  {t('howTo.android.playStore')}
                </a>
              </li>
              <li>
                {t('howTo.android.step2')}{' '}
                <a href={COPY_HTML_EXTENSION_URL} target="_blank" rel="noopener noreferrer">
                  {t('howTo.copyHtmlExtension')}
                </a>
              </li>
              <li>
                {t('howTo.android.step3Prefix')}{' '}
                <a href={REGISTERED_COURSES_URL} target="_blank" rel="noopener noreferrer">
                  {t('import.registeredCourses')}
                </a>{' '}
                {t('howTo.orAlternative')}{' '}
                <a href={REGISTERED_COURSES_ALT_URL} target="_blank" rel="noopener noreferrer">
                  {t('howTo.alternativeLink')}
                </a>{' '}
                {t('howTo.android.step3Suffix')}
              </li>
              <li>{t('howTo.android.step4')}</li>
              <li>{t('howTo.desktop.paste')}</li>
            </ol>
          )}
          {activeTab === 'ios' && (
            <ol className="how-to-steps">
              <li>
                {t('howTo.ios.step1')}{' '}
                <a href={IOS_COPY_HTML_SHORTCUT_URL} target="_blank" rel="noopener noreferrer">
                  {t('howTo.ios.copyHtmlShortcut')}
                </a>
              </li>
              <li>{t('howTo.ios.step2')}</li>
              <li>
                {t('howTo.ios.step3Prefix')}{' '}
                <a href={REGISTERED_COURSES_URL} target="_blank" rel="noopener noreferrer">
                  {t('import.registeredCourses')}
                </a>{' '}
                {t('howTo.orAlternative')}{' '}
                <a href={REGISTERED_COURSES_ALT_URL} target="_blank" rel="noopener noreferrer">
                  {t('howTo.alternativeLink')}
                </a>{' '}
                {t('howTo.ios.step3Suffix')}
              </li>
              <li>{t('howTo.ios.step4')}</li>
              <li>{t('howTo.ios.step5')}</li>
              <li>{t('howTo.desktop.paste')}</li>
            </ol>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}
