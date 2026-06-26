'use client'

import './SitePlaceholderPage.css'
import { useLocale } from '../i18n/LocaleContext'

interface SitePlaceholderPageProps {
  titleKey: string
  descriptionKey: string
}

export default function SitePlaceholderPage({ titleKey, descriptionKey }: SitePlaceholderPageProps) {
  const { t } = useLocale()

  return (
    <main className="site-placeholder-page">
      <div className="site-placeholder-card">
        <h1>{t(titleKey)}</h1>
        <p>{t(descriptionKey)}</p>
      </div>
    </main>
  )
}
