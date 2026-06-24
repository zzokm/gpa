'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { Container } from 'react-bootstrap'
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext'
import LanguageSwitcher from '../src/components/LanguageSwitcher'
import CourseForm from '../src/components/CourseForm'
import GroupedCourseTable from '../src/components/GroupedCourseTable'
import GPAStickySummary from '../src/components/GPAStickySummary'
import ImportModal from '../src/components/ImportModal'
import HowToModal from '../src/components/HowToModal'
import HowToButton from '../src/components/HowToButton'
import FCAIStatusIndicator from '../src/components/FCAIStatusIndicator'
import AmbientBackdrop from '../src/components/AmbientBackdrop'
import ThreeJSBackground from '../src/components/ThreeJSBackground'
import Footer from '../src/components/Footer'
import { WesternDigits } from '../src/components/LocaleDisplay'
import { DocumentTitleMeta } from '../src/components/DocumentTitleMeta'
import { Course, Grade } from '../src/types/Course'
import { migrateStorageIfNeeded, STORAGE_KEYS } from '../src/utils/storage-keys'
import { normalizeCreditHours } from '../src/utils/creditHours'
import {
  courseCountBucket,
  syncUserPropertiesFromCourses,
  track,
  trackImportSuccess,
  trackSessionEngagementSnapshot,
} from '../src/analytics'

migrateStorageIfNeeded()

function loadCoursesFromStorage(): { courses: Course[]; error?: string } {
  if (typeof window === 'undefined') return { courses: [] }
  try {
    const storedCourses = localStorage.getItem(STORAGE_KEYS.COURSES)
    return { courses: storedCourses ? JSON.parse(storedCourses) : [] }
  } catch (error) {
    console.error('Failed to load courses from localStorage:', error)
    return { courses: [], error: 'parse_failed' }
  }
}

