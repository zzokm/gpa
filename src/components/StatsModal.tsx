import './StatsModal.css'
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Course } from '../types/Course';
import { useLocale } from '../i18n/LocaleContext';
import { WesternDigits } from './LocaleDisplay';
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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M14.7 1.3c-.4-.4-1-.4-1.4 0L8 6.6 2.7 1.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4L6.6 8l-5.3 5.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L8 9.4l5.3 5.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L9.4 8l5.3-5.3c.4-.4.4-1 0-1.4z"/>
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">
                <WesternDigits>{modalData.stats.courseCount}</WesternDigits>
              </div>
              <div className="stat-label">{t('stats.courses')}</div>
            </div>
            {modalData.stats.failedCredits > 0 ? (
              <div className="stat-card">
                <div className="stat-value credits-split">
                  <WesternDigits className="passed-credits">{modalData.stats.passedCredits}</WesternDigits>
                  <span className="separator">/</span>
                  <WesternDigits className="failed-credits">{modalData.stats.failedCredits}</WesternDigits>
                </div>
                <div className="stat-label">{t('stats.passedFail')}</div>
              </div>
            ) : (
              <div className="stat-card">
                <div className="stat-value">
                  <WesternDigits>{modalData.stats.totalCredits}</WesternDigits>
                </div>
                <div className="stat-label">{t('stats.creditHours')}</div>
              </div>
            )}
            <div className="stat-card">
              <div className="stat-value">
                <WesternDigits>{modalData.stats.gpa.toFixed(2)}</WesternDigits>
              </div>
              <div className="stat-label">{t('gpa.label')}</div>
            </div>
          </div>
          <div className="course-list">
            <h3>{t('stats.courses')}:</h3>
            <div className="course-items" ref={courseItemsRef}>
              {modalData.courses.map(course => (
                <div key={course.id} className="course-item">
                  <div className="course-name">{course.name}</div>
                  <div className="course-credits">
                    <WesternDigits>{course.hours}</WesternDigits> {t('stats.credits')}
                  </div>
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
    </div>,
    document.body
  );
};

export default StatsModal;
