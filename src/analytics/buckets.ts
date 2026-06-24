export function courseCountBucket(count: number): string {
  if (count === 0) return '0'
  if (count <= 5) return '1-5'
  if (count <= 15) return '6-15'
  if (count <= 30) return '16-30'
  return '31+'
}

export function textLengthBucket(length: number): string {
  if (length < 1000) return '<1k'
  if (length < 10000) return '1k-10k'
  return '10k+'
}

export function ratioPercentBucket(ratio: number): string {
  const pct = Math.round(ratio * 100)
  if (pct === 0) return '0'
  if (pct <= 25) return '0-25'
  if (pct <= 50) return '26-50'
  if (pct <= 75) return '51-75'
  return '76-100'
}

export function durationSecondsBucket(seconds: number): string {
  if (seconds < 10) return '<10'
  if (seconds < 30) return '10-29'
  if (seconds < 60) return '30-59'
  return '60+'
}

export function suggestionCountBucket(count: number): string {
  if (count === 0) return '0'
  if (count <= 3) return '1-3'
  if (count <= 6) return '4-6'
  return '7+'
}

export function roundGpa(gpa: number): number {
  return Math.round(gpa * 100) / 100
}

export function importErrorKeyToParam(key: string): string {
  return key.replace(/^import\./, '').replace(/\./g, '_')
}

export function importedCourseRatioBucket(courses: { isImported?: boolean }[]): string {
  if (courses.length === 0) return '0'
  const imported = courses.filter((c) => c.isImported).length
  return ratioPercentBucket(imported / courses.length)
}
