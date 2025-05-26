import React, { useState } from 'react';
import { Course, Grade } from '../types/Course';

interface ImportModalProps {
  show: boolean;
  onHide: () => void;
  onImport: (courses: Course[]) => void;
}

const ImportModal: React.FC<ImportModalProps> = ({ show, onHide, onImport }) => {
  const [importText, setImportText] = useState('');

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setImportText(text);
      } else {
        alert("No text found in clipboard.");
      }
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
      alert("Clipboard access not supported or permission denied.");
    }
  };

  const handleImport = () => {
    const pastedHTML = importText.trim();
    if (!pastedHTML) {
      alert("Please paste the HTML code.");
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
      alert('Invalid HTML. Please check that you pasted the correct code.');
      return;
    }

    const importedCourses: Course[] = [];    // Loop through each row and extract course data
    tableRows.forEach(row => {
      const data = row.getElementsByTagName('td');
      if (data.length === 0) return; // Skip header rows

      const courseName = data[1] ? data[1].innerText.trim() : '';
      const courseHours = data[3] ? data[3].innerText.trim() : '';
      let courseGrade: Grade | null = null;
      
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

      // Import course if it has name and hours (grade is optional)
      if (courseName && courseHours) {
        const hours = parseInt(courseHours);
        if (!isNaN(hours)) {
          importedCourses.push({
            name: courseName,
            hours: hours,
            grade: courseGrade
          });
        }
      }
    });

    if (importedCourses.length > 0) {
      onImport(importedCourses);
      setImportText('');
    } else {
      alert('No valid courses found in the imported HTML.');
    }
  };

  const handleClose = () => {
    setImportText('');
    onHide();
  };  return (
    <>
      {show && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Import Registered Courses</h2>
              <button className="modal-close" onClick={handleClose} aria-label="Close">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"/>
                  <path d="M10.122 4.465 8 6.586 5.878 4.465 4.464 5.879 6.586 8l-2.122 2.121 1.414 1.414L8 9.414l2.122 2.121 1.414-1.414L9.414 8l2.122-2.121z"/>
                </svg>
              </button>
            </div>
            
            <div>
              <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--text-secondary)' }}>
                Paste the HTML code from your <a href="http://newecom.fci.cu.edu.eg/#/courses-per-students" target="_blank" rel="noopener noreferrer">Registered Courses</a> page below:
              </p>
              
              <div style={{ position: 'relative' }}>
                <textarea
                  className="import-textarea"
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="Paste HTML content here..."
                />
                <button
                  className="paste-btn"
                  onClick={handlePaste}
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                    <path d="M10.029,21h6.245c1.457,0,2.642-1.186,2.642-2.643V7.945c0-1.352-1.023-2.456-2.334-2.611C16.427,4.024,15.322,3,13.971,3H7.726C6.269,3,5.084,4.186,5.084,5.643v10.423c0,1.352,1.024,2.457,2.335,2.612C7.579,19.982,8.682,21,10.029,21z M17.916,7.945v10.412c0,0.905-0.736,1.643-1.642,1.643h-6.245c-0.905,0-1.643-0.737-1.643-1.643v-0.149V7.945c0-0.905,0.737-1.642,1.643-1.642h6.084h0.161C17.18,6.303,17.916,7.04,17.916,7.945z M6.084,16.065V5.643C6.084,4.737,6.82,4,7.726,4h6.245c0.789,0,1.45,0.56,1.607,1.303h-5.549c-1.457,0-2.643,1.185-2.643,2.642v9.728C6.644,17.517,6.084,16.854,6.084,16.065z"/>
                  </svg>
                  Paste
                </button>
              </div>
            </div>
            
            <div className="button-group" style={{ marginTop: 'var(--space-xl)' }}>
              <button className="btn-secondary" onClick={handleClose}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleImport}>
                Import Courses
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImportModal;
