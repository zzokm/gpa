import { STORAGE_KEYS } from '../../utils/storage-keys'
import type { Course } from '../../types/Course'
import type { OriginalImportedTranscript } from '../types'
import { buildLegacyTranscriptFromCourses } from './buildTranscriptSnapshot'

export function loadTranscriptFromStorage(): OriginalImportedTranscript | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ORIGINAL_IMPORTED_TRANSCRIPT)
    if (!raw) return null
    const parsed = JSON.parse(raw) as OriginalImportedTranscript
    if (parsed?.schemaVersion !== 1 || !Array.isArray(parsed.entries)) return null
    return parsed
  } catch {
    return null
  }
}

export function saveTranscriptToStorage(transcript: OriginalImportedTranscript): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.ORIGINAL_IMPORTED_TRANSCRIPT, JSON.stringify(transcript))
}

export function migrateTranscriptIfNeeded(courses: Course[]): OriginalImportedTranscript | null {
  const existing = loadTranscriptFromStorage()
  if (existing) return existing

  const imported = courses.filter((c) => c.isImported)
  if (imported.length === 0) return null

  const legacy = buildLegacyTranscriptFromCourses(courses)
  saveTranscriptToStorage(legacy)
  return legacy
}

export function loadSelectedMajorFromStorage(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(STORAGE_KEYS.COURSE_MAP_SELECTED_MAJOR)
}

export function saveSelectedMajorToStorage(major: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.COURSE_MAP_SELECTED_MAJOR, major)
}

export function loadShowCompletedFromStorage(): boolean {
  if (typeof window === 'undefined') return true
  const raw = localStorage.getItem(STORAGE_KEYS.COURSE_MAP_SHOW_COMPLETED)
  if (raw === null) return true
  return raw === 'true'
}

export function saveShowCompletedToStorage(show: boolean): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.COURSE_MAP_SHOW_COMPLETED, String(show))
}
