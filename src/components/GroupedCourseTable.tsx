import React, { useState, useEffect, useMemo } from 'react';
import { Course, Grade } from '../types/Course';
import { getGradeStyles, calculateGPA } from '../utils/gradeUtils';
import GradeDropdown from './GradeDropdown';
import CreditHoursDropdown from './CreditHoursDropdown';
import StatsModal from './StatsModal';
import ConfirmationModal from './ConfirmationModal';
import './CourseTableStyles.css'; // Import the fixed spacing styles
import './GroupedCourseTable.css'; // Import consolidated styles
import './CreditHoursDropdownStyles.css'; // Unified CSS for all dropdowns

interface GroupedCourseTableProps {
  courses: Course[];
  onRemoveCourse: (id: string) => void;
  onUpdateGrade: (id: string, grade: Grade) => void;
  onUpdateCreditHours: (id: string, hours: number) => void;
  onClearCourses: () => void;
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
  onUpdateGrade,
  onUpdateCreditHours,
  onClearCourses
}) => {
  const [groupStates, setGroupStates] = useState<GroupState>({});
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Load group states from localStorage on component mount and initialize missing ones
  useEffect(() => {
    try {
      const storedStates = localStorage.getItem(GROUP_STATE_KEY);
      const initialStates: GroupState = {};

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses]); // nestedGroupedCourses is memoized from courses, so courses dependency is sufficient

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

  // Apply comprehensive protection at load time to prevent accidental interactions with collapsed elements
  useEffect(() => {
    // Process all collapsed elements to ensure they have pointer-events: none
    Object.entries(groupStates).forEach(([key, isExpanded]) => {
      if (!isExpanded) { // If collapsed
        // Convert key to CSS selector
        const selector = key.startsWith('level-') 
          ? `.${key.replace('level-', 'level-container.')}`
          : `.${key.replace('term-', 'term-container.')}`;
        
        // Find all related containers
        const containers = document.querySelectorAll(selector);
        containers.forEach(container => {
          // Apply CSS immediately for protection, but preserve animation classes
          (container as HTMLElement).style.pointerEvents = 'none';
          (container as HTMLElement).setAttribute('aria-hidden', 'true');
          
          // Don't set visibility and height directly here to allow CSS animations
          if (!container.classList.contains('collapsed')) {
            container.classList.remove('expanded', 'expanding', 'collapsing');
            container.classList.add('collapsed');
          }
          
          // CRITICAL: Ensure ALL interactive elements within collapsed sections are completely disabled
          const interactiveElements = container.querySelectorAll(
            'button, a, input, select, [role="button"], [tabindex], .remove-btn, .info-btn'
          );
          
          interactiveElements.forEach(element => {
            // Store original tabindex if it exists
            if ((element as HTMLElement).hasAttribute('tabindex') && 
                (element as HTMLElement).getAttribute('tabindex') !== '-1') {
              const tabIndex = (element as HTMLElement).getAttribute('tabindex');
              (element as HTMLElement).setAttribute('data-original-tabindex', tabIndex || '0');
            }
            
            // Make element completely non-interactive
            (element as HTMLElement).style.pointerEvents = 'none';
            (element as HTMLElement).setAttribute('tabindex', '-1');
            (element as HTMLElement).setAttribute('aria-hidden', 'true');
            
            // For buttons specifically
            if ((element as HTMLElement).tagName === 'BUTTON') {
              (element as HTMLButtonElement).disabled = true;
              (element as HTMLElement).style.cursor = 'default';
            }
          });
          
          // Create an overlay div to block all interaction if needed
          if (!container.querySelector('.interaction-blocker')) {
            const blocker = document.createElement('div');
            blocker.className = 'interaction-blocker';
            blocker.style.position = 'absolute';
            blocker.style.top = '0';
            blocker.style.left = '0';
            blocker.style.width = '100%';
            blocker.style.height = '100%';
            blocker.style.zIndex = '1000';
            blocker.style.pointerEvents = 'auto'; // Block all events
            
            // Add event listener to stop event propagation
            blocker.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              return false;
            });
            
            // Add to container
            (container as HTMLElement).style.position = 'relative';
            container.appendChild(blocker);
          }
        });
      }
    });
  }, [groupStates]);

  // Separate imported and manually added courses
  const importedCourses = courses.filter(course => course.isImported);
  const manualCourses = courses.filter(course => !course.isImported);

  // Group imported courses by level first, then by term
  const nestedGroupedCourses: NestedGroupedCourses = useMemo(() => {
    const grouped: NestedGroupedCourses = {};
    
    importedCourses.forEach(course => {
      if (course.level && course.term) {
        if (!grouped[course.level]) {
          grouped[course.level] = {};
        }
        if (!grouped[course.level][course.term]) {
          grouped[course.level][course.term] = [];
        }
        grouped[course.level][course.term].push(course);
      }
    });
    
    return grouped;
  }, [importedCourses]);

  // Toggle group expansion state with improved animations and interaction safety
  const toggleGroup = (groupKey: string) => {
    const willExpand = !groupStates[groupKey]; // true if we're expanding
    
    // Update state
    setGroupStates(prev => ({
      ...prev,
      [groupKey]: willExpand
    }));
    
    // Apply accessibility attributes and manage animations
    setTimeout(() => {
      // Find all related containers
      const containers = document.querySelectorAll(`.${groupKey.replace('level-', 'level-container.').replace('term-', 'term-container.')}`);
      
      containers.forEach(container => {
        // Find all interactive elements in this container
        const interactiveElements = container.querySelectorAll(
          'button, a, input, select, [role="button"], [tabindex]'
        );
        
        if (willExpand) {
          // For expansion: First ensure proper accessibility and set classes
          container.classList.remove('collapsed');
          container.classList.add('expanding'); // Add a transitional class
          
          // Set aria-hidden but keep pointer-events disabled during animation
          (container as HTMLElement).setAttribute('aria-hidden', 'false');
          (container as HTMLElement).style.pointerEvents = 'none';
          
          // After animation starts, set expanded class
          setTimeout(() => {
            container.classList.remove('expanding');
            container.classList.add('expanded');
            
            // Re-enable interaction only after animation completes
            setTimeout(() => {
              // Enable container interaction
              (container as HTMLElement).style.pointerEvents = 'auto';
              
              // Enable all interactive elements
              interactiveElements.forEach(element => {
                (element as HTMLElement).style.pointerEvents = 'auto';
                (element as HTMLElement).removeAttribute('aria-hidden');
                if ((element as HTMLElement).hasAttribute('data-original-tabindex')) {
                  const originalTabIndex = (element as HTMLElement).getAttribute('data-original-tabindex');
                  (element as HTMLElement).setAttribute('tabindex', originalTabIndex || '0');
                  (element as HTMLElement).removeAttribute('data-original-tabindex');
                } else {
                  (element as HTMLElement).setAttribute('tabindex', '0');
                }
              });
            }, 1200); // Allow full animation time before enabling interaction
          }, 50);
        } else {
          // For collapse: Immediately disable all interaction for safety
          (container as HTMLElement).style.pointerEvents = 'none';
          (container as HTMLElement).setAttribute('aria-hidden', 'true');
          
          // Disable all interactive elements immediately
          interactiveElements.forEach(element => {
            // Store original tabindex if it exists
            if ((element as HTMLElement).hasAttribute('tabindex')) {
              const tabIndex = (element as HTMLElement).getAttribute('tabindex');
              (element as HTMLElement).setAttribute('data-original-tabindex', tabIndex || '0');
            }
            // Make element non-interactive
            (element as HTMLElement).style.pointerEvents = 'none';
            (element as HTMLElement).setAttribute('tabindex', '-1');
            (element as HTMLElement).setAttribute('aria-hidden', 'true');
          });
          
          // Start collapse animation
          container.classList.remove('expanded');
          container.classList.add('collapsing'); // Add transitional class
          
          // After animation completes, set to fully collapsed state
          setTimeout(() => {
            container.classList.remove('collapsing');
            container.classList.add('collapsed');
          }, 1200); // Match animation duration
        }
      });
    }, 0);
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
    <tr key={course.id} className="course-row">
      <td className="course-name">{course.name}</td>      <td className="course-hours">
        <div className="credit-hours-cell">
          <div className="credit-hours-value-container">
            <span className="credit-hours-value">{course.hours}</span>
          </div>
          <CreditHoursDropdown
            courseId={course.id!}
            courseName={course.name}
            onSelectCreditHours={onUpdateCreditHours}
            currentHours={course.hours}
          />
        </div>
      </td>
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
          aria-label={`Remove ${course.name}`}        >
          <svg fill="#ffffff" viewBox="-230 -230 1460.00 1460.00" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="5">
            <g id="SVGRepo_bgCarrier" strokeWidth="0" transform="translate(0,0), scale(1)">
              <rect x="-230" y="-230" width="1460.00" height="1460.00" rx="730" fill="#e81717" strokeWidth="0"></rect>
            </g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="2"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M767 336H233q-12 0-21 9t-9 21l38 505q1 13 12 21.5t30 8.5h434q18 0 29-8.5t13-21.5l38-505q0-12-9-21t-21-9zM344 841q-10 0-18-9t-8-21l-26-386q0-12 9-20.5t21-8.5 21 8.5 9 20.5l18 386q0 12-7.5 21t-18.5 9zm182-31q0 13-7.5 22t-18.5 9-18.5-9-7.5-22l-4-385q0-12 9-20.5t21-8.5 21 8.5 9 20.5zm156 1q0 12-8 21t-18 9q-11 0-18.5-9t-7.5-21l18-386q0-12 9-20.5t21-8.5 21 8.5 9 20.5zm101-605l-179-30q-12-2-15-15l-8-33q-4-20-14-26-6-3-22-3h-90q-16 0-23 3-10 6-13 26l-8 33q-2 13-15 15l-179 30q-19 3-31.5 14.5T173 249v28q0 9 6.5 15t15.5 6h610q9 0 15.5-6t6.5-15v-28q0-17-12.5-28.5T783 206z"></path>
            </g>
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
  }  return (
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
            <div 
              className={`table-container level-container ${isLevelExpanded ? 'expanded' : 'collapsed'}`}
              aria-hidden={!isLevelExpanded}
              style={{ pointerEvents: isLevelExpanded ? 'auto' : 'none' }}
            >
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
                      <div 
                        className={`table-container term-container ${isTermExpanded ? 'expanded' : 'collapsed'}`}
                        aria-hidden={!isTermExpanded}
                        style={{ pointerEvents: isTermExpanded ? 'auto' : 'none' }}
                        onClick={(e) => {
                          // If collapsed, prevent any click events
                          if (!isTermExpanded) {
                            e.preventDefault();
                            e.stopPropagation();
                          }
                        }}
                      >
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
      })}      {/* Reset button at the top right */}
      <div className="reset-button-container">
        <button 
          className="reset-button"
          onClick={() => setShowConfirmModal(true)}
          title="Reset all courses"
          aria-label="Reset all courses"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.49 15C19.841 16.831 18.612 18.4108 16.9875 19.492C15.363 20.5732 13.4312 21.0972 11.4831 20.9851C9.5349 20.873 7.67594 20.1308 6.18628 18.8704C4.69663 17.61 3.65698 15.8996 3.22398 13.997C2.79098 12.0944 2.98809 10.1026 3.78562 8.32177C4.58314 6.54091 5.93787 5.06746 7.64568 4.12343C9.35349 3.17941 11.3219 2.81593 13.2542 3.08779C16.5167 3.54676 18.6721 5.91142 21 8M21 8V2M21 8H15" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <span>Reset All</span>
        </button>
      </div>
      
      {/* Statistics Modal using Portal */}
      <StatsModal modalData={modalData} onClose={closeModal} />
      
      {/* Confirmation Modal for Reset */}
      <ConfirmationModal
        show={showConfirmModal}
        title="Reset All Courses"
        message="Are you sure you want to delete all courses? This action cannot be undone."
        confirmText="Reset All"
        cancelText="Cancel"
        onConfirm={() => {
          onClearCourses();
          setShowConfirmModal(false);
        }}
        onCancel={() => setShowConfirmModal(false)}
        isDanger={true}
      />
    </div>
  );
};

export default GroupedCourseTable;
