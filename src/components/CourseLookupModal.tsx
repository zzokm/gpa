import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import courseData from '../../data/Courses.json';
import './CourseLookupModalStyles.css';

interface CourseLookupModalProps {
  show: boolean;
  onHide: () => void;
}

interface CourseInfo {
  code: string;
  name: string;
  credit_hours: number;
  category: string;
  prerequisites?: string[];
}

// Extract all courses from the course data
const getAllCoursesInfo = (): CourseInfo[] => {
  const courses: CourseInfo[] = [];
  const uniqueCourseSet = new Set<string>();
  
  const addCourse = (course: any, category: string) => {
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
  };
  
  const processCoursesArray = (coursesArray: any[], category: string) => {
    if (!Array.isArray(coursesArray)) return;
    coursesArray.forEach(course => addCourse(course, category));
  };
  
  // Process general requirements
  if (courseData.program_requirements?.general_requirements) {
    const generalReq = courseData.program_requirements.general_requirements;
    if (generalReq.mandatory?.courses) {
      processCoursesArray(generalReq.mandatory.courses, 'General - Mandatory');
    }
    if (generalReq.elective?.courses) {
      processCoursesArray(generalReq.elective.courses, 'General - Elective');
    }
  }
  
  // Process university requirements
  if (courseData.program_requirements?.university_requirements_no_credit?.courses) {
    processCoursesArray(courseData.program_requirements.university_requirements_no_credit.courses, 'University Requirements');
  }
  
  // Process college requirements
  if (courseData.program_requirements?.college_requirements) {
    const collegeReq = courseData.program_requirements.college_requirements;
    if (collegeReq.mathematics_and_basic_sciences?.courses) {
      processCoursesArray(collegeReq.mathematics_and_basic_sciences.courses, 'Mathematics & Basic Sciences');
    }
    if (collegeReq.basic_computer_science?.courses) {
      processCoursesArray(collegeReq.basic_computer_science.courses, 'Basic Computer Science');
    }
  }
  
  // Process all majors
  if (courseData.majors) {
    Object.keys(courseData.majors).forEach(majorKey => {
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
    });
  }
  
  return courses.sort((a, b) => a.code.localeCompare(b.code));
};

const CourseLookupModal: React.FC<CourseLookupModalProps> = ({ show, onHide }) => {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [allCourses, setAllCourses] = useState<CourseInfo[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseInfo[]>([]);
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const [showScrollArrow, setShowScrollArrow] = useState(false);
  
  // Initialize courses
  useEffect(() => {
    const courses = getAllCoursesInfo();
    setAllCourses(courses);
    setFilteredCourses(courses);
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
      setSelectedCategory('All');
    }
    
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [show]);
  
  // Filter courses based on search and category
  useEffect(() => {
    let filtered = allCourses;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(course => 
        course.code.toLowerCase().includes(query) ||
        course.name.toLowerCase().includes(query)
      );
    }
    
    setFilteredCourses(filtered);
  }, [searchQuery, selectedCategory, allCourses]);
  
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
  }, [show, mounted, filteredCourses]);
  
  const scrollToBottom = () => {
    modalBodyRef.current?.scrollTo({
      top: modalBodyRef.current.scrollHeight,
      behavior: 'smooth'
    });
  };
  
  // Get unique categories
  const categories = ['All', ...Array.from(new Set(allCourses.map(c => c.category)))];
  
  if (!show) return null;
  
  return ReactDOM.createPortal(
    <div className={`lookup-modal-overlay ${mounted ? 'lookup-modal-visible' : ''}`} onClick={onHide}>
      <div className="lookup-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="lookup-modal-header">
          <h2 className="lookup-modal-title">Course Catalog</h2>
          <button className="lookup-modal-close" onClick={onHide} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M14.7 1.3c-.4-.4-1-.4-1.4 0L8 6.6 2.7 1.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4L6.6 8l-5.3 5.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L8 9.4l5.3 5.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L9.4 8l5.3-5.3c.4-.4.4-1 0-1.4z"/>
            </svg>
          </button>
        </div>
        
        <div className="lookup-filters">
          <div className="lookup-search">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input
              type="text"
              placeholder="Search by course code or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="lookup-search-input"
            />
            {searchQuery && (
              <button 
                className="lookup-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M14.7 1.3c-.4-.4-1-.4-1.4 0L8 6.6 2.7 1.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4L6.6 8l-5.3 5.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L8 9.4l5.3 5.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L9.4 8l5.3-5.3c.4-.4.4-1 0-1.4z"/>
                </svg>
              </button>
            )}
          </div>
          
          <div className="lookup-category-filter">
            <label htmlFor="category-select" className="lookup-category-label">Category:</label>
            <select 
              id="category-select"
              className="lookup-category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="lookup-results-count">
          Found {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
        </div>
        
        <div className="lookup-modal-body" ref={modalBodyRef}>
          {filteredCourses.length === 0 ? (
            <div className="lookup-no-results">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              <p>No courses found matching your search.</p>
            </div>
          ) : (
            <div className="lookup-course-list">
              {filteredCourses.map((course, index) => (
                <div key={`${course.code}-${index}`} className="lookup-course-card">
                  <div className="lookup-course-header">
                    <span className="lookup-course-code">{course.code}</span>
                    <span className="lookup-course-credits">{course.credit_hours}h</span>
                  </div>
                  <div className="lookup-course-name">{course.name}</div>
                  <div className="lookup-course-category">{course.category}</div>
                  {course.prerequisites && course.prerequisites.length > 0 && (
                    <div className="lookup-course-prerequisites">
                      <strong>Prerequisites:</strong> {course.prerequisites.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {showScrollArrow && (
          <div className="lookup-scroll-arrow" onClick={scrollToBottom}>
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

export default CourseLookupModal;
