import { describe, expect, it } from 'vitest'
import fs from 'fs'
import path from 'path'
import {
  parseCoursesFromHtml,
  mergeImportedCourses,
} from './courseParser'
import { Course } from '../types/Course'

describe('newsite-sample fixture parsing', () => {
  const fixturePath = path.resolve(__dirname, '__fixtures__/newsite-sample.html')
  const fixtureHtml = fs.readFileSync(fixturePath, 'utf8')

  it('correctly parses all 10 courses from the mocked new site HTML clone', () => {
    const courses = parseCoursesFromHtml(fixtureHtml)
    expect(courses).toHaveLength(10)

    // Oldest semester is Fall 2024-2025
    expect(courses[0].name).toBe('Introduction to Computer Science')
    expect(courses[0].level).toBe('First Level')
    expect(courses[0].term).toBe('First Term')
    expect(courses[0].hours).toBe(3)
    expect(courses[0].grade).toBe('A')
    expect(courses[0].isImported).toBe(true)

    // English Language (HU111) has 2 hours
    const english = courses.find((c) => c.name === 'English Language')
    expect(english).toBeDefined()
    expect(english).toMatchObject({
      name: 'English Language',
      level: 'First Level',
      term: 'First Term',
      hours: 2,
      grade: 'A+',
      isImported: true,
    })

    // Logic Design (IT212) belongs to Spring 2024-2025 (First Level, Second Term)
    const logicDesign = courses.find((c) => c.name === 'Logic Design')
    expect(logicDesign).toBeDefined()
    expect(logicDesign).toMatchObject({
      name: 'Logic Design',
      level: 'First Level',
      term: 'Second Term',
      hours: 3,
      grade: 'B',
      isImported: true,
    })

    // Human Rights (HU117) has empty credit hours -> parses as 0
    const humanRights = courses.find((c) => c.name === 'Human Rights')
    expect(humanRights).toBeDefined()
    expect(humanRights).toMatchObject({
      name: 'Human Rights',
      level: 'First Level',
      term: 'Second Term',
      hours: 0,
      grade: 'A',
      isImported: true,
    })

    // Newest semester courses (Spring 2025-2026) appear at the end
    const lastCourse = courses[courses.length - 1]
    expect(lastCourse.name).toBe('Database Systems')
    expect(lastCourse.level).toBe('Second Level')
    expect(lastCourse.term).toBe('Second Term')
    expect(lastCourse.hours).toBe(3)
    expect(lastCourse.grade).toBe('B+')
  })

  it('orders semesters chronologically: Fall 24-25 -> Spring 24-25 -> Fall 25-26 -> Spring 25-26', () => {
    const courses = parseCoursesFromHtml(fixtureHtml)
    const levelTermPairs = courses.map((c) => `${c.level} - ${c.term}`)
    const uniqueOrder = Array.from(new Set(levelTermPairs))

    expect(uniqueOrder).toEqual([
      'First Level - First Term',
      'First Level - Second Term',
      'Second Level - First Term',
      'Second Level - Second Term',
    ])
  })

  it('merges new site imported courses with pre-existing manual courses without duplicate collisions', () => {
    const imported = parseCoursesFromHtml(fixtureHtml)
    const currentCourses: Course[] = [
      { name: 'Custom Project', hours: 3, grade: 'A+' },
      // Duplicate of one course in the import, but manual has an older grade
      { name: 'Data Structures', hours: 3, grade: 'C' },
    ]

    const merged = mergeImportedCourses(imported, currentCourses)
    // 10 imported + 1 unique manual = 11 total
    expect(merged).toHaveLength(11)

    // Data Structures should have the imported grade 'A'
    const ds = merged.find((c) => c.name === 'Data Structures')
    expect(ds?.grade).toBe('A')
    expect(ds?.isImported).toBe(true)

    // Custom Project is retained
    const custom = merged.find((c) => c.name === 'Custom Project')
    expect(custom).toBeDefined()
    expect(custom?.isImported).toBeUndefined()
  })

  it('robustly parses synthetic cards with mixed case and extra spacing in English semester names', () => {
    const syntheticHtml = `
      <div class="card">
        <div class="card-header">
          <h5 class="card-title">   FALL   2024-2025   </h5>
        </div>
        <table class="table">
          <thead>
            <tr><th>Code</th><th>Course</th><th>Credit Hours</th><th>Degree</th><th>Grade</th></tr>
          </thead>
          <tbody>
            <tr><td>CS100</td><td>Intro</td><td>3.0</td><td>80</td><td>B</td></tr>
          </tbody>
        </table>
      </div>
      <div class="card">
        <div class="card-header">
          <h5 class="card-title">SPRING 2024-2025</h5>
        </div>
        <table class="table">
          <thead>
            <tr><th>Code</th><th>Course</th><th>Credit Hours</th><th>Degree</th><th>Grade</th></tr>
          </thead>
          <tbody>
            <tr><td>CS101</td><td>Programming I</td><td>3.0</td><td>85</td><td>B+</td></tr>
          </tbody>
        </table>
      </div>
    `
    const courses = parseCoursesFromHtml(syntheticHtml)
    expect(courses).toHaveLength(2)
    expect(courses[0].term).toBe('First Term')
    expect(courses[1].term).toBe('Second Term')
  })
})
