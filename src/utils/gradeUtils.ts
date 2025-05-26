import { Course, Grade } from '../types/Course';

// Convert numeric grade (0–100) to a letter grade
export function numericToLetter(num: number): Grade {
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

// Convert letter grade to GPA points
export function letterToPoints(letter: Grade | null): number {
  if (letter === null) return 0; // Don't count courses without grades
  
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

// Calculate GPA from courses
export function calculateGPA(courses: Course[]): number {
  if (courses.length === 0) return 0;

  // Only include courses that have grades
  const coursesWithGrades = courses.filter(course => course.grade !== null);
  if (coursesWithGrades.length === 0) return 0;

  let totalPoints = 0;
  let totalCredits = 0;

  coursesWithGrades.forEach(course => {
    const points = letterToPoints(course.grade);
    totalPoints += points * course.hours;
    totalCredits += course.hours;
  });

  return totalCredits > 0 ? (totalPoints / totalCredits) : 0;
}

// Get color for grade based on gradient: green (A+) → yellow (C) → red (D-/F)
export function getGradeColor(grade: Grade | null): string {
  if (grade === null) return '#9ca3af'; // gray-400 for no grade
  
  switch (grade) {
    case 'A+': return '#16a34a'; // green-600
    case 'A':  return '#22c55e'; // green-500
    case 'A-': return '#4ade80'; // green-400
    case 'B+': return '#65a30d'; // lime-600
    case 'B':  return '#84cc16'; // lime-500
    case 'B-': return '#a3e635'; // lime-400
    case 'C+': return '#eab308'; // yellow-500
    case 'C':  return '#fbbf24'; // yellow-400
    case 'C-': return '#fcd34d'; // yellow-300
    case 'D+': return '#f97316'; // orange-500
    case 'D':  return '#fb923c'; // orange-400
    case 'D-': return '#dc2626'; // red-600
    case 'F':  return '#b91c1c'; // red-700
    default:   return '#6b7280'; // gray-500
  }
}

// Calculate luminance of a color for contrast determination
function getLuminance(hex: string): number {
  // Remove # if present
  const color = hex.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(color.substr(0, 2), 16) / 255;
  const g = parseInt(color.substr(2, 2), 16) / 255;
  const b = parseInt(color.substr(4, 2), 16) / 255;
  
  // Apply gamma correction
  const [rs, gs, bs] = [r, g, b].map(c => 
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  
  // Calculate luminance
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Get contrasting text color (white or black) based on background color
export function getGradeTextColor(grade: Grade | null): string {
  if (grade === null) return '#ffffff'; // white text for grey background
  
  const backgroundColor = getGradeColor(grade);
  const luminance = getLuminance(backgroundColor);
  
  // Use white text for dark backgrounds, black for light backgrounds
  // Threshold of 0.5 provides good contrast
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

// Get grade styling object with both background and text colors
export function getGradeStyles(grade: Grade | null): { backgroundColor: string; color: string } {
  return {
    backgroundColor: getGradeColor(grade),
    color: '#ffffff' // Always use white text for better readability regardless of background
  };
}
