'use client'

import { useState, useEffect } from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { FCAI_WEBSITE_URL } from '@/lib/fcai-urls'
import { useLocale } from '../i18n/LocaleContext'
export default function FCAIStatusIndicator() {
  const { t } = useLocale()
  const [online, setOnline] = useState<boolean | null>(null)

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
    const apiBase = typeof window !== 'undefined' ? base : ''
    const abort = new AbortController()

    fetch(`${apiBase}/api/fcai-status`, { signal: abort.signal })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data?.online === 'boolean') setOnline(data.online)
      })
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

  const statusLabel =
    online === null
      ? t('table.fcaiStatusChecking')
      : t('table.fcaiStatusLabel', {
          status: online ? t('table.fcaiStatusOnline') : t('table.fcaiStatusOffline'),
        })

  return (
    <>
      <style jsx global>{`.fcai-status-indicator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 2px 10px;
  margin: 0;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: 9999px;
  box-shadow: var(--shadow-xs);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.fcai-status-indicator:hover {
  background: rgba(255, 255, 255, 0.35);
  border-color: rgba(255, 255, 255, 0.5);
  color: var(--text-secondary);
  text-decoration: none;
}

.fcai-status-link-icon {
  width: 11px;
  height: 11px;
  flex-shrink: 0;
  opacity: 0.8;
}

.fcai-status-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex-shrink: 0;
}

.fcai-status-dot.fcai-status-online {
  background: #22c55e;
}

.fcai-status-dot.fcai-status-offline {
  background: #ef4444;
}

.fcai-status-dot.fcai-status-unknown {
  background: #eab308;
}`}</style>
    <a
      href={FCAI_WEBSITE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fcai-status-indicator"
      aria-live="polite"
      aria-label={`${statusLabel}. ${t('table.fcaiWebsiteOpen')}`}
      title={t('table.fcaiWebsiteOpen')}
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
