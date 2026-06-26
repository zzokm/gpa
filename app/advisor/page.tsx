'use client'

import { LocaleProvider } from '../../src/i18n/LocaleContext'
import { DocumentTitleMeta } from '../../src/components/DocumentTitleMeta'
import AmbientBackdrop from '../../src/components/AmbientBackdrop'
import ThreeJSBackground from '../../src/components/ThreeJSBackground'
import LanguageSwitcher from '../../src/components/LanguageSwitcher'
import HamburgerMenu from '../../src/components/HamburgerMenu'
import SitePlaceholderPage from '../../src/components/SitePlaceholderPage'

export default function AdvisorRoute() {
  return (
    <LocaleProvider>
      <AmbientBackdrop />
      <ThreeJSBackground />
      <div className="app-root">
        <DocumentTitleMeta
          titleKey="advisor.pageTitle"
          descriptionKey="advisor.pageDescription"
        />
        <HamburgerMenu activeRoute="advisor" />
        <LanguageSwitcher />
        <SitePlaceholderPage
          titleKey="advisor.heading"
          descriptionKey="advisor.comingSoon"
        />
      </div>
    </LocaleProvider>
  )
}
