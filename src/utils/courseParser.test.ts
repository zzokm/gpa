import { describe, expect, it } from 'vitest'
import fs from 'fs'
import path from 'path'
import {
  parseCoursesFromHtml,
  parseLevelFromCode,
  parseTermFromText,
  mergeImportedCourses,
} from './courseParser'
import { Course } from '../types/Course'

describe('courseParser', () => {
  describe('parseLevelFromCode', () => {
    it('detects level correctly from course code prefix digit', () => {
      expect(parseLevelFromCode('CS111')).toBe('First Level')
      expect(parseLevelFromCode('HU117')).toBe('First Level')
      expect(parseLevelFromCode('DS251')).toBe('Second Level')
      expect(parseLevelFromCode('IS211')).toBe('Second Level')
      expect(parseLevelFromCode('CS312')).toBe('Third Level')
      expect(parseLevelFromCode('IT411')).toBe('Fourth Level')
    })

    it('returns undefined for invalid code formats', () => {
      expect(parseLevelFromCode('INVALID')).toBeUndefined()
      expect(parseLevelFromCode('')).toBeUndefined()
    })
  })

  describe('parseTermFromText', () => {
    it('detects First Term from Arabic and English', () => {
      expect(parseTermFromText('الأول 2025-2026')).toBe('First Term')
      expect(parseTermFromText('First Term 2025')).toBe('First Term')
    })

    it('detects Second Term from Arabic and English', () => {
      expect(parseTermFromText('الثانى 2025-2026')).toBe('Second Term')
      expect(parseTermFromText('الثاني 2025-2026')).toBe('Second Term')
      expect(parseTermFromText('Second Semester')).toBe('Second Term')
    })

    it('detects Summer Term from Arabic and English', () => {
      expect(parseTermFromText('الصيفي 2024-2025')).toBe('Summer Term')
      expect(parseTermFromText('صيفي')).toBe('Summer Term')
      expect(parseTermFromText('Summer 2024')).toBe('Summer Term')
    })
  })

  describe('parseCoursesFromHtml with MyU portal fixture', () => {
    const fixturePath = path.resolve(__dirname, '__fixtures__/myu-sample.html')
    const fixtureHtml = fs.readFileSync(fixturePath, 'utf8')

    it('parses all 25 courses across 5 semesters from the MyU portal HTML', () => {
      const courses = parseCoursesFromHtml(fixtureHtml)
      expect(courses).toHaveLength(25)

      // Test specific courses from different semesters
      const management = courses.find((c) => c.name === 'Fundamentals of Management')
      expect(management).toBeDefined()
      expect(management).toMatchObject({
        name: 'Fundamentals of Management',
        hours: 2,
        grade: 'A',
        term: 'Second Term',
        level: 'Second Level',
        isImported: true,
      })

      const socialIssues = courses.find((c) => c.name === 'Social Issues')
      expect(socialIssues).toBeDefined()
      expect(socialIssues).toMatchObject({
        name: 'Social Issues',
        hours: 0,
        grade: 'C+',
        term: 'Second Term',
        level: 'First Level',
        isImported: true,
      })

      const dataStructures = courses.find((c) => c.name === 'Data Structures')
      expect(dataStructures).toBeDefined()
      expect(dataStructures).toMatchObject({
        name: 'Data Structures',
        hours: 3,
        grade: 'C',
        term: 'Second Term',
        level: 'Second Level',
      })

      const probabilitySummer = courses.find((c) => c.name === 'Probability and Statistics-1')
      expect(probabilitySummer).toBeDefined()
      expect(probabilitySummer).toMatchObject({
        name: 'Probability and Statistics-1',
        hours: 3,
        grade: 'B-',
        term: 'Summer Term',
        level: 'First Level',
      })

      const cs111 = courses.find((c) => c.name === 'Fundamentals of Computer Science')
      expect(cs111).toBeDefined()
      expect(cs111).toMatchObject({
        name: 'Fundamentals of Computer Science',
        hours: 3,
        grade: 'A',
        term: 'First Term',
        level: 'First Level',
      })
    })
  })

  describe('parseCoursesFromHtml standalone table snippet', () => {
    it('parses MyU table rows without .card wrapper', () => {
      const snippet = `
        <table class="table">
          <thead>
            <tr>
              <th>الكود</th>
              <th>المقرر</th>
              <th>الساعات المعتمدة</th>
              <th>الدرجة</th>
              <th>التقدير</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CS214</td>
              <td>Data Structures</td>
              <td>3,0</td>
              <td>68</td>
              <td>C</td>
            </tr>
          </tbody>
        </table>
      `
      const courses = parseCoursesFromHtml(snippet)
      expect(courses).toHaveLength(1)
      expect(courses[0]).toMatchObject({
        name: 'Data Structures',
        hours: 3,
        grade: 'C',
        level: 'Second Level',
        isImported: true,
      })
    })
  })

  describe('parseCoursesFromHtml legacy schema fallback', () => {
    it('parses old 12-column striped table correctly', () => {
      const legacyHtml = `
        <table class="table table-striped col-md-12">
          <tbody>
            <tr>
              <td>1</td>
              <td>Structured Programming</td>
              <td>CS112</td>
              <td>3</td>
              <td>100</td>
              <td>85</td>
              <td><p>A</p></td>
              <td>3.7</td>
              <td>3.7</td>
              <td>Pass</td>
              <td><div><span>First Level</span></div></td>
              <td><div><span>Second Term</span></div></td>
            </tr>
          </tbody>
        </table>
      `
      const courses = parseCoursesFromHtml(legacyHtml)
      expect(courses).toHaveLength(1)
      expect(courses[0]).toMatchObject({
        name: 'Structured Programming',
        hours: 3,
        grade: 'A',
        term: 'Second Term',
        level: 'First Level',
        isImported: true,
      })
    })
  })

  describe('empty / invalid inputs', () => {
    it('returns empty array for empty string', () => {
      expect(parseCoursesFromHtml('')).toEqual([])
      expect(parseCoursesFromHtml('   ')).toEqual([])
    })

    it('returns empty array for random non-matching HTML', () => {
      expect(parseCoursesFromHtml('<div><p>Hello world</p></div>')).toEqual([])
    })
  })

  describe('mergeImportedCourses', () => {
    it('merges new imported courses and keeps non-duplicate current courses', () => {
      const current: Course[] = [
        { name: 'Manual Course', hours: 3, grade: 'B' },
        { name: 'Data Structures', hours: 3, grade: 'F' },
      ]
      const imported: Course[] = [
        { name: 'Data Structures', hours: 3, grade: 'A', isImported: true },
        { name: 'Web Technology', hours: 3, grade: 'B+', isImported: true },
      ]

      const merged = mergeImportedCourses(imported, current)
      expect(merged).toHaveLength(3)

      const ds = merged.find((c) => c.name === 'Data Structures')
      expect(ds?.grade).toBe('A')

      const manual = merged.find((c) => c.name === 'Manual Course')
      expect(manual).toBeDefined()
    })
  })
})
