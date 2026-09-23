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

const LEVEL_ORDER: Record<Level, number> = {
  'First Level': 1,
  'Second Level': 2,
  'Third Level': 3,
  'Fourth Level': 4,
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

const TERM_ORDER: Record<string, number> = {
  'First Term': 1,
  'Second Term': 2,
  'Summer Term': 3,
}

export function normalizeArabicNumerals(str: string): string {
  return str.replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632))
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

export function parseExplicitLevelFromText(text: string): Level | undefined {
  if (text.includes('المستوى الأول') || text.includes('الفرقة الأولى') || /first\s+level/i.test(text)) {
    return 'First Level'
  }
  if (
    text.includes('المستوى الثاني') ||
    text.includes('المستوى الثانى') ||
    text.includes('الفرقة الثانية') ||
    /second\s+level/i.test(text)
  ) {
    return 'Second Level'
  }
  if (text.includes('المستوى الثالث') || text.includes('الفرقة الثالثة') || /third\s+level/i.test(text)) {
    return 'Third Level'
  }
  if (text.includes('المستوى الرابع') || text.includes('الفرقة الرابعة') || /fourth\s+level/i.test(text)) {
    return 'Fourth Level'
  }
  return undefined
}

export function parseYearFromText(text: string): { yearStr: string; startYear: number } | null {
  const norm = normalizeArabicNumerals(text)
  const match = norm.match(/(?:19|20)\d{2}[-/](?:19|20)\d{2}/)
  if (match) {
    const startYear = parseInt(match[0].slice(0, 4), 10)
    return { yearStr: match[0], startYear }
  }
  const singleYearMatch = norm.match(/\b((?:19|20)\d{2})\b/)
  if (singleYearMatch) {
    const startYear = parseInt(singleYearMatch[1], 10)
    return { yearStr: singleYearMatch[1], startYear }
  }
  return null
}

interface ParsedCard {
  cardTitle: string
  term: Term | undefined
  startYear: number | null
  explicitLevel: Level | undefined
  majorityLevel: Level | undefined
  rawCourses: Array<{
    code: string
    name: string
    hours: number
    grade: Grade | null
  }>
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
    const parsedCards: ParsedCard[] = []

    cards.forEach((card) => {
      const cardTitle = card.querySelector('.card-title')?.textContent?.trim() || ''
      const term = parseTermFromText(cardTitle)
      const yearInfo = parseYearFromText(cardTitle)
      const explicitLevel = parseExplicitLevelFromText(cardTitle)

      const rawCourses: ParsedCard['rawCourses'] = []
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

        rawCourses.push({ code, name, hours, grade })
      })

      if (rawCourses.length === 0) return

      // Determine majority level from course code prefixes in this card
      const codeLevelCounts: Partial<Record<Level, number>> = {}
      rawCourses.forEach((rc) => {
        const lvl = parseLevelFromCode(rc.code)
        if (lvl) {
          codeLevelCounts[lvl] = (codeLevelCounts[lvl] || 0) + 1
        }
      })
      let majorityLevel: Level | undefined = undefined
      let maxCount = 0
      for (const [lvl, count] of Object.entries(codeLevelCounts)) {
        if (count && count > maxCount) {
          maxCount = count
          majorityLevel = lvl as Level
        }
      }

      parsedCards.push({
        cardTitle,
        term,
        startYear: yearInfo?.startYear ?? null,
        explicitLevel,
        majorityLevel,
        rawCourses,
      })
    })

    if (parsedCards.length > 0) {
      // Find all unique start years across cards
      const uniqueYears = Array.from(
        new Set(parsedCards.map((c) => c.startYear).filter((y): y is number => y !== null))
      ).sort((a, b) => a - b)

      interface CardWithLevel extends ParsedCard {
        level: Level
      }

      const cardsWithLevel: CardWithLevel[] = parsedCards.map((c) => {
        let level: Level
        if (c.explicitLevel) {
          level = c.explicitLevel
        } else if (c.startYear !== null && uniqueYears.length > 1) {
          const yearIdx = uniqueYears.indexOf(c.startYear)
          const levelNum = yearIdx + 1
          level = LEVEL_MAP[String(levelNum)] || 'Fourth Level'
        } else if (c.majorityLevel) {
          level = c.majorityLevel
        } else {
          level = 'First Level'
        }
        return { ...c, level }
      })

      // Sort cards chronologically:
      // by level ascending, then term ascending (First Term -> Second Term -> Summer Term)
      cardsWithLevel.sort((a, b) => {
        const levelA = LEVEL_ORDER[a.level] ?? (a.startYear ?? 1)
        const levelB = LEVEL_ORDER[b.level] ?? (b.startYear ?? 1)
        if (levelA !== levelB) return levelA - levelB

        const termA = a.term ? TERM_ORDER[a.term] ?? 1 : 1
        const termB = b.term ? TERM_ORDER[b.term] ?? 1 : 1
        return termA - termB
      })

      const courses: Course[] = []
      cardsWithLevel.forEach((card) => {
        card.rawCourses.forEach((rc) => {
          courses.push({
            name: rc.name,
            hours: rc.hours,
            grade: rc.grade,
            term: card.term,
            level: card.level,
            isImported: true,
          })
        })
      })

      if (courses.length > 0) {
        return courses
      }
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
