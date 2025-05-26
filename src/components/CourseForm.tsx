import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Course, Grade } from '../types/Course';

import GradeDropdown from './GradeDropdown';

interface CourseFormProps {
  onAddCourse: (course: Course) => void;
  onShowImport: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ 
  onAddCourse, 
  onShowImport 
}) => {
  const [courseName, setCourseName] = useState('');
  const [courseHours, setCourseHours] = useState(2);
  const [courseGrade, setCourseGrade] = useState<Grade>('A+');  const [animationState, setAnimationState] = useState<'idle' | 'slide-left' | 'slide-right' | 'shake-left' | 'shake-right' | 'resetting'>('idle');
  const [pendingValue, setPendingValue] = useState<number | null>(null);
  const [isResetting, setIsResetting] = useState(false);

  // Handle animated credit hour changes
  const handleCreditHourChange = (direction: 'left' | 'right') => {
    if (isResetting) return;

    const newValue = direction === 'left' ? courseHours - 1 : courseHours + 1;
    
    // Handle boundary conditions with shake animation
    if (newValue < 0) {
      setAnimationState('shake-left');
      setTimeout(() => setAnimationState('idle'), 500);
      return;
    }
    if (newValue > 3) {
      setAnimationState('shake-right');
      setTimeout(() => setAnimationState('idle'), 500);
      return;
    }

    // Start slide animation
    setPendingValue(newValue);
    setAnimationState(direction === 'left' ? 'slide-left' : 'slide-right');
    
    // Complete transition after animation
    setTimeout(() => {
      setCourseHours(newValue);
      setPendingValue(null);
      setAnimationState('idle');
    }, 300);
  };

  // Animated reset to 2
  const resetCreditHoursAnimated = () => {
    if (courseHours === 2 || isResetting) return;
    
    setIsResetting(true);
    setAnimationState('resetting');
    
    const steps: number[] = [];
    if (courseHours < 2) {
      for (let i = courseHours + 1; i <= 2; i++) {
        steps.push(i);
      }
    } else {
      for (let i = courseHours - 1; i >= 2; i--) {
        steps.push(i);
      }
    }
    
    let stepIndex = 0;
    const animateStep = () => {
      if (stepIndex < steps.length) {
        setCourseHours(steps[stepIndex]);
        stepIndex++;
        setTimeout(animateStep, 200);
      } else {
        setIsResetting(false);
        setAnimationState('idle');
      }
    };
    
    setTimeout(animateStep, 100);  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAddCourse({
      name: courseName,
      hours: courseHours,
      grade: courseGrade
    });

    // Reset form with animations
    setCourseName('');
    resetCreditHoursAnimated();
    setCourseGrade('A+');
  };return (
    <div className="top-box">
      <Form onSubmit={handleSubmit}>        <div className="form-row">
          <label className="form-label" htmlFor="courseName">Course Name:</label>
          <input
            type="text"
            id="courseName"
            className="form-input"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)} 
            placeholder="Optional"
          />
        </div>        <div className="form-row">
          <label className="form-label" htmlFor="courseHours">Credit Hours:</label>          <div className="credit-hours-input">
            <button
              type="button"
              className={`credit-arrow credit-arrow-left ${animationState === 'shake-left' ? 'shake' : ''}`}
              onClick={() => handleCreditHourChange('left')}
              disabled={isResetting}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            <div className={`credit-hours-container ${animationState}`}>
              <div className="credit-hours-display">
                <span className="credit-hours-current">{courseHours}</span>
                {pendingValue !== null && (
                  <span className="credit-hours-pending">{pendingValue}</span>
                )}
              </div>
            </div>
            <button
              type="button"
              className={`credit-arrow credit-arrow-right ${animationState === 'shake-right' ? 'shake' : ''}`}
              onClick={() => handleCreditHourChange('right')}
              disabled={isResetting}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>
          </div>
        </div>        <div className="form-row">
          <label className="form-label" htmlFor="courseGrade">Grade:</label>
          <div className="form-grade-container">
            <GradeDropdown
              courseId="form-grade"
              courseName="Form Grade"
              onSelectGrade={(_, grade) => setCourseGrade(grade)}
              currentGrade={courseGrade}
              displayMode="input"
            />
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className="btn-primary">
            Add Course
          </button>
          <button 
            type="button" 
            className="btn-secondary"
            onClick={onShowImport}
          >
            Import Courses
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CourseForm;
