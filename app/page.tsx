'use client'

import { useState, useCallback, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext'
import LanguageSwitcher from '../src/components/LanguageSwitcher'
import CourseForm from '../src/components/CourseForm'
import GroupedCourseTable from '../src/components/GroupedCourseTable'
import GPADisplay from '../src/components/GPADisplay'
import ImportModal from '../src/components/ImportModal'
import ThreeJSBackground from '../src/components/ThreeJSBackground'
import Footer from '../src/components/Footer'
import { DocumentTitleMeta } from '../src/components/DocumentTitleMeta'
import { Course, Grade } from '../src/types/Course'
import { calculateGPA } from '../src/utils/gradeUtils'

const STORAGE_KEY = 'gpa-calculator-courses'

function loadCoursesFromStorage(): Course[] {
  if (typeof window === 'undefined') return []
  try {
    const storedCourses = localStorage.getItem(STORAGE_KEY)
    return storedCourses ? JSON.parse(storedCourses) : []
  } catch (error) {
    console.error('Failed to load courses from localStorage:', error)
    return []
  }
}

function HomeContent() {
  const { t } = useLocale()
  const [courses, setCourses] = useState<Course[]>(loadCoursesFromStorage)
  const [showImportModal, setShowImportModal] = useState(false)
  const [saveNotification, setSaveNotification] = useState<{show: boolean, message: string}>({
    show: false,
    message: ''
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetch('http://127.0.0.1:7244/ingest/065dc0e5-590e-4b67-a73f-1f0d5aa899f9', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: 'app/page.tsx:useEffect',
          message: 'React component mounted and hydrated',
          data: {
            hasWindow: typeof window !== 'undefined',
            hasDocument: typeof document !== 'undefined',
            scriptTagsCount: document.querySelectorAll('script').length,
            nextScripts: Array.from(document.querySelectorAll('script[src*="_next"]')).map(s => s.getAttribute('src')),
            basePath: (window as any).__NEXT_DATA__?.assetPrefix || 'none',
          },
          timestamp: Date.now(),
          sessionId: 'debug-session',
          runId: 'hydration-check',
          hypothesisId: 'A'
        })
      }).catch(() => {});
    }
  }, [])

  const clearAllCourses = useCallback(() => {
    setCourses([])
    setSaveNotification({
      show: true,
      message: t('notify.cleared')
    })
    setTimeout(() => {
      setSaveNotification(prev => ({...prev, show: false}))
    }, 1500)
  }, [t])

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
    setCourses(prev => prev.map(course =>
      course.id === courseId ? { ...course, hours } : course
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
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(courses))
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
  }, [courses, t])

  const gpa = calculateGPA(courses)
  const isError = saveNotification.message === t('notify.saveFailed')

  return (
    <>
      <DocumentTitleMeta />
      <Container className="container">
        {saveNotification.show && (
          <div className={`save-notification ${isError ? 'error' : 'success'}`}>
            {saveNotification.message}
          </div>
        )}
        <div className="app-header">
          <div className="app-header-titles">
            <h1 className="app-title">{t('app.title')}</h1>
            <h5 className="app-subtitle">{t('app.subtitle')}</h5>
          </div>
          <LanguageSwitcher />
        </div>

        <CourseForm
          onAddCourse={addCourse}
          onShowImport={() => setShowImportModal(true)}
        />
        <GroupedCourseTable
          courses={courses}
          onRemoveCourse={removeCourse}
          onUpdateGrade={updateCourseGrade}
          onUpdateCreditHours={updateCreditHours}
          onClearCourses={clearAllCourses}
        />

        <GPADisplay gpa={gpa} />
        <ImportModal
          show={showImportModal}
          onHide={() => setShowImportModal(false)}
          onImport={importCourses}
          currentCourses={courses}
        />
      </Container>

      <ThreeJSBackground />
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
