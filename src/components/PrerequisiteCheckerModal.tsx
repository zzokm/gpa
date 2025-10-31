import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Course } from '../types/Course';
import courseData from '../../data/Courses.json';
import './PrerequisiteCheckerModalStyles.css';

interface PrerequisiteCheckerModalProps {
  show: boolean;
  onHide: () => void;
  completedCourses: Course[];
}

interface CourseInfo {
  code: string;
  name: string;
  credit_hours: number;
  category: string;
  prerequisites: string[];
}

interface CheckResult {
  course: CourseInfo;
  canRegister: boolean;
  missingPrerequisites: string[];
  completedPrerequisites: string[];
}

// Extract all courses with prerequisites from the course data
const getAllCoursesWithInfo = (): CourseInfo[] => {
  const courses: CourseInfo[] = [];
  const uniqueCourseSet = new Set<string>();
  
  const addCourse = (course: any, category: string) => {
    try {
      if (course && course.code && course.name) {
        const courseId = `${course.code}_${course.name}`;
        if (!uniqueCourseSet.has(courseId)) {
          uniqueCourseSet.add(courseId);
          courses.push({
            code: course.code,
            name: course.name,
            credit_hours: course.credit_hours || 0,
            category,
            prerequisites: course.prerequisites || []
          });
        }
      }
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };
  
  const processCoursesArray = (coursesArray: any[], category: string) => {
    try {
      if (!Array.isArray(coursesArray)) return;
      coursesArray.forEach(course => addCourse(course, category));
    } catch (error) {
      console.error('Error processing courses array:', error);
    }
  };
  
  try {
    // Process all course categories (same as Course Lookup)
    if (courseData.program_requirements?.general_requirements) {
      const generalReq = courseData.program_requirements.general_requirements;
      if (generalReq.mandatory?.courses) {
        processCoursesArray(generalReq.mandatory.courses, 'General - Mandatory');
      }
      if (generalReq.elective?.courses) {
        processCoursesArray(generalReq.elective.courses, 'General - Elective');
      }
    }
    
    if (courseData.program_requirements?.university_requirements_no_credit?.courses) {
      processCoursesArray(courseData.program_requirements.university_requirements_no_credit.courses, 'University Requirements');
    }
    
    if (courseData.program_requirements?.college_requirements) {
      const collegeReq = courseData.program_requirements.college_requirements;
      if (collegeReq.mathematics_and_basic_sciences?.courses) {
        processCoursesArray(collegeReq.mathematics_and_basic_sciences.courses, 'Mathematics & Basic Sciences');
      }
      if (collegeReq.basic_computer_science?.courses) {
        processCoursesArray(collegeReq.basic_computer_science.courses, 'Basic Computer Science');
      }
    }
    
    if (courseData.majors) {
      Object.keys(courseData.majors).forEach(majorKey => {
        try {
          const major = courseData.majors[majorKey as keyof typeof courseData.majors];
          const majorName = majorKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          
          if (major && major.major_requirements) {
            const majorReq = major.major_requirements;
            
            if (majorReq.applied_sciences_mandatory?.courses) {
              processCoursesArray(majorReq.applied_sciences_mandatory.courses, `${majorName} - Mandatory`);
            }
            if (majorReq.electives?.courses) {
              processCoursesArray(majorReq.electives.courses, `${majorName} - Elective`);
            }
            if (majorReq.graduation_project?.courses) {
              processCoursesArray(majorReq.graduation_project.courses, `${majorName} - Graduation Project`);
            }
            if (majorReq.field_training?.courses) {
              processCoursesArray(majorReq.field_training.courses, `${majorName} - Field Training`);
            }
          }
        } catch (error) {
          console.error(`Error processing major ${majorKey}:`, error);
        }
      });
    }
  } catch (error) {
    console.error('Error loading course data:', error);
  }
  
  return courses;
};

const PrerequisiteCheckerModal: React.FC<PrerequisiteCheckerModalProps> = ({ 
  show, 
  onHide, 
  completedCourses 
}) => {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allCourses, setAllCourses] = useState<CourseInfo[]>([]);
  const [checkResults, setCheckResults] = useState<CheckResult[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'eligible' | 'not-eligible'>('all');
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const [showScrollArrow, setShowScrollArrow] = useState(false);
  
  // Initialize courses
  useEffect(() => {
    const courses = getAllCoursesWithInfo();
    setAllCourses(courses);
  }, []);
  
  // Handle modal mounting
  useEffect(() => {
    if (show) {
      document.body.classList.add('modal-open');
      setTimeout(() => setMounted(true), 10);
    } else {
      document.body.classList.remove('modal-open');
      setMounted(false);
      setSearchQuery('');
      setFilterType('all');
    }
    
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [show]);
  
  // Check prerequisites whenever courses or completed courses change
  useEffect(() => {
    if (!show) return;
    
    // Get completed course codes (using course names since that's what we have)
    const completedCourseNames = new Set(
      completedCourses
        .filter(c => c.grade !== null && c.grade !== 'F')
        .map(c => c.name.toLowerCase())
    );
    
    // Check each course
    const results: CheckResult[] = allCourses
      .filter(course => {
        // Don't show courses already completed
        return !completedCourseNames.has(course.name.toLowerCase());
      })
      .map(course => {
        if (course.prerequisites.length === 0) {
          return {
            course,
            canRegister: true,
            missingPrerequisites: [],
            completedPrerequisites: []
          };
        }
        
        const missing: string[] = [];
        const completed: string[] = [];
        
        course.prerequisites.forEach(prereq => {
          // Try to find the prerequisite in our course list
          const prereqCourse = allCourses.find(
            c => c.code.toLowerCase() === prereq.toLowerCase()
          );
          
          if (prereqCourse) {
            if (completedCourseNames.has(prereqCourse.name.toLowerCase())) {
              completed.push(prereq);
            } else {
              missing.push(prereq);
            }
          } else {
            // Prerequisite course not found in catalog, assume it's missing
            missing.push(prereq);
          }
        });
        
        return {
          course,
          canRegister: missing.length === 0,
          missingPrerequisites: missing,
          completedPrerequisites: completed
        };
      });
    
    setCheckResults(results);
  }, [show, allCourses, completedCourses]);
  
  // Filter results based on search and filter type
  const filteredResults = checkResults.filter(result => {
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      if (!result.course.code.toLowerCase().includes(query) &&
          !result.course.name.toLowerCase().includes(query)) {
        return false;
      }
    }
    
    // Apply eligibility filter
    if (filterType === 'eligible' && !result.canRegister) return false;
    if (filterType === 'not-eligible' && result.canRegister) return false;
    
    return true;
  });
  
  // Handle scroll arrow visibility
  useEffect(() => {
    const modalBody = modalBodyRef.current;
    if (!modalBody) return;

    const checkScroll = () => {
      const isScrollable = modalBody.scrollHeight > modalBody.clientHeight;
      const isAtBottom = modalBody.scrollHeight - modalBody.scrollTop <= modalBody.clientHeight + 5;
      setShowScrollArrow(isScrollable && !isAtBottom);
    };

    checkScroll();
    modalBody.addEventListener('scroll', checkScroll);
    
    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(modalBody);

    return () => {
      modalBody.removeEventListener('scroll', checkScroll);
      resizeObserver.unobserve(modalBody);
    };
  }, [show, mounted, filteredResults]);
  
  const scrollToBottom = () => {
    modalBodyRef.current?.scrollTo({
      top: modalBodyRef.current.scrollHeight,
      behavior: 'smooth'
    });
  };
  
  if (!show) return null;
  
  const eligibleCount = checkResults.filter(r => r.canRegister).length;
  const notEligibleCount = checkResults.filter(r => !r.canRegister).length;
  
  return ReactDOM.createPortal(
    <div className={`prereq-modal-overlay ${mounted ? 'prereq-modal-visible' : ''}`} onClick={onHide}>
      <div className="prereq-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="prereq-modal-header">
          <h2 className="prereq-modal-title">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
            </svg>
            Registration Eligibility Checker
          </h2>
          <button className="prereq-modal-close" onClick={onHide} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M14.7 1.3c-.4-.4-1-.4-1.4 0L8 6.6 2.7 1.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4L6.6 8l-5.3 5.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L8 9.4l5.3 5.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L9.4 8l5.3-5.3c.4-.4.4-1 0-1.4z"/>
            </svg>
          </button>
        </div>
        
        <div className="prereq-stats">
          <div className="prereq-stat-box prereq-eligible">
            <div className="prereq-stat-value">{eligibleCount}</div>
            <div className="prereq-stat-label">Eligible</div>
          </div>
          <div className="prereq-stat-box prereq-not-eligible">
            <div className="prereq-stat-value">{notEligibleCount}</div>
            <div className="prereq-stat-label">Not Eligible</div>
          </div>
          <div className="prereq-stat-box prereq-completed">
            <div className="prereq-stat-value">{completedCourses.filter(c => c.grade !== null && c.grade !== 'F').length}</div>
            <div className="prereq-stat-label">Completed</div>
          </div>
        </div>
        
        <div className="prereq-filters">
          <div className="prereq-search">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="prereq-search-input"
            />
          </div>
          
          <div className="prereq-filter-buttons">
            <button 
              className={`prereq-filter-btn ${filterType === 'all' ? 'active' : ''}`}
              onClick={() => setFilterType('all')}
            >
              All
            </button>
            <button 
              className={`prereq-filter-btn ${filterType === 'eligible' ? 'active' : ''}`}
              onClick={() => setFilterType('eligible')}
            >
              Eligible
            </button>
            <button 
              className={`prereq-filter-btn ${filterType === 'not-eligible' ? 'active' : ''}`}
              onClick={() => setFilterType('not-eligible')}
            >
              Not Eligible
            </button>
          </div>
        </div>
        
        <div className="prereq-results-count">
          Showing {filteredResults.length} course{filteredResults.length !== 1 ? 's' : ''}
        </div>
        
        <div className="prereq-modal-body" ref={modalBodyRef}>
          {filteredResults.length === 0 ? (
            <div className="prereq-no-results">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              <p>No courses found matching your criteria.</p>
            </div>
          ) : (
            <div className="prereq-course-list">
              {filteredResults.map((result, index) => (
                <div 
                  key={`${result.course.code}-${index}`} 
                  className={`prereq-course-card ${result.canRegister ? 'eligible' : 'not-eligible'}`}
                >
                  <div className="prereq-course-header">
                    <div className="prereq-course-code-section">
                      <span className="prereq-course-code">{result.course.code}</span>
                      <span className="prereq-course-credits">{result.course.credit_hours}h</span>
                    </div>
                    <span className={`prereq-status-badge ${result.canRegister ? 'eligible' : 'not-eligible'}`}>
                      {result.canRegister ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                          </svg>
                          Eligible
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                          </svg>
                          Not Eligible
                        </>
                      )}
                    </span>
                  </div>
                  
                  <div className="prereq-course-name">{result.course.name}</div>
                  
                  {result.course.prerequisites.length > 0 && (
                    <div className="prereq-requirements">
                      <div className="prereq-requirements-title">Prerequisites:</div>
                      
                      {result.completedPrerequisites.length > 0 && (
                        <div className="prereq-list completed">
                          {result.completedPrerequisites.map((prereq, idx) => (
                            <span key={idx} className="prereq-tag completed">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                              </svg>
                              {prereq}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {result.missingPrerequisites.length > 0 && (
                        <div className="prereq-list missing">
                          {result.missingPrerequisites.map((prereq, idx) => (
                            <span key={idx} className="prereq-tag missing">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                              </svg>
                              {prereq}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {showScrollArrow && (
          <div className="prereq-scroll-arrow" onClick={scrollToBottom}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
            </svg>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default PrerequisiteCheckerModal;
