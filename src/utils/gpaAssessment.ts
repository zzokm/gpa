export function getGPAAssessment(gpa: number): { key: string; color: string } {
  if (gpa < 1) return { key: 'gpa.veryPoor', color: '#B71C1C' }
  if (gpa < 2) return { key: 'gpa.poor', color: '#E65100' }
  if (gpa < 2.5) return { key: 'gpa.acceptable', color: '#FFC200' }
  if (gpa < 3) return { key: 'gpa.good', color: '#2E7D32' }
  if (gpa < 3.5) return { key: 'gpa.veryGood', color: '#0D47A1' }
  return { key: 'gpa.excellent', color: '#4A148C' }
}
