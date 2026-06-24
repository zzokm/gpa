import { describe, expect, it } from 'vitest'
import { Course } from '../types/Course'
import {
  calculateGPA,
  getGradeColor,
  getGradeStyles,
  letterToPoints,
  numericToLetter,
} from './gradeUtils'

describe('numericToLetter', () => {
  it('maps percentage boundaries to letter grades', () => {
    expect(numericToLetter(96)).toBe('A+')
    expect(numericToLetter(92)).toBe('A')
    expect(numericToLetter(50)).toBe('D-')
    expect(numericToLetter(49)).toBe('F')
  })
})

describe('letterToPoints', () => {
  it('returns 0 for null grade', () => {
    expect(letterToPoints(null)).toBe(0)
  })

  it('maps letter grades to GPA points', () => {
    expect(letterToPoints('A+')).toBe(4.0)
    expect(letterToPoints('B')).toBe(3.0)
    expect(letterToPoints('F')).toBe(0.0)
  })
})

describe('calculateGPA', () => {
  const course = (hours: number, grade: Course['grade']): Course => ({
    name: 'Test',
    hours,
    grade,
  })

  it('returns 0 for empty list', () => {
    expect(calculateGPA([])).toBe(0)
  })

  it('returns 0 when no courses have grades', () => {
    expect(calculateGPA([course(3, null)])).toBe(0)
  })

  it('calculates weighted GPA by credit hours', () => {
    const courses = [course(3, 'A'), course(2, 'B')]
    expect(calculateGPA(courses)).toBeCloseTo((3.7 * 3 + 3.0 * 2) / 5)
  })
})

describe('getGradeColor', () => {
  it('returns gray for null grade', () => {
    expect(getGradeColor(null)).toBe('#9ca3af')
  })

  it('returns green for A+', () => {
    expect(getGradeColor('A+')).toBe('#16a34a')
  })
})

describe('getGradeStyles', () => {
  it('always uses white text for readability', () => {
    expect(getGradeStyles('F')).toEqual({
      backgroundColor: expect.any(String),
      color: '#ffffff',
    })
  })
})
