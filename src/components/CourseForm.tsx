import React, { useState, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { Course, Grade } from '../types/Course';
import { useLocale } from '../i18n/LocaleContext';

import GradeDropdown from './GradeDropdown';
import EnhancedRotatingNumberInput from './RotatingNumberInput';
import { normalizeCreditHours } from '../utils/creditHours';

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
  hasCourses?: boolean;
}

const CourseForm: React.FC<CourseFormProps> = ({ 
  onAddCourse, 
  onShowImport,
  hasCourses = false,
}) => {
  const { t } = useLocale();
  const [isExpanded, setIsExpanded] = useState(true);
  const [courseName, setCourseName] = useState('');
  const [courseHours, setCourseHours] = useState(2);
  const [courseGrade, setCourseGrade] = useState<Grade>('A+');
  const [suggestions, setSuggestions] = useState<CourseSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  // Initialize courses data using lazy initialization
  const [allCourses] = useState<CourseSuggestion[]>(() => getAllCourses());
  const suggestionsRef = useRef<HTMLUListElement>(null);
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
      setActiveSuggestionIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion: CourseSuggestion) => {
    setCourseName(suggestion.name);
    setCourseHours(normalizeCreditHours(suggestion.credit_hours));
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Escape') setShowSuggestions(false);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && activeSuggestionIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[activeSuggestionIndex]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAddCourse({
      name: courseName,
      hours: normalizeCreditHours(courseHours),
      grade: courseGrade
    });

    // Reset form
    setCourseName('');
    setCourseHours(2);
    setCourseGrade('A+');
  };

  return (
    <>
      <CourseFormStyles />
      {hasCourses && !isExpanded ? (
      <div className="top-box top-box-compact">
        <div className="course-form-compact">
          <button type="button" className="btn-primary" onClick={() => setIsExpanded(true)}>
            {t('form.showAddForm')}
          </button>
          <button type="button" className="btn-secondary" onClick={onShowImport}>
            {t('form.importCourses')}
          </button>
        </div>
      </div>
      ) : (
    <div className="top-box">
      {hasCourses && (
        <button
          type="button"
          className="course-form-collapse-btn"
          onClick={() => setIsExpanded(false)}
          aria-expanded="true"
        >
          {t('form.hideAddForm')}
        </button>
      )}
      <Form onSubmit={handleSubmit} className="course-form" aria-label={t('form.addCourse')}>
        <div className="form-row">
          <label className="form-label" htmlFor="courseName">{t('form.courseName')}</label>
          <div className="form-control-wrap form-control-wrap--autocomplete">
            <input
              ref={inputRef}
              type="text"
              id="courseName"
              className="form-input form-input--text"
              value={courseName}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              placeholder={t('form.placeholder')}
              onFocus={() => courseName.length >= 2 && suggestions.length > 0 && setShowSuggestions(true)}
              autoComplete="off"
              aria-autocomplete="list"
              aria-controls="course-suggestions"
              aria-expanded={showSuggestions}
              role="combobox"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul
                ref={suggestionsRef}
                id="course-suggestions"
                className="course-form-suggestions"
                role="listbox"
                aria-label={t('form.courseName')}
              >
                {suggestions.map((suggestion, index) => (
                  <li key={suggestion.code} role="presentation">
                    <button
                      type="button"
                      role="option"
                      aria-selected={index === activeSuggestionIndex}
                      className={`course-form-suggestion-item${index === activeSuggestionIndex ? ' is-active' : ''}`}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <span className="course-form-suggestion-code">{suggestion.code}</span>
                      <span className="course-form-suggestion-name">{suggestion.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="form-row">
          <label className="form-label" id="courseHours-label" htmlFor="courseHours-input">
            {t('form.creditHours')}
          </label>
          <div className="form-control-wrap" id="courseHours-input" aria-labelledby="courseHours-label">
            <EnhancedRotatingNumberInput
              value={courseHours}
              onChange={(value: number) => setCourseHours(value)}
              disabled={false}
            />
          </div>
        </div>

        <div className="form-row">
          <label className="form-label" id="courseGrade-label" htmlFor="courseGrade-trigger">
            {t('form.grade')}
          </label>
          <div className="form-control-wrap form-control-wrap--grade" aria-labelledby="courseGrade-label">
            <GradeDropdown
              courseId="form-grade"
              courseName={t('form.formGrade')}
              onSelectGrade={(_, grade) => setCourseGrade(grade)}
              currentGrade={courseGrade}
              displayMode="input"
            />
          </div>
        </div>

        <div className="course-form-actions">
          <button type="submit" className="btn-primary">
            {t('form.addCourse')}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={onShowImport}
          >
            {t('form.importCourses')}
          </button>
        </div>
      </Form>
    </div>
      )}
    </>
  );
};

function CourseFormStyles() {
  return (
    <style jsx global>{`/* Course form — shared surface + control rhythm */
.top-box {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-radius: var(--radius-2xl);
  padding: var(--space-xl);
  border: 1px solid var(--glass-border);
  transition: var(--transition-base);
  width: 100%;
  max-width: 100%;
  box-shadow: var(--shadow-xs);
}

.top-box-compact {
  padding: var(--space-md) var(--space-lg);
}

.course-form-compact {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-sm);
  width: 100%;
}

.course-form-compact .btn-primary,
.course-form-compact .btn-secondary {
  width: 100%;
  min-width: 0;
  min-height: 44px;
  height: 44px;
  padding: 0 var(--space-md);
  box-sizing: border-box;
  font-size: var(--text-base);
  font-weight: 650;
  line-height: 1.2;
}

.course-form-compact .btn-primary {
  border: 2px solid transparent;
}

.course-form-compact .btn-secondary {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 2px solid rgba(255, 121, 85, 0.6);
  color: var(--primary-600);
}

.course-form-compact .btn-secondary:hover {
  background: var(--primary-500);
  border-color: var(--primary-500);
  color: var(--white);
}

.course-form-collapse-btn {
  display: block;
  margin-bottom: var(--space-md);
  margin-inline-start: auto;
  padding: var(--space-xs) var(--space-sm);
  min-height: 44px;
  border: 0;
  background: transparent;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.course-form-collapse-btn:hover {
  color: var(--primary-600);
}

.course-form-collapse-btn:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Form layout */
.course-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.form-row {
  display: grid;
  grid-template-columns: minmax(7.5rem, 9.5rem) minmax(0, 1fr);
  align-items: center;
  gap: var(--space-md) var(--space-lg);
}

.form-label {
  font-weight: 600;
  color: var(--text-color);
  font-size: var(--text-sm);
  text-align: start;
  line-height: 1.35;
}

.form-control-wrap {
  position: relative;
  min-width: 0;
  width: 100%;
}

.form-control-wrap--grade .grade-dropdown-input-mode {
  width: 100%;
}

/* Shared control shell — matches level/term glass density */
.course-form .form-input,
.course-form .credit-hours-input,
.course-form .grade-dropdown-input-mode .grade-dropdown-trigger.form-input-style-trigger {
  width: 100%;
  min-width: 0;
  height: 48px !important;
  min-height: 48px !important;
  padding: 0 var(--space-lg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  font-weight: 550;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  color: var(--text-color);
  transition:
    border-color 0.2s var(--ease-out-quart),
    box-shadow 0.2s var(--ease-out-quart),
    background-color 0.2s var(--ease-out-quart);
  outline: none;
  box-sizing: border-box;
  box-shadow: var(--shadow-xs);
}

.course-form .form-input--text:placeholder-shown {
  text-align: center;
}

.course-form .form-input--text:not(:placeholder-shown) {
  text-align: start;
}

.course-form .form-input:focus,
.course-form .form-input:focus-visible,
.course-form .credit-hours-input:focus-within,
.course-form .grade-dropdown-input-mode .grade-dropdown-trigger.form-input-style-trigger:hover,
.course-form .grade-dropdown-input-mode .grade-dropdown-trigger.form-input-style-trigger:focus,
.course-form .grade-dropdown-input-mode .grade-dropdown-trigger.form-input-style-trigger:focus-visible {
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(255, 121, 85, 0.2);
  background: rgba(255, 255, 255, 0.42);
}

.course-form .form-input::placeholder {
  color: var(--text-secondary);
  font-weight: 400;
  opacity: 1;
}

/* Autocomplete */
.course-form-suggestions {
  position: absolute;
  top: calc(100% + var(--space-xs));
  inset-inline: 0;
  margin: 0;
  padding: var(--space-xs);
  list-style: none;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  max-height: 14rem;
  overflow-y: auto;
  z-index: var(--z-dropdown);
  box-shadow: var(--shadow-md);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
}

.course-form-suggestion-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  font: inherit;
  font-weight: 500;
  color: var(--text-color);
  text-align: start;
  cursor: pointer;
  transition: background-color 0.15s var(--ease-out-quart);
}

.course-form-suggestion-item:hover,
.course-form-suggestion-item.is-active {
  background: rgba(255, 121, 85, 0.12);
  color: var(--primary-700);
}

.course-form-suggestion-item:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: -2px;
}

.course-form-suggestion-code {
  flex-shrink: 0;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--primary-600);
}

.course-form-suggestion-name {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Grade trigger in form */
.course-form .grade-dropdown-input-text {
  flex: 1;
  text-align: center;
  font-size: var(--text-lg);
  font-weight: 650;
  font-variant-numeric: tabular-nums;
}

.course-form .grade-dropdown-input-mode .grade-dropdown-trigger.form-input-style-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  margin: 0;
  cursor: pointer;
}

.course-form .grade-dropdown-input-mode .grade-dropdown-arrow {
  flex-shrink: 0;
  margin-inline-start: var(--space-sm);
  width: 14px;
  height: 14px;
  color: var(--text-secondary);
}

/* Actions */
.course-form-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  justify-content: stretch;
  margin-top: var(--space-xs);
  padding-top: var(--space-md);
  border-top: 1px solid var(--glass-border);
}

.course-form-actions .btn-primary,
.course-form-actions .btn-secondary {
  flex: 1 1 12rem;
  min-height: 44px;
  box-sizing: border-box;
}

.course-form-actions .btn-primary {
  border: 2px solid transparent;
}

.course-form-actions .btn-secondary {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 2px solid rgba(255, 121, 85, 0.6);
  color: var(--primary-600);
}

.course-form-actions .btn-secondary:hover {
  background: var(--primary-500);
  border-color: var(--primary-500);
  color: var(--white);
}

[dir="rtl"] .form-label {
  text-align: start;
}

@media (prefers-reduced-motion: reduce) {
  .course-form .form-input,
  .course-form .credit-hours-input,
  .course-form .grade-dropdown-input-mode .grade-dropdown-trigger.form-input-style-trigger {
    transition: none;
  }
}

@media (max-width: 768px) {
  .top-box {
    padding: var(--space-lg);
    border-radius: var(--radius-xl);
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: var(--space-xs);
  }

  .form-label {
    font-size: var(--text-base);
  }

  .course-form .form-input,
  .course-form .credit-hours-input,
  .course-form .grade-dropdown-input-mode .grade-dropdown-trigger.form-input-style-trigger {
    height: 44px !important;
    min-height: 44px !important;
    max-height: 44px !important;
    padding: 0 var(--space-md);
  }

  .course-form-compact {
    grid-template-columns: 1fr;
  }

  .course-form-actions {
    flex-direction: column;
  }

  .course-form-actions .btn-primary,
  .course-form-actions .btn-secondary {
    width: 100%;
  }
}

@media (max-width: 360px) {
  .form-label {
    min-width: 0;
  }
}`}</style>
  );
}

export default CourseForm;
