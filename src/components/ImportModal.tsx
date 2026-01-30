import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Course, Grade, Term, Level } from '../types/Course';
import { useLocale } from '../i18n/LocaleContext';

interface ImportModalProps {
  show: boolean;
  onHide: () => void;
  onImport: (courses: Course[]) => void;
  currentCourses: Course[]; // Add current courses as a prop
}

const ImportModal: React.FC<ImportModalProps> = ({ show, onHide, onImport, currentCourses }) => {
  const { t } = useLocale();
  const [importText, setImportText] = useState('');
  const [mounted, setMounted] = useState(false);
  
  // Handle modal mounting
  useEffect(() => {
    if (show) {
      // Add body class to prevent scrolling
      document.body.classList.add('modal-open');
      // Slight delay to ensure animation works properly
      setTimeout(() => setMounted(true), 10);
    } else {
      document.body.classList.remove('modal-open');
      // Defer setState to avoid setState in effect
      setTimeout(() => setMounted(false), 0);
    }
    
    // Cleanup function
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [show]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setImportText(text);
      } else {
        alert(t('import.noText'));
      }
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
      alert(t('import.clipboardDenied'));
    }
  };

  const handleImport = () => {
    const pastedHTML = importText.trim();
    if (!pastedHTML) {
      alert(t('import.pleasePaste'));
      return;
    }

    // Create a temporary container to parse the pasted HTML
    const dummy = document.createElement('div');
    dummy.innerHTML = pastedHTML;
    
    // Adjust the query selector based on the imported HTML structure
    // For this example, we assume the courses are in a table with class names:
    // 'table table-striped col-md-12'
    const tableRows = dummy.querySelectorAll('table.table.table-striped.col-md-12 tr');
    if (tableRows.length === 0) {
      alert(t('import.invalidHtml'));
      return;
    }
    
    const importedCourses: Course[] = [];
      // Loop through each row and extract course data
    tableRows.forEach((row: Element) => {
      const data = row.getElementsByTagName('td');
      if (data.length === 0) return; // Skip header rows

      const courseName = data[1] ? data[1].innerText.trim() : '';
      const courseHours = data[3] ? data[3].innerText.trim() : '';
      let courseGrade: Grade | null = null;
      let courseTerm: Term | undefined = undefined;      
      let courseLevel: Level | undefined = undefined;
      
      if (data[6]) {
        const gradeElement = data[6].querySelector('p');
        const gradeText = gradeElement ? gradeElement.innerText.trim() : '';
        // Only set grade if it's a valid grade, otherwise leave as null
        if (gradeText && gradeText !== '' && gradeText !== '-' && gradeText !== 'N/A' && gradeText.trim() !== '') {
          // Validate that it's actually a valid grade
          const validGrades: Grade[] = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
          if (validGrades.includes(gradeText as Grade)) {
            courseGrade = gradeText as Grade;
          }
        }
      }
      
      // Extract level from td[11] (index 10)
      if (data[10]) {
        const levelElement = data[10].querySelector('div span') as HTMLElement;
        const levelText = levelElement ? levelElement.innerText.trim() : '';
        if (levelText) {
          // Map the text to our Level type
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
            'fourth': 'Fourth Level'
          };
          courseLevel = levelMap[levelText] || levelMap[levelText.replace(/ Level/i, '')];
        }
      }
      
      // Extract term from td[12] (index 11)
      if (data[11]) {
        const termElement = data[11].querySelector('div span') as HTMLElement;
        const termText = termElement ? termElement.innerText.trim() : '';
        if (termText) {
          // Map the text to our Term type
          const termMap: Record<string, Term> = {
            '1': 'First Term',
            '2': 'Second Term',
            'Summer': 'Summer Term',
            'summer': 'Summer Term',
            'First': 'First Term',
            'Second': 'Second Term',
            'first': 'First Term',
            'second': 'Second Term'
          };
          // If it's a known term, use the mapped value, otherwise keep the original term text
          courseTerm = termMap[termText] || termMap[termText.replace(/ Term/i, '')] || termText;
        }
      }

      // Import course if it has name and hours (grade is optional)
      if (courseName && courseHours) {
        const hours = parseInt(courseHours);
        if (!isNaN(hours)) {
          importedCourses.push({
            name: courseName,
            hours: hours,
            grade: courseGrade,
            term: courseTerm,
            level: courseLevel,
            isImported: true
          });
        }
      }
    });
    
    if (importedCourses.length > 0) {
      // Process imported courses
      const finalCourses = processCourses(importedCourses);
      onImport(finalCourses);
      setImportText('');
    } else {
      alert(t('import.noValidCourses'));
    }
  };
  
  // Process imported courses, handling duplicates
  const processCourses = (importedCourses: Course[]): Course[] => {
    // Create a Map of current courses by name for easy lookup
    const courseMap = new Map<string, Course>();
    currentCourses.forEach(course => {
      courseMap.set(course.name, course);
    });
    
    // Create result array with all imported courses
    const resultCourses: Course[] = [];
    
    // Process imported courses
    importedCourses.forEach(importedCourse => {
      // Always add the imported course, whether it's new or a replacement
      resultCourses.push(importedCourse);
      
      // Remove from map if it was a duplicate (we've replaced it)
      courseMap.delete(importedCourse.name);
    });
    
    // Add remaining courses that weren't replaced
    courseMap.forEach(course => {
      resultCourses.push(course);
    });
    
    return resultCourses;
  };
  
  const handleClose = () => {
    setImportText('');
    onHide();
  };  if (!show) return null;
  
  // Use portal to render the modal at the document body level
  return createPortal(
    <div className={`modal-overlay ${mounted ? 'modal-visible' : ''}`} onClick={handleClose}>
      <div className="modal-content import-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{t('import.modalTitle')}</h2>
          <button className="modal-close" onClick={handleClose} aria-label={t('common.close')}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M14.7 1.3c-.4-.4-1-.4-1.4 0L8 6.6 2.7 1.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4L6.6 8l-5.3 5.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L8 9.4l5.3 5.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L9.4 8l5.3-5.3c.4-.4.4-1 0-1.4z"/>
            </svg>
          </button>
        </div>
        
        <div className="modal-body">
          <p className="modal-description">
            {t('import.description')} <a href="http://newecom.fci.cu.edu.eg/#/courses-per-students" target="_blank" rel="noopener noreferrer">{t('import.registeredCourses')}</a> {t('import.descriptionSuffix')}
          </p>
          
          <div className="textarea-container">
            <textarea
              className="import-textarea"
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder={t('import.placeholder')}
            />
            <button
              className="paste-btn"
              onClick={handlePaste}
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M10.029,21h6.245c1.457,0,2.642-1.186,2.642-2.643V7.945c0-1.352-1.023-2.456-2.334-2.611C16.427,4.024,15.322,3,13.971,3H7.726C6.269,3,5.084,4.186,5.084,5.643v10.423c0,1.352,1.024,2.457,2.335,2.612C7.579,19.982,8.682,21,10.029,21z M17.916,7.945v10.412c0,0.905-0.736,1.643-1.642,1.643h-6.245c-0.905,0-1.643-0.737-1.643-1.643v-0.149V7.945c0-0.905,0.737-1.642,1.643-1.642h6.084h0.161C17.18,6.303,17.916,7.04,17.916,7.945z M6.084,16.065V5.643C6.084,4.737,6.82,4,7.726,4h6.245c0.789,0,1.45,0.56,1.607,1.303h-5.549c-1.457,0-2.643,1.185-2.643,2.642v9.728C6.644,17.517,6.084,16.854,6.084,16.065z"/>
              </svg>
              {t('import.paste')}
            </button>
          </div>
        </div>
        
        <div className="modal-footer">
          <div className="button-group">
            <button className="btn-primary" onClick={handleImport}>
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
