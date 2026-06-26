import type { Grade, Level, Term } from '../../types/Course'
import { normalizeCreditHours } from '../../utils/creditHours'
import type { ParsedHtmlCourseRow } from '../types'

const VALID_GRADES: Grade[] = [
  'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F',
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

export type ParseFcaiHtmlResult =
  | { ok: true; courses: ParsedHtmlCourseRow[] }
  | { ok: false; reason: 'invalid_html' | 'no_valid_courses' }

export function parseFcaiHtml(pastedHTML: string): ParseFcaiHtmlResult {
  const dummy = document.createElement('div')
  dummy.innerHTML = pastedHTML

  const tableRows = dummy.querySelectorAll('table.table.table-striped.col-md-12 tr')
  if (tableRows.length === 0) {
    return { ok: false, reason: 'invalid_html' }
  }

  const courses: ParsedHtmlCourseRow[] = []

  tableRows.forEach((row: Element, rowIndex: number) => {
    const data = row.getElementsByTagName('td')
    if (data.length === 0) return

    const courseName = data[1] ? data[1].innerText.trim() : ''
    const courseHours = data[3] ? data[3].innerText.trim() : ''
    let courseGrade: Grade | null = null
    let courseTerm: Term | undefined
    let courseLevel: Level | undefined

    if (data[6]) {
      const gradeElement = data[6].querySelector('p')
      const gradeText = gradeElement ? gradeElement.innerText.trim() : ''
      if (
        gradeText &&
        gradeText !== '' &&
        gradeText !== '-' &&
        gradeText !== 'N/A' &&
        VALID_GRADES.includes(gradeText as Grade)
      ) {
        courseGrade = gradeText as Grade
      }
    }

    if (data[10]) {
      const levelElement = data[10].querySelector('div span') as HTMLElement | null
      const levelText = levelElement ? levelElement.innerText.trim() : ''
      if (levelText) {
        courseLevel =
          LEVEL_MAP[levelText] ?? LEVEL_MAP[levelText.replace(/ Level/i, '')]
      }
    }

    if (data[11]) {
      const termElement = data[11].querySelector('div span') as HTMLElement | null
      const termText = termElement ? termElement.innerText.trim() : ''
      if (termText) {
        courseTerm =
          TERM_MAP[termText] ??
          TERM_MAP[termText.replace(/ Term/i, '')] ??
          termText
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
          originalRowIndex: rowIndex,
        })
      }
    }
  })

  if (courses.length === 0) {
    return { ok: false, reason: 'no_valid_courses' }
  }

  return { ok: true, courses }
}
