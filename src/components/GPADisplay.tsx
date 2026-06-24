import React from 'react';
import './GPADisplayStyles.css';
import { useLocale } from '../i18n/LocaleContext';
import { getGPAAssessment } from '../utils/gpaAssessment';

interface GPADisplayProps {
  gpa: number;
}

const GPADisplay: React.FC<GPADisplayProps> = ({ gpa }) => {
  const { t } = useLocale();
  const assessment = getGPAAssessment(gpa);

  return (
    <div className="gpa-display">
      <div className="gpa-label">{t('gpa.label')}</div>
      <div className="gpa-value">{gpa.toFixed(2)}</div>
      <div className="gpa-scale">{t('gpa.outOf')}</div>
      {gpa !== 0 && (
        <div
          className="gpa-assessment"
          style={{
            color: assessment.color,
            textShadow: `0 0 10px ${assessment.color}33`,
            backgroundColor: `${assessment.color}15`
          }}
        >
          {t(assessment.key)}
        </div>
      )}
    </div>
  );
};

export default GPADisplay;
