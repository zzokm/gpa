import React, { useState, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { Course, Grade } from '../types/Course';

import GradeDropdown from './GradeDropdown';
import EnhancedRotatingNumberInput from './RotatingNumberInput';

// Import course data for autocomplete
import courseData from '../data/Courses.json';

// Interface for course suggestion
interface CourseSuggestion {
  code: string;
  name: string;
  credit_hours: number;
}

// Interface for raw course data from JSON
interface RawCourseData {
  code: string;
  name: string;
  credit_hours: number;
  prerequisites?: string | string[];
  type?: string;
  description?: string;
}

// Function to check if a string contains both letters and at least one number
const containsLettersAndNumbers = (str: string): boolean => {
  return /[a-zA-Z]/.test(str) && /[0-9]/.test(str);
}

// Function to get all courses from the JSON structure
const getAllCourses = (): CourseSuggestion[] => {
  const courses: CourseSuggestion[] = [];
  const uniqueCourseSet = new Set<string>(); // For tracking duplicate courses by name and code
  
  try {
    // Extract courses from program requirements
    const processCoursesArray = (coursesArray: RawCourseData[]) => {
      if (!Array.isArray(coursesArray)) return;
      
      coursesArray.forEach(course => {
        if (course && course.code && course.name && course.credit_hours !== undefined) {
          // Create unique identifier for each course to prevent duplicates
          const courseId = `${course.code}_${course.name}`;
          
          // Only add if we haven't seen this course before
          if (!uniqueCourseSet.has(courseId)) {
            uniqueCourseSet.add(courseId);
            
            courses.push({
              code: course.code,
              name: course.name,
              credit_hours: course.credit_hours
            });
          }
        }
      });
    };
    
    // Process general requirements
    if (courseData.program_requirements?.general_requirements) {
      const generalReq = courseData.program_requirements.general_requirements;
      if (generalReq.mandatory?.courses) {
        processCoursesArray(generalReq.mandatory.courses);
      }
      if (generalReq.elective?.courses) {
        processCoursesArray(generalReq.elective.courses);
      }
    }
    
    // Process university requirements
    if (courseData.program_requirements?.university_requirements_no_credit?.courses) {
      processCoursesArray(courseData.program_requirements.university_requirements_no_credit.courses);
    }
    
    // Process college requirements
    if (courseData.program_requirements?.college_requirements) {
      const collegeReq = courseData.program_requirements.college_requirements;
      if (collegeReq.mathematics_and_basic_sciences?.courses) {
        processCoursesArray(collegeReq.mathematics_and_basic_sciences.courses);
      }
      if (collegeReq.basic_computer_science?.courses) {
        processCoursesArray(collegeReq.basic_computer_science.courses);
      }
    }
    
    // Process all majors
    if (courseData.majors) {
      Object.keys(courseData.majors).forEach(majorKey => {
        const major = courseData.majors[majorKey as keyof typeof courseData.majors];
        if (major && major.major_requirements) {
          const majorReq = major.major_requirements;
          
          if (majorReq.applied_sciences_mandatory?.courses) {
            processCoursesArray(majorReq.applied_sciences_mandatory.courses);
          }
          if (majorReq.electives?.courses) {
            processCoursesArray(majorReq.electives.courses);
          }
          if (majorReq.graduation_project?.courses) {
            processCoursesArray(majorReq.graduation_project.courses);
          }
          if (majorReq.field_training?.courses) {
            processCoursesArray(majorReq.field_training.courses);
          }
        }
      });
    }
  } catch (error) {
    console.error("Error processing course data:", error);
  }
  
  return courses;
};

interface CourseFormProps {
  onAddCourse: (course: Course) => void;
  onShowImport: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ 
  onAddCourse, 
  onShowImport 
}) => {
  const [courseName, setCourseName] = useState('');
  const [courseHours, setCourseHours] = useState(2);
  const [courseGrade, setCourseGrade] = useState<Grade>('A+');
  const [suggestions, setSuggestions] = useState<CourseSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  // Initialize courses data using lazy initialization
  const [allCourses] = useState<CourseSuggestion[]>(() => getAllCourses());
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Calculate string similarity using Levenshtein Distance algorithm
  // Returns a score from 0 (completely different) to 1 (perfect match)
  const calculateLevenshteinSimilarity = (str1: string, str2: string): number => {
    // Convert both strings to lowercase for case-insensitive comparison
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
    
    // For empty strings or exact matches, handle edge cases
    if (str1 === str2) return 1; // Perfect match
    if (str1.length === 0) return 0;
    if (str2.length === 0) return 0;
    
    // Set max allowed edit distance based on string length
    // 1 edit for short words (≤ 5 chars)
    // 2 edits for medium words (6-9 chars)
    // 3 edits for long words (≥ 10 chars)
    const getMaxAllowedEdits = (length: number): number => {
      if (length <= 5) return 1;
      if (length <= 9) return 2;
      return 3;
    };
    
    // Calculate Levenshtein Distance matrix
    const matrix: number[][] = [];
    
    // Initialize first row
    for (let i = 0; i <= str2.length; i++) {
      matrix[0] = matrix[0] || [];
      matrix[0][i] = i;
    }
    
    // Initialize first column
    for (let i = 0; i <= str1.length; i++) {
      matrix[i] = matrix[i] || [];
      matrix[i][0] = i;
    }
    
    // Fill the matrix
    for (let i = 1; i <= str1.length; i++) {
      for (let j = 1; j <= str2.length; j++) {
        if (str1.charAt(i - 1) === str2.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1]; // No operation needed
        } else {
          // Minimum of three operations (insertion, deletion, substitution)
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // Substitution
            Math.min(
              matrix[i][j - 1] + 1,   // Insertion
              matrix[i - 1][j] + 1    // Deletion
            )
          );
        }
      }
    }
    
    // The final cell contains the Levenshtein distance
    const distance = matrix[str1.length][str2.length];
    
    // Calculate maximum allowed edits based on shorter string length
    const shorterLen = Math.min(str1.length, str2.length);
    const maxAllowedEdits = getMaxAllowedEdits(shorterLen);
    
    // If distance exceeds max allowed edits, return 0 (no match)
    if (distance > maxAllowedEdits) {
      return 0;
    }
    
    // For very short strings (1-2 chars), be extremely strict
    if (shorterLen <= 2) {
      return str1 === str2 ? 1 : 0;
    }
    
    // Convert distance to similarity score (0-1)
    // For perfect match: distance = 0, similarity = 1
    // For maximum allowed edits: similarity ~ 0.7
    // Formula: 1 - (distance / max(strings length))
    const maxPossibleDistance = Math.max(str1.length, str2.length);
    return Math.max(0, 1 - (distance / maxPossibleDistance));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setCourseName(input);
    
    // Show suggestions after at least 2 characters
    if (input.length >= 2) {
      const inputLower = input.toLowerCase();
      let matchedCourses: Array<{course: CourseSuggestion, score: number}> = [];
      
      // Check if input contains both letters and at least one number
      const hasLettersAndNumbers = containsLettersAndNumbers(inputLower);
      
      // Search through all courses for matches
      allCourses.forEach(course => {
        // Check for direct substring matches
        // Only suggest course codes if the input has both letters and numbers
        const codeMatch = hasLettersAndNumbers ? 
          course.code.toLowerCase().includes(inputLower) : 
          false;
          
        const nameMatch = course.name.toLowerCase().includes(inputLower);
        
        // Check for fuzzy match in name or code
        let fuzzyScore = 0;
        if (!codeMatch && !nameMatch) {
          // Split the course name into words and check each for fuzzy matching
          const words = course.name.split(/\s+/).map(word => word.toLowerCase());
          for (const word of words) {
            if (word.length >= 3) { // Only check meaningful words
              const similarity = calculateLevenshteinSimilarity(word, inputLower);
              fuzzyScore = Math.max(fuzzyScore, similarity);
            }
          }
          
          // Also check code for fuzzy matching - but only if input has letters and numbers
          if (hasLettersAndNumbers) {
            const codeSimilarity = calculateLevenshteinSimilarity(course.code.toLowerCase(), inputLower);
            fuzzyScore = Math.max(fuzzyScore, codeSimilarity);
          }
        }
        
        // Determine if this course should be included - using stricter threshold for fuzzy matches
        // For Levenshtein, we need an even higher threshold since it's more precise
        if (codeMatch || nameMatch || fuzzyScore > 0.85) { // Higher threshold for Levenshtein matching
          // Calculate overall match score to determine display order
          let score = 0;
          
          // Calculate ranking score
          if (codeMatch) {
            // Exact code match gets highest priority
            score += 0.95;
          }
          if (nameMatch) {
            // Exact name match gets high priority
            score += 0.85;
          }
          
          // Add fuzzy match score with proper weight
          if (fuzzyScore > 0) {
            // Weight fuzzy matches according to their quality
            // Perfect Levenshtein matches (score=1) get higher weight than partial matches
            const fuzzyWeight = fuzzyScore >= 0.95 ? 0.5 : 0.25;
            score += fuzzyScore * fuzzyWeight;
          }
          
          matchedCourses.push({ course, score });
        }
      });
      
      // Sort matches by score (highest to lowest)
      matchedCourses.sort((a, b) => b.score - a.score);
      
      // Apply dynamic threshold based on best match
      if (matchedCourses.length > 0) {
        const bestScore = matchedCourses[0].score;
        
        // Keep only suggestions that are reasonably close to the best match
        // If best match has score 0.95, only keep matches with score >= 0.76 (80% of best score)
        // This prevents showing very poor matches when good matches exist
        const threshold = Math.max(0.7, bestScore * 0.8);
        matchedCourses = matchedCourses.filter(match => match.score >= threshold);
        
        // Still limit the total number of suggestions for better UX
        matchedCourses = matchedCourses.slice(0, 6);
      }
      
      // Extract just the course objects from the sorted results
      const filteredSuggestions = matchedCourses.map(item => item.course);
      
      setSuggestions(filteredSuggestions);
      setShowSuggestions(filteredSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: CourseSuggestion) => {
    setCourseName(suggestion.name);
    setCourseHours(suggestion.credit_hours);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAddCourse({
      name: courseName,
      hours: courseHours,
      grade: courseGrade
    });

    // Reset form
    setCourseName('');
    setCourseHours(2); // Reset to default value
    setCourseGrade('A+');
  };

  return (
    <div className="top-box">
      <Form onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="form-label" htmlFor="courseName">Course Name:</label>
          <div className="form-grade-container">
            <input
              ref={inputRef}
              type="text"
              id="courseName"
              className="form-input"
              value={courseName}
              onChange={handleInputChange}
              placeholder="Enter course name"
              onFocus={() => courseName.length >= 2 && setShowSuggestions(true)}
            />
            {showSuggestions && suggestions.length > 0 && (
              <div 
                ref={suggestionsRef}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  backgroundColor: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.5)',
                  borderRadius: 'var(--radius-md)',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  zIndex: 1000,
                  boxShadow: 'var(--shadow-md)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  background: 'rgba(255, 255, 255, 0.9)'
                }}
              >
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '10px 15px',
                      cursor: 'pointer',
                      borderBottom: index < suggestions.length - 1 ? '1px solid rgba(203, 213, 225, 0.5)' : 'none',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      fontWeight: 500,
                      color: 'var(--text-color)',
                      transition: 'var(--transition-base)'
                    }}
                    onClick={() => handleSuggestionClick(suggestion)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 121, 85, 0.1)';
                      e.currentTarget.style.color = 'var(--primary-600)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '';
                      e.currentTarget.style.color = 'var(--text-color)';
                    }}
                  >
                    <strong>{suggestion.code}</strong> - {suggestion.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="form-row">
          <label className="form-label" htmlFor="courseHours">Credit Hours:</label>
          <EnhancedRotatingNumberInput
            value={courseHours}
            onChange={(value: number) => setCourseHours(value)}
            min={0}
            max={3}
            disabled={false}
          />
        </div>

        <div className="form-row">
          <label className="form-label" htmlFor="courseGrade">Grade:</label>
          <div className="form-grade-container">
            <GradeDropdown
              courseId="form-grade"
              courseName="Form Grade"
              onSelectGrade={(_, grade) => setCourseGrade(grade)}
              currentGrade={courseGrade}
              displayMode="input"
            />
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className="btn-primary">
            Add Course
          </button>
          <button 
            type="button" 
            className="btn-secondary"
            onClick={onShowImport}
          >
            Import Courses
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CourseForm;
