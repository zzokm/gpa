'use client'

import { useEffect } from 'react'
import { useLocale } from '../i18n/LocaleContext'

interface DocumentTitleMetaProps {
  titleKey?: string
  descriptionKey?: string
}

export function DocumentTitleMeta({
  titleKey = 'meta.title',
  descriptionKey = 'meta.description',
}: DocumentTitleMetaProps = {}) {
  const { locale, t } = useLocale()

  useEffect(() => {
    document.title = t(titleKey)
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', t(descriptionKey))
    }
  }, [locale, t, titleKey, descriptionKey])

  return null
}
