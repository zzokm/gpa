import React from 'react';
import './GPADisplayStyles.css';
import { useLocale } from '../i18n/LocaleContext';

interface GPADisplayProps {
  gpa: number;
}

function getGPAAssessment(gpa: number): { key: string; color: string } {
  if (gpa < 1) return { key: 'gpa.veryPoor', color: '#B71C1C' };
  if (gpa < 2) return { key: 'gpa.poor', color: '#E65100' };
  if (gpa < 2.5) return { key: 'gpa.acceptable', color: '#FFC200' };
  if (gpa < 3) return { key: 'gpa.good', color: '#2E7D32' };
  if (gpa < 3.5) return { key: 'gpa.veryGood', color: '#0D47A1' };
  return { key: 'gpa.excellent', color: '#4A148C' };
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
