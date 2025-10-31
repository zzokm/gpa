import React, { useState } from 'react';
import { Course } from '../types/Course';
import GPADetailsModal from './GPADetailsModal';
import { generateGradeReport } from '../utils/pdfExport';
import './GPADisplayStyles.css';

interface GPADisplayProps {
  gpa: number;
  courses?: Course[];
}

// Function to determine the assessment and color based on GPA
const getGPAAssessment = (gpa: number): { text: string; color: string } => {
  if (gpa < 1) {
    return { text: 'Very Poor', color: '#B71C1C' }; // ضعيف جداً - Darker Red
  } else if (gpa < 2) {
    return { text: 'Poor', color: '#E65100' }; // ضعيف - Darker Orange
  } else if (gpa < 2.5) {
    return { text: 'Acceptable', color: '#FFC200' }; // مقبول - Darker Gold
  } else if (gpa < 3) {
    return { text: 'Good', color: '#2E7D32' }; // جيد - Darker Green
  } else if (gpa < 3.5) {
    return { text: 'Very Good', color: '#0D47A1' }; // جيد جداً - Darker Blue
  } else {
    return { text: 'Excellent', color: '#4A148C' }; // ممتاز - Darker Purple
  }
};

const GPADisplay: React.FC<GPADisplayProps> = ({ gpa, courses = [] }) => {
  const assessment = getGPAAssessment(gpa);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  const handleExportPDF = () => {
    generateGradeReport({
      courses,
      currentGPA: gpa
    });
  };
  
  return (
    <>
      <div className="gpa-display">
        <div className="gpa-header-row">
          <div className="gpa-label">GPA</div>
          {gpa !== 0 && courses.length > 0 && (
            <>
              <button 
                className="gpa-info-btn"
                title="View detailed GPA analysis"
                onClick={() => setShowDetailsModal(true)}
                aria-label="View detailed GPA analysis"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M10 .4C4.697.4.399 4.698.399 10A9.6 9.6 0 0 0 10 19.601c5.301 0 9.6-4.298 9.6-9.601 0-5.302-4.299-9.6-9.6-9.6zm.896 3.466c.936 0 1.211.543 1.211 1.164 0 .775-.62 1.492-1.679 1.492-.886 0-1.308-.445-1.282-1.182 0-.621.519-1.474 1.75-1.474zM8.498 15.75c-.64 0-1.107-.389-.66-2.094l.733-3.025c.127-.484.148-.678 0-.678-.191 0-1.022.334-1.512.664l-.319-.523c1.555-1.299 3.343-2.061 4.108-2.061.64 0 .746.756.427 1.92l-.84 3.18c-.149.562-.085.756.064.756.192 0 .82-.232 1.438-.719l.362.486c-1.513 1.512-3.162 2.094-3.801 2.094z" fill="#ff7955"/>
                </svg>
              </button>
              <button 
                className="gpa-pdf-btn"
                title="Export grade report as PDF"
                onClick={handleExportPDF}
                aria-label="Export grade report as PDF"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                </svg>
              </button>
            </>
          )}
        </div>
        <div className="gpa-value">{gpa.toFixed(2)}</div>
        <div className="gpa-scale">out of 4.00</div>
        {gpa !== 0 && (
          <div 
            className="gpa-assessment"
            style={{ 
              color: assessment.color,
              textShadow: `0 0 10px ${assessment.color}33`,
              backgroundColor: `${assessment.color}15`
            }}
          >
            {assessment.text}
          </div>
        )}
      </div>
      
      <GPADetailsModal 
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        courses={courses}
        currentGPA={gpa}
      />
    </>
  );
};

export default GPADisplay;
