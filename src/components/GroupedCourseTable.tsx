import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Course, Grade } from '../types/Course';
import { calculateGPA } from '../utils/gradeUtils';
import { useLocale } from '../i18n/LocaleContext';
import GradeDropdown from './GradeDropdown';
import CreditHoursDropdown from './CreditHoursDropdown';
import ConfirmationModal from './ConfirmationModal';
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
      <GroupedCourseTableStyles />
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
            onClick={() => setShowConfirmModal(true)}
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
            onClick={() => toggleGroup(MANUAL_GROUP_KEY)}
            onKeyDown={(event) => handleHeaderKeyDown(event, MANUAL_GROUP_KEY)}
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
        onCancel={() => setShowConfirmModal(false)}
        isDanger={true}
      />
    </div>
      )}
    </>
  );
};

function GroupedCourseTableStyles() {
  return (
    <style jsx global>{`/* GroupedCourseTable.css - Combined styles for the grouped course table component */

/* Table box container – glass on ::before so child shadows aren't clipped by backdrop-filter */
.table-box {
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  background: transparent;
  border: none;
  border-radius: var(--radius-2xl);
  box-shadow: none;
  padding: var(--space-xl) var(--space-xl) var(--term-indent);
  overflow: visible;
  /* Course list layout – single source inside this container */
  --clist-section-gap: 8px;
  --clist-block-gap: 12px;
  --clist-header-min-h: 48px;
  --clist-pill-h: 28px;
  --clist-pill-w: 54px;
  --clist-action: 34px;
  --clist-control-track: var(--clist-pill-w);
  --clist-controls-gap: 10px;
  --clist-name-px: 12px;
  --clist-row-py: 10px;
  --clist-collapse-duration: 0.36s;
  --clist-collapse-ease: cubic-bezier(0.45, 0, 0.55, 1);
  --clist-shadow-bleed: 16px;
  --clist-edge-inset: var(--term-indent);
  --course-pill-width: var(--clist-pill-w);
  --grade-pill-width: var(--clist-pill-w);
  --course-control-size: var(--clist-action);
  --course-row-gap: var(--clist-controls-gap);
}

.table-box::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-xs);
  pointer-events: none;
  z-index: 0;
}

.table-box > * {
  position: relative;
  z-index: 1;
}

.table-box-toolbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-height: 44px;
  flex-shrink: 0;
  margin: calc(-1 * var(--clist-shadow-bleed)) calc(-1 * var(--clist-shadow-bleed)) 0;
  padding: var(--clist-shadow-bleed) var(--clist-shadow-bleed) 0;
}

.table-box-body {
  display: flex;
  flex-direction: column;
  gap: var(--clist-block-gap);
  overflow: visible;
  /* Shadow bleed zone: negative margin eats into table-box padding so elevation isn't clipped */
  margin: calc(-1 * var(--clist-shadow-bleed));
  padding: var(--clist-shadow-bleed);
}

/* Top-level blocks (manual + each level): gap between header and collapsible body */
.table-box-body > .course-group.level-group {
  display: flex;
  flex-direction: column;
  gap: var(--clist-section-gap);
  margin: 0;
}

/* Spacing lives on flex parents, not inside collapsing grids */
.table-box-body > .course-group.level-group > .level-header + .level-container,
.table-box-body > .course-group.level-group > .level-header + .manual-container {
  margin-top: 0;
}

.table-box .level-container-inner {
  display: flex;
  flex-direction: column;
  gap: var(--clist-section-gap);
  margin: 0;
  padding: 0;
}

/* Term blocks: no flex gap — vertical rhythm from level-container-inner gap only */
.table-box .term-group {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 0 !important;
}

/* Legacy total-hours row removed – credits live in GPAStickySummary */

/* ===== Expand/collapse: CSS grid 0fr/1fr — no JS height, auto-fits nested content ===== */
.table-box .level-container,
.table-box .term-group .term-container,
.table-box .manual-container {
  display: grid;
  grid-template-rows: 1fr;
  overflow: clip;
  overflow-clip-margin: 0;
  transition-property: grid-template-rows !important;
  transition-duration: var(--clist-collapse-duration) !important;
  transition-timing-function: var(--clist-collapse-ease) !important;
}

.table-box .level-container.collapsed,
.table-box .term-group .term-container.collapsed,
.table-box .manual-container.collapsed {
  grid-template-rows: 0fr;
  overflow: clip;
  overflow-clip-margin: 0;
  pointer-events: none;
  user-select: none;
  touch-action: none;
}

.table-box .level-container.expanded,
.table-box .term-group .term-container.expanded,
.table-box .manual-container.expanded {
  grid-template-rows: 1fr;
  overflow: clip;
  overflow-clip-margin: var(--clist-shadow-bleed);
  pointer-events: auto;
}

/* Keep base class rules for pointer-events (other files reference these classes) */
.level-container,
.term-container,
.manual-container {
  display: grid;
  overflow: clip;
  overflow-clip-margin: 0;
  grid-template-rows: 1fr;
  transition:
    grid-template-rows var(--clist-collapse-duration, 0.36s) var(--clist-collapse-ease, cubic-bezier(0.45, 0, 0.55, 1)) !important;
}

.level-container.collapsed,
.term-container.collapsed,
.manual-container.collapsed {
  grid-template-rows: 0fr;
  overflow-clip-margin: 0;
}

.level-container.expanded,
.term-container.expanded,
.manual-container.expanded {
  grid-template-rows: 1fr;
  overflow-clip-margin: var(--clist-shadow-bleed, 12px);
}

/* Inner row must shrink so grid track can animate; overflow visible when expanded so term shadows breathe */
.table-box .level-container-inner,
.table-box .term-container-inner,
.table-box .manual-container-inner {
  min-height: 0;
  margin: 0;
}

.table-box .level-container.expanded > .level-container-inner,
.table-box .manual-container.expanded > .manual-container-inner,
.table-box .term-group .term-container.expanded > .term-container-inner {
  overflow: visible;
}

.table-box .level-container.collapsed > .level-container-inner,
.table-box .term-group .term-container.collapsed > .term-container-inner,
.table-box .manual-container.collapsed > .manual-container-inner {
  overflow: clip;
  overflow-clip-margin: 0;
}

@supports not (overflow-clip-margin: 1px) {
  .table-box .level-container.expanded,
  .table-box .term-group .term-container.expanded,
  .table-box .manual-container.expanded,
  .table-box .level-container.expanded > .level-container-inner,
  .table-box .term-group .term-container.expanded > .term-container-inner,
  .table-box .manual-container.expanded > .manual-container-inner {
    overflow: hidden;
  }

  .table-box .level-container.collapsed,
  .table-box .term-group .term-container.collapsed,
  .table-box .manual-container.collapsed,
  .table-box .level-container.collapsed > .level-container-inner,
  .table-box .term-group .term-container.collapsed > .term-container-inner,
  .table-box .manual-container.collapsed > .manual-container-inner {
    overflow: hidden;
  }

  .table-box .term-container.expanded > .term-container-inner {
    padding-inline: var(--clist-shadow-bleed);
    padding-bottom: var(--clist-shadow-bleed);
  }

  .table-box .manual-container.expanded > .manual-container-inner {
    padding-inline: var(--clist-shadow-bleed);
  }
}

@supports (interpolate-size: allow-keywords) {
  .table-box .level-container,
  .table-box .term-group .term-container,
  .table-box .manual-container {
    interpolate-size: allow-keywords;
  }
}

/* Term only: gap below header, above courses — expanded only (collapsed padding caused double gap between terms) */
.table-box .term-container-inner {
  padding-top: 0;
}

.table-box .term-group .term-container.expanded > .term-container-inner {
  padding-top: var(--clist-section-gap);
}

.table-box .manual-container-inner {
  padding: 0;
}

/* Headers + course shells carry elevation — no wrapper shadow on level inner */
.table-box .level-container > .level-container-inner,
.table-box .manual-container > .manual-container-inner {
  border-radius: 0;
  box-shadow: none;
}

.table-box .course-group.level-group,
.table-box .course-group.term-group,
.table-box .manual-courses-group {
  overflow: visible;
}

/* Term headers sit outside term-container — same unobstructed shadow path as level headers */
.table-box .term-group .group-header.term-header {
  overflow: visible;
}

@media (prefers-reduced-motion: reduce) {
  .table-box {
    --clist-collapse-duration: 0.16s;
    --clist-collapse-ease: ease-in-out;
  }

  .table-box .level-container,
  .table-box .term-group .term-container,
  .table-box .manual-container,
  .level-container,
  .term-container,
  .manual-container {
    transition: grid-template-rows var(--clist-collapse-duration) var(--clist-collapse-ease) !important;
  }
}

/* Ensure group headers are still clickable */
.group-header {
  pointer-events: auto !important;
  visibility: visible !important;
  position: relative !important;
}

/* ===== Variables for responsive sizing ===== */
/* Breakpoints: 768px, 600px, 480px (--bp-sm), 430/400/380 for narrow. */
:root {
  /* Width proportions */
  --level-width: 100%;
  --term-width: 94%;
  --term-indent: 3%;
  --course-width: 100%;
  --stats-button-right-distance: 0px;
  /* Legacy – spacing now uses --clist-section-gap on .table-box */
  --group-spacing: 0px;
  /* Row layout tokens – overridden inside .table-box */
  --remove-btn-base-size: var(--course-control-size);
  --remove-btn-size: var(--course-control-size);
  --remove-btn-min-size: var(--course-control-size);
  /* Narrow breakpoint sizing – set in media queries */
}

/* Reset button styles */
.reset-button-container {
  position: static;
  z-index: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  pointer-events: auto;
}

.reset-button {
  /* Layout & Font */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 700;
  font-family: var(--font-bricolage), sans-serif;
  font-size: 0.9rem;
  padding: 0.6rem 1.2rem;
  
  /* Appearance */
  color: #ff7955;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--radius-lg); /* Using the same radius as group headers */
  
  /* Glass Effect */
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  box-shadow: none;
  
  /* Behavior */
  cursor: pointer;
  transition: background 0.2s ease;
}

.reset-button:hover {
  background: rgba(255, 255, 255, 0.9);
}

.reset-button:active {
  background: rgba(255, 255, 255, 0.7);
}

html[lang="ar"] .reset-button,
[dir="rtl"] .reset-button {
  font-family: inherit;
}

.reset-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 121, 85, 0.2);
}

.reset-button svg {
  width: 16px;
  height: 16px;
  color: #ff7955; /* Match text color */
}

/* Responsive styles for reset button */
@media (max-width: 768px) {
  .reset-button {
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
    gap: 6px;
  }
  
  .reset-button svg {
    width: 14px;
    height: 14px;
  }
}

@media (max-width: 480px) {
  .reset-button {
    font-size: 0.75rem;
    padding: 0.45rem 0.9rem;
    gap: 5px;
  }
  
  .reset-button svg {
    width: 13px;
    height: 13px;
  }
}

@media (max-width: 380px) {
  .reset-button {
    font-size: 0.7rem;
    padding: 0.35rem 0.7rem;
  }
  
  .reset-button svg {
    width: 12px;
    height: 12px;
  }
}

/* ===== Level Group Styling ===== */
.level-group {
  width: var(--level-width);
  margin: 0;
  position: relative;
}

.level-group:last-child {
  margin-bottom: 0;
}

.level-header {
  width: var(--level-width);
  margin-bottom: 0; /* Gap controlled by .course-group.level-group > .group-header via --level-to-first-term-gap */
}

/* ===== Term Group Styling ===== */
.level-container-inner > .term-group {
  box-sizing: content-box;
  width: var(--term-width) !important;
  margin-left: calc(var(--term-indent) - var(--clist-shadow-bleed)) !important;
  margin-right: calc(var(--term-indent) - var(--clist-shadow-bleed)) !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding: 0 var(--clist-shadow-bleed);
  position: relative;
  overflow: visible;
}

.term-group {
  margin: 0 !important;
}

.level-container-inner > .term-group .group-header {
  width: 100% !important; /* Term header takes full width of term container */
}

/* More specific selector for term headers */
.table-box .course-group.level-group .level-container .term-group .term-header {
  width: 100% !important;
}

/* Fix for title alignment in group headers */
.term-title {
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
}

/* Group header toggle + stats row */
.group-header {
  align-items: center;
  gap: var(--space-sm);
}

.group-header-toggle {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  font: inherit;
  color: inherit;
  text-align: start;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-appearance: none;
  appearance: none;
  box-sizing: border-box;
}

/* Header shell is the button — full padded boundary is clickable */
.table-box button.group-header.group-header-toggle {
  flex: none;
  min-height: var(--clist-header-min-h);
}

.group-header-toggle:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
  border-radius: var(--radius-lg);
}

.group-header-primary,
.group-header-stats-row {
  pointer-events: none;
}

.group-header-static {
  cursor: default;
}

.group-header-primary-plain {
  gap: 0;
}

/* Header → nested content: spacing from margin on container, not flex gap */
.table-box .group-header.level-header + .table-container,
.table-box .term-group .group-header.term-header + .term-container,
.table-box .course-group.level-group > .level-container,
.table-box .course-group.level-group > .manual-container {
  padding: 0;
}

.group-header-primary {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  flex: 1 1 auto;
  min-width: 0;
}

.group-header-name {
  font-size: var(--text-lg);
  font-weight: 650;
  color: var(--text-color);
  letter-spacing: 0.025em;
  text-wrap: balance;
}

.group-header-stats-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-xs) var(--space-sm);
  margin-inline-start: auto;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-secondary);
  text-align: end;
  flex-shrink: 0;
}

.group-metric {
  white-space: nowrap;
}

.group-metric.gpa {
  color: var(--primary-color);
}

.group-metric.credits .passed { color: var(--gray-700); }
.group-metric.credits .sep { color: var(--gray-400); margin: 0 1px; }
.group-metric.credits .failed { color: var(--primary-600); }

.group-metric-sep {
  color: var(--gray-400);
  font-weight: 400;
}

/* ===== Course Table Styling ===== */
.table-box .term-group .table-container,
.table-box .term-group .term-container {
  width: 100%;
  padding: 0;
  margin-left: 0;
  margin-right: 0;
}

.course-container {
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: visible;
  padding: 0;
  margin: 0;
}

/* Course table under term or manual – glass on ::before so elevation isn't clipped by backdrop-filter */
.table-box .course-container {
  position: relative;
  isolation: isolate;
  background: transparent;
  border: none;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  box-shadow: none;
  overflow: visible;
}

.table-box .course-container::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius-lg);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-xs);
  pointer-events: none;
  z-index: 0;
}

.table-box .course-container > * {
  position: relative;
  z-index: 1;
}

.table-box .course-container .course-table {
  background: transparent;
  padding: 0;
  margin: 0;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.level-container-inner > .term-group .table-container table,
.term-group .table-container .course-table,
.table-box .course-group.term-group .table-container table {
  width: 100% !important; /* Table takes full width of its container */
  max-width: 100% !important;
}

/* Override any existing margins */
.term-group .term-header,
.term-group .table-container,
.term-group .table-container table {
  margin-right: 0 !important;
  margin-left: 0 !important;
}

/* Force all tables to match term width, regardless of nesting level */
.table-box table.course-table {
  max-width: var(--term-width) !important;
  width: 100% !important;
}

/* Clear any unwanted margins for all header elements */
.level-group .level-header {
  margin-right: 0 !important;
  max-width: 100% !important;
  width: 100% !important;
}

/* Manual courses list – same indent as term course tables */
.table-box .manual-courses-group > .manual-container > .manual-container-inner > .course-container {
  width: var(--term-width) !important;
  margin-left: var(--term-indent) !important;
  margin-right: var(--term-indent) !important;
}

/* Legacy path kept for compatibility */
.table-box .course-group.level-group > .table-container > .course-container {
  width: var(--term-width) !important;
  margin-left: var(--term-indent) !important;
  margin-right: var(--term-indent) !important;
}

/* Reset any grid settings that might affect our layout */
.term-group .course-table tbody tr {
  width: 100% !important;
  max-width: 100% !important;
}

/* Make sure the manual courses follow the same pattern */
.table-box .manual-courses-group .course-table,
.course-group.level-group > .table-container > .course-container > .course-table {
  width: 100% !important;
  max-width: 100% !important;
}

/* ===== Course Group Base Styling (moved from index.css) ===== */
.course-group {
  margin-bottom: 0; /* Removed bottom spacing */
}

.course-group:last-child {
  margin-bottom: 0;
}

.table-box .group-header {
  margin: 0;
  min-height: var(--clist-header-min-h);
  padding: var(--space-md) var(--space-md);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  transition: var(--transition-base);
  box-shadow: var(--shadow-xs);
  overflow: visible;
  
  /* Improved alignment of header content */
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Level header spacing handled by flex gap on .course-group.level-group */
.course-group.level-group > .group-header {
  margin-bottom: 0 !important;
}

.group-header.clickable {
  cursor: pointer;
  user-select: none;
  pointer-events: auto !important;
  position: relative;
  z-index: 1;
  touch-action: manipulation;
}

.group-toggle {
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: var(--primary-color);
  border-radius: var(--radius-full);
  transition: background var(--transition-base);
  flex-shrink: 0;
}

.group-toggle svg {
  width: 16px;
  height: 16px;
  fill: white;
  transition: transform var(--clist-collapse-duration) var(--clist-collapse-ease);
}

.group-name {
  flex: 1;
}

.group-title {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  font-size: var(--text-lg);
  font-weight: 650;
  color: var(--text-color);
  margin: 0;
  letter-spacing: 0.025em;
  position: relative;
  text-align: left;
  flex: 1;
}

.group-toggle.expanded svg {
  transform: rotate(180deg);
}

.group-toggle.collapsed svg {
  transform: rotate(0deg);
}

.table-box .course-table {
  padding: 0;
  margin: 0;
}

/* Term title styling */
.term-title {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--text-secondary);
}

/* ===== Responsive Adjustments ===== */
@media (max-width: 768px) {
  :root {
    --term-width: 95%;
    --term-indent: 2.5%;
  }
  
  /* Adjust table padding for smaller screens */
  .table-box {
    padding: var(--space-md) var(--space-md) var(--term-indent);
  }

  .level-group:first-child {
    margin-top: 0;
  }
  
  /* Ensure tables maintain fixed width in term container */
  .term-group .table-container table {
    width: 100% !important;
  }
  
  /* Collapse timing uses --clist-collapse-duration on .table-box */
  
  /* Section gaps use flex on parents – no per-term margin overrides */
  .table-box .group-header {
    min-height: var(--clist-header-min-h);
    padding: var(--space-sm) var(--space-md);
    display: flex;
    align-items: center !important;
    justify-content: space-between !important;
  }
  
  .group-title {
    font-size: var(--text-base);
    gap: var(--space-sm);
    display: flex;
    align-items: center !important;
  }
  
  .group-toggle {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .group-toggle svg {
    width: 14px;
    height: 14px;
  }
  
  /* Ensure group titles have proper centering */
  .group-title, .term-title {
    display: flex;
    align-items: center;
    height: 100%;
  }
}

@media (max-width: 600px) {
  :root {
    --term-width: 96%;
    --term-indent: 2%;
  }
}

@media (max-width: 480px) {
  :root {
    --term-width: 97%;
    --term-indent: 1.5%;
  }
  
  /* Adjust table padding for mobile screens */
  .table-box {
    padding: var(--space-md) var(--space-md) var(--term-indent);
  }
  .term-group {
    margin-bottom: 0;
  }
  
  /* Make term titles more compact on mobile */
  .term-title {
    font-size: 0.95rem;
  }

  .table-box .group-header {
    min-height: var(--clist-header-min-h);
  }
}

@media (max-width: 430px) {
  .group-title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .table-box .group-header {
    min-height: var(--clist-header-min-h);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-sm) var(--space-md);
  }

  .group-header-toggle {
    flex-wrap: wrap;
    align-content: center;
    row-gap: var(--space-xs);
  }

  .group-header-stats-row {
    width: 100%;
    justify-content: flex-end;
  }
}

@media (max-width: 400px) {
  :root {
    --term-width: 98%;
    --term-indent: 1%;
  }
  
  /* Maintain compact headers on small screens */
  .term-title {
    font-size: 0.85rem;
  }

  .table-box .group-header {
    min-height: var(--clist-header-min-h);
  }
}

@media (max-width: 380px) {
  .table-box .group-header {
    min-height: var(--clist-header-min-h);
  }
}

/* ===== Collapsed state: disable interaction only (animation is grid height) ===== */
.level-container.collapsed button,
.level-container.collapsed a,
.level-container.collapsed input,
.level-container.collapsed select,
.level-container.collapsed [role="button"],
.term-container.collapsed button,
.term-container.collapsed a,
.term-container.collapsed input,
.term-container.collapsed select,
.term-container.collapsed [role="button"],
.manual-container.collapsed button,
.manual-container.collapsed a,
.manual-container.collapsed input,
.manual-container.collapsed select,
.manual-container.collapsed [role="button"] {
  pointer-events: none !important;
}

.level-container.collapsed .remove-btn,
.term-container.collapsed .remove-btn,
.manual-container.collapsed .remove-btn {
  visibility: hidden;
  pointer-events: none !important;
}

/* Course table row – name + three equal-width control tracks */
.course-table tbody tr.course-row {
  display: grid;
  grid-template-columns:
    minmax(0, 1fr)
    var(--clist-control-track, var(--clist-pill-w))
    var(--clist-control-track, var(--clist-pill-w))
    var(--clist-control-track, var(--clist-pill-w));
  column-gap: var(--clist-controls-gap, var(--course-row-gap));
  align-items: center;
  min-height: 0;
  padding: 0;
}

/* Critical fix for collapsed sections - disable interactions */
.level-container.collapsed .course-row,
.term-container.collapsed .course-row,
.manual-container.collapsed .course-row {
  pointer-events: none !important;
}

/* Ensure normal rows work properly */
.course-table tbody tr.course-row {
  pointer-events: auto;
  visibility: visible;
  position: relative;
  height: auto;
  opacity: 1;
  min-height: calc(var(--clist-pill-h, 28px) + var(--clist-row-py, 10px) * 2);
  box-sizing: border-box;
}

/* Course name cell */
.course-table td.course-name {
  grid-column: 1;
  min-width: 0;
  text-align: start;
  padding-block: var(--clist-row-py, 10px);
  padding-inline: var(--clist-name-px, 12px);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* Credit hours cell */
.course-table td.course-hours {
  grid-column: 2;
  text-align: center;
  padding-block: var(--clist-row-py, 10px);
  padding-inline: 0;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Grade cell */
.course-table td.course-grade {
  grid-column: 3;
  padding-block: var(--clist-row-py, 10px);
  padding-inline: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Remove button – aligned with pills, equal column gaps from grade */
.course-table td.course-remove {
  grid-column: 4;
  padding-block: var(--clist-row-py, 10px);
  padding-inline: 0 var(--clist-name-px, 12px);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
  position: relative;
  z-index: 12;
}

/* Credit hours pill trigger (value + chevron in one control) */
.course-table .credit-hours-pill-mode {
  width: 100%;
  display: flex;
  justify-content: center;
}

.course-table .credit-hours-pill {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  width: var(--clist-pill-w, var(--course-pill-width));
  min-width: var(--clist-pill-w, var(--course-pill-width));
  max-width: var(--clist-pill-w, var(--course-pill-width));
  height: var(--clist-pill-h, 28px);
  min-height: var(--clist-pill-h, 28px);
  margin: 0;
  padding: 0 6px 0 8px;
  border-radius: var(--radius-full);
  background: var(--gray-100);
  color: var(--gray-700);
  border: 1px solid var(--gray-200);
  font-weight: 650;
  font-size: 0.75rem;
  line-height: 1;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
  opacity: 1;
  transform: none;
}

.course-table .credit-hours-pill:hover {
  background: var(--gray-200);
  border-color: var(--gray-300);
}

.course-table .credit-hours-pill-value {
  flex: 1;
  text-align: center;
  min-width: 0;
}

.course-table .credit-hours-pill .credit-hours-dropdown-arrow {
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  opacity: 0.75;
}

.course-table .grade-dropdown-pill-mode {
  width: 100%;
  display: flex;
  justify-content: center;
}

/* Row remove button – compact square, red hover */
.course-table td.course-remove .remove-btn {
  width: var(--clist-action, var(--course-control-size));
  height: var(--clist-action, var(--course-control-size));
  min-width: var(--clist-action, var(--course-control-size));
  min-height: var(--clist-action, var(--course-control-size));
  padding: 0;
  margin: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  border: 1px solid var(--gray-200);
  background: transparent;
  color: var(--gray-500);
  cursor: pointer;
  transition:
    background 0.2s cubic-bezier(0.25, 1, 0.5, 1),
    border-color 0.2s cubic-bezier(0.25, 1, 0.5, 1),
    color 0.2s cubic-bezier(0.25, 1, 0.5, 1);
}

.course-table .remove-btn svg {
  width: 15px;
  height: 15px;
  transition: color 0.2s cubic-bezier(0.25, 1, 0.5, 1);
}

.course-table .remove-btn:hover {
  background: #dc2626;
  border-color: #dc2626;
  color: #fff;
}

.course-table .remove-btn:hover svg,
.course-table .remove-btn:hover svg path {
  color: #fff;
  stroke: #fff;
}

@media (prefers-reduced-motion: reduce) {
  .course-table td.course-remove .remove-btn,
  .course-table .remove-btn svg {
    transition: none;
  }
}

.course-table .remove-btn:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

@media (max-width: 768px) {
  .table-box {
    --clist-section-gap: 7px;
    --clist-block-gap: 10px;
    --clist-header-min-h: 46px;
    --clist-pill-w: 50px;
    --clist-controls-gap: 8px;
    --clist-name-px: 10px;
    --clist-row-py: 9px;
  }
}

@media (max-width: 480px) {
  .table-box {
    --clist-section-gap: 6px;
    --clist-block-gap: 9px;
    --clist-header-min-h: 44px;
    --clist-pill-w: 48px;
    --clist-controls-gap: 7px;
    --clist-name-px: 8px;
    --clist-row-py: 8px;
    --clist-action: 32px;
  }
}


/* Unified Dropdown Styles - Credit Hours and Grade Dropdowns */

/* Credit Hours Dropdown Styling */
.credit-hours-dropdown {
  position: relative;
  z-index: 10;
}

.credit-hours-dropdown-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--text-color);
  margin-left: 0; /* No margin - spacing handled by parent .credit-hours-cell gap */
  padding: 0;
  opacity: 0;
  transform: scale(0.8);
}

.credit-hours-dropdown-trigger.static-arrow {
  opacity: 1;
  transform: scale(1);
  background: var(--gray-100);
  color: var(--gray-600);
  border: none;
  border-radius: 50%;
  width: var(--course-control-size);
  height: var(--course-control-size);
  min-width: var(--course-control-size);
  min-height: var(--course-control-size);
  margin-left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.credit-hours-dropdown-trigger.static-arrow:hover {
  background: var(--gray-200);
}

/* Show arrow consistently on all devices */
@media (hover: none) {
  .credit-hours-dropdown-trigger.static-arrow {
    opacity: 1;
  }
}

.credit-hours-dropdown-trigger:hover:not(.credit-hours-pill),
.credit-hours-dropdown-trigger:focus:not(.credit-hours-pill) {
  background: var(--gray-300);
  transform: scale(1.1);
}

.credit-hours-dropdown-arrow {
  display: block;
  color: var(--text-color);
  transition: var(--transition-base);
  flex-shrink: 0;
  width: 8px; /* Smaller arrow - exact same size as grade dropdown */
  height: 8px; /* Smaller arrow - exact same size as grade dropdown */
}

.credit-hours-dropdown-arrow.open {
  transform: rotate(180deg);
}

/* Dropdown Menu */
.credit-hours-dropdown-menu {
  position: fixed;
  width: 140px; /* Made thinner by reducing from 165px to 140px */
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.12), 
              0 1px 5px rgba(0, 0, 0, 0.05), 
              0 0 0 1px rgba(255, 255, 255, 0.4);
  z-index: 1000;
  overflow: hidden;
  isolation: isolate;
  pointer-events: auto;
  margin-top: 8px;
  opacity: 0;
  transform: translateY(-5px);
  animation: dropdownFadeIn 0.15s ease-out forwards;
}

@keyframes dropdownFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.credit-hours-dropdown-content {
  max-height: 180px;
  overflow-y: auto;
  padding: 12px;
  scrollbar-width: thin;
  scrollbar-color: var(--gray-300) transparent;
}

.credit-hours-dropdown-content::-webkit-scrollbar {
  width: 5px;
}

.credit-hours-dropdown-content::-webkit-scrollbar-track {
  background: transparent;
}

.credit-hours-dropdown-content::-webkit-scrollbar-thumb {
  background-color: var(--gray-300);
  border-radius: 3px;
}

.credit-hours-dropdown-option {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 6px var(--space-sm); /* Further reduced padding for shorter items */
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.6);
  color: var(--text-color);
  margin-bottom: 0;
  transition: all 0.15s ease-out;
  min-height: 28px; /* Reduced minimum height for more compact items */
}

.credit-hours-dropdown-option:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.credit-hours-dropdown-separator {
  height: 1px;
  background: rgba(0, 0, 0, 0.05);
  margin: 4px 0;
}

/* Credit Hours Cell Styling */
.credit-hours-cell {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Align items to the left like grade cell */
  width: 100%;
}

.credit-hours-value {
  font-weight: 550;
  padding-left: 8px;
}

/* Additional CSS to make credit hours cell display better with the dropdown */

/* Style for the credit hours cell to match the grade cell */
.course-hours {
  position: relative;
  display: flex;
  align-items: center;
  padding-right: 0 !important;
}

/* Ensure proper spacing in credit hours cell */
.credit-hours-cell {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
  /* Gap is set in CourseTableStyles.css to match grade-cell spacing */
}

/* Match the grade dropdown arrow appearance */
.credit-hours-dropdown-trigger.static-arrow {
  opacity: 1;
  transform: scale(1);
  /* No margin-left - spacing is handled by parent .credit-hours-cell gap (--spacing-z) */
}

/* Fix z-index issues for nested dropdowns */
.credit-hours-dropdown {
  position: relative;
  z-index: 10;
}

/* Make sure both dropdowns don't interfere with each other */
tr.dropdown-open {
  z-index: var(--z-dropdown) !important;
  position: relative !important;
}

/* Additional credit hours styles to better match grade cell layout */

/* Add a badge-like container for the credit hours value */
.credit-hours-value-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  text-align: center;
}

/* Style the credit hours value similar to grade badge for consistency */
.credit-hours-value {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 550;
}

/* Responsive styles */
@media (max-width: 768px) {
  .credit-hours-dropdown-trigger {
    opacity: 0.8;
  }
}

@media (hover: none) {
  .credit-hours-dropdown-trigger {
    opacity: 0.8;
  }
}


/* Modern Table Styling */
/* Course Table Styling - Enhanced Container */
.course-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 0;
  /* No shadow for cleaner look */
  border-radius: var(--radius-md);
  overflow: visible;  /* Allow remove button ring effect to show */
}

/* Legacy hidden header class – keep for backwards compatibility */
.table-header-hidden {
  display: none;
}

.course-table tbody {
  overflow: visible;
}

.course-table tbody tr {
  transition: var(--transition-base);
  border-bottom: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.15);
  position: relative;
  overflow: visible;
}

.course-table tbody tr:hover:not(.dropdown-open) {
  background: rgba(255, 255, 255, 0.25);
  /* No transform or shadow for cleaner look */
  /* Ensure row hover doesn't affect dropdown visibility */
  z-index: 1;
}

/* Special case for rows with open dropdowns - keep them above other rows */
.course-table tbody tr.dropdown-open {
  z-index: 5; /* Higher than regular row hover */
  /* No transform or hover effect when dropdown is open */
  transform: none;
  background: rgba(255, 255, 255, 0.15);
}

.course-table tbody tr:last-child {
  border-bottom: none;
}

.course-table td {
  padding: 0;
  text-align: center;
  font-weight: 550;
  color: var(--text-color);
  border: none;
  position: relative;
}

.course-name {
  font-weight: 650;
  color: var(--text-color);
  /* No text shadows */
}

.course-hours {
  color: var(--text-secondary);
  font-weight: 600;
  /* No text shadows */
}

.grade-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
}

.form-grade-container {
  display: flex;
  align-items: center;
  justify-content: center; /* Changed from flex-start to center to match other inputs */
  position: relative;
  min-width: 200px;
  flex: 1;
  width: 100%; /* Ensure it takes full width */
  box-sizing: border-box; /* Ensure padding doesn't affect width */
}


/* Empty State */
.empty-state {
  text-align: center;
  padding: var(--space-3xl);
  color: var(--text-muted);
  /* Enhanced visibility */
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.7);
}

.empty-state-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--space-lg);
  color: var(--gray-300);
}

.empty-state-icon svg {
  width: 100%;
  height: 100%;
}

.empty-state p {
  font-size: var(--text-lg);
  margin: 0;
}

@media (max-width: 480px) {
  .modal-footer .btn-primary,
  .modal-footer .btn-secondary {
    min-height: 44px;
  }

  .modal-content {
    margin: var(--space-lg);
    padding: var(--space-xl) var(--space-xl);
    border-radius: var(--radius-xl);
    width: calc(100% - 2 * var(--space-lg));
    max-width: 500px;
  }

  .gpa-display {
    max-width: 100%;
  }
}

/* Enhanced Mobile Glassmorphism */
@media (max-width: 480px) {
  .top-box,
  .gpa-display {
    background: rgba(255, 255, 255, 0.45);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border: 1.5px solid rgba(255, 255, 255, 0.6);
  }

  .table-box::before {
    background: rgba(255, 255, 255, 0.45);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border: 1.5px solid rgba(255, 255, 255, 0.6);
  }    .form-input,
  .form-select,
  .credit-hours-input,
  .grade-dropdown-input-mode .grade-dropdown-trigger.form-input-style-trigger {
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border: 1.5px solid rgba(255, 255, 255, 0.4);
    width: 100%;
  }
    
  .credit-arrow {
    width: 40px;
    min-width: 40px; /* Ensure fixed width on mobile */
    flex-shrink: 0; /* Prevent arrows from shrinking */
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1; /* Maintain square shape */
  }
    .paste-btn {
    background: rgba(255, 255, 255, 0.35);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border: 1px solid rgba(255, 255, 255, 0.45);
  }
}`}</style>
  );
}

export default GroupedCourseTable;
