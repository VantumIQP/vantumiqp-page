import { hasCategoryConsent, type CookieConsentRecord } from "./cookie-consent"

export function shouldRenderVercelAnalytics(
  ready: boolean,
  consent: CookieConsentRecord | null
) {
  return ready && hasCategoryConsent(consent, "analytics")
}
