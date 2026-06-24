import React, { useState, useRef, useEffect } from 'react';
import { Grade } from '../types/Course';
import { getGradeStyles } from '../utils/gradeUtils';
import { createPortal } from 'react-dom';
import { DropdownManager } from '../utils/dropdownManager';
import { useLocale } from '../i18n/LocaleContext';

// Define grade options once for use in all components
const GRADE_OPTIONS: Grade[] = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];

// Dropdown Menu component that uses portal to render outside the table
interface DropdownMenuProps {
  onSelectGrade: (grade: Grade) => void;
  triggerRef: React.RefObject<HTMLDivElement | null>;
  // No courseId needed here as it's for the menu itself
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onSelectGrade, triggerRef }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const portalContainerRef = useRef<HTMLElement | null>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  
  // Create a container for the portal that's positioned correctly
  useEffect(() => {
    // Create a positioned container for our portal content
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '0';
    container.style.height = '0';
    container.style.overflow = 'visible';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '300';
    
    // Add to the DOM
    document.body.appendChild(container);
    portalContainerRef.current = container;
    // Defer setState to avoid setState in effect
    setTimeout(() => setPortalContainer(container), 0);
    
    return () => {
      if (portalContainerRef.current && document.body.contains(portalContainerRef.current)) {
        document.body.removeChild(portalContainerRef.current);
      }
      portalContainerRef.current = null;
    };
  }, []);
    // Update dropdown position when trigger position changes
  useEffect(() => {
    if (!triggerRef.current || !portalContainerRef.current) return;
    
    const updatePosition = () => {
      const triggerRect = triggerRef.current!.getBoundingClientRect();
      const dropdownWidth = 220; // Match width in CSS (.grade-dropdown-menu)
        // Calculate position relative to viewport
      let top = triggerRect.bottom; /* No gap – dropdown sits right under input */
      let left = triggerRect.left + (triggerRect.width / 2) - (dropdownWidth / 2) - 10; /* Centered, offset 10px left */
        // Ensure dropdown stays within viewport horizontally
      const viewportWidth = document.documentElement.clientWidth;
      if (left < 10) {
        // Too close to left edge
        left = 10;
      } else if (left + dropdownWidth > viewportWidth - 10) {
        // Too close to right edge
        left = viewportWidth - dropdownWidth - 10;
      }
      
      // Ensure dropdown stays within viewport vertically
      const viewportHeight = document.documentElement.clientHeight;
      const estimatedDropdownHeight = 300; // Approximate max height
      
      if (top + estimatedDropdownHeight > viewportHeight) {
        // Show dropdown above the trigger if not enough space below
        // Adjusted spacing to match the bottom spacing
        top = Math.max(10, triggerRect.top - estimatedDropdownHeight);
      }
      
      // Position the portal container at the scroll position using ref
      if (portalContainerRef.current) {
        portalContainerRef.current.style.transform = `translate(${window.scrollX}px, ${window.scrollY}px)`;
      }
      
      // Set the dropdown position relative to the portal container
      setPosition({ top, left });
    };
    
    updatePosition();
    
    // Update on scroll or resize
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);
    
    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [triggerRef]);
  
  // Stop propagation to prevent parent row hover effects from affecting the dropdown
  useEffect(() => {
    const handleStopPropagation = (e: MouseEvent) => {
      e.stopPropagation();
    };
    
    const menuElement = menuRef.current;
    if (menuElement) {
      menuElement.addEventListener('mouseover', handleStopPropagation);
      menuElement.addEventListener('mouseenter', handleStopPropagation);
      menuElement.addEventListener('mouseleave', handleStopPropagation);
    }
    
    return () => {
      if (menuElement) {
        menuElement.removeEventListener('mouseover', handleStopPropagation);
        menuElement.removeEventListener('mouseenter', handleStopPropagation);
        menuElement.removeEventListener('mouseleave', handleStopPropagation);
      }
    };
  }, []);
    return portalContainer ? createPortal(
    <div 
      className="grade-dropdown-menu"      style={{ 
        top: `${position.top}px`, 
        left: `${position.left}px`
      }}
      ref={menuRef}
    >
      <div className="grade-dropdown-content">
        {GRADE_OPTIONS.map((grade, index) => (
          <React.Fragment key={grade}>
            <button
              className="grade-dropdown-option"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSelectGrade(grade);
              }}
              style={getGradeStyles(grade)}
              type="button"
            >
              {grade}
            </button>
            {index < GRADE_OPTIONS.length - 1 && (
              <div className="grade-dropdown-separator"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>,
    portalContainer
  ) : null;
};

// Main GradeDropdown component
interface GradeDropdownProps {
  courseId: string; // Still useful for unique IDs, e.g., for closeAllDropdowns
  courseName: string; // For aria-label
  onSelectGrade: (courseId: string, grade: Grade) => void;
  currentGrade?: Grade | null;
  displayMode?: 'badge' | 'input' | 'pill';
}

const GradeDropdown: React.FC<GradeDropdownProps> = ({ 
  courseId, 
  courseName, 
  onSelectGrade, 
  currentGrade,
  displayMode = 'badge'
}) => {
  const { t } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownManager = DropdownManager.getInstance();
  const dropdownId = `grade-${courseId}`;
  
  // Register with dropdown manager
  useEffect(() => {
    const closeCallback = () => setIsOpen(false);
    dropdownManager.register(dropdownId, closeCallback);
    
    return () => {
      dropdownManager.unregister(dropdownId);
    };
  }, [dropdownId, dropdownManager]);
  
  // Add class to parent row when dropdown is open to fix z-index issues
  useEffect(() => {
    if (!dropdownRef.current) return;
    
    const tableRow = dropdownRef.current.closest('tr');
    if (tableRow) {
      if (isOpen) {
        tableRow.classList.add('dropdown-open');
      } else {
        tableRow.classList.remove('dropdown-open');
      }
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        dropdownManager.closeDropdown(dropdownId);
      }
    }

    if (isOpen) {
      // Add a slight delay to ensure the click event doesn't immediately close the dropdown
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 10);
      
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen, dropdownId, dropdownManager]);
  
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isOpen) {
      // Opening dropdown - close all others first
      dropdownManager.openDropdown(dropdownId);
      setIsOpen(true);
    } else {
      // Closing dropdown
      dropdownManager.closeDropdown(dropdownId);
      setIsOpen(false);
    }
  };

  const handleGradeSelect = (grade: Grade) => {
    onSelectGrade(courseId, grade);
    setIsOpen(false);
    dropdownManager.closeDropdown(dropdownId);
  };
  
  return (
    <>
      <style jsx global>{`/* Grade Dropdown Styling */
.grade-dropdown {
  position: relative;
  display: inline-block;
  width: 100%; /* Make the dropdown take the full width of its container */
}

.grade-dropdown-input-mode {
  width: 100%; /* Ensure input mode takes full width */
  display: block; /* Change from inline-block to block for full width */
}

.grade-dropdown-input-mode .grade-dropdown-trigger.form-input-style-trigger {
  width: 100%;
  min-width: 0;
  height: 48px;
  min-height: 48px;
  margin-inline-start: 0;
  border-radius: var(--radius-md);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  padding: 0 var(--space-lg);
  box-sizing: border-box;
}

.grade-dropdown-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: var(--gray-100);
  color: var(--gray-600);
  border: none;
  border-radius: 50%;
  font-size: var(--text-sm);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-base);
  text-align: center;
  position: relative;
  padding: 0;
  margin-left: 8px; /* Fixed distance from badge */
}

.grade-dropdown-trigger:not(.grade-dropdown-pill):hover {
  background: var(--gray-200);
}

.grade-dropdown-trigger:active {
  transform: translateY(0);
}

.grade-dropdown-trigger-compact {
  min-width: auto;
  width: 24px;
  height: 24px;
  padding: 0;
  box-shadow: var(--shadow-xs);
}

.grade-dropdown-pill {
  width: auto;
  min-width: 72px;
  height: 36px;
  min-height: 36px;
  margin: 0;
  padding: 0 var(--space-sm) 0 var(--space-md);
  border-radius: var(--radius-full);
  justify-content: space-between;
  gap: var(--space-xs);
  border: 1px solid transparent;
  box-shadow: none;
  font-weight: 650;
  font-size: var(--text-sm);
  line-height: 1;
}

.grade-dropdown-pill.empty-grade-pill {
  background: var(--gray-100);
  color: var(--gray-600);
  border-color: var(--gray-200);
}

.grade-dropdown-pill:hover {
  filter: brightness(0.94);
}

.grade-dropdown-pill.empty-grade-pill:hover {
  background: var(--gray-200);
  filter: none;
}

.grade-dropdown-pill-value {
  flex: 1;
  text-align: center;
  min-width: 0;
}

.grade-dropdown-pill .grade-dropdown-arrow {
  width: 10px;
  height: 10px;
  opacity: 0.9;
  flex-shrink: 0;
}

.grade-dropdown-text {
  flex-shrink: 0;
}

.grade-dropdown-arrow {
  transition: var(--transition-base);
  flex-shrink: 0;
  width: 8px; /* Smaller arrow */
  height: 8px; /* Smaller arrow */
}

.grade-dropdown-arrow.open {
  transform: rotate(180deg);
}

.grade-dropdown-menu {
  position: absolute; /* Use absolute positioning within the portal */
  z-index: var(--z-dropdown); /* Above table rows, below modals */
  width: 220px; /* Wider to suit form input and options */
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  overflow: hidden; /* Changed from visible to hidden for clean edges */
  animation: dropdownSlideIn 0.25s var(--ease-out);
  box-shadow: var(--shadow-md);
  /* Force the dropdown to appear in its own stacking context to fix flickering issues */
  isolation: isolate;
  pointer-events: auto; /* Ensure clicks work properly */
  margin-top: 0; /* Dropdown right under trigger */
}

/* Removed arrow pointer */

.grade-dropdown-content {
  max-height: 300px;
  overflow-y: auto;
  padding: var(--space-md); /* Increased padding */
  scrollbar-width: thin;
  scrollbar-color: var(--gray-300) transparent;
}

.grade-dropdown-content::-webkit-scrollbar {
  width: 6px;
}

.grade-dropdown-content::-webkit-scrollbar-track {
  background: transparent;
}

.grade-dropdown-content::-webkit-scrollbar-thumb {
  background-color: var(--gray-300);
  border-radius: 3px;
}

.grade-dropdown-option {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: var(--space-md) var(--space-lg);
  border: none;
  border-radius: var(--radius-md); /* More rounded */
  font-size: var(--text-sm);
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: var(--transition-fast);
  margin-bottom: 4px; /* Slightly increased spacing */
  color: white !important;
  height: 36px; /* Slightly increased height for better touch targets */
}

.grade-dropdown-option:last-child {
  margin-bottom: 0;
}

.grade-dropdown-option:hover {
  transform: scale(1.02); /* Subtler scale effect */
  box-shadow: var(--shadow-sm);
  filter: brightness(1.05); /* Subtle brightness increase */
}

/* Fix for dropdown to stay above other elements and avoid flickering */
.grade-dropdown-option:hover::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1; /* Behind the option */
}

.grade-dropdown-separator {
  height: 1px;
  background: var(--gray-200);
  margin: 6px 12px; /* More spacing around separators */
  border-radius: var(--radius-full); /* Rounded edges for separator */
}

@keyframes dropdownSlideIn {
  0% {
    opacity: 0;
    transform: translateY(-4px);
    scale: 0.98;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    scale: 1;
  }
}

/* Table row controls: 44px touch targets at all breakpoints */
.course-table .grade-dropdown-trigger:not(.form-input-style-trigger):not(.grade-dropdown-pill) {
  min-width: 44px;
  min-height: 44px;
  width: 44px;
  height: 44px;
  padding: 0;
}

.course-table .grade-dropdown-pill {
  width: var(--clist-pill-w, 54px);
  min-width: var(--clist-pill-w, 54px);
  max-width: var(--clist-pill-w, 54px);
  height: var(--clist-pill-h, 28px);
  min-height: var(--clist-pill-h, 28px);
  margin: 0;
  padding: 0 6px 0 8px;
  font-size: 0.75rem;
  gap: 4px;
}

.course-table .grade-dropdown-pill .grade-dropdown-arrow {
  width: 8px;
  height: 8px;
}

/* Responsive Grade Dropdown */
@media (max-width: 768px) {
  .grade-dropdown-trigger:not(.form-input-style-trigger):not(.grade-dropdown-pill) {
    min-width: 20px;
    width: 20px;
    height: 20px;
    padding: 0;
    font-size: var(--text-xs);
  }

  .course-table .grade-dropdown-trigger:not(.form-input-style-trigger):not(.grade-dropdown-pill) {
    min-width: 44px;
    min-height: 44px;
    width: 44px;
    height: 44px;
  }

  .course-table .grade-dropdown-pill {
    width: var(--clist-pill-w, 50px);
    min-width: var(--clist-pill-w, 50px);
    max-width: var(--clist-pill-w, 50px);
    height: var(--clist-pill-h, 28px);
    min-height: var(--clist-pill-h, 28px);
  }
  
  .grade-dropdown-option {
    padding: var(--space-xs) var(--space-sm);
    font-size: var(--text-xs);
    height: 28px; /* Smaller height on mobile */
  }
  
  .grade-dropdown-menu {
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15); /* Stronger shadow on mobile */
    width: 140px; /* Slightly narrower on mobile */
  }  .course-grade-badge {
    min-width: 40px; /* Maintain consistent size */
    width: 40px;
    height: 28px;
    padding: 0;
    font-size: var(--text-xs);
  }
}

/* Even smaller screens â€“ touch targets at least 44px */
@media (max-width: 480px) {
  .grade-dropdown-menu {
    width: 120px;
  }

  .grade-dropdown-option {
    min-height: 44px;
    height: auto;
    padding: var(--space-sm) var(--space-md);
  }

  /* Compact trigger in table: 44px touch target */
  .course-table .grade-dropdown-trigger {
    min-width: 44px;
    min-height: 44px;
    width: 44px;
    height: 44px;
  }

  .course-grade-badge {
    min-width: 40px;
    width: 40px;
    height: 28px;
    padding: 0;
    font-size: var(--text-xs);
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .top-box,
  .table-box,
  .gpa-display {
    background: var(--white);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border: 2px solid var(--border-color);
  }
  
  .form-input,
  .form-select,
  .course-form .credit-hours-input,
  .course-form .grade-dropdown-input-mode .grade-dropdown-trigger.form-input-style-trigger {
    background: var(--white);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border: 2px solid var(--border-color);
  }
}`}</style>
    <div className={`grade-dropdown ${displayMode === 'input' ? 'grade-dropdown-input-mode' : ''} ${displayMode === 'pill' ? 'grade-dropdown-pill-mode' : ''}`} ref={dropdownRef}>
      <button
        id={displayMode === 'input' && courseId === 'form-grade' ? 'courseGrade-trigger' : undefined}
        className={`grade-dropdown-trigger ${
          displayMode === 'input'
            ? 'form-input-style-trigger'
            : displayMode === 'pill'
              ? `grade-dropdown-pill${currentGrade ? '' : ' empty-grade-pill'}`
              : currentGrade
                ? 'grade-dropdown-trigger-compact'
                : ''
        }`}
        style={displayMode === 'pill' && currentGrade ? getGradeStyles(currentGrade) : undefined}
        onClick={handleToggle}
        aria-label={currentGrade ? t('aria.changeGrade', { name: courseName }) : t('aria.selectGrade', { name: courseName })}
        aria-expanded={isOpen}
        type="button"
      >
        {displayMode === 'input' && (
          <span className="grade-dropdown-input-text">
            {currentGrade || t('form.selectGrade')}
          </span>
        )}
        {displayMode === 'pill' && (
          <span className="grade-dropdown-pill-value">{currentGrade ?? '-'}</span>
        )}
        <svg 
          className={`grade-dropdown-arrow ${isOpen ? 'open' : ''}`}
          width={displayMode === 'pill' ? 10 : 14}
          height={displayMode === 'pill' ? 10 : 14} 
          viewBox="0 0 12 12" 
          fill="currentColor"
        >
          <path d="M6 8.5C5.88079 8.5 5.76159 8.45746 5.66967 8.37239L2.16967 5.37239C1.94678 5.18863 1.9155 4.85904 2.09926 4.63615C2.28301 4.41325 2.61261 4.38197 2.8355 4.56573L6 7.29194L9.1645 4.56573C9.38739 4.38197 9.71699 4.41325 9.90074 4.63615C10.0845 4.85904 10.0532 5.18863 9.83033 5.37239L6.33033 8.37239C6.23841 8.45746 6.11921 8.5 6 8.5Z"/>
        </svg>
      </button>
      
      {isOpen && (
        <DropdownMenu 
          onSelectGrade={handleGradeSelect} 
          triggerRef={dropdownRef}
        />
      )}
    </div>
    </>
  );
};

export default GradeDropdown;
