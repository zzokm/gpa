'use client'

import { useState, useEffect } from 'react'
import { useLocale } from '../i18n/LocaleContext'
import './FCAIStatusIndicator.css'

export default function FCAIStatusIndicator() {
  const { t } = useLocale()
  const [online, setOnline] = useState<boolean | null>(null)

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
    const apiBase = typeof window !== 'undefined' ? base : ''
    const abort = new AbortController()

    fetch(`${apiBase}/api/fcai-status`, { signal: abort.signal })
      .then((res) => res.json())
      .then((data) => setOnline(Boolean(data?.online)))
      .catch((err) => {
        if (err?.name !== 'AbortError') setOnline(false)
      })

    const streamUrl = `${apiBase}/api/fcai-status/stream`
    const es = new EventSource(streamUrl)
    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data)
        if (typeof data?.online === 'boolean') setOnline(data.online)
      } catch {
        // ignore
      }
    }
    es.onerror = () => es.close()
    return () => {
      abort.abort()
      es.close()
    }
  }, [])

  return (
    <div
      className="fcai-status-indicator"
      aria-live="polite"
      aria-label={
        online === null
          ? t('table.fcaiStatusChecking')
          : t('table.fcaiStatusLabel', {
              status: online ? t('table.fcaiStatusOnline') : t('table.fcaiStatusOffline'),
            })
      }
    >
      <span
        className={`fcai-status-dot ${
          online === null ? 'fcai-status-unknown' : online ? 'fcai-status-online' : 'fcai-status-offline'
        }`}
      />
      <span className="fcai-status-text">{t('table.fcaiWebsite')}</span>
    </div>
  )
}
