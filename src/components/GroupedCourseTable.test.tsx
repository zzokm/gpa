import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import GroupedCourseTable from './GroupedCourseTable'
import { LocaleProvider } from '../i18n/LocaleContext'
import { Course } from '../types/Course'

describe('GroupedCourseTable', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders nothing / empty message when courses list is empty', () => {
    const { container } = render(
      <LocaleProvider>
        <GroupedCourseTable
          courses={[]}
          onRemoveCourse={vi.fn()}
          onUpdateGrade={vi.fn()}
          onUpdateCreditHours={vi.fn()}
          onClearCourses={vi.fn()}
        />
      </LocaleProvider>
    )

    expect(container.querySelector('.course-table')).not.toBeInTheDocument()
  })

  it('renders courses grouped by level and semester headers', () => {
    const sampleCourses: Course[] = [
      {
        id: 'c1',
        name: 'Introduction to Computer Science',
        hours: 3,
        grade: 'A',
        level: 'First Level',
        term: 'First Term',
        isImported: true,
      },
      {
        id: 'c2',
        name: 'Structured Programming',
        hours: 3,
        grade: 'B+',
        level: 'First Level',
        term: 'Second Term',
        isImported: true,
      },
      {
        id: 'c3',
        name: 'Data Structures',
        hours: 3,
        grade: 'A',
        level: 'Second Level',
        term: 'Second Term',
        isImported: true,
      },
    ]

    render(
      <LocaleProvider>
        <GroupedCourseTable
          courses={sampleCourses}
          onRemoveCourse={vi.fn()}
          onUpdateGrade={vi.fn()}
          onUpdateCreditHours={vi.fn()}
          onClearCourses={vi.fn()}
        />
      </LocaleProvider>
    )

    expect(screen.getByText('Introduction to Computer Science')).toBeInTheDocument()
    expect(screen.getByText('Structured Programming')).toBeInTheDocument()
    expect(screen.getByText('Data Structures')).toBeInTheDocument()
    expect(screen.getAllByText(/First Level/i).length).toBeGreaterThan(0)
  })

  it('handles courses with undefined level or term gracefully using fallbacks', () => {
    const coursesWithMissingMetadata: Course[] = [
      {
        id: 'c4',
        name: 'Legacy Course Without Level',
        hours: 3,
        grade: 'B',
      },
    ]

    render(
      <LocaleProvider>
        <GroupedCourseTable
          courses={coursesWithMissingMetadata}
          onRemoveCourse={vi.fn()}
          onUpdateGrade={vi.fn()}
          onUpdateCreditHours={vi.fn()}
          onClearCourses={vi.fn()}
        />
      </LocaleProvider>
    )

    expect(screen.getByText('Legacy Course Without Level')).toBeInTheDocument()
  })
})
