import { GoogleAnalytics } from '@next/third-parties/google'
import { getMeasurementId } from '@/analytics'

export function AnalyticsScripts() {
  const gaId = getMeasurementId()
  if (!gaId) return null
  return <GoogleAnalytics gaId={gaId} />
}
