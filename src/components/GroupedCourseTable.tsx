import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Course, Grade } from '../types/Course';
import { getGradeStyles, calculateGPA } from '../utils/gradeUtils';
import { useLocale } from '../i18n/LocaleContext';
import GradeDropdown from './GradeDropdown';
import CreditHoursDropdown from './CreditHoursDropdown';
import StatsModal from './StatsModal';
import ConfirmationModal from './ConfirmationModal';
import './CourseTableStyles.css';
import './GroupedCourseTable.css';
import './CreditHoursDropdownStyles.css';
import { STORAGE_KEYS } from '../utils/storage-keys';

interface GroupedCourseTableProps {
  courses: Course[];
  onRemoveCourse: (id: string) => void;
  onUpdateGrade: (id: string, grade: Grade) => void;
  onUpdateCreditHours: (id: string, hours: number) => void;
  onClearCourses: (clearedCourses: Course[]) => void;
}

interface NestedGroupedCourses {
  [level: string]: {
    [term: string]: Course[];
  };
}

interface GroupState {
  [key: string]: boolean; // true for expanded, false for collapsed
}

interface GroupStats {
  courseCount: number;
  totalCredits: number;
  passedCredits: number;
  failedCredits: number;
  gpa: number;
}

interface ModalData {
  title: string;
  stats: GroupStats;
  courses: Course[];
}

// Local storage key for group states
const GROUP_STATE_KEY = STORAGE_KEYS.GROUP_STATES;

const TERM_ORDER: Record<string, number> = {
  'First Term': 1,
  'Second Term': 2,
  'Summer Term': 3,
};

function sortTerms(terms: string[]): string[] {
  return [...terms].sort((a, b) => {
    const orderA = TERM_ORDER[a] ?? 3;
    const orderB = TERM_ORDER[b] ?? 3;
    if (orderA !== orderB) return orderA - orderB;
    return a.localeCompare(b);
  });
}

function getLatestTermKey(nested: NestedGroupedCourses): string | null {
  const levels = Object.keys(nested).sort();
  if (levels.length === 0) return null;
  const lastLevel = levels[levels.length - 1];
  const terms = sortTerms(Object.keys(nested[lastLevel]));
  if (terms.length === 0) return null;
  return `term-${lastLevel}-${terms[terms.length - 1]}`;
}

function applyDefaultGroupStates(
  nested: NestedGroupedCourses,
  stored: GroupState,
  courseCount: number
): GroupState {
  const states: GroupState = { ...stored };
  const collapseTerms = courseCount > 6;
  const latestTermKey = collapseTerms ? getLatestTermKey(nested) : null;

  Object.keys(nested)
    .sort()
    .forEach((level) => {
      const levelKey = `level-${level}`;
      if (!(levelKey in states)) {
        states[levelKey] = true;
      }

      sortTerms(Object.keys(nested[level])).forEach((term) => {
        const termKey = `term-${level}-${term}`;
        if (!(termKey in states)) {
          states[termKey] = collapseTerms ? termKey === latestTermKey : true;
        }
      });
    });

  return states;
}

function parseStoredGroupStates(raw: unknown): GroupState {
  if (!raw || typeof raw !== 'object') return {};
  const states: GroupState = {};
  Object.entries(raw as Record<string, unknown>).forEach(([key, value]) => {
    states[key] = typeof value === 'number' ? value === 1 : Boolean(value);
  });
  return states;
}

function groupStatesEqual(a: GroupState, b: GroupState): boolean {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((key) => a[key] === b[key]);
}

function buildGroupStructureKey(courses: Course[]): string {
  const keys = new Set<string>();
  courses.forEach((course) => {
    if (course.isImported && course.level && course.term) {
      keys.add(`${course.level}|${course.term}`);
    }
  });
  return [...keys].sort().join('||');
}

