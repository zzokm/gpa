import React, { useState, useEffect } from 'react';
import { Course, Grade } from '../types/Course';
import { getGradeStyles, calculateGPA } from '../utils/gradeUtils';
import GradeDropdown from './GradeDropdown';
import StatsModal from './StatsModal';
import './CourseTableStyles.css'; // Import the fixed spacing styles
import './GroupedCourseTable.css'; // Import consolidated styles

interface GroupedCourseTableProps {
  courses: Course[];
  onRemoveCourse: (id: string) => void;
  onUpdateGrade: (id: string, grade: Grade) => void;
}

interface NestedGroupedCourses {
  [level: string]: {
    [term: string]: Course[];
  };
}

interface GroupState {
  [key: string]: boolean; // true for expanded, false for collapsed
}

interface GroupStats {
  courseCount: number;
  totalCredits: number;
  passedCredits: number;
  failedCredits: number;
  gpa: number;
}

interface ModalData {
  title: string;
  stats: GroupStats;
  courses: Course[];
}

// Local storage key for group states
const GROUP_STATE_KEY = 'gpa-calculator-group-states';

const GroupedCourseTable: React.FC<GroupedCourseTableProps> = ({ 
  courses, 
  onRemoveCourse, 
  onUpdateGrade 
}) => {
  const [groupStates, setGroupStates] = useState<GroupState>({});
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load group states from localStorage on component mount and initialize missing ones
  useEffect(() => {
    try {
      const storedStates = localStorage.getItem(GROUP_STATE_KEY);
      let initialStates: GroupState = {};

      if (storedStates) {
        const parsedStates = JSON.parse(storedStates);
        // Convert old numerical states to boolean if needed
        Object.keys(parsedStates).forEach(key => {
          const value = parsedStates[key];
          // Handle both old numerical (0/1) and new boolean states
          initialStates[key] = typeof value === 'number' ? value === 1 : Boolean(value);
        });
      }

      // Initialize any missing group states with default values
      Object.keys(nestedGroupedCourses).forEach(level => {
        const levelKey = `level-${level}`;
        if (!(levelKey in initialStates)) {
          initialStates[levelKey] = true; // Default to expanded
        }

        Object.keys(nestedGroupedCourses[level]).forEach(term => {
          const termKey = `term-${level}-${term}`;
          if (!(termKey in initialStates)) {
            initialStates[termKey] = true; // Default to expanded
          }
        });
      });

      setGroupStates(initialStates);
      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to load group states from localStorage:', error);

      // Initialize with default values on error
      const defaultStates: GroupState = {};
      Object.keys(nestedGroupedCourses).forEach(level => {
        const levelKey = `level-${level}`;
        defaultStates[levelKey] = true;
        Object.keys(nestedGroupedCourses[level]).forEach(term => {
          const termKey = `term-${level}-${term}`;
          defaultStates[termKey] = true;
        });
      });
      setGroupStates(defaultStates);
      setIsInitialized(true);
    }
  }, [courses]); // Only depend on courses changing

  // Save group states to localStorage whenever they change (but not during initial load)
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(GROUP_STATE_KEY, JSON.stringify(groupStates));
      } catch (error) {
        console.error('Failed to save group states to localStorage:', error);
      }
    }
  }, [groupStates, isInitialized]);

  // Separate imported and manually added courses
  const importedCourses = courses.filter(course => course.isImported);
  const manualCourses = courses.filter(course => !course.isImported);

  // Group imported courses by level first, then by term
  const nestedGroupedCourses: NestedGroupedCourses = {};
  
  importedCourses.forEach(course => {
    if (course.level && course.term) {
      if (!nestedGroupedCourses[course.level]) {
        nestedGroupedCourses[course.level] = {};
      }
      if (!nestedGroupedCourses[course.level][course.term]) {
        nestedGroupedCourses[course.level][course.term] = [];
      }
      nestedGroupedCourses[course.level][course.term].push(course);
    }
  });

  // Toggle group expansion state
  const toggleGroup = (groupKey: string) => {
    setGroupStates(prev => ({
      ...prev,
      [groupKey]: !prev[groupKey] // Toggle boolean value
    }));
  };

  // Check if a group is expanded (default to expanded if not set)
  const isGroupExpanded = (groupKey: string): boolean => {
    return groupStates[groupKey] !== false; // Default to true (expanded), false is collapsed
  };

  // Function to handle opening modal
  const openModal = (title: string, stats: GroupStats, courses: Course[]) => {
    setModalData({ title, stats, courses });
  };

  // Function to handle closing modal
  const closeModal = () => {
    setModalData(null);
  };

  // Calculate statistics for a group of courses
  const calculateGroupStats = (courses: Course[]): GroupStats => {
    const totalCredits = courses.reduce((sum, course) => sum + course.hours, 0);
    
    // Calculate passed and failed credits
    const passedCredits = courses.reduce((sum, course) => {
      if (course.grade !== null && course.grade !== 'F') {
        return sum + course.hours;
      }
      return sum;
    }, 0);
    
    const failedCredits = courses.reduce((sum, course) => {
      if (course.grade === 'F') {
        return sum + course.hours;
      }
      return sum;
    }, 0);
    
    const gpa = calculateGPA(courses);
    return {
      courseCount: courses.length,
      totalCredits,
      passedCredits,
      failedCredits,
      gpa
    };
  };

  // Get all courses for a level
  const getLevelCourses = (level: string): Course[] => {
    const levelData = nestedGroupedCourses[level];
    return Object.values(levelData).flat();
  };

  const renderCourseRow = (course: Course) => (
    <tr key={course.id}>
      <td className="course-name">{course.name}</td>
      <td className="course-hours">{course.hours}</td>
      <td>
        <div className="grade-cell">
          <div className="grade-badge-container">
            {course.grade !== null ? (
              <span 
                className="course-grade-badge" 
                style={getGradeStyles(course.grade)}
              >
                {course.grade}
              </span>
            ) : (
              <span className="course-grade-badge empty-grade">
                -
              </span>
            )}
          </div>
          <GradeDropdown
            courseId={course.id!}
            courseName={course.name}
            onSelectGrade={onUpdateGrade}
            currentGrade={course.grade !== null ? course.grade : null}
          />
        </div>
      </td>
      <td>
        <button
          className="remove-btn"
          onClick={() => onRemoveCourse(course.id!)}
          aria-label={`Remove ${course.name}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"/>
            <path d="M10.122 4.465 8 6.586 5.878 4.465 4.464 5.879 6.586 8l-2.122 2.121 1.414 1.414L8 9.414l2.122 2.121 1.414-1.414L9.414 8l2.122-2.121z"/>
          </svg>
        </button>
      </td>
    </tr>
  );

  if (courses.length === 0) {
    return (
      <div className="table-box">
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
            </svg>
          </div>
          <p>No courses added yet. Add your first course above or import your courses automatically!</p>
        </div>
      </div>
    );
  }
  return (
    <div className="table-box">
      {/* Render manually added courses first */}
      {manualCourses.length > 0 && (
        <div className="course-group level-group">
          <div className="group-header level-header">
            <h3 className="group-title">Manually Added Courses</h3>
          </div>
          <div className="table-container expanded">
            <div className="course-container">
              <table className="course-table">
                <thead className="table-header-hidden">
                  <tr>
                    <th>Course Name</th>
                    <th>Credit Hours</th>
                    <th>Grade</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {manualCourses.map(renderCourseRow)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Render grouped imported courses by level */}
      {Object.keys(nestedGroupedCourses).sort().map(level => {
        const levelCourses = getLevelCourses(level);
        const levelStats = calculateGroupStats(levelCourses);
        const isLevelExpanded = isGroupExpanded(`level-${level}`);
        
        return (
          <div key={level} className="course-group level-group">
            {/* Level Header */}
            <div 
              className="group-header level-header clickable" 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleGroup(`level-${level}`);
              }}
              role="button"
              tabIndex={-1}
            >
              <h3 className="group-title">                <span className={`group-toggle ${isLevelExpanded ? 'expanded' : 'collapsed'}`}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                  </svg>                </span>
                {level}
                <button 
                  className="info-btn"
                  title={`GPA: ${levelStats.gpa.toFixed(2)}`}
                  aria-label={`View statistics for ${level}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openModal(level, levelStats, levelCourses);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M10 .4C4.697.4.399 4.698.399 10A9.6 9.6 0 0 0 10 19.601c5.301 0 9.6-4.298 9.6-9.601 0-5.302-4.299-9.6-9.6-9.6zm.896 3.466c.936 0 1.211.543 1.211 1.164 0 .775-.62 1.492-1.679 1.492-.886 0-1.308-.445-1.282-1.182 0-.621.519-1.474 1.75-1.474zM8.498 15.75c-.64 0-1.107-.389-.66-2.094l.733-3.025c.127-.484.148-.678 0-.678-.191 0-1.022.334-1.512.664l-.319-.523c1.555-1.299 3.343-2.061 4.108-2.061.64 0 .746.756.427 1.92l-.84 3.18c-.149.562-.085.756.064.756.192 0 .82-.232 1.438-.719l.362.486c-1.513 1.512-3.162 2.094-3.801 2.094z" fill="#ff7955"/>
                  </svg>
                </button>
              </h3>
            </div>
            
            {/* Level Content */}
            <div className={`table-container level-container ${isLevelExpanded ? 'expanded' : 'collapsed'}`}>
            {/* Terms within the level */}
              {Object.keys(nestedGroupedCourses[level])
                .sort((a, b) => {
                  // Define recognized terms and their order
                  const termOrder = {
                    'First Term': 1,
                    'Second Term': 2
                  };
                  
                  // Get order for each term, defaulting to 3 (after recognized terms) if not found
                  const orderA = termOrder[a as keyof typeof termOrder] || 3;
                  const orderB = termOrder[b as keyof typeof termOrder] || 3;
                  
                  // First sort by the defined term order
                  if (orderA !== orderB) {
                    return orderA - orderB;
                  }
                  
                  // If both are "other" terms (not in our predefined list), sort alphabetically
                  return a.localeCompare(b);
                })
                .map(term => {
                  const termCourses = nestedGroupedCourses[level][term];
                  const termStats = calculateGroupStats(termCourses);
                  const isTermExpanded = isGroupExpanded(`term-${level}-${term}`);
                    return (
                    <div key={`${level}-${term}`} className="course-group term-group">
                      {/* Term Header */}
                      <div 
                        className="group-header term-header clickable" 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleGroup(`term-${level}-${term}`);
                        }}
                        role="button"
                        tabIndex={-1}
                      >
                        <h4 className="group-title term-title">                          <span className={`group-toggle ${isTermExpanded ? 'expanded' : 'collapsed'}`}>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                            </svg>
                          </span>
                          {term}
                          <button 
                            className="info-btn"
                            title={`GPA: ${termStats.gpa.toFixed(2)}`}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              openModal(`${level} - ${term}`, termStats, termCourses);
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M10 .4C4.697.4.399 4.698.399 10A9.6 9.6 0 0 0 10 19.601c5.301 0 9.6-4.298 9.6-9.601 0-5.302-4.299-9.6-9.6-9.6zm.896 3.466c.936 0 1.211.543 1.211 1.164 0 .775-.62 1.492-1.679 1.492-.886 0-1.308-.445-1.282-1.182 0-.621.519-1.474 1.75-1.474zM8.498 15.75c-.64 0-1.107-.389-.66-2.094l.733-3.025c.127-.484.148-.678 0-.678-.191 0-1.022.334-1.512.664l-.319-.523c1.555-1.299 3.343-2.061 4.108-2.061.64 0 .746.756.427 1.92l-.84 3.18c-.149.562-.085.756.064.756.192 0 .82-.232 1.438-.719l.362.486c-1.513 1.512-3.162 2.094-3.801 2.094z" fill="#ff7955"/>
                            </svg>
                          </button>
                        </h4>
                      </div>
                      
                      {/* Term Content */}
                      <div className={`table-container term-container ${isTermExpanded ? 'expanded' : 'collapsed'}`}>
                        <div className="course-container">
                          <table className="course-table">
                            <thead className="table-header-hidden">
                              <tr>
                                <th>Course Name</th>
                                <th>Credit Hours</th>
                                <th>Grade</th>
                                <th>Remove</th>
                              </tr>
                            </thead>
                            <tbody>
                              {termCourses.map(renderCourseRow)}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
      {/* Statistics Modal using Portal */}
      <StatsModal modalData={modalData} onClose={closeModal} />
    </div>
  );
};

export default GroupedCourseTable;
