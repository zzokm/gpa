'use client'

import { useState, useCallback, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import CourseForm from '../src/components/CourseForm'
import GroupedCourseTable from '../src/components/GroupedCourseTable'
import GPADisplay from '../src/components/GPADisplay'
import ImportModal from '../src/components/ImportModal'
import ThreeJSBackground from '../src/components/ThreeJSBackground'
import Footer from '../src/components/Footer'
import { Course, Grade } from '../src/types/Course'
import { calculateGPA } from '../src/utils/gradeUtils'

// Local Storage key for saving courses
const STORAGE_KEY = 'gpa-calculator-courses'

// Helper function to load courses from localStorage
const loadCoursesFromStorage = (): Course[] => {
  if (typeof window === 'undefined') return []
  try {
    const storedCourses = localStorage.getItem(STORAGE_KEY)
    return storedCourses ? JSON.parse(storedCourses) : []
  } catch (error) {
    console.error('Failed to load courses from localStorage:', error)
    return []
  }
}

export default function Home() {
  // Start empty so server and client match (avoids hydration mismatch). Load from localStorage after mount.
  const [courses, setCourses] = useState<Course[]>([])
  const [showImportModal, setShowImportModal] = useState(false)
  const [saveNotification, setSaveNotification] = useState<{show: boolean, message: string}>({
    show: false,
    message: ''
  })

  useEffect(() => {
    setCourses(loadCoursesFromStorage())
  }, [])

  // #region agent log
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
  }, []);
  // #endregion
  
  // Clear all courses and remove from local storage
  const clearAllCourses = useCallback(() => {
    setCourses([])
    setSaveNotification({
      show: true,
      message: 'All courses cleared!'
    })
    
    // Hide notification after a delay
    setTimeout(() => {
      setSaveNotification(prev => ({...prev, show: false}))
    }, 1500)
  }, [])

  const addCourse = useCallback((course: Course) => {
    // Auto-generate course name if not provided
    const courseName = course.name.trim() || `Course ${courses.length + 1}`
    setCourses(prev => [...prev, { 
      ...course, 
      name: courseName,
      id: Date.now().toString(),
      isImported: false // Mark as manually added
    }])
  }, [courses.length])
  
  // Update course grade
  const updateCourseGrade = useCallback((courseId: string, grade: Grade) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { ...course, grade } 
        : course
    ))
  }, [])
  
  // New function to update credit hours
  const updateCreditHours = useCallback((courseId: string, hours: number) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { ...course, hours } 
        : course
    ))
    
    // Show brief notification
    setSaveNotification({
      show: true,
      message: 'Credit hours updated!'
    })
    
    // Hide notification after a delay
    setTimeout(() => {
      setSaveNotification(prev => ({...prev, show: false}))
    }, 1500)
  }, [])

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

  // Save courses to localStorage whenever they change
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(courses))
      
      // Show save notification
      if (courses.length > 0) {
        // Hide notification after a delay
        const timeoutId = setTimeout(() => {
          setSaveNotification(prev => ({...prev, show: false}))
        }, 1500)
        
        return () => clearTimeout(timeoutId)
      }
    } catch (error) {
      console.error('Failed to save courses to localStorage:', error)
      
      // Show error notification using setTimeout to avoid setState in effect
      setTimeout(() => {
        setSaveNotification({
          show: true,
          message: 'Failed to save changes'
        })
        
        // Hide notification after a delay
        setTimeout(() => {
          setSaveNotification(prev => ({...prev, show: false}))
        }, 1500)
      }, 0)
    }
  }, [courses])

  const gpa = calculateGPA(courses)
  return (
    <>
      <Container className="container">
        {saveNotification.show && (
          <div className={`save-notification ${saveNotification.message.includes('Failed') ? 'error' : 'success'}`}>
            {saveNotification.message}
          </div>
        )}
        <div>
          <h1 className="app-title">GPA Calculator</h1>
          <h5 className="app-subtitle">FCAI - Cairo University</h5>
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
        {/* The ImportModal is now using a portal, so it will render at body level */}
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
