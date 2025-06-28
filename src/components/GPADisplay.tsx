import React from 'react';
import './GPADisplayStyles.css';

interface GPADisplayProps {
  gpa: number;
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

const GPADisplay: React.FC<GPADisplayProps> = ({ gpa }) => {
  const assessment = getGPAAssessment(gpa);
  
  return (
    <div className="gpa-display">
      <div className="gpa-label">GPA</div>
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
  );
};

export default GPADisplay;
