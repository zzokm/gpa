import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Course } from '../types/Course';
import { letterToPoints } from '../utils/gradeUtils';
import './StatsModalStyles.css';

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

interface StatsModalProps {
  modalData: ModalData | null;
  onClose: () => void;
}

type TabType = 'overview' | 'courses' | 'grades';

const StatsModal: React.FC<StatsModalProps> = ({ modalData, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const courseItemsRef = useRef<HTMLDivElement>(null);
  const [showScrollArrow, setShowScrollArrow] = useState(false);

  // Handle modal mounting
  useEffect(() => {
    if (modalData) {
      document.body.classList.add('modal-open');
      setTimeout(() => setMounted(true), 10);
      setActiveTab('overview'); // Reset to overview tab when modal opens
    } else {
      document.body.classList.remove('modal-open');
      setMounted(false);
    }
    
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [modalData]);

  // Effect to handle scroll arrow visibility
  useEffect(() => {
    const courseItemsElement = courseItemsRef.current;
    if (!courseItemsElement) return;

    const checkScroll = () => {
      const isScrollable = courseItemsElement.scrollHeight > courseItemsElement.clientHeight;
      const isAtBottom = courseItemsElement.scrollHeight - courseItemsElement.scrollTop <= courseItemsElement.clientHeight + 5;
      setShowScrollArrow(isScrollable && !isAtBottom);
    };

    checkScroll();
    courseItemsElement.addEventListener('scroll', checkScroll);
    
    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(courseItemsElement);

    return () => {
      courseItemsElement.removeEventListener('scroll', checkScroll);
      resizeObserver.unobserve(courseItemsElement);
    };
  }, [modalData, mounted, activeTab]);

  const scrollToBottom = () => {
    courseItemsRef.current?.scrollTo({
      top: courseItemsRef.current.scrollHeight,
      behavior: 'smooth'
    });
  };

  if (!modalData) return null;

  // Calculate grade distribution
  const gradeDistribution = modalData.courses.reduce((acc, course) => {
    if (course.grade) {
      acc[course.grade] = (acc[course.grade] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const renderOverviewTab = () => (
    <div className="tab-content-overview">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div className="stat-value">{modalData.stats.courseCount}</div>
          <div className="stat-label">Courses</div>
        </div>
        
        {modalData.stats.failedCredits > 0 ? (
          <div className="stat-card">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
              </svg>
            </div>
            <div className="stat-value credits-split">
              <span className="passed-credits">{modalData.stats.passedCredits}</span>
              <span className="separator">/</span>
              <span className="failed-credits">{modalData.stats.failedCredits}</span>
            </div>
            <div className="stat-label">Credits (Pass/Fail)</div>
          </div>
        ) : (
          <div className="stat-card">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
              </svg>
            </div>
            <div className="stat-value">{modalData.stats.totalCredits}</div>
            <div className="stat-label">Credit Hours</div>
          </div>
        )}
        
        <div className="stat-card">
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
            </svg>
          </div>
          <div className="stat-value">{modalData.stats.gpa.toFixed(3)}</div>
          <div className="stat-label">GPA</div>
        </div>
      </div>
      
      <div className="overview-summary">
        <h4>Summary</h4>
        <p>This group contains <strong>{modalData.stats.courseCount}</strong> courses totaling <strong>{modalData.stats.totalCredits}</strong> credit hours with an average GPA of <strong>{modalData.stats.gpa.toFixed(3)}</strong>.</p>
        {modalData.stats.failedCredits > 0 && (
          <p className="warning-text">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
            </svg>
            You have <strong>{modalData.stats.failedCredits}</strong> failed credit hours in this group.
          </p>
        )}
      </div>
    </div>
  );

  const renderCoursesTab = () => (
    <div className="tab-content-courses">
      <div className="course-list-header">
        <h4>Course List ({modalData.courses.length})</h4>
      </div>
      <div className="course-items" ref={courseItemsRef}>
        {modalData.courses.map(course => (
          <div key={course.id} className="course-item">
            <div className="course-name">{course.name}</div>
            <div className="course-credits">{course.hours} credits</div>
            <div className="course-status-container">
              {course.grade === 'F' && (
                <span className="course-status failed">Failed</span>
              )}
              {course.grade && course.grade !== 'F' && (
                <span className="course-status passed">Passed</span>
              )}
              {course.grade === null && (
                <span className="course-status pending">Pending</span>
              )}
            </div>
          </div>
        ))}
      </div>
      {showScrollArrow && (
        <div className="scroll-down-arrow" onClick={scrollToBottom} title="Scroll to bottom">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
          </svg>
        </div>
      )}
    </div>
  );

  const renderGradesTab = () => {
    const gradesWithCount = Object.entries(gradeDistribution)
      .map(([grade, count]) => ({
        grade,
        count,
        points: letterToPoints(grade as any),
      }))
      .sort((a, b) => b.points - a.points);

    return (
      <div className="tab-content-grades">
        <div className="grades-header">
          <h4>Grade Distribution</h4>
        </div>
        <div className="grade-distribution-list">
          {gradesWithCount.map(({ grade, count, points }) => (
            <div key={grade} className="grade-distribution-item">
              <div className="grade-info">
                <span className="grade-letter">{grade}</span>
                <span className="grade-points">{points.toFixed(1)} pts</span>
              </div>
              <div className="grade-bar-container">
                <div 
                  className="grade-bar" 
                  style={{ 
                    width: `${(count / modalData.courses.length) * 100}%`,
                    backgroundColor: points >= 3.5 ? '#16a34a' : points >= 3.0 ? '#3b82f6' : points >= 2.0 ? '#f59e0b' : '#dc2626'
                  }}
                />
              </div>
              <div className="grade-count">{count} course{count !== 1 ? 's' : ''}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return ReactDOM.createPortal(
    <div className={`modal-overlay ${mounted ? 'modal-visible' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{modalData.title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M14.7 1.3c-.4-.4-1-.4-1.4 0L8 6.6 2.7 1.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4L6.6 8l-5.3 5.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L8 9.4l5.3 5.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L9.4 8l5.3-5.3c.4-.4.4-1 0-1.4z"/>
            </svg>
          </button>
        </div>
        
        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
            </svg>
            Overview
          </button>
          <button 
            className={`tab-button ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
            </svg>
            Courses
          </button>
          <button 
            className={`tab-button ${activeTab === 'grades' ? 'active' : ''}`}
            onClick={() => setActiveTab('grades')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
            </svg>
            Grades
          </button>
        </div>
        
        <div className="modal-body">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'courses' && renderCoursesTab()}
          {activeTab === 'grades' && renderGradesTab()}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default StatsModal;
