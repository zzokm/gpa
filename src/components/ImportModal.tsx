import './ImportModal.css'
import React, { useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Course, Grade, Term, Level } from '../types/Course';
import { useLocale } from '../i18n/LocaleContext';
import { useModalBehavior } from '../hooks/useModalBehavior';
import { normalizeCreditHours } from '../utils/creditHours';
import { FCAI_REGISTERED_COURSES_URL } from '../../lib/fcai-urls';

interface ImportModalProps {
  show: boolean;
  onHide: () => void;
  onImport: (courses: Course[]) => void;
  currentCourses: Course[];
  onOpenHowTo?: () => void;
}

type ImportErrorKey =
  | 'import.noText'
  | 'import.clipboardDenied'
  | 'import.pleasePaste'
  | 'import.invalidHtml'
  | 'import.noValidCourses';

const HOW_TO_ERROR_KEYS = new Set<ImportErrorKey>([
  'import.pleasePaste',
  'import.invalidHtml',
  'import.noValidCourses',
]);

const ImportModal: React.FC<ImportModalProps> = ({ show, onHide, onImport, currentCourses, onOpenHowTo }) => {
  const { t } = useLocale();
  const [importText, setImportText] = useState('');
  const [importErrorKey, setImportErrorKey] = useState<ImportErrorKey | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const setImportError = useCallback((key: ImportErrorKey | null) => {
    setImportErrorKey(key);
  }, []);

  const handleClose = useCallback(() => {
    setImportText('');
    setImportError(null);
    onHide();
  }, [onHide, setImportError]);

  const { mounted } = useModalBehavior({
    isOpen: show,
    onClose: handleClose,
    initialFocusRef: textareaRef,
  });

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setImportText(text);
        setImportError(null);
      } else {
        setImportError('import.noText');
      }
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
      setImportError('import.clipboardDenied');
    }
  };

  const handleImport = () => {
    const pastedHTML = importText.trim();
    if (!pastedHTML) {
      setImportError('import.pleasePaste');
      return;
    }

    const dummy = document.createElement('div');
    dummy.innerHTML = pastedHTML;

    const tableRows = dummy.querySelectorAll('table.table.table-striped.col-md-12 tr');
    if (tableRows.length === 0) {
      setImportError('import.invalidHtml');
      return;
    }

    const importedCourses: Course[] = [];
    tableRows.forEach((row: Element) => {
      const data = row.getElementsByTagName('td');
      if (data.length === 0) return;

      const courseName = data[1] ? data[1].innerText.trim() : '';
      const courseHours = data[3] ? data[3].innerText.trim() : '';
      let courseGrade: Grade | null = null;
      let courseTerm: Term | undefined = undefined;
      let courseLevel: Level | undefined = undefined;

      if (data[6]) {
        const gradeElement = data[6].querySelector('p');
        const gradeText = gradeElement ? gradeElement.innerText.trim() : '';
        if (gradeText && gradeText !== '' && gradeText !== '-' && gradeText !== 'N/A' && gradeText.trim() !== '') {
          const validGrades: Grade[] = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
          if (validGrades.includes(gradeText as Grade)) {
            courseGrade = gradeText as Grade;
          }
        }
      }

      if (data[10]) {
        const levelElement = data[10].querySelector('div span') as HTMLElement;
        const levelText = levelElement ? levelElement.innerText.trim() : '';
        if (levelText) {
          const levelMap: Record<string, Level> = {
            '1': 'First Level',
            '2': 'Second Level',
            '3': 'Third Level',
            '4': 'Fourth Level',
            'First': 'First Level',
            'Second': 'Second Level',
            'Third': 'Third Level',
            'Fourth': 'Fourth Level',
            'first': 'First Level',
            'second': 'Second Level',
            'third': 'Third Level',
            'fourth': 'Fourth Level',
          };
          courseLevel = levelMap[levelText] || levelMap[levelText.replace(/ Level/i, '')];
        }
      }

      if (data[11]) {
        const termElement = data[11].querySelector('div span') as HTMLElement;
        const termText = termElement ? termElement.innerText.trim() : '';
        if (termText) {
          const termMap: Record<string, Term> = {
            '1': 'First Term',
            '2': 'Second Term',
            Summer: 'Summer Term',
            summer: 'Summer Term',
            First: 'First Term',
            Second: 'Second Term',
            first: 'First Term',
            second: 'Second Term',
          };
          courseTerm = termMap[termText] || termMap[termText.replace(/ Term/i, '')] || termText;
        }
      }

      if (courseName && courseHours) {
        const hours = parseInt(courseHours, 10);
        if (!isNaN(hours)) {
          importedCourses.push({
            name: courseName,
            hours: normalizeCreditHours(hours),
            grade: courseGrade,
            term: courseTerm,
            level: courseLevel,
            isImported: true,
          });
        }
      }
    });

    if (importedCourses.length > 0) {
      const finalCourses = processCourses(importedCourses);
      onImport(finalCourses);
      setImportText('');
      setImportError(null);
    } else {
      setImportError('import.noValidCourses');
    }
  };

  const processCourses = (importedCourses: Course[]): Course[] => {
    const courseMap = new Map<string, Course>();
    currentCourses.forEach((course) => {
      courseMap.set(course.name, course);
    });

    const resultCourses: Course[] = [];

    importedCourses.forEach((importedCourse) => {
      resultCourses.push(importedCourse);
      courseMap.delete(importedCourse.name);
    });

    courseMap.forEach((course) => {
      resultCourses.push(course);
    });

    return resultCourses;
  };

  if (!show) return null;

  const showHowToHint = importErrorKey != null && HOW_TO_ERROR_KEYS.has(importErrorKey) && !!onOpenHowTo;

  return createPortal(
    <div
      className={`modal-overlay ${mounted ? 'modal-visible' : ''}`}
      onClick={handleClose}
      role="presentation"
    >
      <div
        className="modal-content import-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="import-modal-title"
        aria-describedby={importErrorKey ? 'import-modal-error' : undefined}
      >
        <div className="modal-header">
          <h2 className="modal-title" id="import-modal-title">
            {t('import.modalTitle')}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            className="modal-close"
            onClick={handleClose}
            aria-label={t('common.close')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M14.7 1.3c-.4-.4-1-.4-1.4 0L8 6.6 2.7 1.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4L6.6 8l-5.3 5.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L8 9.4l5.3 5.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L9.4 8l5.3-5.3c.4-.4.4-1 0-1.4z" />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-description">
            {t('import.description')}{' '}
            <a href={FCAI_REGISTERED_COURSES_URL} target="_blank" rel="noopener noreferrer">
              {t('import.registeredCourses')}
            </a>{' '}
            {t('import.descriptionSuffix')}
            {onOpenHowTo && (
              <>
                {' '}
                <button type="button" className="how-to-link" onClick={onOpenHowTo}>
                  {t('import.howToLink')}
                </button>
              </>
            )}
          </p>

          {importErrorKey && (
            <div className="import-error" id="import-modal-error" role="alert" aria-live="polite">
              <p>{t(importErrorKey)}</p>
              {showHowToHint && (
                <button type="button" className="how-to-link import-error-action" onClick={onOpenHowTo}>
                  {t('import.howToLink')}
                </button>
              )}
            </div>
          )}

          <div className="textarea-container">
            <textarea
              ref={textareaRef}
              className={`import-textarea${importErrorKey ? ' import-textarea-error' : ''}`}
              value={importText}
              onChange={(e) => {
                setImportText(e.target.value);
                if (importErrorKey) setImportError(null);
              }}
              placeholder={t('import.placeholder')}
              aria-invalid={importErrorKey ? true : undefined}
              aria-describedby={importErrorKey ? 'import-modal-error' : undefined}
            />
            <button className="paste-btn" onClick={handlePaste} type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M10.029,21h6.245c1.457,0,2.642-1.186,2.642-2.643V7.945c0-1.352-1.023-2.456-2.334-2.611C16.427,4.024,15.322,3,13.971,3H7.726C6.269,3,5.084,4.186,5.084,5.643v10.423c0,1.352,1.024,2.457,2.335,2.612C7.579,19.982,8.682,21,10.029,21z M17.916,7.945v10.412c0,0.905-0.736,1.643-1.642,1.643h-6.245c-0.905,0-1.643-0.737-1.643-1.643v-0.149V7.945c0-0.905,0.737-1.642,1.643-1.642h6.084h0.161C17.18,6.303,17.916,7.04,17.916,7.945z M6.084,16.065V5.643C6.084,4.737,6.82,4,7.726,4h6.245c0.789,0,1.45,0.56,1.607,1.303h-5.549c-1.457,0-2.643,1.185-2.643,2.642v9.728C6.644,17.517,6.084,16.854,6.084,16.065z" />
              </svg>
              {t('import.paste')}
            </button>
          </div>
        </div>

        <div className="modal-footer">
          <div className="button-group">
            <button type="button" className="btn-primary" onClick={handleImport}>
              {t('import.importBtn')}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ImportModal;
