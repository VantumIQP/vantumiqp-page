import { describe, expect, test } from "bun:test"

import {
  createAcceptAllConsent,
  createRejectOptionalConsent,
} from "./cookie-consent"
import { shouldRenderVercelAnalytics } from "./vercel-analytics"

describe("Vercel Analytics consent gate", () => {
  test("renders analytics only after the consent store is ready and analytics consent is granted", () => {
    expect(shouldRenderVercelAnalytics(false, null)).toBe(false)
    expect(
      shouldRenderVercelAnalytics(
        true,
        createRejectOptionalConsent("2026-05-21T10:00:00.000Z")
      )
    ).toBe(false)
    expect(
      shouldRenderVercelAnalytics(
        true,
        createAcceptAllConsent("2026-05-21T10:00:01.000Z")
      )
    ).toBe(true)
  })
})
