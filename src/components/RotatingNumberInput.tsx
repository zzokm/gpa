// EnhancedRotatingNumberInput.tsx
import React, { useEffect, useRef, useState } from 'react';
import './RotatingNumberInput.css';
import './MobileCreditHoursOverride.css'; // Mobile override to fix display issues

interface RotatingNumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

const EnhancedRotatingNumberInput: React.FC<RotatingNumberInputProps> = ({
  value,
  onChange,
  min = 0,
  max = 3,
  disabled = false
}) => {
  const stripRef = useRef<HTMLDivElement>(null);
  const [numbers, setNumbers] = useState<number[]>([]);

  // Initialize the array of possible numbers
  useEffect(() => {
    const nums: number[] = [];
    for (let i = min; i <= max; i++) {
      nums.push(i);
    }
    setNumbers(nums);
  }, [min, max]);  // Update display to show the current value with perfect centering
  const updateDisplay = () => {
    if (!stripRef.current) return;
    
    // Get precise measurements of our components
    const containerElement = stripRef.current.closest('.perspective-container') as HTMLElement;
    
    // Enhanced responsive width function with better mobile detection
    const getResponsiveWidth = () => {
      // Use safer window measurements to avoid incorrect behavior on mobile devices
      const screenWidth = Math.min(
        window.innerWidth || Infinity,
        document.documentElement.clientWidth || Infinity,
        document.body.clientWidth || Infinity
      );
      
      // Force minimum viable widths based on screen size to prevent disappearing
      if (screenWidth <= 360) {
        return 36; // Very small screens (small mobile phones)
      } else if (screenWidth <= 480) {
        return 40; // Small screens (most mobile phones)
      } else {
        return 50; // Larger screens (tablets and desktops)
      }
    };
    
    // Item width must be strictly controlled
    const itemWidth = getResponsiveWidth();
    
    // Using exact measurements instead of relying on often incorrect clientWidth
    const containerWidth = containerElement?.offsetWidth || 200;
    
    // Calculate the center position of the container
    const containerCenter = Math.floor(containerWidth / 2);
    
    // Calculate the position index of the current value
    const currentIndex = numbers.indexOf(value);
    
    // Calculate the offset needed to center the current value perfectly    // The formula is: container middle point - (position of item * item width) - (half item width)
    const offset = containerCenter - (currentIndex * itemWidth) - (itemWidth / 2);
    
    // Apply the transform to position the strip correctly using CSS variable
    stripRef.current.style.setProperty('--x-offset', `${offset}px`);
    
    // Also set inline transform as a fallback for browsers that don't support CSS variables
    stripRef.current.style.transform = `translateY(-50%) translateX(${offset}px)`;
    
    // Ensure positioning is correct with direct style
    stripRef.current.style.left = '0';
    stripRef.current.style.top = '50%';
    
    // Force consistent width on all number items
    const numberItems = stripRef.current.querySelectorAll('.number-item') as NodeListOf<HTMLDivElement>;
    
    // Force consistent width on all number items
    numberItems.forEach((item) => {
      item.style.width = `${itemWidth}px`;
      item.style.minWidth = `${itemWidth}px`;
      item.style.maxWidth = `${itemWidth}px`;
      item.style.flex = `0 0 ${itemWidth}px`;
      item.style.boxSizing = 'border-box';
      item.style.margin = '0';
      item.style.padding = '0';
      item.style.textAlign = 'center';
      item.style.display = 'flex';
      item.style.justifyContent = 'center';
      item.style.alignItems = 'center';
    });
      // Apply styling based on position relative to active number
    numberItems.forEach((item) => {
      const itemValue = parseInt(item.dataset.value || '0', 10);
      
      if (itemValue === value) {
        // Active number styling - clear and prominent
        item.style.transform = 'translateZ(15px) scale(1.15)';
        item.style.color = '#111827';
        item.style.fontWeight = '800';
        item.style.opacity = '1';
        item.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.2)';
        item.style.background = 'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)';
        item.style.filter = 'none'; // Clear any blur effects on active number
      } else {
        // Inactive number styling with enhanced blur
        const distance = Math.abs(itemValue - value);
        const scale = Math.max(0.4, 1 - (distance * 0.2));
        const opacity = Math.max(0.2, 1 - (distance * 0.35));
        
        // Apply much stronger blur for numbers behind glass panes
        const blurAmount = distance <= 1 ? 4 : 6; // Increased blur strength
        
        item.style.transform = `scale(${scale}) translateZ(-${distance * 15}px)`;
        item.style.color = distance <= 1 ? '#4b5563' : '#6b7280';
        item.style.fontWeight = distance <= 1 ? '500' : '400';
        item.style.opacity = opacity.toString();
        item.style.textShadow = 'none';
        item.style.background = 'none';
        item.style.filter = `blur(${blurAmount}px) opacity(${opacity})`;
      }
    });
  };// Enhanced effect for perfect positioning in all scenarios
  useEffect(() => {
    // Initial update with the current value
    updateDisplay();
    
    // Create debounced resize handler to prevent too many updates
    // which could cause performance issues on frequent window resizing
    let resizeTimeout: number;
    const handleResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        updateDisplay();
      }, 100); // Debounce time of 100ms
    };
    
    // Add resize listener for responsive updates
    window.addEventListener('resize', handleResize);
    
    // Series of timed updates to handle any layout shifts during initial render
    // First immediate update attempt
    updateDisplay();
    
    // Second update after very short delay (DOM painted but may still be adjusting)
    const quickUpdateTimer = setTimeout(() => {
      updateDisplay();
    }, 10);
    
    // Final update after layout should be fully stable
    const finalUpdateTimer = setTimeout(() => {
      updateDisplay();
    }, 100);
      // Clean up all listeners and timers on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      window.clearTimeout(resizeTimeout);
      window.clearTimeout(quickUpdateTimer);
      window.clearTimeout(finalUpdateTimer);
    };
  }, [value, numbers, min, max]); // Added min/max to dependencies for better handling of range changes

  // Improved shake animation function with guaranteed return to exact center
  const animateShake = (direction: 'left' | 'right') => {
    if (!stripRef.current) return;
    
    // Calculate and ensure we start from the exact center position
    updateDisplay();
    
    // Capture the exact centered position as our reference point
    const initialCenterPosition = stripRef.current.style.getPropertyValue('--x-offset');
    
    // Remove any existing animation classes first
    stripRef.current.classList.remove('animating', 'shaking');
    
    // Force reflow to ensure clean animation state
    stripRef.current.offsetHeight;
    
    // Add shaking class for the animation
    stripRef.current.classList.add('shaking');
    
    // Apply the shake animation with CSS
    stripRef.current.style.transition = 'transform 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97)';
    
    // Sequence of small movements for directional shake effect
    // Direction-aware - stronger initial movement in the direction user tried to go
    const shakeMultiplier = direction === 'left' ? -1 : 1;
    const shakeSequence = [
      { offset: 5 * shakeMultiplier, delay: 0 },     // Stronger in the attempted direction
      { offset: -3.5 * shakeMultiplier, delay: 80 },  // Opposite reaction
      { offset: 2 * shakeMultiplier, delay: 160 },   // Small follow-through
      { offset: -1 * shakeMultiplier, delay: 240 },  // Small counter-reaction
      { offset: 0, delay: 300 }                     // Return to center
    ];
    
    // Execute the shake sequence
    shakeSequence.forEach(step => {
      setTimeout(() => {
        if (stripRef.current) {
          // Use the initial center position as the base for calculations
          const numericBaseOffset = parseFloat(initialCenterPosition || '0px');
          const shakeOffset = `${numericBaseOffset + step.offset}px`;
          
          // Apply the offset for this step of the animation
          stripRef.current.style.setProperty('--x-offset', shakeOffset);
          stripRef.current.style.transform = `translateY(-50%) translateX(${shakeOffset})`;
          
          // When returning to center position
          if (step.offset === 0) {
            setTimeout(() => {
              if (stripRef.current) {
                // Remove animation class
                stripRef.current.classList.remove('shaking');
                
                // Reset to normal transition
                stripRef.current.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                
                // First set exact center using the initial position
                stripRef.current.style.setProperty('--x-offset', initialCenterPosition);
                stripRef.current.style.transform = `translateY(-50%) translateX(${initialCenterPosition})`;
                
                // Then recalculate to ensure perfect positioning
                updateDisplay();
              }
            }, 100);
          }
        }
      }, step.delay);
    });
  };

  const handlePrev = () => {
    if (disabled) return;
    
    let newValue = value - 1;
    
    // No wrap-around logic, instead show shake animation at min limit
    if (newValue < min) {
      animateShake('left'); // Apply directional shake animation to indicate min limit reached
      return; // Don't update the value
    }
    
    onChange(newValue);
  };

  const handleNext = () => {
    if (disabled) return;
    
    let newValue = value + 1;
    
    // No wrap-around logic, instead show shake animation at max limit
    if (newValue > max) {
      animateShake('right'); // Apply directional shake animation to indicate max limit reached
      return; // Don't update the value
    }
    
    onChange(newValue);
  };  return (
    <div className="credit-hours-input">      
      <div className="perspective-container">
        <div className="number-dial-viewport">
          <div ref={stripRef} id="number-strip" className="number-strip" style={{ '--x-offset': '0px' } as React.CSSProperties}>
            {numbers.map((num) => (
              <div 
                key={num} 
                className={`number-item ${num === value ? 'active' : 
                  num === value - 1 || (value === min && num === max) ? 'prev' : 
                  num === value + 1 || (value === max && num === min) ? 'next' : ''}`}
                data-value={num}
                aria-selected={num === value}
              >
                {num}
              </div>
            ))}
          </div>
        </div>
          {/* The Glass Overlay Panes with integrated arrows */}
        <div className="glass-pane-left" onClick={handlePrev} style={{ pointerEvents: disabled ? 'none' : 'auto', cursor: disabled ? 'not-allowed' : 'pointer' }}>
          <div className="arrow-button" style={{ left: '5px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </div>
        </div>
        <div className="glass-pane-right" onClick={handleNext} style={{ pointerEvents: disabled ? 'none' : 'auto', cursor: disabled ? 'not-allowed' : 'pointer' }}>
          <div className="arrow-button" style={{ right: '5px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>
        
        {/* Central viewing window with thin border */}
        <div className="center-window"></div>
      </div>
    </div>
  );
};

export default EnhancedRotatingNumberInput;
