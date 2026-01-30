'use client'

import { useEffect } from 'react'
import { useLocale } from '../i18n/LocaleContext'

export function DocumentTitleMeta() {
  const { locale, t } = useLocale()

  useEffect(() => {
    document.title = t('meta.title')
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', t('meta.description'))
    }
  }, [locale, t])

  return null
}