function buildNestedGroupedCourses(courses: Course[]): NestedGroupedCourses {
  const grouped: NestedGroupedCourses = {};

  courses.forEach((course) => {
    if (course.isImported && course.level && course.term) {
      if (!grouped[course.level]) {
        grouped[course.level] = {};
      }
      if (!grouped[course.level][course.term]) {
        grouped[course.level][course.term] = [];
      }
      grouped[course.level][course.term].push(course);
    }
  });

  return grouped;
}

interface GroupHeaderStatsProps {
  stats: GroupStats;
  label: string;
}

function GroupHeaderStats({ stats, label }: GroupHeaderStatsProps) {
  const { t } = useLocale();

  return (
    <div className="group-header-stats-row" aria-label={label}>
      <span className="group-metric gpa">
        {t('gpa.label')} {stats.gpa.toFixed(2)}
      </span>
      {stats.failedCredits > 0 ? (
        <>
          <span className="group-metric-sep" aria-hidden="true">
            ·
          </span>
          <span className="group-metric credits">
            <span className="passed">{stats.passedCredits}</span>
            <span className="sep">/</span>
            <span className="failed">{stats.failedCredits}</span>
          </span>
        </>
      ) : null}
      <span className="group-metric-sep" aria-hidden="true">
        ·
      </span>
      <span className="group-metric total">
        {stats.totalCredits} {t('table.hrs')}
      </span>
    </div>
  );
}

