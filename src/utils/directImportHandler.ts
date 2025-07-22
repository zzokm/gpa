import { Course, Grade, Term, Level } from '../types/Course';

/**
 * Processes HTML from newecom courses page directly into Course objects
 * Used for direct imports from the Chrome extension
 */
export const processImportedHTML = (html: string): Course[] => {
  if (!html || html.trim() === '') {
    console.error('Empty HTML provided for import');
    return [];
  }

  // Create a temporary container to parse the HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // Find the courses table - multiple selectors for flexibility
  let tableRows: NodeListOf<Element> = doc.querySelectorAll('table.table.table-striped.col-md-12 tr');
  
  // Try alternative selectors if the first one didn't find anything
  if (tableRows.length === 0) {
    tableRows = doc.querySelectorAll('table.table.table-striped tr');
  }
  
  if (tableRows.length === 0) {
    tableRows = doc.querySelectorAll('table tr');
  }
  
  if (tableRows.length === 0) {
    console.error('No table rows found in imported HTML');
    return [];
  }
  
  const importedCourses: Course[] = [];

  // Loop through each row and extract course data
  tableRows.forEach((row: Element) => {
    const data = row.getElementsByTagName('td');
    if (data.length === 0) return; // Skip header rows

    const courseName = data[1] ? data[1].textContent?.trim() : '';
    const courseHours = data[3] ? data[3].textContent?.trim() : '';
    let courseGrade: Grade | null = null;
    let courseTerm: Term | undefined = undefined;
    let courseLevel: Level | undefined = undefined;
    
    // Extract grade from td[6]
    if (data[6]) {
      const gradeElement = data[6].querySelector('p');
      const gradeText = gradeElement ? gradeElement.textContent?.trim() : '';
      // Only set grade if it's a valid grade
      if (gradeText && gradeText !== '' && gradeText !== '-' && gradeText !== 'N/A' && gradeText.trim() !== '') {
        // Validate that it's actually a valid grade
        const validGrades: Grade[] = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
        if (validGrades.includes(gradeText as Grade)) {
          courseGrade = gradeText as Grade;
        }
      }
    }
    
    // Extract level from td[10]
    if (data[10]) {
      const levelElement = data[10].querySelector('div span');
      const levelText = levelElement ? levelElement.textContent?.trim() : '';
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
    
    // Extract term from td[11]
    if (data[11]) {
      const termElement = data[11].querySelector('div span');
      const termText = termElement ? termElement.textContent?.trim() : '';
      if (termText) {
        // Map the text to our Term type
        const termMap: Record<string, Term> = {
          '1': 'First Term',
          '2': 'Second Term',
          'First': 'First Term',
          'Second': 'Second Term',
          'first': 'First Term',
          'second': 'Second Term'
        };
        // If it's a known term, use the mapped value, otherwise keep the original term text
        courseTerm = termMap[termText] || termMap[termText.replace(/ Term/i, '')] || termText as Term;
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

  return importedCourses;
};

/**
 * Handles merging imported courses with existing ones
 * Returns the final list of courses to use
 */
export const mergeImportedCourses = (
  importedCourses: Course[],
  currentCourses: Course[]
): Course[] => {
  // Create a map of current courses by name for easy lookup
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