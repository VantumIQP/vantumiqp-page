"use client"

import { Analytics } from "@vercel/analytics/next"

import { useCookieConsent } from "@/components/cookie-consent/cookie-consent-provider"
import { shouldRenderVercelAnalytics } from "@/lib/vercel-analytics"

export function VercelAnalytics() {
  const { consent, ready } = useCookieConsent()

  if (!shouldRenderVercelAnalytics(ready, consent)) return null

  return <Analytics />
}
