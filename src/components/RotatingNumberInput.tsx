// EnhancedRotatingNumberInput.tsx
import React, { useEffect, useRef } from 'react';
// Mobile override to fix display issues
import { useLocale } from '../i18n/LocaleContext';
import {
  CREDIT_HOURS_OPTIONS,
  getNextCreditHours,
  getPrevCreditHours,
  isValidCreditHours,
  normalizeCreditHours,
} from '../utils/creditHours';

const ARABIC_NUMERALS = '٠١٢٣٤٥٦٧٨٩';

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function stripTransition(reduced = prefersReducedMotion()): string {
  return reduced ? 'none' : 'transform 0.4s var(--ease-out-quart)';
}

function formatNumberForLocale(n: number, locale: string): string {
  if (locale !== 'ar-EG') return String(n);
  return String(n).replace(/\d/g, (d) => ARABIC_NUMERALS[parseInt(d, 10)] ?? d);
}

interface RotatingNumberInputProps {
  value: number;
  onChange: (value: number) => void;
  options?: readonly number[];
  disabled?: boolean;
}

const EnhancedRotatingNumberInput: React.FC<RotatingNumberInputProps> = ({
  value,
  onChange,
  options = CREDIT_HOURS_OPTIONS,
  disabled = false
}) => {
  const { locale } = useLocale();
  const stripRef = useRef<HTMLDivElement>(null);
  const numbers = [...options];

  useEffect(() => {
    if (!isValidCreditHours(value)) {
      onChange(normalizeCreditHours(value));
    }
  }, [value, onChange]);

  // Update display to show the current value with perfect centering
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
        // Inactive number styling - blur behind panes, farther numbers a bit bigger
        const distance = Math.abs(itemValue - value);
        const scale = Math.max(0.7, 1 - (distance * 0.15));
        const opacity = Math.max(0.2, 1 - (distance * 0.35));
        
        item.style.transform = `scale(${scale}) translateZ(-${distance * 15}px)`;
        item.style.color = distance <= 1 ? '#4b5563' : '#6b7280';
        item.style.fontWeight = distance <= 1 ? '500' : '400';
        item.style.opacity = opacity.toString();
        item.style.textShadow = 'none';
        item.style.background = 'none';
        item.style.filter = distance <= 1 ? 'blur(2.5px) opacity(0.75)' : 'blur(4px) opacity(0.6)';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, numbers]); // updateDisplay is stable and dependencies are covered

  // Improved shake animation function with guaranteed return to exact center
  const animateShake = (direction: 'left' | 'right') => {
    if (!stripRef.current) return;

    if (prefersReducedMotion()) return;
    
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
                stripRef.current.style.transition = stripTransition();
                
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

    const newValue = getPrevCreditHours(value);
    if (newValue === null) {
      animateShake('left');
      return;
    }

    onChange(newValue);
  };

  const handleNext = () => {
    if (disabled) return;

    const newValue = getNextCreditHours(value);
    if (newValue === null) {
      animateShake('right');
      return;
    }

    onChange(newValue);
  };

  const currentIdx = numbers.indexOf(value);
  const prevValue = currentIdx > 0 ? numbers[currentIdx - 1] : undefined;
  const nextValue =
    currentIdx >= 0 && currentIdx < numbers.length - 1 ? numbers[currentIdx + 1] : undefined;

  return (
    <>
      <style jsx global>{`/* Rotating Number Input with Glass Overlay - Enhanced Version (Consolidated) */

/* ====== Main Wrapper ====== */
/* Outer: backdrop-filter blur, no overflow - allows blur to render; overflow on inner wrapper */
.credit-hours-input {
  position: relative;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  flex: 1 !important;
  min-width: 200px !important; /* Match other form inputs - never allow smaller */
  width: 100% !important; /* Match other form inputs width */
  height: 50px !important;
  background: var(--glass-bg) !important;
  backdrop-filter: var(--glass-blur) !important;
  -webkit-backdrop-filter: var(--glass-blur) !important;
  border: 1px solid var(--glass-border) !important;
  border-radius: var(--radius-md) !important;
  isolation: isolate !important; /* Stacking context for backdrop-filter */
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 2px 6px rgba(0, 0, 0, 0.04) !important; /* Match other form inputs exactly */
  transition: var(--transition-base) !important;
  box-sizing: border-box !important;
  flex-shrink: 0 !important;
  visibility: visible !important;
  opacity: 1 !important;
}

/* Inner: overflow hidden clips strip; blur stays on parent so backdrop-filter works */
.credit-hours-input-inner {
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  min-width: 0;
}
.credit-hours-input:focus-within {
  border-color: rgba(255, 121, 85, 0.6) !important; /* Match other form inputs exactly */
  box-shadow: 0 0 0 3px rgba(255, 121, 85, 0.15) !important; /* Match other form inputs exactly */
  background: rgba(255, 255, 255, 0.25) !important; /* Match other form inputs exactly */
  transform: translateY(-1px) !important; /* Match other form inputs exactly */
}

/* ====== Perspective Container ====== */
/* Glass panes (.glass-pane-left, .glass-pane-right) are siblings of this container, not children, so their backdrop-filter blurs the full input interior */
.perspective-container {
  perspective: 1200px;
  flex: 1 !important;
  height: 100%;
  display: flex !important;
  align-items: center;
  justify-content: center;
  position: relative !important;
  overflow: hidden !important;
  perspective-origin: 50% 50%;
  min-width: 60px !important;
  z-index: 1 !important;
  isolation: isolate !important;
}
.perspective-container::before,
.perspective-container::after {
  content: "" !important;
  position: absolute !important;
  top: 0 !important;
  height: 100% !important;
  width: calc(50% - 25px) !important;
  z-index: 90 !important;  pointer-events: none !important;
  backdrop-filter: blur(4px) saturate(110%) !important; /* Further reduced blur for even better visibility of numbers behind */
  -webkit-backdrop-filter: blur(4px) saturate(110%) !important;
}
.perspective-container::before { 
  left: 0 !important; 
  background: linear-gradient(to right, rgba(255, 255, 255, 0.08) 0%, transparent 100%) !important; /* Further reduced from 0.15 to 0.08 for maximum transparency */
}
.perspective-container::after { 
  right: 0 !important; 
  background: linear-gradient(to left, rgba(255, 255, 255, 0.08) 0%, transparent 100%) !important; /* Further reduced from 0.15 to 0.08 for maximum transparency */
}

/* ====== Number Strip & Items ====== */
.number-dial-viewport {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: visible;
}
.number-strip {
  display: flex;
  transform-style: preserve-3d;
  position: absolute;
  height: 100%;
  align-items: center;
  width: max-content;
  transform-origin: 50% 50%;
  will-change: transform;
  z-index: 30;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000;
  perspective: 1000;
  left: 0;
  top: 0;
  transition: transform 0.4s var(--ease-out-quart) !important;
}
.number-strip.animating {
  transition: transform 0.85s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
}
.number-item {
  width: 50px;
  min-width: 50px;
  max-width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  color: #1f2937;
  backface-visibility: hidden;
  position: relative;
  transform: scale(1);
  opacity: 1;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex: 0 0 50px;
  font-smooth: always;
  -webkit-font-smoothing: subpixel-antialiased;
  user-select: none;
  transition: 
    transform 0.4s ease,
    color 0.4s ease,
    opacity 0.4s ease,
    filter 0.3s ease,
    text-shadow 0.3s ease !important;
  font-size: 1.25rem !important;
  text-rendering: optimizeLegibility !important;
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
  z-index: 35 !important;
}
.animating .number-item {
  transition: 
    transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    color 0.4s ease,
    filter 0.4s ease !important;
}
/* Inactive items: stronger blur so panes look frosted; active stays crisp */
.number-item:not(.active) { 
  z-index: 20 !important; 
  filter: blur(2.5px) opacity(0.85);
}
.number-item.prev, .number-item.next { 
  filter: blur(2.5px) opacity(0.75);
}
.number-item.prev {
  opacity: 0.75;
  transform: translateX(-55px) translateZ(-25px) scale(0.78);
  color: #6b7280;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.05);
  filter: blur(2.5px) opacity(0.75);
}
.number-item.next {
  opacity: 0.75;
  transform: translateX(55px) translateZ(-25px) scale(0.78);
  color: #6b7280;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.05);
  filter: blur(2.5px) opacity(0.75);
}
/* Active number: no overlay on top, so it stays sharp (distortion was from ::after glow) */
.number-item.active {
  opacity: 1;
  transform: translateZ(20px) scale(1.2);
  color: #111827;
  position: relative;
  font-weight: 800;
  letter-spacing: -0.01em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
  isolation: isolate !important;
  z-index: 100 !important;
  filter: none !important;
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
  text-rendering: optimizeLegibility !important;
}
.number-item.active::after {
  display: none; /* was causing blurred/glow overlay on the number */
}
@keyframes pulse {
  0% { opacity: 0.5; transform: scale(0.96); }
  40% { opacity: 0.65; transform: scale(1.03); }
  70% { opacity: 0.55; transform: scale(0.99); }
  100% { opacity: 0.7; transform: scale(1.01); }
}

/* ====== Glass Panes (frosted glass) ====== */
/* Panes are siblings of .perspective-container so backdrop is full input interior */
.glass-pane-left,
.glass-pane-right {
  position: absolute !important;
  top: 0 !important;
  height: 100% !important;
  pointer-events: auto !important;
  z-index: 100 !important;
  width: calc(50% - 25px) !important;
  background: rgba(255, 255, 255, 0.12) !important;
  -webkit-transform: translateZ(0) !important;
  transform: translateZ(0) !important;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.15);
  transition: all 0.25s ease !important;
  -webkit-tap-highlight-color: transparent !important;
  backdrop-filter: blur(20px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
}
.glass-pane-left {
  left: 0 !important;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.12) 30%,
    rgba(255, 255, 255, 0.06) 70%,
    transparent 100%
  );
}
.glass-pane-right {
  right: 0 !important;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  background-image: linear-gradient(
    to left,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.12) 30%,
    rgba(255, 255, 255, 0.06) 70%,
    transparent 100%
  );
}
/* Removed glass pane hover effects for cleaner interaction */

/* ====== Center Window ====== */
.center-window {
  position: absolute !important;
  width: 50px !important;
  height: 100% !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  top: 0 !important;
  margin: 0;
  background: transparent !important;
  border-left: none !important;
  border-right: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  pointer-events: none !important;
  z-index: 25 !important; /* below number-strip (30) and active (100) so numbers render crisp on top */
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 
             inset 0 0 6px rgba(255, 255, 255, 1),
             0 0 2px rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.6) !important;
  border-top: 0 !important;
  border-bottom: 0 !important;
}
.center-window::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  pointer-events: none;
}

/* ====== Arrow Buttons ====== */
.arrow-button {
  position: absolute !important;
  top: 0 !important;
  height: 100% !important;
  width: 40px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  z-index: 200 !important;
  pointer-events: none !important;
}
.arrow-button svg {
  transition: transform 0.25s ease !important;
  color: #2d3748 !important;  width: 20px !important;
  height: 20px !important;
}
/* Removed glass pane arrow hover effects for cleaner interaction */

.credit-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  min-width: 40px;
  flex-shrink: 0 !important;
  height: 100%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
  color: rgba(60, 70, 90, 0.8);
  position: relative;
  z-index: 6;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03), inset 0 0 0 1px rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-sm);
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
}
.credit-arrow:hover {
  background: rgba(255, 255, 255, 0.25);
  color: rgba(50, 60, 80, 0.95);
  backdrop-filter: blur(5px) saturate(150%);
  -webkit-backdrop-filter: blur(5px) saturate(150%);
  transform: translateY(-1px);
}
.credit-arrow:hover:not(:disabled) {
  background: linear-gradient(
    to bottom,
    rgba(255, 140, 110, 0.25) 0%,
    rgba(255, 121, 85, 0.2) 100%
  );
  transform: scale(1.05);
  box-shadow: 0 2px 12px rgba(255, 120, 85, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.3);
}
.credit-arrow:active:not(:disabled) {
  background: linear-gradient(
    to bottom,
    rgba(255, 121, 85, 0.25) 0%,
    rgba(255, 100, 70, 0.3) 100%
  );
  transform: scale(0.95);
  transition: all 0.1s ease;
}
.credit-arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: var(--text-muted);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
}
.credit-arrow svg {
  width: 20px;
  height: 20px;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1));
}
.credit-arrow-left {
  border-right: 1px solid rgba(200, 220, 240, 0.3);
  background-image: linear-gradient(
    to left,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 1) 80%,
    rgba(255, 255, 255, 1) 100%
  );
  position: relative;
  overflow: hidden;
}
.credit-arrow-left::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 50%);
  pointer-events: none;
}
.credit-arrow-right {
  border-left: 1px solid rgba(200, 220, 240, 0.3);
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 20%,
    rgba(255, 255, 255, 0.4) 100%
  );
  position: relative;
  overflow: hidden;
}
.credit-arrow-right::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(225deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 50%);
  pointer-events: none;
}

/* ====== Responsive & Mobile - Comprehensive Fixes ====== */
/* Breakpoints: 768px (--bp-md), 480px (--bp-sm), 360px (--bp-xs). Override index.css where needed. */

/* Global mobile fix to prevent thin white line issue */
@media (max-width: 768px) {
  .credit-hours-input {
    height: 50px !important; /* Force consistent height */
    min-width: 200px !important; /* Force minimum width */
    width: 100% !important; /* Take full available width */
    max-width: none !important; /* Remove any max-width restrictions */
    flex-shrink: 0 !important;
    display: flex !important; /* Force flex display */
    align-items: center !important;
    justify-content: space-between !important;
    visibility: visible !important;
    opacity: 1 !important;
    background: rgba(255, 255, 255, 0.35) !important; /* Ensure background is visible */
    border: 2px solid rgba(255, 255, 255, 0.5) !important; /* Ensure border is visible */
    box-sizing: border-box !important;
    isolation: isolate !important;
  }
  
  .credit-hours-input-inner {
    overflow: hidden !important;
  }
  
  .perspective-container {
    min-width: 120px !important;
    flex: 1 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    visibility: visible !important;
    opacity: 1 !important;
    height: 100% !important;
  }
  
  .number-item {
    width: 45px !important;
    min-width: 45px !important;
    max-width: 45px !important;
    flex: 0 0 45px !important;
    font-size: 1.1rem !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
  
  .glass-pane-left,
  .glass-pane-right {
    width: calc(50% - 22px) !important;
    display: block !important;
    opacity: 1 !important;
    visibility: visible !important;
    height: 100% !important;
backdrop-filter: blur(20px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
  }
  
  .center-window {
    width: 45px !important;
    display: block !important;
    visibility: visible !important;
    height: 100% !important;
  }
  
  .credit-arrow {
    width: 45px !important;
    min-width: 45px !important;
    max-width: 45px !important;
    flex: 0 0 45px !important;
    flex-shrink: 0 !important;
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    visibility: visible !important;
    opacity: 1 !important;
  }
  
  .credit-arrow svg {
    width: 18px !important;
    height: 18px !important;
  }
}

@media (max-width: 480px) {
  .credit-hours-input {
    height: 50px !important; /* Keep same height as desktop for consistency */
    min-width: 200px !important; /* Keep same minimum width as other form inputs */
    width: 100% !important;
    flex-shrink: 0 !important;
    padding: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    visibility: visible !important;
    opacity: 1 !important;
    background: rgba(255, 255, 255, 0.35) !important; /* Ensure background visibility */
    border: 2px solid rgba(255, 255, 255, 0.5) !important; /* Ensure border visibility */
    isolation: isolate !important;
  }
  
  .number-item {
    width: 40px !important; /* Consistent size */
    min-width: 40px !important;
    max-width: 40px !important;
    flex: 0 0 40px !important;
    font-size: 1.1rem !important;
  }
  
  .glass-pane-left,
  .glass-pane-right {
    width: calc(50% - 20px) !important;
    display: block !important;
    opacity: 1 !important;
    visibility: visible !important;
backdrop-filter: blur(20px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
  }
  
  .center-window {
    width: 40px !important;
    display: block !important;
    visibility: visible !important;
  }
  
  .credit-arrow {
    width: 40px !important; /* Keep consistent with desktop */
    min-width: 40px !important;
    max-width: 40px !important;
    flex: 0 0 40px !important;
    flex-shrink: 0 !important;
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    visibility: visible !important;
    opacity: 1 !important;
  }
  
  .credit-arrow svg {
    width: 18px !important;
    height: 18px !important;
  }
  
  .perspective-container {
    min-width: 120px !important; /* Ensure adequate space */
    flex: 1 !important;
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
  }
}
/* Align with --bp-xs (360px) scale; 400px for intermediate narrow */
@media (max-width: 400px) {
  .credit-hours-input {
    min-width: 180px !important;
    isolation: isolate !important;
  }
  .number-item {
    font-size: 1rem !important;
  }
}
@media (max-width: 360px) {
  .credit-hours-input {
    min-width: 160px !important; /* Still large enough to be functional */
    height: 50px !important; /* Keep consistent height */
    isolation: isolate !important;
  }
  .number-item {
    width: 35px !important;
    min-width: 35px !important;
    max-width: 35px !important;
    flex: 0 0 35px !important;
    font-size: 1rem !important;
  }
  .center-window {
    width: 35px !important;
  }
  .credit-arrow {
    width: 35px !important;
    min-width: 35px !important;
    max-width: 35px !important;
    flex: 0 0 35px !important;
  }
  .credit-arrow svg {
    width: 16px !important;
    height: 16px !important;
  }
  .perspective-container {
    min-width: 90px !important;
  }
  .glass-pane-left,
  .glass-pane-right {
    width: calc(50% - 17px) !important;
backdrop-filter: blur(20px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
  }
}
@media (max-width: 320px) {
  .credit-hours-input {
    min-width: 140px !important; /* Still functional on very small screens */
    height: 50px !important; /* Keep consistent height */
    isolation: isolate !important;
  }
  .perspective-container {
    min-width: 70px !important;
  }
  .number-item {
    font-size: 0.9rem !important;
  }
}

/* Shake animation for limit indicators - no keyframes needed since we're doing it with JavaScript */
.number-strip.shaking {
  /* We'll handle the animation with JS for directional awareness */
  position: relative;
}

/* No special styling for active number during shake animation */

/* Add a subtle pulse effect to the arrows when at limits */
.glass-pane-left:active .arrow-button svg,
.glass-pane-right:active .arrow-button svg {
  transform: scale(0.9);
  transition: transform 0.1s ease;
}

/* RTL: keep credit-hours input layout as LTR (left pane, center, right pane) and align block to the left */
[dir="rtl"] .credit-hours-input {
  direction: ltr !important;
  margin-inline-start: auto !important; /* push block to visual left (inline-end in RTL) */
  margin-inline-end: 0 !important;
  width: auto !important;
  min-width: 200px !important;
  max-width: 100% !important;
}
[dir="rtl"] .credit-hours-input-inner {
  direction: ltr !important;
}
[dir="rtl"] .perspective-container,
[dir="rtl"] .number-dial-viewport,
[dir="rtl"] .number-strip {
  direction: ltr !important;
}

/* Mobile Credit Hours Input Override */
/* Supplements RotatingNumberInput.css. Breakpoints: 768px, 480px, 360px (--bp-md, --bp-sm, --bp-xs). */

@media (max-width: 768px) {
  /* Override index.css form/input rules that can break layout; keep overflow on inner so backdrop-filter works */
  .credit-hours-input {
    padding: 0 !important;
    margin: 0 !important;
    transform: none !important;
    scale: none !important;
  }

  .credit-hours-input .credit-hours-input-inner {
    overflow: hidden !important;
  }

  .credit-hours-input .perspective-container {
    flex: 1 !important;
    min-width: 120px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    height: 100% !important;
  }

  .credit-hours-input .glass-pane-left,
  .credit-hours-input .glass-pane-right,
  .credit-hours-input .center-window {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    height: 100% !important;
  }

  .credit-hours-input .credit-arrow {
    width: 45px !important;
    min-width: 45px !important;
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-shrink: 0 !important;
  }
}

/* Extra small screen adjustments */
@media (max-width: 480px) {
  .credit-hours-input {
    min-width: 180px !important;
    isolation: isolate !important;
  }
  
  .credit-hours-input .credit-arrow {
    width: 40px !important;
    min-width: 40px !important;
  }
}

@media (max-width: 360px) {
  .credit-hours-input {
    min-width: 160px !important;
    isolation: isolate !important;
  }
  
  .credit-hours-input .credit-arrow {
    width: 35px !important;
    min-width: 35px !important;
  }
  
  .credit-hours-input .perspective-container {
    min-width: 90px !important;
  }
}


/* Enhanced Credit Hours Container with Animations */
.credit-hours-container {
  flex: 1;
  position: relative;
  overflow: hidden;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0; /* Allow container to shrink if needed */
}

.credit-hours-display {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0; /* Allow text to properly fit in container */
}

.credit-hours-current,
.credit-hours-pending {
  position: absolute;
  font-size: var(--text-base);
  font-weight: 650;
  color: var(--text-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
}

.credit-hours-current {
  z-index: 2;
}

.credit-hours-pending {
  z-index: 1;
  opacity: 0;
}

/* Slide Left Animation (decreasing value) */
.credit-hours-container.slide-left .credit-hours-current {
  animation: slideOutRight 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.credit-hours-container.slide-left .credit-hours-pending {
  animation: slideInLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* Slide Right Animation (increasing value) */
.credit-hours-container.slide-right .credit-hours-current {
  animation: slideOutLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.credit-hours-container.slide-right .credit-hours-pending {
  animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* Keyframe Animations */
@keyframes slideOutLeft {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-100%);
    opacity: 0;
  }
}

@keyframes slideOutRight {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

@keyframes slideInLeft {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInRight {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Shake Animation for Boundary Limits */
@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-3px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(3px);
  }
}

.credit-arrow.shake {
  animation: shake 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Resetting Animation State */
.credit-hours-container.resetting .credit-hours-current {
  animation: pulseScale 0.2s ease-in-out;
}

@keyframes pulseScale {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* Loading States */
.loading {
  opacity: 0.6;
  pointer-events: none;
}

.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid var(--primary-color);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .number-strip {
    transition: none !important;
  }
  .number-strip.animating {
    transition: none !important;
  }
  .number-strip.shaking {
    transition: none !important;
  }
}`}</style>
    <div className="credit-hours-input">      
      <div className="perspective-container">
        <div className="number-dial-viewport">
          <div ref={stripRef} id="number-strip" className="number-strip" style={{ '--x-offset': '0px' } as React.CSSProperties}>
            {numbers.map((num) => (
              <div 
                key={num} 
                className={`number-item ${num === value ? 'active' :
                  num === prevValue ? 'prev' :
                  num === nextValue ? 'next' : ''}`}
                data-value={num}
                aria-selected={num === value}
              >
                {formatNumberForLocale(num, locale)}
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
    </>
  );
};

export default EnhancedRotatingNumberInput;
