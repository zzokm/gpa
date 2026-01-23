// filepath: d:\Yehia's Uni files\gpaCalc\src\components\GradeDropdown.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Grade } from '../types/Course';
import { getGradeStyles } from '../utils/gradeUtils';
import { createPortal } from 'react-dom';
import { DropdownManager } from '../utils/dropdownManager';

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
    container.style.zIndex = '100000';
    
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
      const dropdownWidth = 165; // Match width in CSS
        // Calculate position relative to viewport
      let top = triggerRect.bottom + 8; // Closer to the arrow but still with some visual separation
      let left = triggerRect.left + (triggerRect.width / 2) - (dropdownWidth / 2); // Center without transform
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
        top = Math.max(10, triggerRect.top - estimatedDropdownHeight - 8);
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
  displayMode?: 'badge' | 'input'; // New prop for styling
}

const GradeDropdown: React.FC<GradeDropdownProps> = ({ 
  courseId, 
  courseName, 
  onSelectGrade, 
  currentGrade,
  displayMode = 'badge' // Default to 'badge'
}) => {
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
    <div className={`grade-dropdown ${displayMode === 'input' ? 'grade-dropdown-input-mode' : ''}`} ref={dropdownRef}>
      <button
        className={`grade-dropdown-trigger ${
          displayMode === 'input' 
            ? 'form-input-style-trigger' 
            : currentGrade ? 'grade-dropdown-trigger-compact' : ''
        }`}
        onClick={handleToggle}
        aria-label={`${currentGrade ? 'Change' : 'Select'} grade for ${courseName}`}
        aria-expanded={isOpen}
        type="button"
      >
        {displayMode === 'input' && (
          <span className="grade-dropdown-input-text">
            {currentGrade || 'Select Grade'}
          </span>
        )}        <svg 
          className={`grade-dropdown-arrow ${isOpen ? 'open' : ''}`} 
          width="8" 
          height="8" 
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
  );
};

export default GradeDropdown;
