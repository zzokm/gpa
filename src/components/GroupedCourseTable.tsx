import './GroupedCourseTable.css'
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Course, Grade } from '../types/Course';
import { calculateGPA } from '../utils/gradeUtils';
import { useLocale } from '../i18n/LocaleContext';
import GradeDropdown from './GradeDropdown';
import CreditHoursDropdown from './CreditHoursDropdown';
import ConfirmationModal from './ConfirmationModal';
import { WesternDigits } from './LocaleDisplay';
import { STORAGE_KEYS } from '../utils/storage-keys';
import { track, courseCountBucket } from '../analytics';

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

// Local storage key for group states
const GROUP_STATE_KEY = STORAGE_KEYS.GROUP_STATES;
const MANUAL_GROUP_KEY = 'manual-courses';

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
  courseCount: number,
  hasManualCourses: boolean
): GroupState {
  const states: GroupState = { ...stored };
  const collapseTerms = courseCount > 6;
  const latestTermKey = collapseTerms ? getLatestTermKey(nested) : null;

  if (hasManualCourses && !(MANUAL_GROUP_KEY in states)) {
    states[MANUAL_GROUP_KEY] = true;
  }

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
        {t('gpa.label')}{' '}
        <WesternDigits>{stats.gpa.toFixed(2)}</WesternDigits>
      </span>
      {stats.failedCredits > 0 ? (
        <>
          <span className="group-metric-sep" aria-hidden="true">
            ·
          </span>
          <span className="group-metric credits">
            <WesternDigits className="passed">{stats.passedCredits}</WesternDigits>
            <span className="sep">/</span>
            <WesternDigits className="failed">{stats.failedCredits}</WesternDigits>
          </span>
        </>
      ) : null}
      <span className="group-metric-sep" aria-hidden="true">
        ·
      </span>
      <span className="group-metric total">
        <WesternDigits>{stats.totalCredits}</WesternDigits> {t('table.hrs')}
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
  const [isInitialized, setIsInitialized] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const hasHydratedGroupStates = useRef(false);

  const manualCourses = useMemo(
    () => courses.filter((course) => !course.isImported),
    [courses]
  );

  const hasManualCourses = manualCourses.length > 0;

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
      const next = applyDefaultGroupStates(
        nestedGroupedCourses,
        base,
        courses.length,
        hasManualCourses,
      );
      return groupStatesEqual(prev, next) ? prev : next;
    });
    setIsInitialized(true);
  }, [groupStructureKey, courses.length, hasManualCourses, nestedGroupedCourses]);

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

  // Toggle group expansion; CSS grid 0fr/1fr drives smooth height animation
  const setGroupExpanded = (
    groupKey: string,
    meta: { groupType: 'manual' | 'level' | 'term'; level?: string; term?: string },
    eventName: 'group_toggle' | 'group_keyboard_toggle',
  ) => {
    const expanded = groupStates[groupKey] !== false;
    track(eventName, {
      group_type: meta.groupType,
      action: expanded ? 'collapse' : 'expand',
      level: meta.level ?? 'none',
      term: meta.term ?? 'none',
    });
    setGroupStates((prev) => ({
      ...prev,
      [groupKey]: prev[groupKey] === false,
    }));
  };

  const toggleGroup = (
    groupKey: string,
    meta: { groupType: 'manual' | 'level' | 'term'; level?: string; term?: string },
  ) => {
    setGroupExpanded(groupKey, meta, 'group_toggle');
  };

  const handleHeaderKeyDown = (
    event: React.KeyboardEvent,
    groupKey: string,
    meta: { groupType: 'manual' | 'level' | 'term'; level?: string; term?: string },
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setGroupExpanded(groupKey, meta, 'group_keyboard_toggle');
    }
  };

  // Check if a group is expanded (default to expanded if not set)
  const isGroupExpanded = (groupKey: string): boolean => {
    return groupStates[groupKey] !== false; // Default to true (expanded), false is collapsed
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

  const manualStats = calculateGroupStats(manualCourses);
  const isManualExpanded = isGroupExpanded(MANUAL_GROUP_KEY);

  const renderCourseRow = (course: Course) => (
    <tr key={course.id} className="course-row">
      <td className="course-name">{course.name}</td>
      <td className="course-hours">
        <CreditHoursDropdown
          courseId={course.id!}
          courseName={course.name}
          onSelectCreditHours={onUpdateCreditHours}
          currentHours={course.hours}
          variant="pill"
        />
      </td>
      <td className="course-grade">
        <GradeDropdown
          courseId={course.id!}
          courseName={course.name}
          onSelectGrade={onUpdateGrade}
          currentGrade={course.grade !== null ? course.grade : null}
          displayMode="pill"
        />
      </td>
      <td className="course-remove">
        <button
          type="button"
          className="remove-btn"
          onClick={() => onRemoveCourse(course.id!)}
          aria-label={t('aria.removeCourse', { name: course.name })}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6h12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </td>
    </tr>
  );
  return (
    <>
      
      {courses.length === 0 ? (
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
      ) : (
    <div className="table-box">
      <div className="table-box-toolbar">
        <div className="reset-button-container">
          <button
            type="button"
            className="reset-button"
            onClick={() => {
              track('clear_all_prompt', { course_count_bucket: courseCountBucket(courses.length) });
              setShowConfirmModal(true);
            }}
            title={t('aria.resetAll')}
            aria-label={t('aria.resetAll')}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M20.49 15C19.841 16.831 18.612 18.4108 16.9875 19.492C15.363 20.5732 13.4312 21.0972 11.4831 20.9851C9.5349 20.873 7.67594 20.1308 6.18628 18.8704C4.69663 17.61 3.65698 15.8996 3.22398 13.997C2.79098 12.0944 2.98809 10.1026 3.78562 8.32177C4.58314 6.54091 5.93787 5.06746 7.64568 4.12343C9.35349 3.17941 11.3219 2.81593 13.2542 3.08779C16.5167 3.54676 18.6721 5.91142 21 8M21 8V2M21 8H15" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{t('table.resetAll')}</span>
          </button>
        </div>
      </div>

      <div className="table-box-body">
      {/* Render manually added courses first */}
      {manualCourses.length > 0 && (
        <div className="course-group level-group manual-courses-group">
          <button
            type="button"
            className="group-header level-header group-header-toggle"
            aria-expanded={isManualExpanded}
            onClick={() => toggleGroup(MANUAL_GROUP_KEY, { groupType: 'manual' })}
            onKeyDown={(event) => handleHeaderKeyDown(event, MANUAL_GROUP_KEY, { groupType: 'manual' })}
          >
            <div className="group-header-primary">
              <span className={`group-toggle ${isManualExpanded ? 'expanded' : 'collapsed'}`}>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                </svg>
              </span>
              <span className="group-header-name">{t('table.manuallyAdded')}</span>
            </div>
            <GroupHeaderStats
              stats={manualStats}
              label={t('aria.viewStats', { name: t('table.manuallyAdded') })}
            />
          </button>
          <div
            className={`table-container manual-container ${isManualExpanded ? 'expanded' : 'collapsed'}`}
            aria-hidden={!isManualExpanded}
          >
            <div className="manual-container-inner">
              <div className="course-container">
                <table className="course-table">
                  <tbody>
                    {manualCourses.map(renderCourseRow)}
                  </tbody>
                </table>
              </div>
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
            <button
              type="button"
              className="group-header level-header group-header-toggle"
              aria-expanded={isLevelExpanded}
              onClick={() => toggleGroup(`level-${level}`, { groupType: 'level', level })}
              onKeyDown={(event) => handleHeaderKeyDown(event, `level-${level}`, { groupType: 'level', level })}
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
                      <button
                        type="button"
                        className="group-header term-header group-header-toggle"
                        aria-expanded={isTermExpanded}
                        onClick={() => toggleGroup(`term-${level}-${term}`, { groupType: 'term', level, term })}
                        onKeyDown={(event) => handleHeaderKeyDown(event, `term-${level}-${term}`, { groupType: 'term', level, term })}
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
                      
                      {/* Term Content */}
                      <div
                        className={`table-container term-container ${isTermExpanded ? 'expanded' : 'collapsed'}`}
                        aria-hidden={!isTermExpanded}
                      >
                        <div className="term-container-inner">
                        <div className="course-container">
                          <table className="course-table">
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
      })}
      </div>

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
        onCancel={() => {
          track('clear_all_cancel');
          setShowConfirmModal(false);
        }}
        isDanger={true}
      />
    </div>
      )}
    </>
  );
};

export default GroupedCourseTable;
