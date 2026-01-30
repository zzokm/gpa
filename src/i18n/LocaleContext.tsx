'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import en from './translations/en.json'
import arEG from './translations/ar-EG.json'

const LOCALE_STORAGE_KEY = 'gpa-calculator-locale'

export type Locale = 'en' | 'ar-EG'

const translations: Record<Locale, Record<string, string>> = {
  en: en as Record<string, string>,
  'ar-EG': arEG as Record<string, string>
}

interface Replacements {
  [key: string]: string | number
}

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, replacements?: Replacements) => string
  translateLevelOrTerm: (value: string) => string
}

const levelKeyMap: Record<string, string> = {
  'First Level': 'level.first',
  'Second Level': 'level.second',
  'Third Level': 'level.third',
  'Fourth Level': 'level.fourth'
}

const termKeyMap: Record<string, string> = {
  'First Term': 'term.first',
  'Second Term': 'term.second',
  'Summer Term': 'term.summer'
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function getStoredLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
  if (stored === 'ar-EG' || stored === 'en') return stored
  return 'en'
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getStoredLocale)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.lang = locale === 'ar-EG' ? 'ar' : 'en'
    document.documentElement.dir = locale === 'ar-EG' ? 'rtl' : 'ltr'
  }, [locale, mounted])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale)
    }
  }, [])

  const t = useCallback((key: string, replacements?: Replacements): string => {
    const dict = translations[locale]
    let value = dict?.[key] ?? key
    if (replacements) {
      Object.entries(replacements).forEach(([k, v]) => {
        value = value.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), String(v))
      })
    }
    return value
  }, [locale])

  const translateLevelOrTerm = useCallback((value: string): string => {
    const levelKey = levelKeyMap[value]
    if (levelKey) return t(levelKey)
    const termKey = termKeyMap[value]
    if (termKey) return t(termKey)
    return value
  }, [t])

  const value: LocaleContextValue = {
    locale,
    setLocale,
    t,
    translateLevelOrTerm
  }

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
