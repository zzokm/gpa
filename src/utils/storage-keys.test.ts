import { afterEach, describe, expect, it } from 'vitest'
import { migrateStorageIfNeeded, STORAGE_KEYS } from './storage-keys'

const LEGACY = {
  COURSES: 'gpa-calculator-courses',
  GROUP_STATES: 'gpa-calculator-group-states',
  LOCALE: 'gpa-calculator-locale',
}

describe('migrateStorageIfNeeded', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('copies legacy keys to stable keys when stable is empty', () => {
    localStorage.setItem(LEGACY.COURSES, '[]')
    localStorage.setItem(LEGACY.GROUP_STATES, '{}')
    localStorage.setItem(LEGACY.LOCALE, 'ar-EG')

    migrateStorageIfNeeded()

    expect(localStorage.getItem(STORAGE_KEYS.COURSES)).toBe('[]')
    expect(localStorage.getItem(STORAGE_KEYS.GROUP_STATES)).toBe('{}')
    expect(localStorage.getItem(STORAGE_KEYS.LOCALE)).toBe('ar-EG')
  })

  it('does not overwrite existing stable keys', () => {
    localStorage.setItem(LEGACY.COURSES, '[{"name":"old"}]')
    localStorage.setItem(STORAGE_KEYS.COURSES, '[{"name":"new"}]')

    migrateStorageIfNeeded()

    expect(localStorage.getItem(STORAGE_KEYS.COURSES)).toBe('[{"name":"new"}]')
  })
})
