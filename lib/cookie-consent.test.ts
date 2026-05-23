import { beforeEach, describe, expect, test } from "bun:test"

import {
  COOKIE_CONSENT_STORAGE_KEY,
  COOKIE_CONSENT_VERSION,
  applyConsentIntegrations,
  clearConsentIntegrations,
  createAcceptAllConsent,
  createRejectOptionalConsent,
  parseStoredConsent,
  readStoredConsent,
  registerConsentIntegration,
  writeStoredConsent,
} from "./cookie-consent"

class MemoryStorage implements Storage {
  private values = new Map<string, string>()

  get length() {
    return this.values.size
  }

  clear() {
    this.values.clear()
  }

  getItem(key: string) {
    return this.values.get(key) ?? null
  }

  key(index: number) {
    return Array.from(this.values.keys())[index] ?? null
  }

  removeItem(key: string) {
    this.values.delete(key)
  }

  setItem(key: string, value: string) {
    this.values.set(key, value)
  }
}

describe("cookie consent model", () => {
  beforeEach(() => {
    clearConsentIntegrations()
  })

  test("creates an accept-all record with essential and every optional category enabled", () => {
    const consent = createAcceptAllConsent("2026-05-21T10:00:00.000Z")

    expect(consent).toEqual({
      version: COOKIE_CONSENT_VERSION,
      updatedAt: "2026-05-21T10:00:00.000Z",
      categories: {
        essential: true,
        preferences: true,
        analytics: true,
        marketing: true,
      },
    })
  })

  test("creates a reject-optional record that keeps essential enabled", () => {
    const consent = createRejectOptionalConsent("2026-05-21T10:00:00.000Z")

    expect(consent.categories).toEqual({
      essential: true,
      preferences: false,
      analytics: false,
      marketing: false,
    })
  })

  test("parses stored consent and repairs a disabled essential category", () => {
    const consent = parseStoredConsent(
      JSON.stringify({
        version: COOKIE_CONSENT_VERSION,
        updatedAt: "2026-05-21T10:00:00.000Z",
        categories: {
          essential: false,
          preferences: true,
          analytics: false,
          marketing: true,
          unknown: true,
        },
      })
    )

    expect(consent?.categories).toEqual({
      essential: true,
      preferences: true,
      analytics: false,
      marketing: true,
    })
  })

  test("rejects malformed and stale stored consent", () => {
    expect(parseStoredConsent(null)).toBeNull()
    expect(parseStoredConsent("{bad json")).toBeNull()
    expect(
      parseStoredConsent(
        JSON.stringify({
          version: COOKIE_CONSENT_VERSION - 1,
          updatedAt: "2026-05-21T10:00:00.000Z",
          categories: {
            essential: true,
            preferences: true,
            analytics: true,
            marketing: true,
          },
        })
      )
    ).toBeNull()
  })

  test("reads and writes consent through the configured storage key", () => {
    const storage = new MemoryStorage()
    const consent = createRejectOptionalConsent("2026-05-21T10:00:00.000Z")

    writeStoredConsent(consent, storage)

    expect(storage.getItem(COOKIE_CONSENT_STORAGE_KEY)).toContain(
      '"version":1'
    )
    expect(readStoredConsent(storage)).toEqual(consent)
  })

  test("loads registered integrations only after matching consent is granted", () => {
    let analyticsLoads = 0
    let marketingLoads = 0

    registerConsentIntegration({
      id: "analytics-test",
      category: "analytics",
      load: () => {
        analyticsLoads += 1
      },
    })
    registerConsentIntegration({
      id: "marketing-test",
      category: "marketing",
      load: () => {
        marketingLoads += 1
      },
    })

    applyConsentIntegrations(
      createRejectOptionalConsent("2026-05-21T10:00:00.000Z")
    )
    expect(analyticsLoads).toBe(0)
    expect(marketingLoads).toBe(0)

    applyConsentIntegrations(
      createAcceptAllConsent("2026-05-21T10:00:01.000Z")
    )
    applyConsentIntegrations(
      createAcceptAllConsent("2026-05-21T10:00:02.000Z")
    )

    expect(analyticsLoads).toBe(1)
    expect(marketingLoads).toBe(1)
  })

  test("runs integration cleanup when a granted category is later revoked", () => {
    let analyticsCleanups = 0

    registerConsentIntegration({
      id: "cleanup-test",
      category: "analytics",
      load: () => () => {
        analyticsCleanups += 1
      },
    })

    applyConsentIntegrations(
      createAcceptAllConsent("2026-05-21T10:00:00.000Z")
    )
    applyConsentIntegrations(
      createRejectOptionalConsent("2026-05-21T10:00:01.000Z")
    )
    applyConsentIntegrations(
      createRejectOptionalConsent("2026-05-21T10:00:02.000Z")
    )

    expect(analyticsCleanups).toBe(1)
  })
})
