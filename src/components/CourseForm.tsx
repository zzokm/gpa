import React, { useState, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { Course, Grade } from '../types/Course';

import GradeDropdown from './GradeDropdown';
import EnhancedRotatingNumberInput from './RotatingNumberInput';

// Import course data for autocomplete
import courseData from '../../data/Courses.json';

// Interface for course suggestion
interface CourseSuggestion {
  code: string;
  name: string;
  credit_hours: number;
}

// Function to get all courses from the JSON structure
const getAllCourses = (): CourseSuggestion[] => {
  const courses: CourseSuggestion[] = [];
  
  try {
    // Extract courses from program requirements
    const processCoursesArray = (coursesArray: any[]) => {
      if (!Array.isArray(coursesArray)) return;
      
      coursesArray.forEach(course => {
        if (course && course.code && course.name && course.credit_hours !== undefined) {
          courses.push({
            code: course.code,
            name: course.name,
            credit_hours: course.credit_hours
          });
        }
      });
    };
    
    // Process general requirements
    if (courseData.program_requirements?.general_requirements) {
      const generalReq = courseData.program_requirements.general_requirements;
      if (generalReq.mandatory?.courses) {
        processCoursesArray(generalReq.mandatory.courses);
      }
      if (generalReq.elective?.courses) {
        processCoursesArray(generalReq.elective.courses);
      }
    }
    
    // Process university requirements
    if (courseData.program_requirements?.university_requirements_no_credit?.courses) {
      processCoursesArray(courseData.program_requirements.university_requirements_no_credit.courses);
    }
    
    // Process college requirements
    if (courseData.program_requirements?.college_requirements) {
      const collegeReq = courseData.program_requirements.college_requirements;
      if (collegeReq.mathematics_and_basic_sciences?.courses) {
        processCoursesArray(collegeReq.mathematics_and_basic_sciences.courses);
      }
      if (collegeReq.basic_computer_science?.courses) {
        processCoursesArray(collegeReq.basic_computer_science.courses);
      }
    }
    
    // Process all majors
    if (courseData.majors) {
      Object.keys(courseData.majors).forEach(majorKey => {
        const major = courseData.majors[majorKey as keyof typeof courseData.majors];
        if (major && major.major_requirements) {
          const majorReq = major.major_requirements;
          
          if (majorReq.applied_sciences_mandatory?.courses) {
            processCoursesArray(majorReq.applied_sciences_mandatory.courses);
          }
          if (majorReq.electives?.courses) {
            processCoursesArray(majorReq.electives.courses);
          }
          if (majorReq.graduation_project?.courses) {
            processCoursesArray(majorReq.graduation_project.courses);
          }
          if (majorReq.field_training?.courses) {
            processCoursesArray(majorReq.field_training.courses);
          }
        }
      });
    }
  } catch (error) {
    console.error("Error processing course data:", error);
  }
  
  return courses;
};

interface CourseFormProps {
  onAddCourse: (course: Course) => void;
  onShowImport: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ 
  onAddCourse, 
  onShowImport 
}) => {
  const [courseName, setCourseName] = useState('');
  const [courseHours, setCourseHours] = useState(2);
  const [courseGrade, setCourseGrade] = useState<Grade>('A+');
  const [suggestions, setSuggestions] = useState<CourseSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allCourses, setAllCourses] = useState<CourseSuggestion[]>([]);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize courses data
  useEffect(() => {
    setAllCourses(getAllCourses());
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setCourseName(input);
    
    // Show suggestions after at least 2 characters
    if (input.length >= 2) {
      const filteredSuggestions = allCourses.filter(course => 
        course.code.toLowerCase().includes(input.toLowerCase()) ||
        course.name.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: CourseSuggestion) => {
    setCourseName(suggestion.name);
    setCourseHours(suggestion.credit_hours);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAddCourse({
      name: courseName,
      hours: courseHours,
      grade: courseGrade
    });

    // Reset form
    setCourseName('');
    setCourseHours(2); // Reset to default value
    setCourseGrade('A+');
  };

  return (
    <div className="top-box">
      <Form onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="form-label" htmlFor="courseName">Course Name:</label>
          <div className="form-grade-container">
            <input
              ref={inputRef}
              type="text"
              id="courseName"
              className="form-input"
              value={courseName}
              onChange={handleInputChange}
              placeholder="Enter Course Code"
              onFocus={() => courseName.length >= 2 && setShowSuggestions(true)}
            />
            {showSuggestions && suggestions.length > 0 && (
              <div 
                ref={suggestionsRef}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  backgroundColor: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.5)',
                  borderRadius: 'var(--radius-md)',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  zIndex: 1000,
                  boxShadow: 'var(--shadow-md)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  background: 'rgba(255, 255, 255, 0.9)'
                }}
              >
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '10px 15px',
                      cursor: 'pointer',
                      borderBottom: index < suggestions.length - 1 ? '1px solid rgba(203, 213, 225, 0.5)' : 'none',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      fontWeight: 500,
                      color: 'var(--text-color)',
                      transition: 'var(--transition-base)'
                    }}
                    onClick={() => handleSuggestionClick(suggestion)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 121, 85, 0.1)';
                      e.currentTarget.style.color = 'var(--primary-600)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '';
                      e.currentTarget.style.color = 'var(--text-color)';
                    }}
                  >
                    <strong>{suggestion.code}</strong> - {suggestion.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="form-row">
          <label className="form-label" htmlFor="courseHours">Credit Hours:</label>
          <EnhancedRotatingNumberInput
            value={courseHours}
            onChange={(value: number) => setCourseHours(value)}
            min={0}
            max={3}
            disabled={false}
          />
        </div>

        <div className="form-row">
          <label className="form-label" htmlFor="courseGrade">Grade:</label>
          <div className="form-grade-container">
            <GradeDropdown
              courseId="form-grade"
              courseName="Form Grade"
              onSelectGrade={(_, grade) => setCourseGrade(grade)}
              currentGrade={courseGrade}
              displayMode="input"
            />
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className="btn-primary">
            Add Course
          </button>
          <button 
            type="button" 
            className="btn-secondary"
            onClick={onShowImport}
          >
            Import Courses
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CourseForm;
