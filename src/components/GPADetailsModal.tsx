import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Course } from '../types/Course';
import { letterToPoints, calculateGPA } from '../utils/gradeUtils';
import './GPADetailsModalStyles.css';

interface CourseImpact {
  course: Course;
  impact: number; // Realistic impact on overall GPA
  cumulativeGPA: number; // GPA up to and including this course
}

interface GPADetailsModalProps {
  show: boolean;
  onHide: () => void;
  courses: Course[];
  currentGPA: number;
}

const GPADetailsModal: React.FC<GPADetailsModalProps> = ({ show, onHide, courses, currentGPA }) => {
  const [mounted, setMounted] = useState(false);
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const [showScrollArrow, setShowScrollArrow] = useState(false);

  // Handle modal mounting
  useEffect(() => {
    if (show) {
      document.body.classList.add('modal-open');
      setTimeout(() => setMounted(true), 10);
    } else {
      document.body.classList.remove('modal-open');
      setMounted(false);
    }
    
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [show]);

  // Effect to handle scroll arrow visibility
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
  }, [show, mounted]);

  const scrollToBottom = () => {
    modalBodyRef.current?.scrollTo({
      top: modalBodyRef.current.scrollHeight,
      behavior: 'smooth'
    });
  };

  // Calculate course impacts with realistic numbers
  const calculateCourseImpacts = (): CourseImpact[] => {
    const coursesWithGrades = courses.filter(c => c.grade !== null);
    const impacts: CourseImpact[] = [];
    
    coursesWithGrades.forEach((course, index) => {
      // Calculate GPA before this course
      const coursesBefore = coursesWithGrades.slice(0, index);
      const gpaBefore = coursesBefore.length > 0 ? calculateGPA(coursesBefore) : 0;
      
      // Calculate GPA including this course
      const coursesIncluding = coursesWithGrades.slice(0, index + 1);
      const gpaIncluding = calculateGPA(coursesIncluding);
      
      // Realistic impact: How much this course actually affected the GPA
      // The impact is the difference from what the GPA would have been
      // if this course matched the previous GPA vs. what it actually is
      const impact = gpaIncluding - gpaBefore;
      
      impacts.push({
        course,
        impact,
        cumulativeGPA: gpaIncluding
      });
    });
    
    return impacts;
  };

  // Get courses sorted by negative impact (worst performers)
  const getWorstPerformers = (impacts: CourseImpact[]): CourseImpact[] => {
    return [...impacts]
      .filter(i => i.impact < 0) // Only negative impacts
      .sort((a, b) => a.impact - b.impact); // Sort by most negative first
  };

  // Get retake suggestions
  const getRetakeSuggestions = (impacts: CourseImpact[]): CourseImpact[] => {
    const totalCredits = courses.filter(c => c.grade !== null).reduce((sum, c) => sum + c.hours, 0);
    
    // Filter courses with low grades and high credit hours (highest potential for improvement)
    const suggestions = impacts.filter(impact => {
      const gradePoints = letterToPoints(impact.course.grade);
      return gradePoints < 3.0 && impact.course.hours >= 2; // B or below, 2+ credit hours
    });
    
    // Sort by potential impact if improved to A+
    return suggestions.sort((a, b) => {
      const currentPointsA = letterToPoints(a.course.grade);
      const currentPointsB = letterToPoints(b.course.grade);
      const potentialGainA = (4.0 - currentPointsA) * a.course.hours / totalCredits;
      const potentialGainB = (4.0 - currentPointsB) * b.course.hours / totalCredits;
      return potentialGainB - potentialGainA;
    });
  };

  if (!show) return null;

  const impacts = calculateCourseImpacts();
  const worstPerformers = getWorstPerformers(impacts);
  const retakeSuggestions = getRetakeSuggestions(impacts);
  const totalCredits = courses.filter(c => c.grade !== null).reduce((sum, c) => sum + c.hours, 0);

  return ReactDOM.createPortal(
    <div className={`gpa-modal-overlay ${mounted ? 'gpa-modal-visible' : ''}`} onClick={onHide}>
      <div className="gpa-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="gpa-modal-header">
          <h2 className="gpa-modal-title">GPA Detailed Analysis</h2>
          <button className="gpa-modal-close" onClick={onHide} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M14.7 1.3c-.4-.4-1-.4-1.4 0L8 6.6 2.7 1.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4L6.6 8l-5.3 5.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L8 9.4l5.3 5.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L9.4 8l5.3-5.3c.4-.4.4-1 0-1.4z"/>
            </svg>
          </button>
        </div>
        <div className="gpa-modal-body" ref={modalBodyRef}>
          {/* Overall Stats */}
          <div className="gpa-stats-summary">
            <div className="gpa-stat-card">
              <div className="gpa-stat-value">{currentGPA.toFixed(3)}</div>
              <div className="gpa-stat-label">Current GPA</div>
            </div>
            <div className="gpa-stat-card">
              <div className="gpa-stat-value">{totalCredits}</div>
              <div className="gpa-stat-label">Total Credits</div>
            </div>
            <div className="gpa-stat-card">
              <div className="gpa-stat-value">{impacts.length}</div>
              <div className="gpa-stat-label">Graded Courses</div>
            </div>
          </div>

          {/* Course by Course Impact */}
          <div className="gpa-section">
            <h3 className="gpa-section-title">Course-by-Course Impact</h3>
            <div className="gpa-impact-list">
              {impacts.map((impact, index) => (
                <div key={impact.course.id || index} className="gpa-impact-item">
                  <div className="gpa-impact-course">
                    <span className="gpa-impact-name">{impact.course.name}</span>
                    <span className="gpa-impact-grade">{impact.course.grade} ({letterToPoints(impact.course.grade).toFixed(1)})</span>
                    <span className="gpa-impact-hours">{impact.course.hours}h</span>
                  </div>
                  <div className="gpa-impact-details">
                    <span className={`gpa-impact-change ${impact.impact >= 0 ? 'positive' : 'negative'}`}>
                      {impact.impact >= 0 ? '+' : ''}{impact.impact.toFixed(3)}
                    </span>
                    <span className="gpa-impact-cumulative">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14" height="14" style={{display: 'inline', marginRight: '4px', verticalAlign: 'middle'}}>
                        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                      </svg>
                      {impact.cumulativeGPA.toFixed(3)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Worst Performers */}
          {worstPerformers.length > 0 && (
            <div className="gpa-section">
              <h3 className="gpa-section-title">Courses Decreasing Your GPA</h3>
              <div className="gpa-worst-list">
                {worstPerformers.map((impact, index) => (
                  <div key={impact.course.id || index} className="gpa-worst-item">
                    <div className="gpa-worst-rank">{index + 1}</div>
                    <div className="gpa-worst-info">
                      <div className="gpa-worst-name">{impact.course.name}</div>
                      <div className="gpa-worst-details">
                        Grade: {impact.course.grade} ({letterToPoints(impact.course.grade).toFixed(1)} pts) ? {impact.course.hours} credit hours
                      </div>
                    </div>
                    <div className="gpa-worst-impact">{impact.impact.toFixed(3)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Retake Suggestions */}
          {retakeSuggestions.length > 0 && (
            <div className="gpa-section gpa-suggestions">
              <h3 className="gpa-section-title">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
                </svg>
                Retake Recommendations
              </h3>
              <p className="gpa-suggestions-intro">
                These courses have the highest potential to improve your GPA if retaken:
              </p>
              <div className="gpa-suggestions-list">
                {retakeSuggestions.slice(0, 5).map((impact, index) => {
                  const currentPoints = letterToPoints(impact.course.grade);
                  const potentialGainPerHour = (4.0 - currentPoints); // Maximum possible gain
                  const potentialImpact = (potentialGainPerHour * impact.course.hours) / totalCredits;
                  
                  return (
                    <div key={impact.course.id || index} className="gpa-suggestion-item">
                      <div className="gpa-suggestion-header">
                        <span className="gpa-suggestion-name">{impact.course.name}</span>
                        <span className="gpa-suggestion-current">Current: {impact.course.grade} ({currentPoints.toFixed(1)})</span>
                      </div>
                      <div className="gpa-suggestion-potential">
                        <div className="gpa-suggestion-label">Potential GPA gain if you get A+ (4.0):</div>
                        <div className="gpa-suggestion-value">+{potentialImpact.toFixed(3)}</div>
                      </div>
                      <div className="gpa-suggestion-reason">
                        {impact.course.hours} credit hours ? Current impact: {impact.impact.toFixed(3)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="gpa-disclaimer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
            </svg>
            <span>
              These calculations are estimates based on the current grading system. 
              Actual GPA calculations may vary based on university policies.
            </span>
          </div>
        </div>
        {showScrollArrow && (
          <div className="gpa-scroll-arrow" onClick={scrollToBottom}>
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

export default GPADetailsModal;