function HomeContent() {
  const { t, locale } = useLocale()
  const [courses, setCourses] = useState<Course[]>([])
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [importEntryPoint, setImportEntryPoint] = useState<'course_form' | 'other'>('other')
  const [showHowToModal, setShowHowToModal] = useState(false)
  const [howToEntryPoint, setHowToEntryPoint] = useState<'fab' | 'import_modal'>('fab')
  const [saveNotification, setSaveNotification] = useState<{show: boolean, message: string}>({
    show: false,
    message: ''
  })
  const [undoBarVisible, setUndoBarVisible] = useState(false)
  const [undoSnapshot, setUndoSnapshot] = useState<Course[] | null>(null)
  const [undoCountdown, setUndoCountdown] = useState(5)
  const [undoExiting, setUndoExiting] = useState(false)
  const appLoadedTrackedRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const { courses: loaded, error } = loadCoursesFromStorage()
    if (error) {
      track('storage_load_failed', { error_type: error })
    }
    setCourses(loaded)
    setHasLoadedFromStorage(true)
  }, [])

  useEffect(() => {
    if (!hasLoadedFromStorage || appLoadedTrackedRef.current) return
    appLoadedTrackedRef.current = true
    const returning = typeof window !== 'undefined' && sessionStorage.getItem('gpa-analytics-seen') === '1'
    if (typeof window !== 'undefined') sessionStorage.setItem('gpa-analytics-seen', '1')
    track('app_loaded', {
      locale,
      course_count_bucket: courseCountBucket(courses.length),
      has_persisted_courses: courses.length > 0,
      returning_visitor: returning,
    })
    syncUserPropertiesFromCourses(locale, courses)
  }, [hasLoadedFromStorage, locale, courses])

  useEffect(() => {
    if (!hasLoadedFromStorage) return
    syncUserPropertiesFromCourses(locale, courses)
  }, [courses, locale, hasLoadedFromStorage])

  useEffect(() => {
    if (!hasLoadedFromStorage) return
    let snapshotSent = false
    const sendSnapshot = () => {
      if (snapshotSent) return
      snapshotSent = true
      trackSessionEngagementSnapshot(locale, courses)
    }
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') sendSnapshot()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [hasLoadedFromStorage, locale, courses])

  useEffect(() => {
    if (!undoBarVisible || undoExiting) return
    const interval = setInterval(() => {
      setUndoCountdown(prev => {
        const next = Math.max(0, Math.round((prev - 0.01) * 100) / 100)
        if (next <= 0) {
          track('undo_clear_expired', { course_count_bucket: courseCountBucket(undoSnapshot?.length ?? 0) })
          setUndoExiting(true)
          setTimeout(() => {
            setUndoBarVisible(false)
            setUndoSnapshot(null)
            setUndoCountdown(5)
            setUndoExiting(false)
          }, 400)
        }
        return next
      })
    }, 10)
    return () => clearInterval(interval)
  }, [undoBarVisible, undoExiting, undoSnapshot])

  const clearAllCourses = useCallback((currentCourses: Course[]) => {
    track('clear_all_confirm', { course_count_bucket: courseCountBucket(currentCourses.length) })
    setUndoSnapshot(currentCourses)
    setCourses([])
    setUndoCountdown(5)
    setUndoExiting(false)
    setUndoBarVisible(true)
  }, [])

  const handleUndoClear = useCallback(() => {
    if (undoSnapshot) {
      track('undo_clear', { course_count_bucket: courseCountBucket(undoSnapshot.length) })
      setCourses(undoSnapshot)
      setUndoSnapshot(null)
      setUndoBarVisible(false)
    }
  }, [undoSnapshot])

  const addCourse = useCallback((course: Course) => {
    const courseName = course.name.trim() || t('course.autoName', { n: courses.length + 1 })
    const added = {
      ...course,
      name: courseName,
      id: Date.now().toString(),
      isImported: false,
    }
    track('course_add', {
      source: 'manual_form',
      credit_hours: added.hours,
      has_grade: added.grade !== null,
      level: added.level ?? 'none',
      term: added.term ?? 'none',
    })
    setCourses(prev => [...prev, added])
  }, [courses.length, t])

  const updateCourseGrade = useCallback((courseId: string, grade: Grade) => {
    setCourses(prev => prev.map(course =>
      course.id === courseId ? { ...course, grade } : course
    ))
  }, [])

  const updateCreditHours = useCallback((courseId: string, hours: number) => {
    const normalized = normalizeCreditHours(hours)
    setCourses(prev => prev.map(course =>
      course.id === courseId ? { ...course, hours: normalized } : course
    ))
    setSaveNotification({
      show: true,
      message: t('notify.creditsUpdated')
    })
    setTimeout(() => {
      setSaveNotification(prev => ({...prev, show: false}))
    }, 1500)
  }, [t])

  const removeCourse = useCallback((id: string) => {
    setCourses(prev => {
      const removed = prev.find((c) => c.id === id)
      if (removed) {
        track('course_remove', {
          credit_hours_bucket: String(removed.hours),
          had_grade: removed.grade !== null,
        })
      }
      return prev.filter(course => course.id !== id)
    })
  }, [])

  const importCourses = useCallback((importedCourses: Course[]) => {
    const replacedExisting = courses.length > 0
    trackImportSuccess(importedCourses, { replacedExisting, locale })
    const coursesWithIds = importedCourses.map((course) => ({
      ...course,
      id: Date.now().toString() + Math.random().toString()
    }))
    setCourses(coursesWithIds)
    setShowImportModal(false)
  }, [courses.length, locale])

  useEffect(() => {
    if (typeof window === 'undefined' || !hasLoadedFromStorage) return
    try {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses))
      track('storage_persist_success', { course_count_bucket: courseCountBucket(courses.length) })
      if (courses.length > 0) {
        const timeoutId = setTimeout(() => {
          setSaveNotification(prev => ({...prev, show: false}))
        }, 1500)
        return () => clearTimeout(timeoutId)
      }
    } catch (error) {
      console.error('Failed to save courses to localStorage:', error)
      const errorType = error instanceof DOMException && error.name === 'QuotaExceededError'
        ? 'quota_exceeded'
        : 'unknown'
      track('storage_persist_failed', { error_type: errorType })
      setTimeout(() => {
        setSaveNotification({
          show: true,
          message: t('notify.saveFailed')
        })
        track('notification_shown', { type: 'save_failed' })
        setTimeout(() => {
          setSaveNotification(prev => ({...prev, show: false}))
        }, 1500)
      }, 0)
    }
  }, [courses, t, hasLoadedFromStorage])

  useEffect(() => {
    if (saveNotification.show && saveNotification.message === t('notify.creditsUpdated')) {
      track('notification_shown', { type: 'credits_updated' })
    }
  }, [saveNotification.show, saveNotification.message, t])

  const openImportModal = useCallback((entryPoint: 'course_form' | 'other') => {
    setImportEntryPoint(entryPoint)
    setShowImportModal(true)
  }, [])

  const openHowToModal = useCallback((entryPoint: 'fab' | 'import_modal') => {
    setHowToEntryPoint(entryPoint)
    setShowHowToModal(true)
  }, [])

  const isError = saveNotification.message === t('notify.saveFailed')

  return (
    <>
      <AmbientBackdrop />
      <ThreeJSBackground />
      <div className="app-root">
      <DocumentTitleMeta />
      <HowToButton onClick={() => openHowToModal('fab')} />
      <LanguageSwitcher />
      <Container className="container">
        {saveNotification.show && !undoBarVisible && (
          <div className={`save-notification ${isError ? 'error' : 'success'}`}>
            {saveNotification.message}
          </div>
        )}
        {undoBarVisible && (
          <div className={`undo-bar ${undoExiting ? 'undo-bar-exit' : ''}`} role="status" aria-live="polite">
            <div className="undo-bar-progress-wrap">
              <svg className="undo-bar-circle" viewBox="0 0 36 36">
                <path
                  className="undo-bar-circle-bg"
                  d="M18 2.5 a 15.5 15.5 0 0 1 0 31 a 15.5 15.5 0 0 1 0 -31"
                />
                <path
                  className="undo-bar-circle-fill"
                  strokeDasharray="97.4"
                  strokeDashoffset={97.4 * (1 - undoCountdown / 5)}
                  d="M18 2.5 a 15.5 15.5 0 0 1 0 31 a 15.5 15.5 0 0 1 0 -31"
                />
              </svg>
              <span className="undo-bar-countdown">
                <WesternDigits>{undoCountdown > 0 ? Math.ceil(undoCountdown) : 0}</WesternDigits>
              </span>
            </div>
            <button type="button" className="undo-bar-btn" onClick={handleUndoClear}>
              {t('common.undo')}
            </button>
          </div>
        )}
        <div className="app-header-section">
          <div className="app-header">
            <div className="app-header-titles">
              <h1 className="app-title">{t('app.title')}</h1>
              <h5 className="app-subtitle">{t('app.subtitle')}</h5>
            </div>
          </div>
          <FCAIStatusIndicator />
          <CourseForm
            onAddCourse={addCourse}
            onShowImport={() => openImportModal('course_form')}
            hasCourses={courses.length > 0}
          />
        </div>

        <div className="app-course-workspace">
          <GPAStickySummary courses={courses} />
          <GroupedCourseTable
            courses={courses}
            onRemoveCourse={removeCourse}
            onUpdateGrade={updateCourseGrade}
            onUpdateCreditHours={updateCreditHours}
            onClearCourses={(clearedCourses) => clearAllCourses(clearedCourses)}
          />
        </div>

        <ImportModal
          show={showImportModal}
          entryPoint={importEntryPoint}
          onHide={() => setShowImportModal(false)}
          onImport={importCourses}
          currentCourses={courses}
          onOpenHowTo={() => openHowToModal('import_modal')}
        />
        <HowToModal
          show={showHowToModal}
          entryPoint={howToEntryPoint}
          onHide={() => setShowHowToModal(false)}
          stacked={showImportModal}
        />
      </Container>

      <Footer />
    </div>
    </>
  )
}

export default function Home() {
  return (
    <LocaleProvider>
      <HomeContent />
    </LocaleProvider>
  )
}