const GroupedCourseTable: React.FC<GroupedCourseTableProps> = ({
  courses, 
  onRemoveCourse, 
  onUpdateGrade,
  onUpdateCreditHours,
  onClearCourses
}) => {
  const { t, translateLevelOrTerm } = useLocale();
  const [groupStates, setGroupStates] = useState<GroupState>({});
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const hasHydratedGroupStates = useRef(false);

  const manualCourses = useMemo(
    () => courses.filter((course) => !course.isImported),
    [courses]
  );

  const nestedGroupedCourses = useMemo(
    () => buildNestedGroupedCourses(courses),
    [courses]
  );

  const groupStructureKey = useMemo(
    () => buildGroupStructureKey(courses),
    [courses]
  );

  // Sync group expand/collapse state when level/term structure changes — not on every grade edit.
  useEffect(() => {
    const nested = buildNestedGroupedCourses(courses);
    let stored: GroupState = {};

    if (!hasHydratedGroupStates.current) {
      hasHydratedGroupStates.current = true;
      try {
        const storedStates = localStorage.getItem(GROUP_STATE_KEY);
        if (storedStates) {
          stored = parseStoredGroupStates(JSON.parse(storedStates));
        }
      } catch (error) {
        console.error('Failed to load group states from localStorage:', error);
      }
    }

    setGroupStates((prev) => {
      const base = Object.keys(prev).length > 0 ? prev : stored;
      const next = applyDefaultGroupStates(nested, base, courses.length);
      return groupStatesEqual(prev, next) ? prev : next;
    });
    setIsInitialized(true);
  }, [groupStructureKey, courses.length]);

  // Save group states to localStorage whenever they change (but not during initial load)
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(GROUP_STATE_KEY, JSON.stringify(groupStates));
      } catch (error) {
        console.error('Failed to save group states to localStorage:', error);
      }
    }
  }, [groupStates, isInitialized]);

  // Toggle group expansion; CSS transition in GroupedCourseTable.css handles smooth expand/collapse (0.35s)
  const toggleGroup = (groupKey: string) => {
    setGroupStates((prev) => ({
      ...prev,
      [groupKey]: prev[groupKey] === false,
    }));
  };

  const handleHeaderKeyDown = (event: React.KeyboardEvent, groupKey: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleGroup(groupKey);
    }
  };

  // Check if a group is expanded (default to expanded if not set)
  const isGroupExpanded = (groupKey: string): boolean => {
    return groupStates[groupKey] !== false; // Default to true (expanded), false is collapsed
  };

  // Function to handle opening modal
  const openModal = (title: string, stats: GroupStats, courses: Course[]) => {
    setModalData({ title, stats, courses });
  };

  // Function to handle closing modal
  const closeModal = () => {
    setModalData(null);
  };

  // Calculate statistics for a group of courses
  const calculateGroupStats = (courses: Course[]): GroupStats => {
    const totalCredits = courses.reduce((sum, course) => sum + course.hours, 0);
    
    // Calculate passed and failed credits
    const passedCredits = courses.reduce((sum, course) => {
      if (course.grade !== null && course.grade !== 'F') {
        return sum + course.hours;
      }
      return sum;
    }, 0);
    
    const failedCredits = courses.reduce((sum, course) => {
      if (course.grade === 'F') {
        return sum + course.hours;
      }
      return sum;
    }, 0);
    
    const gpa = calculateGPA(courses);
    return {
      courseCount: courses.length,
      totalCredits,
      passedCredits,
      failedCredits,
      gpa
    };
  };

  // Get all courses for a level
  const getLevelCourses = (level: string): Course[] => {
    const levelData = nestedGroupedCourses[level];
    return Object.values(levelData).flat();
  };
  const renderCourseRow = (course: Course) => (
    <tr key={course.id} className="course-row"><td className="course-name">{course.name}</td><td className="course-hours">
        <div className="credit-hours-cell">
          <div className="credit-hours-badge-container">
            <span className="credit-hours-badge">{course.hours}</span>
          </div>
          <CreditHoursDropdown
            courseId={course.id!}
            courseName={course.name}
            onSelectCreditHours={onUpdateCreditHours}
            currentHours={course.hours}
          />
        </div>
      </td><td>
        <div className="grade-cell">
          <div className="grade-badge-container">
            {course.grade !== null ? (
              <span
                className="course-grade-badge"
                style={getGradeStyles(course.grade)}
              >
                {course.grade}
              </span>
            ) : (
              <span className="course-grade-badge empty-grade">-</span>
            )}
          </div>
          <GradeDropdown
            courseId={course.id!}
            courseName={course.name}
            onSelectGrade={onUpdateGrade}
            currentGrade={course.grade !== null ? course.grade : null}
          />
        </div>
      </td><td>
        <button
          className="remove-btn"
          onClick={() => onRemoveCourse(course.id!)}
          aria-label={t('aria.removeCourse', { name: course.name })}
        >
          <svg fill="#ffffff" viewBox="-230 -230 1460.00 1460.00" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="5">
            <g id="SVGRepo_bgCarrier" strokeWidth="0" transform="translate(0,0), scale(1)">
              <rect x="-230" y="-230" width="1460.00" height="1460.00" rx="730" fill="#e81717" strokeWidth="0"></rect>
            </g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="2"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M767 336H233q-12 0-21 9t-9 21l38 505q1 13 12 21.5t30 8.5h434q18 0 29-8.5t13-21.5l38-505q0-12-9-21t-21-9zM344 841q-10 0-18-9t-8-21l-26-386q0-12 9-20.5t21-8.5 21 8.5 9 20.5l18 386q0 12-7.5 21t-18.5 9zm182-31q0 13-7.5 22t-18.5 9-18.5-9-7.5-22l-4-385q0-12 9-20.5t21-8.5 21 8.5 9 20.5zm156 1q0 12-8 21t-18 9q-11 0-18.5-9t-7.5-21l18-386q0-12 9-20.5t21-8.5 21 8.5 9 20.5zm101-605l-179-30q-12-2-15-15l-8-33q-4-20-14-26-6-3-22-3h-90q-16 0-23 3-10 6-13 26l-8 33q-2 13-15 15l-179 30q-19 3-31.5 14.5T173 249v28q0 9 6.5 15t15.5 6h610q9 0 15.5-6t6.5-15v-28q0-17-12.5-28.5T783 206z"></path>
            </g>
          </svg>
        </button>
      </td></tr>
  );
  if (courses.length === 0) {
    return (
      <div className="table-box">
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
            </svg>
          </div>
          <p>{t('table.emptyState')}</p>
        </div>
      </div>
    );
  }  return (
    <div className="table-box">
      {/* Render manually added courses first */}
      {manualCourses.length > 0 && (
        <div className="course-group level-group">
          <div className="group-header level-header">
            <h3 className="group-title">{t('table.manuallyAdded')}</h3>
          </div>
          <div className="table-container expanded">
            <div className="course-container">
              <table className="course-table">
                <thead className="table-header-hidden">
                  <tr>
                    <th>{t('table.courseName')}</th>
                    <th>{t('table.creditHours')}</th>
                    <th>{t('table.grade')}</th>
                    <th>{t('table.remove')}</th>
                  </tr>
                </thead>
                <tbody>
                  {manualCourses.map(renderCourseRow)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Render grouped imported courses by level */}
      {Object.keys(nestedGroupedCourses).sort().map(level => {
        const levelCourses = getLevelCourses(level);
        const levelStats = calculateGroupStats(levelCourses);
        const isLevelExpanded = isGroupExpanded(`level-${level}`);
        
        return (
          <div key={level} className="course-group level-group">
            {/* Level Header */}
            <div className="group-header level-header">
              <button
                type="button"
                className="group-header-toggle"
                aria-expanded={isLevelExpanded}
                onClick={() => toggleGroup(`level-${level}`)}
                onKeyDown={(event) => handleHeaderKeyDown(event, `level-${level}`)}
              >
                <div className="group-header-primary">
                  <span className={`group-toggle ${isLevelExpanded ? 'expanded' : 'collapsed'}`}>
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                    </svg>
                  </span>
                  <span className="group-header-name">{translateLevelOrTerm(level)}</span>
                </div>
                <GroupHeaderStats
                  stats={levelStats}
                  label={t('aria.viewStats', { name: translateLevelOrTerm(level) })}
                />
              </button>
              <button
                type="button"
                className="info-btn group-header-info-narrow"
                title={`${t('gpa.label')}: ${levelStats.gpa.toFixed(2)}`}
                aria-label={t('aria.viewStats', { name: translateLevelOrTerm(level) })}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openModal(translateLevelOrTerm(level), levelStats, levelCourses);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M10 .4C4.697.4.399 4.698.399 10A9.6 9.6 0 0 0 10 19.601c5.301 0 9.6-4.298 9.6-9.601 0-5.302-4.299-9.6-9.6-9.6zm.896 3.466c.936 0 1.211.543 1.211 1.164 0 .775-.62 1.492-1.679 1.492-.886 0-1.308-.445-1.282-1.182 0-.621.519-1.474 1.75-1.474zM8.498 15.75c-.64 0-1.107-.389-.66-2.094l.733-3.025c.127-.484.148-.678 0-.678-.191 0-1.022.334-1.512.664l-.319-.523c1.555-1.299 3.343-2.061 4.108-2.061.64 0 .746.756.427 1.92l-.84 3.18c-.149.562-.085.756.064.756.192 0 .82-.232 1.438-.719l.362.486c-1.513 1.512-3.162 2.094-3.801 2.094z" fill="#ff7955"/>
                </svg>
              </button>
            </div>
            
            {/* Level Content – grid 0fr/1fr drives smooth height animation */}
            <div 
              className={`table-container level-container ${isLevelExpanded ? 'expanded' : 'collapsed'}`}
              aria-hidden={!isLevelExpanded}
            >
              <div className="level-container-inner">
              {sortTerms(Object.keys(nestedGroupedCourses[level]))
                .map(term => {
                  const termCourses = nestedGroupedCourses[level][term];
                  const termStats = calculateGroupStats(termCourses);
                  const isTermExpanded = isGroupExpanded(`term-${level}-${term}`);
                    return (
                    <div key={`${level}-${term}`} className="course-group term-group">
                      {/* Term Header */}
                      <div className="group-header term-header">
                        <button
                          type="button"
                          className="group-header-toggle"
                          aria-expanded={isTermExpanded}
                          onClick={() => toggleGroup(`term-${level}-${term}`)}
                          onKeyDown={(event) => handleHeaderKeyDown(event, `term-${level}-${term}`)}
                        >
                          <div className="group-header-primary">
                            <span className={`group-toggle ${isTermExpanded ? 'expanded' : 'collapsed'}`}>
                              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                              </svg>
                            </span>
                            <span className="group-header-name">{translateLevelOrTerm(term)}</span>
                          </div>
                          <GroupHeaderStats
                            stats={termStats}
                            label={t('aria.viewStats', { name: translateLevelOrTerm(term) })}
                          />
                        </button>
                        <button
                          type="button"
                          className="info-btn group-header-info-narrow"
                          title={`${t('gpa.label')}: ${termStats.gpa.toFixed(2)}`}
                          aria-label={t('aria.viewStats', { name: translateLevelOrTerm(term) })}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openModal(`${translateLevelOrTerm(level)} - ${translateLevelOrTerm(term)}`, termStats, termCourses);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M10 .4C4.697.4.399 4.698.399 10A9.6 9.6 0 0 0 10 19.601c5.301 0 9.6-4.298 9.6-9.601 0-5.302-4.299-9.6-9.6-9.6zm.896 3.466c.936 0 1.211.543 1.211 1.164 0 .775-.62 1.492-1.679 1.492-.886 0-1.308-.445-1.282-1.182 0-.621.519-1.474 1.75-1.474zM8.498 15.75c-.64 0-1.107-.389-.66-2.094l.733-3.025c.127-.484.148-.678 0-.678-.191 0-1.022.334-1.512.664l-.319-.523c1.555-1.299 3.343-2.061 4.108-2.061.64 0 .746.756.427 1.92l-.84 3.18c-.149.562-.085.756.064.756.192 0 .82-.232 1.438-.719l.362.486c-1.513 1.512-3.162 2.094-3.801 2.094z" fill="#ff7955"/>
                          </svg>
                        </button>
                      </div>
                      
                      {/* Term Content */}
                      <div 
                        className={`table-container term-container ${isTermExpanded ? 'expanded' : 'collapsed'}`}
                        aria-hidden={!isTermExpanded}
                      >
                        <div className="term-container-inner">
                        <div className="course-container">
                          <table className="course-table">
                            <thead className="table-header-hidden">
                              <tr>
                                <th>{t('table.courseName')}</th>
                                <th>{t('table.creditHours')}</th>
                                <th>{t('table.grade')}</th>
                                <th>{t('table.remove')}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {termCourses.map(renderCourseRow)}
                            </tbody>
                          </table>
                        </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}      {/* Reset button at the top right */}
      <div className="reset-button-container">
        <button 
          className="reset-button"
          onClick={() => setShowConfirmModal(true)}
          title={t('aria.resetAll')}
          aria-label={t('aria.resetAll')}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.49 15C19.841 16.831 18.612 18.4108 16.9875 19.492C15.363 20.5732 13.4312 21.0972 11.4831 20.9851C9.5349 20.873 7.67594 20.1308 6.18628 18.8704C4.69663 17.61 3.65698 15.8996 3.22398 13.997C2.79098 12.0944 2.98809 10.1026 3.78562 8.32177C4.58314 6.54091 5.93787 5.06746 7.64568 4.12343C9.35349 3.17941 11.3219 2.81593 13.2542 3.08779C16.5167 3.54676 18.6721 5.91142 21 8M21 8V2M21 8H15" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <span>{t('table.resetAll')}</span>
        </button>
      </div>
      
      <StatsModal modalData={modalData} onClose={closeModal} />
      
      <ConfirmationModal
        show={showConfirmModal}
        title={t('confirm.resetTitle')}
        message={t('confirm.resetMessage')}
        confirmText={t('confirm.reset')}
        cancelText={t('confirm.cancel')}
        onConfirm={() => {
          onClearCourses(courses);
          setShowConfirmModal(false);
        }}
        onCancel={() => setShowConfirmModal(false)}
        isDanger={true}
      />
    </div>
  );
};

export default GroupedCourseTable;
