'use client'

import { LocaleProvider } from '../../src/i18n/LocaleContext'
import { DocumentTitleMeta } from '../../src/components/DocumentTitleMeta'
import AmbientBackdrop from '../../src/components/AmbientBackdrop'
import ThreeJSBackground from '../../src/components/ThreeJSBackground'
import LanguageSwitcher from '../../src/components/LanguageSwitcher'
import HamburgerMenu from '../../src/components/CourseMap/HamburgerMenu'
import CourseMapPage from '../../src/components/CourseMap/CourseMapPage'
import { migrateStorageIfNeeded } from '../../src/utils/storage-keys'

migrateStorageIfNeeded()

export default function MapRoute() {
  return (
    <LocaleProvider>
      <AmbientBackdrop />
      <ThreeJSBackground />
      <div className="app-root course-map-route">
        <DocumentTitleMeta
          titleKey="courseMap.pageTitle"
          descriptionKey="courseMap.pageDescription"
        />
        <HamburgerMenu activeRoute="map" />
        <LanguageSwitcher />
        <CourseMapPage />
      </div>
    </LocaleProvider>
  )
}
