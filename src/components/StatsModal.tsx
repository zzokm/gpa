import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Course } from '../types/Course';
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

const StatsModal: React.FC<StatsModalProps> = ({ modalData, onClose }) => {
  // To handle modal open/close animations
  const [mounted, setMounted] = useState(false);
  const courseItemsRef = useRef<HTMLDivElement>(null); // Ref for the scrollable div
  const [showScrollArrow, setShowScrollArrow] = useState(false); // State for arrow visibility

  // Handle modal mounting
  useEffect(() => {
    if (modalData) {
      // Add body class to prevent scrolling
      document.body.classList.add('modal-open');
      // Slight delay to ensure animation works properly
      setTimeout(() => setMounted(true), 10);
    } else {
      document.body.classList.remove('modal-open');
      // Defer setState to avoid setState in effect
      setTimeout(() => setMounted(false), 0);
    }
    
    // Cleanup function
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [modalData]);  // Effect to handle scroll arrow visibility
  useEffect(() => {
    const courseItemsElement = courseItemsRef.current;
    if (!courseItemsElement) return;

    const checkScroll = () => {
      const isScrollable = courseItemsElement.scrollHeight > courseItemsElement.clientHeight;
      const isAtBottom = courseItemsElement.scrollHeight - courseItemsElement.scrollTop <= courseItemsElement.clientHeight + 5; // Add a small tolerance
      setShowScrollArrow(isScrollable && !isAtBottom);
    };

    checkScroll(); // Initial check
    courseItemsElement.addEventListener('scroll', checkScroll);
    
    // Also check on modalData change as content might change
    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(courseItemsElement);

    return () => {
      courseItemsElement.removeEventListener('scroll', checkScroll);
      resizeObserver.unobserve(courseItemsElement);
    };
  }, [modalData, mounted]); // Rerun when modalData or mounted status changes

  const scrollToBottom = () => {
    courseItemsRef.current?.scrollTo({
      top: courseItemsRef.current.scrollHeight,
      behavior: 'smooth'
    });
  };

  // If no modal data, don't render anything
  if (!modalData) return null;

  // Portal the modal to the end of the body to ensure proper overlay
  return ReactDOM.createPortal(
    <div className={`modal-overlay ${mounted ? 'modal-visible' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{modalData.title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M14.7 1.3c-.4-.4-1-.4-1.4 0L8 6.6 2.7 1.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4L6.6 8l-5.3 5.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L8 9.4l5.3 5.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L9.4 8l5.3-5.3c.4-.4.4-1 0-1.4z"/>
            </svg>
          </button>        </div>
        <div className="modal-body">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{modalData.stats.courseCount}</div>
              <div className="stat-label">Courses</div>
            </div>
            {modalData.stats.failedCredits > 0 ? (
              <div className="stat-card">
                <div className="stat-value credits-split">
                  <span className="passed-credits">{modalData.stats.passedCredits}</span>
                  <span className="separator">/</span>
                  <span className="failed-credits">{modalData.stats.failedCredits}</span>
                </div>
                <div className="stat-label">Credits (Pass/Fail)</div>
              </div>
            ) : (
              <div className="stat-card">
                <div className="stat-value">{modalData.stats.totalCredits}</div>
                <div className="stat-label">Credit Hours</div>
              </div>
            )}
            <div className="stat-card">
              <div className="stat-value">{modalData.stats.gpa.toFixed(2)}</div>
              <div className="stat-label">GPA</div>
            </div>
          </div>
          <div className="course-list">
            <h3>Courses:</h3>            <div className="course-items" ref={courseItemsRef}> {/* Added ref */}
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
        </div>
      </div>
    </div>,
    document.body
  );
};

export default StatsModal;
