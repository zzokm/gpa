import React from 'react';

interface GPADisplayProps {
  gpa: number;
}

const GPADisplay: React.FC<GPADisplayProps> = ({ gpa }) => {
  return (
    <div className="gpa-display">
      <div className="gpa-label">GPA</div>
      <div className="gpa-value">{gpa.toFixed(2)}</div>
      <div className="gpa-scale">out of 4.00</div>
    </div>
  );
};

export default GPADisplay;
