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
  // Initialize courses from localStorage
  const [courses, setCourses] = useState<Course[]>([])
  const [showImportModal, setShowImportModal] = useState(false)
  const [saveNotification, setSaveNotification] = useState<{show: boolean, message: string}>({
    show: false,
    message: ''
  })

  // Load courses on mount
  useEffect(() => {
    setCourses(loadCoursesFromStorage())
  }, [])
  
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
      
      // Show error notification
      setSaveNotification({
        show: true,
        message: 'Failed to save changes'
      })
      
      // Hide notification after a delay
      const timeoutId = setTimeout(() => {
        setSaveNotification(prev => ({...prev, show: false}))
      }, 1500)
      
      return () => clearTimeout(timeoutId)
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
