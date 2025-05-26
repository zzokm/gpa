export type Grade = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'D-' | 'F';

export type GradeType = 'letter' | 'percentage';

export interface Course {
  id?: string;
  name: string;
  hours: number;
  grade: Grade | null; // Allow null for courses without grades
}
