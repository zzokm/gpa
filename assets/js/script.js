document.addEventListener('DOMContentLoaded', () => {
  const bylawRadios = document.querySelectorAll('input[name="bylaw"]');
  const gradeTypeRadios = document.querySelectorAll('input[name="gradeType"]');
  const courseNameInput = document.getElementById('courseName');
  const courseHoursInput = document.getElementById('courseHours');
  const gradeRow = document.getElementById('gradeRow');
  const addCourseBtn = document.getElementById('addCourseBtn');
  const coursesTbody = document.getElementById('coursesTbody');
  const gpaBox = document.getElementById('gpaBox');
  const pasteBtn = document.getElementById('pasteBtn');

  // Set dynamic grade input field based on selection.
  function setGradeInputType(type) {
    const existing = document.getElementById('courseGrade');
    if (existing) {
      existing.remove();
    }
    let newInput;
    if (type === 'letter') {
      newInput = document.createElement('select');
      newInput.id = 'courseGrade';
      const grades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];
      grades.forEach(grade => {
        const option = document.createElement('option');
        option.value = grade;
        option.textContent = grade;
        newInput.appendChild(option);
      });
    } else {
      newInput = document.createElement('input');
      newInput.type = 'text';
      newInput.id = 'courseGrade';
      newInput.placeholder = "e.g. 73";
    }
    gradeRow.appendChild(newInput);
  }

  // Set default grade input type ("letter")
  setGradeInputType('letter');

  // Listen for changes on grade type radio buttons.
  gradeTypeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        setGradeInputType(radio.value);
      }
    });
  });

  // Convert numeric grade (0–100) to a letter grade.
  function numericToLetter(num) {
    if (num >= 96) return 'A+';
    if (num >= 92) return 'A';
    if (num >= 88) return 'A-';
    if (num >= 84) return 'B+';
    if (num >= 80) return 'B';
    if (num >= 76) return 'B-';
    if (num >= 72) return 'C+';
    if (num >= 68) return 'C';
    if (num >= 64) return 'C-';
    if (num >= 60) return 'D+';
    if (num >= 55) return 'D';
    if (num >= 50) return 'D-';
    return 'F';
  }

  // Convert letter grade to GPA points.
  function letterToPoints(letter) {
    switch (letter) {
      case 'A+': return 4.0;
      case 'A':  return 3.7;
      case 'A-': return 3.4;
      case 'B+': return 3.2;
      case 'B':  return 3.0;
      case 'B-': return 2.8;
      case 'C+': return 2.6;
      case 'C':  return 2.4;
      case 'C-': return 2.2;
      case 'D+': return 2.0;
      case 'D':  return 1.5;
      case 'D-': return 1.0;
      case 'F':  return 0.0;
      default:   return 0.0;
    }
  }

  // Helper: Calculate GPA from all course rows.
  function calculateGPA() {
    let totalPoints = 0;
    let totalCredits = 0;
    const rows = coursesTbody.querySelectorAll('tr');
    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      if (cells.length < 3) return;
      const credit = parseFloat(cells[1].textContent);
      const letter = cells[2].textContent;
      const points = letterToPoints(letter);
      totalPoints += points * credit;
      totalCredits += credit;
    });
    let gpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;
    gpaBox.textContent = `Your GPA: ${gpa.toFixed(2)}`;
  }

  // Handler for Add Course button.
  addCourseBtn.addEventListener('click', () => {
    const selectedBylaw = getRadioValue(bylawRadios); // For potential future use.
    const selectedGradeType = getRadioValue(gradeTypeRadios);
    const courseName = courseNameInput.value.trim();
    const courseHours = courseHoursInput.value.trim();
    const gradeField = document.getElementById('courseGrade');
    let courseGrade = gradeField.value.trim();

    // Validation.
    if (!courseName || !courseHours || !courseGrade) {
      alert("Please fill out Course Name, Credit Hours, and Grade.");
      return;
    }
    if (isNaN(courseHours)) {
      alert("Credit Hours must be a number.");
      return;
    }
    
    // If grade type is percentage, convert number to letter.
    if (selectedGradeType === 'percentage') {
      const numericGrade = parseFloat(courseGrade);
      if (isNaN(numericGrade)) {
        alert("Please enter a valid numeric grade.");
        return;
      }
      courseGrade = numericToLetter(numericGrade);
    }

    // Create a new row.
    const row = document.createElement('tr');

    // Course Name cell.
    const nameCell = document.createElement('td');
    nameCell.textContent = courseName;
    row.appendChild(nameCell);

    // Credit Hours cell.
    const hoursCell = document.createElement('td');
    hoursCell.textContent = courseHours;
    row.appendChild(hoursCell);

    // Grade cell.
    const gradeCell = document.createElement('td');
    gradeCell.textContent = courseGrade;
    row.appendChild(gradeCell);

    // Remove cell with SVG icon.
    const removeCell = document.createElement('td');
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-icon-btn');
    removeBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 16 16" id="remove" width="18" height="18">
        <path d="M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"></path>
        <path d="M10.122 4.465 8 6.586 5.878 4.465 4.464 5.879 6.586 8l-2.122 2.121 1.414 1.414L8 9.414l2.122 2.121 1.414-1.414L9.414 8l2.122-2.121z"></path>
      </svg>
    `;
    removeBtn.addEventListener('click', () => {
      row.remove();
      calculateGPA();
    });
    removeCell.appendChild(removeBtn);
    row.appendChild(removeCell);

    // Append the new row.
    coursesTbody.appendChild(row);

    // Clear inputs.
    courseNameInput.value = '';
    courseHoursInput.value = '';
    gradeField.value = '';

    // Auto calculate GPA.
    calculateGPA();
  });

  // Helper: Get checked radio value.
  function getRadioValue(radioNodeList) {
    for (let i = 0; i < radioNodeList.length; i++) {
      if (radioNodeList[i].checked) {
        return radioNodeList[i].value;
      }
    }
    return null;
  }

  // Get modal elements for Import Courses.
  const importCoursesBtn = document.getElementById('importCoursesBtn');
  const importModal = document.getElementById('importModal');
  const cancelImportBtn = document.getElementById('cancelImportBtn');
  const doImportBtn = document.getElementById('doImportBtn');
  const importTextarea = document.getElementById('importTextarea');

  // Show modal when clicking the Import Courses button.
  importCoursesBtn.addEventListener('click', () => {
    importModal.style.display = 'flex';
  });

  // Hide modal when clicking Cancel.
  cancelImportBtn.addEventListener('click', () => {
    importModal.style.display = 'none';
    importTextarea.value = '';
  });

  // Function to add an imported course row (similar to your add course button).
  function addImportedCourse(courseName, courseHours, courseGrade) {
    const row = document.createElement('tr');

    // Course Name cell.
    const nameCell = document.createElement('td');
    nameCell.textContent = courseName;
    row.appendChild(nameCell);

    // Credit Hours cell.
    const hoursCell = document.createElement('td');
    hoursCell.textContent = courseHours;
    row.appendChild(hoursCell);

    // Grade cell.
    const gradeCell = document.createElement('td');
    gradeCell.textContent = courseGrade;
    row.appendChild(gradeCell);

    // Remove cell with SVG icon.
    const removeCell = document.createElement('td');
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-icon-btn');
    removeBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="18" height="18">
        <path d="M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"></path>
        <path d="M10.122 4.465 8 6.586 5.878 4.465 4.464 5.879 6.586 8l-2.122 2.121 1.414 1.414L8 9.414l2.122 2.121 1.414-1.414L9.414 8l2.122-2.121z"></path>
      </svg>
    `;
    removeBtn.addEventListener('click', () => {
      row.remove();
      calculateGPA();
    });
    removeCell.appendChild(removeBtn);
    row.appendChild(removeCell);

    // Append the row.
    coursesTbody.appendChild(row);
  }

  // Function to handle the import process.
  doImportBtn.addEventListener('click', () => {
    const pastedHTML = importTextarea.value.trim();
    if (!pastedHTML) {
      alert("Please paste the HTML code.");
      return;
    }

    // Create a temporary container to parse the pasted HTML.
    const dummy = document.createElement('div');
    dummy.innerHTML = pastedHTML;

    // Adjust the query selector based on the imported HTML structure.
    // For this example, we assume the courses are in a table with class names:
    // 'table table-striped col-md-12'
    const tableRows = dummy.querySelectorAll('table.table.table-striped.col-md-12 tr');
    if (tableRows.length === 0) {
      alert('Invalid HTML. Please check that you pasted the correct code.');
      return;
    }

    // Loop through each row and extract course data.
    tableRows.forEach(row => {
      const data = row.getElementsByTagName('td');
      if (data.length === 0) return; // Skip header rows

      const courseName = data[1] ? data[1].innerText.trim() : '';
      const courseHours = data[3] ? data[3].innerText.trim() : '';
      let courseGrade = '';
      if (data[6]) {
        const gradeElement = data[6].querySelector('p');
        courseGrade = gradeElement ? gradeElement.innerText.trim() : '';
      }

      // Validate extracted data.
      if (courseName && courseHours && courseGrade) {
        // (Optional) Convert numeric grade to letter if needed.
        // courseGrade = numericToLetter(parseFloat(courseGrade));
        addImportedCourse(courseName, courseHours, courseGrade);
      }
    });

    // Hide the modal and clear the textarea.
    importModal.style.display = 'none';
    importTextarea.value = '';

    // Auto calculate GPA after import.
    calculateGPA();
  });

  // Hide the modal when clicking outside its content.
  window.addEventListener('click', (e) => {
    if (e.target === importModal) {
      importModal.style.display = 'none';
      importTextarea.value = '';
    }
  });
  pasteBtn.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        importTextarea.value = text;
      } else {
        alert("No text found in clipboard.");
      }
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
      alert("Clipboard access not supported or permission denied.");
    }
  });
});
