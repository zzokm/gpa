import React, { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Course } from '../types/Course';
import { useLocale } from '../i18n/LocaleContext';
import { useModalBehavior } from '../hooks/useModalBehavior';
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
  const { t } = useLocale();
  const courseItemsRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [showScrollArrow, setShowScrollArrow] = useState(false);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const { mounted } = useModalBehavior({
    isOpen: !!modalData,
    onClose: handleClose,
    initialFocusRef: closeButtonRef,
  });

  // Effect to handle scroll arrow visibility
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
  return createPortal(
    <>
      <style jsx global>{`/* StatsModal Styles for course statuses and credit display */

/* ========================================
   StatsModal Main Layout & Grid
   ======================================== */

/* Stats Grid - 3-column layout for statistics */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
  padding: 0;
}

/* Improved mobile responsiveness for stats grid */
@media (max-width: 600px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-md);
    margin-bottom: var(--space-lg);
  }
}

@media (max-width: 400px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: var(--space-sm);
  }
}

/* Individual statistic cards - Enhanced glassmorphism */
.stat-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg) var(--space-md);
  text-align: center;
  transition: var(--transition-base);
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.08),
    0 1px 8px rgba(255, 255, 255, 0.1) inset,
    0 -1px 0px rgba(0, 0, 0, 0.05);
  /* Center content vertically and horizontally */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(255, 121, 85, 0.4);
  transform: translateY(-2px);
  box-shadow: 
    0 8px 24px rgba(0, 0, 0, 0.1), 
    0 1px 12px rgba(255, 255, 255, 0.15) inset,
    0 -1px 4px rgba(0, 0, 0, 0.05);
}

/* Statistic values */
.stat-value {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--primary-600);
  margin-bottom: var(--space-xs);
  line-height: 1.2;
}

/* Statistic labels */
.stat-label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

/* ========================================
   Course List Container
   ======================================== */

.course-list {
  margin-top: var(--space-md);
  position: relative;
}

.course-list h3 {
  font-size: var(--text-lg);
  font-weight: 650;
  color: var(--text-color);
  margin: 0 0 var(--space-md) 0;
  padding-bottom: var(--space-sm);
  border-bottom: 2px solid var(--border-light);
}

/* ========================================
   Scrollable Course Items Container
   ======================================== */

.course-items {
  max-height: 260px; /* Reduced from 280px to allow for spacing */
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: var(--space-xs);
  margin-bottom: var(--space-lg); /* Added space below courses list */
  
  /* Hide scrollbar completely while keeping scroll functionality */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  
  /* Enable mouse wheel scrolling */
  overscroll-behavior: contain;
}

/* Hide scrollbar for webkit browsers */
.course-items::-webkit-scrollbar {
  display: none;
}

/* ========================================
   Course Item Styling
   ======================================== */

.course-item {
    padding: var(--space-md);
    margin-bottom: var(--space-sm);
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: var(--radius-md);
    /* box-shadow: 
        0 2px 10px rgba(0, 0, 0, 0.06),
        0 1px 3px rgba(0, 0, 0, 0.03); */
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
    transition: var(--transition-base);
    
    /* CSS Grid layout for perfect alignment */
    display: grid;
    grid-template-columns: 1fr auto auto;
    grid-gap: var(--space-md);
    align-items: center;
    position: relative;
}

.course-item:last-child {
  margin-bottom: 0;
}

/* Remove hover effects as requested */
/* .course-item:hover styles removed */

.course-name {
  font-weight: 600;
  color: var(--text-color);
  text-align: left;
  grid-column: 1;
}

.course-credits {
  font-weight: 500;
  color: var(--text-secondary);
  text-align: left;
  grid-column: 2;
}

.course-status-container {
  grid-column: 3;
  text-align: center;
}

.course-status-container {
  grid-column: 3;
  text-align: center;
}

/* ========================================
   Floating Scroll Arrow
   ======================================== */

.scroll-down-arrow {
  position: absolute;
  bottom: 15%; /* Move lower down (from 25% to 15%) */
  left: 50%; /* Center horizontally */
  transform: translateX(-50%); /* Perfect horizontal centering */
  width: 36px; /* Bigger size */
  height: 36px; /* Bigger size */
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  opacity: 0.98;
  border: 1px solid rgba(0, 0, 0, 0.15); /* Refined black stroke */
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.12), 
    0 0 0 1px rgba(255, 255, 255, 0.4) inset,
    0 -1px 0 rgba(255, 255, 255, 0.2) inset; /* Layered shadows for depth */
  /* Subtle gradient overlay */
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.1)
  );
}

/* Removed hover animation */

.scroll-down-arrow svg {
  color: var(--primary-600);
  width: 20px; /* Bigger icon */
  height: 20px; /* Bigger icon */
}

/* ========================================
   Modal Body Spacing Reduction
   ======================================== */

/* Reduce spacing between modal content and buttons but add bottom padding */
.modal-body {
    padding: var(--space-xs) var(--space-lg) calc(var(--space-xs) - 6px) !important; /* Slightly reduced bottom padding */
}

/* ========================================
   Course Status & Credits Styling
   ======================================== */

/* Course status styles */
.course-status {
  font-weight: 600;
  font-size: var(--text-xs);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-full);
  margin-left: var(--space-sm);
  display: inline-block;
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  letter-spacing: 0.02em;
}

.course-status.passed {
  background-color: rgba(22, 163, 74, 0.18);
  color: #15803d; /* green-700 for better contrast */
  border: 1px solid rgba(22, 163, 74, 0.35);
  box-shadow: 
    0 1px 5px rgba(22, 163, 74, 0.15),
    0 0 0 1px rgba(22, 163, 74, 0.08) inset;
}

.course-status.failed {
  background-color: rgba(185, 28, 28, 0.18);
  color: #b91c1c; /* red-700 */
  border: 1px solid rgba(185, 28, 28, 0.35);
  box-shadow: 
    0 1px 5px rgba(185, 28, 28, 0.15),
    0 0 0 1px rgba(185, 28, 28, 0.08) inset;
}

.course-status.pending {
  background-color: rgba(107, 114, 128, 0.18);
  color: #4b5563; /* gray-600 for better contrast */
  border: 1px solid rgba(107, 114, 128, 0.35);
  box-shadow: 
    0 1px 5px rgba(107, 114, 128, 0.15),
    0 0 0 1px rgba(107, 114, 128, 0.08) inset;
}

/* Credits split display */
.credits-split {
  display: flex;
  align-items: center;
  justify-content: center;
}

.passed-credits {
  color: #16a34a; /* green-600 */
  font-weight: 700;
}

.separator {
  margin: 0 var(--space-xs);
  color: var(--text-secondary);
}

.failed-credits {
  color: #b91c1c; /* red-700 */
  font-weight: 700;
}

/* Course details styles */
.course-details {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-top: var(--space-xs);
  color: var(--text-secondary);
}

/* ========================================
   Responsive Design
   ======================================== */

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: var(--space-md);
    margin-bottom: var(--space-lg);
  }
  
  .stat-card {
    padding: var(--space-md) var(--space-sm);
  }
  
  .stat-value {
    font-size: var(--text-xl);
  }
  
  .course-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .course-details {
    margin-top: var(--space-xs);
  }  .course-items {
    max-height: 180px; /* Reduced to keep space at bottom */
    margin-bottom: var(--space-md); /* Slightly less margin on mobile */
  }  .scroll-down-arrow {
    width: 24px;
    height: 24px;
    bottom: 10%; /* Lower position on mobile */
    left: 50%; /* Center horizontally */
    transform: translateX(-50%); /* Perfect horizontal centering */
    border: 1px solid rgba(0, 0, 0, 0.15); /* Refined black stroke */
    box-shadow: 
      0 2px 6px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.3) inset;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.1)
    );
  }
  
  .scroll-down-arrow svg {
    width: 14px;
    height: 14px;
    color: var(--primary-600);
  }
}

@media (max-width: 480px) {
  .stats-grid {
    gap: var(--space-sm);
  }
  
  .stat-card {
    padding: var(--space-sm);
  }
  
  .stat-value {
    font-size: var(--text-lg);
  }
  
  .stat-label {
    font-size: var(--text-xs);
  }
  
  .course-list h3 {
    font-size: var(--text-base);
  }
}

/* ========================================
   Enhanced Mobile Responsiveness
   ======================================== */

/* Better course display for small screens */
@media (max-width: 600px) {
  .course-item {
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    padding: var(--space-sm);
    margin-bottom: var(--space-xs);
  }
  
  .course-name {
    font-size: 0.9rem;
    line-height: 1.2;
    grid-column: 1;
    grid-row: 1;
    padding-right: var(--space-sm);
    word-break: break-word;
    max-width: 100%;
  }
  
  .course-credits {
    font-size: 0.8rem;
    grid-column: 1;
    grid-row: 2;
    text-align: left;
  }
  
  .course-status-container {
    grid-column: 2;
    grid-row: 1 / span 2;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  
  .course-status {
    min-width: 65px;
    height: 28px;
    font-size: 0.75rem;
  }
  
  .course-items {
    max-height: 220px;
  }
}

/* Very small screens */
@media (max-width: 400px) {
  .course-item {
    grid-gap: var(--space-xs);
  }
  
  .courses-container {
    padding: var(--space-xs);
  }
  
  .stat-card {
    padding: var(--space-sm);
  }
  
  .stat-label {
    font-size: 0.7rem;
  }
  
  .stat-value {
    font-size: 1.2rem;
  }
}`}</style>
    <div className={`modal-overlay ${mounted ? 'modal-visible' : ''}`} onClick={handleClose} role="presentation">
      <div
        className="modal-content stats-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="stats-modal-title"
      >
        <div className="modal-header">
          <h2 className="modal-title" id="stats-modal-title">{modalData.title}</h2>
          <button
            ref={closeButtonRef}
            type="button"
            className="modal-close"
            onClick={handleClose}
            aria-label={t('common.close')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M14.7 1.3c-.4-.4-1-.4-1.4 0L8 6.6 2.7 1.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4L6.6 8l-5.3 5.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L8 9.4l5.3 5.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L9.4 8l5.3-5.3c.4-.4.4-1 0-1.4z"/>
            </svg>
          </button>        </div>
        <div className="modal-body">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{modalData.stats.courseCount}</div>
              <div className="stat-label">{t('stats.courses')}</div>
            </div>
            {modalData.stats.failedCredits > 0 ? (
              <div className="stat-card">
                <div className="stat-value credits-split">
                  <span className="passed-credits">{modalData.stats.passedCredits}</span>
                  <span className="separator">/</span>
                  <span className="failed-credits">{modalData.stats.failedCredits}</span>
                </div>
                <div className="stat-label">{t('stats.passedFail')}</div>
              </div>
            ) : (
              <div className="stat-card">
                <div className="stat-value">{modalData.stats.totalCredits}</div>
                <div className="stat-label">{t('stats.creditHours')}</div>
              </div>
            )}
            <div className="stat-card">
              <div className="stat-value">{modalData.stats.gpa.toFixed(2)}</div>
              <div className="stat-label">{t('gpa.label')}</div>
            </div>
          </div>
          <div className="course-list">
            <h3>{t('stats.courses')}:</h3>
            <div className="course-items" ref={courseItemsRef}>
              {modalData.courses.map(course => (
                <div key={course.id} className="course-item">
                  <div className="course-name">{course.name}</div>
                  <div className="course-credits">{course.hours} {t('stats.credits')}</div>
                  <div className="course-status-container">
                    {course.grade === 'F' && (
                      <span className="course-status failed">{t('stats.failed')}</span>
                    )}
                    {course.grade && course.grade !== 'F' && (
                      <span className="course-status passed">{t('stats.passed')}</span>
                    )}
                    {course.grade === null && (
                      <span className="course-status pending">{t('stats.pending')}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {showScrollArrow && (
              <div className="scroll-down-arrow" onClick={scrollToBottom} title={t('stats.scrollToBottom')}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>,
    document.body
  );
};

export default StatsModal;
