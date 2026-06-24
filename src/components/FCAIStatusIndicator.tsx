'use client'

import './FCAIStatusIndicator.css'
import { useState, useEffect, useRef } from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { FCAI_WEBSITE_URL } from '@/lib/fcai-urls'
import { useLocale } from '../i18n/LocaleContext'
import { track } from '../analytics'
export default function FCAIStatusIndicator() {
  const { t } = useLocale()
  const [online, setOnline] = useState<boolean | null>(null)
  const initialTrackedRef = useRef(false)

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
    const apiBase = typeof window !== 'undefined' ? base : ''
    const abort = new AbortController()

    fetch(`${apiBase}/api/fcai-status`, { signal: abort.signal })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data?.online === 'boolean') {
          setOnline(data.online)
          if (!initialTrackedRef.current) {
            track('fcai_status_initial', { online: data.online })
            initialTrackedRef.current = true
          }
        }
      })
      .catch((err) => {
        if (err?.name !== 'AbortError') {
          setOnline(false)
          track('fcai_status_api_error', { endpoint: 'poll' })
          if (!initialTrackedRef.current) {
            track('fcai_status_initial', { online: false })
            initialTrackedRef.current = true
          }
        }
      })

    const streamUrl = `${apiBase}/api/fcai-status/stream`
    const es = new EventSource(streamUrl)
    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data)
        if (typeof data?.online === 'boolean') {
          setOnline((prev) => {
            if (prev !== null && prev !== data.online) {
              track('fcai_status_change', { from: prev, to: data.online })
            }
            if (!initialTrackedRef.current) {
              track('fcai_status_initial', { online: data.online })
              initialTrackedRef.current = true
            }
            return data.online
          })
        }
      } catch {
        // ignore
      }
    }
    es.onerror = () => {
      track('fcai_status_api_error', { endpoint: 'stream' })
      es.close()
    }
    return () => {
      abort.abort()
      es.close()
    }
  }, [])

  const statusLabel =
    online === null
      ? t('table.fcaiStatusChecking')
      : t('table.fcaiStatusLabel', {
          status: online ? t('table.fcaiStatusOnline') : t('table.fcaiStatusOffline'),
        })

  return (
    <>
      
    <a
      href={FCAI_WEBSITE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fcai-status-indicator"
      aria-live="polite"
      aria-label={`${statusLabel}. ${t('table.fcaiWebsiteOpen')}`}
      title={t('table.fcaiWebsiteOpen')}
      onClick={() => track('fcai_status_link_click')}
    >
      <span
        className={`fcai-status-dot ${
          online === null ? 'fcai-status-unknown' : online ? 'fcai-status-online' : 'fcai-status-offline'
        }`}
      />
      <span className="fcai-status-text">{t('table.fcaiWebsite')}</span>
      <FaExternalLinkAlt className="fcai-status-link-icon" aria-hidden />
    </a>
    </>
  )
}
