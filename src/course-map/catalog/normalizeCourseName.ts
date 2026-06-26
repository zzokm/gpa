export function normalizeCourseName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[\u2010-\u2015]/g, '-')
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s+\-().]/g, '')
}
