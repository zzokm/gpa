export type Grade = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'D-' | 'F';

export type GradeType = 'letter' | 'percentage';

// Common terms
export type KnownTerm = 'First Term' | 'Second Term';
export type Term = string; // Allow any string for term

export type Level = 'First Level' | 'Second Level' | 'Third Level' | 'Fourth Level';

export interface Course {
  id?: string;
  name: string;
  hours: number;
  grade: Grade | null; // Allow null for courses without grades
  term?: Term; // Optional for manually added courses
  level?: Level; // Optional for manually added courses
  isImported?: boolean; // Track if course was imported
}
