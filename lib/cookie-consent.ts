export const COOKIE_CONSENT_VERSION = 1
export const COOKIE_CONSENT_STORAGE_KEY = "vantumiqp.cookieConsent"
export const COOKIE_CONSENT_OPEN_EVENT = "vantumiqp:cookie-consent:open"
export const COOKIE_CONSENT_CHANGE_EVENT = "vantumiqp:cookie-consent:change"

export const COOKIE_CONSENT_CATEGORIES = [
  {
    id: "essential",
    title: "Essential",
    description:
      "Required for the website to load, remember security-critical choices, and process forms you submit.",
    required: true,
  },
  {
    id: "preferences",
    title: "Preferences",
    description:
      "Remembers optional interface choices so the website can feel consistent across visits.",
    required: false,
  },
  {
    id: "analytics",
    title: "Analytics",
    description:
      "Allows Vercel Analytics to measure aggregate site performance and page usage.",
    required: false,
  },
  {
    id: "marketing",
    title: "Marketing",
    description:
      "Allows campaign measurement or marketing pixels if those tools are added in the future.",
    required: false,
  },
] as const

export type CookieConsentCategory =
  (typeof COOKIE_CONSENT_CATEGORIES)[number]["id"]

export type OptionalCookieConsentCategory = Exclude<
  CookieConsentCategory,
  "essential"
>

export type CookieConsentCategoryGrant = Record<
  CookieConsentCategory,
  boolean
>

export type CookieConsentRecord = {
  version: typeof COOKIE_CONSENT_VERSION
  updatedAt: string
  categories: CookieConsentCategoryGrant
}

export type ConsentStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">

type ConsentIntegrationCleanup = () => void

type ConsentIntegrationRuntime = {
  cleanup?: ConsentIntegrationCleanup
  active: boolean
  loaded: boolean
}

export type ConsentIntegration = {
  id: string
  category: OptionalCookieConsentCategory
  load: () => void | ConsentIntegrationCleanup
}

const OPTIONAL_COOKIE_CONSENT_CATEGORIES = COOKIE_CONSENT_CATEGORIES.filter(
  (category): category is Extract<
    (typeof COOKIE_CONSENT_CATEGORIES)[number],
    { required: false }
  > => !category.required
).map((category) => category.id)

const consentIntegrations = new Map<string, ConsentIntegration>()
const integrationRuntime = new Map<string, ConsentIntegrationRuntime>()

export function createConsentRecord(
  categories: Partial<Record<OptionalCookieConsentCategory, boolean>>,
  updatedAt = new Date().toISOString()
): CookieConsentRecord {
  return {
    version: COOKIE_CONSENT_VERSION,
    updatedAt,
    categories: {
      essential: true,
      preferences: Boolean(categories.preferences),
      analytics: Boolean(categories.analytics),
      marketing: Boolean(categories.marketing),
    },
  }
}

export function createAcceptAllConsent(updatedAt?: string) {
  return createConsentRecord(
    {
      preferences: true,
      analytics: true,
      marketing: true,
    },
    updatedAt
  )
}

export function createRejectOptionalConsent(updatedAt?: string) {
  return createConsentRecord(
    {
      preferences: false,
      analytics: false,
      marketing: false,
    },
    updatedAt
  )
}

export function parseStoredConsent(value: string | null) {
  if (!value) return null

  try {
    return normalizeConsentRecord(JSON.parse(value))
  } catch {
    return null
  }
}

export function normalizeConsentRecord(
  value: unknown
): CookieConsentRecord | null {
  if (!isRecord(value)) return null
  if (value.version !== COOKIE_CONSENT_VERSION) return null
  if (typeof value.updatedAt !== "string") return null
  if (!isRecord(value.categories)) return null

  return createConsentRecord(
    {
      preferences: value.categories.preferences === true,
      analytics: value.categories.analytics === true,
      marketing: value.categories.marketing === true,
    },
    value.updatedAt
  )
}

export function readStoredConsent(storage = getBrowserStorage()) {
  if (!storage) return null

  try {
    return parseStoredConsent(storage.getItem(COOKIE_CONSENT_STORAGE_KEY))
  } catch {
    return null
  }
}

export function writeStoredConsent(
  consent: CookieConsentRecord,
  storage = getBrowserStorage()
) {
  if (!storage) return

  storage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(consent))
}

export function removeStoredConsent(storage = getBrowserStorage()) {
  if (!storage) return

  storage.removeItem(COOKIE_CONSENT_STORAGE_KEY)
}

export function hasCategoryConsent(
  consent: CookieConsentRecord | null,
  category: CookieConsentCategory
) {
  if (category === "essential") return true

  return consent?.categories[category] === true
}

export function registerConsentIntegration(integration: ConsentIntegration) {
  consentIntegrations.set(integration.id, integration)
  integrationRuntime.delete(integration.id)

  return () => {
    runIntegrationCleanup(integration.id)
    consentIntegrations.delete(integration.id)
    integrationRuntime.delete(integration.id)
  }
}

export function clearConsentIntegrations() {
  for (const integrationId of consentIntegrations.keys()) {
    runIntegrationCleanup(integrationId)
  }

  consentIntegrations.clear()
  integrationRuntime.clear()
}

export function getRegisteredConsentIntegrations() {
  return Array.from(consentIntegrations.values())
}

export function applyConsentIntegrations(consent: CookieConsentRecord | null) {
  for (const integration of consentIntegrations.values()) {
    const runtime = integrationRuntime.get(integration.id)
    const granted = hasCategoryConsent(consent, integration.category)

    if (granted && !runtime?.loaded) {
      const cleanup = integration.load()
      integrationRuntime.set(integration.id, {
        active: true,
        loaded: true,
        cleanup: typeof cleanup === "function" ? cleanup : undefined,
      })
      continue
    }

    if (granted && runtime) {
      runtime.active = true
      integrationRuntime.set(integration.id, runtime)
      continue
    }

    if (!granted && runtime?.active) {
      runIntegrationCleanup(integration.id)
      integrationRuntime.set(integration.id, {
        ...runtime,
        active: false,
        cleanup: undefined,
      })
    }
  }
}

export function getOptionalCookieConsentCategories() {
  return OPTIONAL_COOKIE_CONSENT_CATEGORIES
}

function runIntegrationCleanup(integrationId: string) {
  const runtime = integrationRuntime.get(integrationId)
  if (!runtime?.cleanup) return

  runtime.cleanup()
}

function getBrowserStorage() {
  if (typeof window === "undefined") return null

  return window.localStorage
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}
