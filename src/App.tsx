import React, { useState, useCallback, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import CourseForm from './components/CourseForm';
import CourseTable from './components/CourseTable';
import GPADisplay from './components/GPADisplay';
import ImportModal from './components/ImportModal';
import ThreeJSBackground from './components/ThreeJSBackground';
import { Course, Grade } from './types/Course';
import { calculateGPA } from './utils/gradeUtils';

// Local Storage key for saving courses
const STORAGE_KEY = 'gpa-calculator-courses';

// Helper function to load courses from localStorage
const loadCoursesFromStorage = (): Course[] => {
  try {
    const storedCourses = localStorage.getItem(STORAGE_KEY);
    return storedCourses ? JSON.parse(storedCourses) : [];
  } catch (error) {
    console.error('Failed to load courses from localStorage:', error);
    return [];
  }
};

const App: React.FC = () => {
  // Initialize courses from localStorage
  const [courses, setCourses] = useState<Course[]>(loadCoursesFromStorage);
  const [showImportModal, setShowImportModal] = useState(false);
  const [saveNotification, setSaveNotification] = useState<{show: boolean, message: string}>({
    show: false,
    message: ''
  });

  const addCourse = useCallback((course: Course) => {
    // Auto-generate course name if not provided
    const courseName = course.name.trim() || `Course ${courses.length + 1}`;
    setCourses(prev => [...prev, { 
      ...course, 
      name: courseName,
      id: Date.now().toString() 
    }]);
  }, [courses.length]);
  const removeCourse = useCallback((id: string) => {
    setCourses(prev => prev.filter(course => course.id !== id));
  }, []);

  const updateCourseGrade = useCallback((id: string, newGrade: Grade) => {
    setCourses(prev => prev.map(course => 
      course.id === id ? { ...course, grade: newGrade } : course
    ));
  }, []);

  const importCourses = useCallback((importedCourses: Course[]) => {
    const coursesWithIds = importedCourses.map((course, index) => ({
      ...course,
      name: course.name.trim() || `Course ${courses.length + index + 1}`,
      id: Date.now().toString() + Math.random().toString()
    }));
    setCourses(prev => [...prev, ...coursesWithIds]);
    setShowImportModal(false);
  }, [courses.length]);
  // Save courses to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
      
      // Show save notification
      if (courses.length > 0) {
        //setSaveNotification({
        //show: true,
        //  message: 'Changes saved!'
        //});
        
        // Hide notification after a delay
        const timeoutId = setTimeout(() => {
          setSaveNotification(prev => ({...prev, show: false}));
        }, 1500);
        
        return () => clearTimeout(timeoutId);
      }
    } catch (error) {
      console.error('Failed to save courses to localStorage:', error);
      
      // Show error notification
      setSaveNotification({
        show: true,
        message: 'Failed to save changes'
      });
      
      // Hide notification after a delay
      const timeoutId = setTimeout(() => {
        setSaveNotification(prev => ({...prev, show: false}));
      }, 1500);
      
      return () => clearTimeout(timeoutId);
    }
  }, [courses]);

  const gpa = calculateGPA(courses);
  return (
    <>      <Container className="container">
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
        />        <CourseTable
          courses={courses}
          onRemoveCourse={removeCourse}
          onUpdateGrade={updateCourseGrade}
        />

        <GPADisplay gpa={gpa} />

        <ImportModal
          show={showImportModal}
          onHide={() => setShowImportModal(false)}
          onImport={importCourses}
        />
      </Container>

      <ThreeJSBackground />
    </>
  );
};

export default App;
