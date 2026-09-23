import { Course, Grade, Level, Term } from '../types/Course'
import { normalizeCreditHours } from './creditHours'

const VALID_GRADES: readonly Grade[] = [
  'A+',
  'A',
  'A-',
  'B+',
  'B',
  'B-',
  'C+',
  'C',
  'C-',
  'D+',
  'D',
  'D-',
  'F',
]

const LEVEL_MAP: Record<string, Level> = {
  '1': 'First Level',
  '2': 'Second Level',
  '3': 'Third Level',
  '4': 'Fourth Level',
  First: 'First Level',
  Second: 'Second Level',
  Third: 'Third Level',
  Fourth: 'Fourth Level',
  first: 'First Level',
  second: 'Second Level',
  third: 'Third Level',
  fourth: 'Fourth Level',
}

const TERM_MAP: Record<string, Term> = {
  '1': 'First Term',
  '2': 'Second Term',
  Summer: 'Summer Term',
  summer: 'Summer Term',
  First: 'First Term',
  Second: 'Second Term',
  first: 'First Term',
  second: 'Second Term',
}

export function parseLevelFromCode(code: string): Level | undefined {
  const match = code.match(/^[A-Za-z]+([1-4])/)
  if (!match) return undefined
  return LEVEL_MAP[match[1]]
}

export function parseTermFromText(text: string): Term | undefined {
  if (text.includes('الأول') || /first/i.test(text)) {
    return 'First Term'
  }
  if (text.includes('الثانى') || text.includes('الثاني') || /second/i.test(text)) {
    return 'Second Term'
  }
  if (text.includes('الصيفي') || text.includes('صيفي') || /summer/i.test(text)) {
    return 'Summer Term'
  }
  return undefined
}

/**
 * Parses courses from HTML text pasted from either:
 * 1. The new MyU college website (https://myu.cu.edu.eg/)
 * 2. The legacy college portal
 */
export function parseCoursesFromHtml(pastedHTML: string): Course[] {
  const trimmed = pastedHTML.trim()
  if (!trimmed) return []

  const container = document.createElement('div')
  container.innerHTML = trimmed

  // 1. Try new MyU Portal schema with .card containers
  const cards = container.querySelectorAll('.card')
  if (cards.length > 0) {
    const courses: Course[] = []
    cards.forEach((card) => {
      const cardTitle = card.querySelector('.card-title')?.textContent?.trim() || ''
      const term = parseTermFromText(cardTitle)

      const rows = card.querySelectorAll('table tbody tr')
      rows.forEach((row) => {
        const tds = row.querySelectorAll('td')
        if (tds.length < 5) return

        const code = tds[0]?.textContent?.trim() || ''
        const name = tds[1]?.textContent?.trim() || ''
        const rawHours = tds[2]?.textContent?.trim()?.replace(',', '.') || ''
        const gradeText = tds[4]?.textContent?.trim() || ''

        if (!name) return

        let hours = 0
        if (rawHours) {
          const parsedHours = parseFloat(rawHours)
          if (!isNaN(parsedHours) && parsedHours >= 0) {
            hours = normalizeCreditHours(Math.round(parsedHours))
          }
        }

        let grade: Grade | null = null
        if (VALID_GRADES.includes(gradeText as Grade)) {
          grade = gradeText as Grade
        }

        const level = parseLevelFromCode(code)

        courses.push({
          name,
          hours,
          grade,
          term,
          level,
          isImported: true,
        })
      })
    })

    if (courses.length > 0) {
      return courses
    }
  }

  // 2. Try standalone MyU tables (e.g. if the user copied only the table or container)
  const myuRows = container.querySelectorAll('table tbody tr, .ls-table table tr')
  if (myuRows.length > 0) {
    const courses: Course[] = []
    myuRows.forEach((row) => {
      const tds = row.querySelectorAll('td')
      if (tds.length < 5) return

      const code = tds[0]?.textContent?.trim() || ''
      const name = tds[1]?.textContent?.trim() || ''
      const rawHours = tds[2]?.textContent?.trim()?.replace(',', '.') || ''
      const gradeText = tds[4]?.textContent?.trim() || ''

      // Validate that this row matches MyU schema (code matches prefix + numbers)
      if (!name || !/^[A-Za-z]+\d+/.test(code)) return

      let hours = 0
      if (rawHours) {
        const parsedHours = parseFloat(rawHours)
        if (!isNaN(parsedHours) && parsedHours >= 0) {
          hours = normalizeCreditHours(Math.round(parsedHours))
        }
      }

      let grade: Grade | null = null
      if (VALID_GRADES.includes(gradeText as Grade)) {
        grade = gradeText as Grade
      }

      const level = parseLevelFromCode(code)

      courses.push({
        name,
        hours,
        grade,
        level,
        isImported: true,
      })
    })

    if (courses.length > 0) {
      return courses
    }
  }

  // 3. Fallback: Legacy College Portal schema (table.table.table-striped.col-md-12)
  const legacyRows = container.querySelectorAll('table.table.table-striped.col-md-12 tr')
  if (legacyRows.length > 0) {
    const courses: Course[] = []
    legacyRows.forEach((row: Element) => {
      const data = row.getElementsByTagName('td')
      if (data.length === 0) return

      const courseName = data[1] ? data[1].textContent?.trim() || '' : ''
      const courseHours = data[3] ? data[3].textContent?.trim() || '' : ''
      let courseGrade: Grade | null = null
      let courseTerm: Term | undefined = undefined
      let courseLevel: Level | undefined = undefined

      if (data[6]) {
        const gradeElement = data[6].querySelector('p')
        const gradeText = (gradeElement ? gradeElement.textContent?.trim() : data[6].textContent?.trim()) || ''
        if (gradeText && gradeText !== '-' && gradeText !== 'N/A') {
          if (VALID_GRADES.includes(gradeText as Grade)) {
            courseGrade = gradeText as Grade
          }
        }
      }

      if (data[10]) {
        const levelElement = data[10].querySelector('div span') as HTMLElement | null
        const levelText = (levelElement ? levelElement.textContent?.trim() : data[10].textContent?.trim()) || ''
        if (levelText) {
          courseLevel = LEVEL_MAP[levelText] || LEVEL_MAP[levelText.replace(/ Level/i, '')]
        }
      }

      if (data[11]) {
        const termElement = data[11].querySelector('div span') as HTMLElement | null
        const termText = (termElement ? termElement.textContent?.trim() : data[11].textContent?.trim()) || ''
        if (termText) {
          courseTerm = TERM_MAP[termText] || TERM_MAP[termText.replace(/ Term/i, '')] || termText
        }
      }

      if (courseName && courseHours) {
        const hours = parseInt(courseHours, 10)
        if (!isNaN(hours)) {
          courses.push({
            name: courseName,
            hours: normalizeCreditHours(hours),
            grade: courseGrade,
            term: courseTerm,
            level: courseLevel,
            isImported: true,
          })
        }
      }
    })

    if (courses.length > 0) {
      return courses
    }
  }

  return []
}

/**
 * Merges imported courses with existing courses.
 * Imported courses take precedence, and previously added courses not in the import are preserved.
 */
export function mergeImportedCourses(importedCourses: Course[], currentCourses: Course[]): Course[] {
  const courseMap = new Map<string, Course>()
  currentCourses.forEach((course) => {
    courseMap.set(course.name, course)
  })

  const resultCourses: Course[] = []

  importedCourses.forEach((importedCourse) => {
    resultCourses.push(importedCourse)
    courseMap.delete(importedCourse.name)
  })

  courseMap.forEach((course) => {
    resultCourses.push(course)
  })

  return resultCourses
}
