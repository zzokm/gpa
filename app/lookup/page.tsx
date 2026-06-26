'use client'

import { LocaleProvider } from '../../src/i18n/LocaleContext'
import { DocumentTitleMeta } from '../../src/components/DocumentTitleMeta'
import AmbientBackdrop from '../../src/components/AmbientBackdrop'
import ThreeJSBackground from '../../src/components/ThreeJSBackground'
import LanguageSwitcher from '../../src/components/LanguageSwitcher'
import HamburgerMenu from '../../src/components/HamburgerMenu'
import SitePlaceholderPage from '../../src/components/SitePlaceholderPage'

export default function LookupRoute() {
  return (
    <LocaleProvider>
      <AmbientBackdrop />
      <ThreeJSBackground />
      <div className="app-root">
        <DocumentTitleMeta
          titleKey="lookup.pageTitle"
          descriptionKey="lookup.pageDescription"
        />
        <HamburgerMenu activeRoute="lookup" />
        <LanguageSwitcher />
        <SitePlaceholderPage
          titleKey="lookup.heading"
          descriptionKey="lookup.comingSoon"
        />
      </div>
    </LocaleProvider>
  )
}
