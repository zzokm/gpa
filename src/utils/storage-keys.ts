/**
 * Stable localStorage keys - do not change these across deployments.
 * Data persists per origin across version updates.
 */
export const STORAGE_KEYS = {
  COURSES: 'gpa-persist-v1-courses',
  GROUP_STATES: 'gpa-persist-v1-group-states',
  LOCALE: 'gpa-persist-v1-locale',
} as const

const LEGACY_KEYS = {
  COURSES: 'gpa-calculator-courses',
  GROUP_STATES: 'gpa-calculator-group-states',
  LOCALE: 'gpa-calculator-locale',
} as const

/** Migrate from legacy keys to stable keys (one-time, on load) */
export function migrateStorageIfNeeded(): void {
  if (typeof window === 'undefined') return
  try {
    const migrate = (legacy: string, stable: string) => {
      const legacyVal = localStorage.getItem(legacy)
      if (legacyVal && !localStorage.getItem(stable)) {
        localStorage.setItem(stable, legacyVal)
      }
    }
    migrate(LEGACY_KEYS.COURSES, STORAGE_KEYS.COURSES)
    migrate(LEGACY_KEYS.GROUP_STATES, STORAGE_KEYS.GROUP_STATES)
    migrate(LEGACY_KEYS.LOCALE, STORAGE_KEYS.LOCALE)
  } catch {
    // ignore
  }
}
