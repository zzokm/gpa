'use client'

import { useState, useCallback, useEffect } from 'react'
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
import ThreeJSBackground from '../src/components/ThreeJSBackground'
import Footer from '../src/components/Footer'
import { DocumentTitleMeta } from '../src/components/DocumentTitleMeta'
import { Course, Grade } from '../src/types/Course'
import { migrateStorageIfNeeded, STORAGE_KEYS } from '../src/utils/storage-keys'
import { normalizeCreditHours } from '../src/utils/creditHours'

migrateStorageIfNeeded()

function loadCoursesFromStorage(): Course[] {
  if (typeof window === 'undefined') return []
  try {
    const storedCourses = localStorage.getItem(STORAGE_KEYS.COURSES)
    return storedCourses ? JSON.parse(storedCourses) : []
  } catch (error) {
    console.error('Failed to load courses from localStorage:', error)
    return []
  }
}

function HomeContent() {
  const { t } = useLocale()
  const [courses, setCourses] = useState<Course[]>([])
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [showHowToModal, setShowHowToModal] = useState(false)
  const [saveNotification, setSaveNotification] = useState<{show: boolean, message: string}>({
    show: false,
    message: ''
  })
  const [undoBarVisible, setUndoBarVisible] = useState(false)
  const [undoSnapshot, setUndoSnapshot] = useState<Course[] | null>(null)
  const [undoCountdown, setUndoCountdown] = useState(5)
  const [undoExiting, setUndoExiting] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    setCourses(loadCoursesFromStorage())
    setHasLoadedFromStorage(true)
  }, [])

  useEffect(() => {
    if (!undoBarVisible || undoExiting) return
    const interval = setInterval(() => {
      setUndoCountdown(prev => {
        const next = Math.max(0, Math.round((prev - 0.01) * 100) / 100)
        if (next <= 0) {
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
  }, [undoBarVisible, undoExiting])

  const clearAllCourses = useCallback((currentCourses: Course[]) => {
    setUndoSnapshot(currentCourses)
    setCourses([])
    setUndoCountdown(5)
    setUndoExiting(false)
    setUndoBarVisible(true)
  }, [])

  const handleUndoClear = useCallback(() => {
    if (undoSnapshot) {
      setCourses(undoSnapshot)
      setUndoSnapshot(null)
      setUndoBarVisible(false)
    }
  }, [undoSnapshot])

  const addCourse = useCallback((course: Course) => {
    const courseName = course.name.trim() || t('course.autoName', { n: courses.length + 1 })
    setCourses(prev => [...prev, {
      ...course,
      name: courseName,
      id: Date.now().toString(),
      isImported: false
    }])
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
    setCourses(prev => prev.filter(course => course.id !== id))
  }, [])

  const importCourses = useCallback((importedCourses: Course[]) => {
    const coursesWithIds = importedCourses.map((course) => ({
      ...course,
      id: Date.now().toString() + Math.random().toString()
    }))
    setCourses(coursesWithIds)
    setShowImportModal(false)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || !hasLoadedFromStorage) return
    try {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses))
      if (courses.length > 0) {
        const timeoutId = setTimeout(() => {
          setSaveNotification(prev => ({...prev, show: false}))
        }, 1500)
        return () => clearTimeout(timeoutId)
      }
    } catch (error) {
      console.error('Failed to save courses to localStorage:', error)
      setTimeout(() => {
        setSaveNotification({
          show: true,
          message: t('notify.saveFailed')
        })
        setTimeout(() => {
          setSaveNotification(prev => ({...prev, show: false}))
        }, 1500)
      }, 0)
    }
  }, [courses, t, hasLoadedFromStorage])

  const isError = saveNotification.message === t('notify.saveFailed')

  return (
    <>
      <style jsx global>{`/* Main Container */
.container {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  padding: var(--space-xl) var(--space-lg);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xl);
}

/* Typography */
.app-title {
  font-size: clamp(var(--text-2xl), 4vw, var(--text-4xl));
  font-weight: 700;
  color: var(--primary-600);
  text-align: center;
  margin: 0;
  letter-spacing: -0.025em;
  line-height: 1.15;
  padding-bottom: 0;
  text-wrap: balance;
}

.app-subtitle {
  font-size: var(--text-lg);
  font-weight: 500;
  color: var(--text-secondary);
  text-align: center;
  margin: var(--space-sm) 0 0 0;
  letter-spacing: 0.025em;
  /* Enhanced visibility 
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);*/
}

.app-header-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
  margin-bottom: 0;
}

.app-header-titles {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.app-header .app-title {
  text-align: center;
}

.app-header .app-subtitle {
  text-align: center;
  margin-top: var(--space-xs);
}

[dir="rtl"] .app-title,
html[lang="ar"] .app-title {
  padding-bottom: 6px;
}

/* Header floating buttons – see HeaderFloatBtn.css (imported by HowToButton / LanguageSwitcher) */

/* Save notification â€“ base and responsive */
.save-notification {
  position: fixed;
  top: var(--space-lg);
  left: 50%;
  transform: translateX(-50%);
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  font-weight: 600;
  z-index: var(--z-toast);
  max-width: min(90vw, 400px);
  box-shadow: var(--shadow-md);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.save-notification.success {
  background: rgba(34, 197, 94, 0.95);
  color: var(--white);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.save-notification.error {
  background: rgba(239, 68, 68, 0.95);
  color: var(--white);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

/* Undo bar – centered; equal spacing so circle/button align with left/right edge radius */
.undo-bar {
  position: fixed;
  top: var(--space-lg);
  left: 50%;
  transform: translateX(-50%);
  z-index: var(--z-toast);
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-sm);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-md);
  animation: undoBarEnter 0.4s var(--ease-out) forwards;
}

[dir="rtl"] .undo-bar {
  left: 50%;
  right: auto;
  transform: translateX(-50%);
}

.undo-bar-exit {
  animation: undoBarExit 0.4s var(--ease-in) forwards;
  pointer-events: none;
}

@keyframes undoBarEnter {
  from {
    transform: translate(-50%, -100%);
  }
  to {
    transform: translate(-50%, 0);
  }
}

[dir="rtl"] .undo-bar-exit {
  animation: undoBarExitRtl 0.4s var(--ease-in) forwards;
}

@keyframes undoBarExit {
  from {
    transform: translate(-50%, 0);
  }
  to {
    transform: translate(-50%, -100%);
  }
}

@keyframes undoBarExitRtl {
  from {
    transform: translate(-50%, 0);
  }
  to {
    transform: translate(-50%, -100%);
  }
}

.undo-bar-progress-wrap {
  position: relative;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.undo-bar-circle {
  width: 40px;
  height: 40px;
  transform: rotate(-90deg);
}

.undo-bar-circle-bg {
  fill: none;
  stroke: var(--gray-200);
  stroke-width: 4;
}

.undo-bar-circle-fill {
  fill: none;
  stroke: var(--primary-color);
  stroke-width: 4;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.01s linear;
}

.undo-bar-countdown {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--text-color);
  font-variant-numeric: tabular-nums;
}

.undo-bar-btn {
  height: 40px;
  padding: 0 var(--space-lg);
  background: var(--primary-color);
  color: var(--white);
  border: none;
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-base);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.undo-bar-btn:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

@media (max-width: 480px) {
  .save-notification {
    top: var(--space-md);
    padding: var(--space-sm) var(--space-md);
    font-size: var(--text-sm);
    max-width: calc(100vw - 2 * var(--space-md));
  }
}

.app-course-workspace {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: var(--space-lg) var(--space-md);
    gap: var(--space-lg);
  }
  
  .app-title {
    font-size: var(--text-2xl);
  }
  
  .app-subtitle {
    font-size: var(--text-base);
  }
}

@media (max-width: 480px) {
  .container {
    padding: var(--space-md);
  }`}</style>

      <DocumentTitleMeta />
      <ThreeJSBackground />
      <HowToButton onClick={() => setShowHowToModal(true)} />
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
              <span className="undo-bar-countdown">{undoCountdown > 0 ? Math.ceil(undoCountdown) : 0}</span>
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
            onShowImport={() => setShowImportModal(true)}
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
          onHide={() => setShowImportModal(false)}
          onImport={importCourses}
          currentCourses={courses}
          onOpenHowTo={() => setShowHowToModal(true)}
        />
        <HowToModal show={showHowToModal} onHide={() => setShowHowToModal(false)} />
      </Container>

      <Footer />
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
