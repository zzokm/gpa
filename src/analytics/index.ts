export function getMeasurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  return id && id.trim() !== '' ? id.trim() : undefined
}
