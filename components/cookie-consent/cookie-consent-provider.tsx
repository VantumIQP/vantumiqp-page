"use client"

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react"

import { CookieConsentDialog } from "@/components/cookie-consent/cookie-consent-dialog"
import {
  COOKIE_CONSENT_CHANGE_EVENT,
  COOKIE_CONSENT_OPEN_EVENT,
  COOKIE_CONSENT_STORAGE_KEY,
  applyConsentIntegrations,
  createAcceptAllConsent,
  createConsentRecord,
  createRejectOptionalConsent,
  parseStoredConsent,
  writeStoredConsent,
  type CookieConsentRecord,
  type OptionalCookieConsentCategory,
} from "@/lib/cookie-consent"

type CookieConsentContextValue = {
  consent: CookieConsentRecord | null
  ready: boolean
  openPreferences: () => void
  acceptAll: () => void
  rejectOptional: () => void
  savePreferences: (
    categories: Partial<Record<OptionalCookieConsentCategory, boolean>>
  ) => void
}

const CookieConsentContext =
  createContext<CookieConsentContextValue | null>(null)

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const storedConsent = useSyncExternalStore(
    subscribeCookieConsentStore,
    getCookieConsentSnapshot,
    getServerCookieConsentSnapshot
  )
  const [preferencesOpen, setPreferencesOpen] = useState(false)

  useEffect(() => {
    if (storedConsent === undefined) return

    applyConsentIntegrations(storedConsent)
  }, [storedConsent])

  useEffect(() => {
    const openPreferences = () => setPreferencesOpen(true)

    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, openPreferences)
    return () => {
      window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, openPreferences)
    }
  }, [])

  const persistConsent = useCallback((nextConsent: CookieConsentRecord) => {
    writeStoredConsent(nextConsent)
    setPreferencesOpen(false)

    window.dispatchEvent(
      new CustomEvent(COOKIE_CONSENT_CHANGE_EVENT, {
        detail: nextConsent,
      })
    )
  }, [])

  const acceptAll = useCallback(() => {
    persistConsent(createAcceptAllConsent())
  }, [persistConsent])

  const rejectOptional = useCallback(() => {
    persistConsent(createRejectOptionalConsent())
  }, [persistConsent])

  const savePreferences = useCallback(
    (categories: Partial<Record<OptionalCookieConsentCategory, boolean>>) => {
      persistConsent(createConsentRecord(categories))
    },
    [persistConsent]
  )

  const openPreferences = useCallback(() => {
    setPreferencesOpen(true)
  }, [])

  const ready = storedConsent !== undefined
  const consent = storedConsent ?? null

  const value = useMemo(
    () => ({
      consent,
      ready,
      openPreferences,
      acceptAll,
      rejectOptional,
      savePreferences,
    }),
    [acceptAll, consent, openPreferences, ready, rejectOptional, savePreferences]
  )

  const dialogMode = preferencesOpen ? "preferences" : "banner"
  const showDialog = ready && (preferencesOpen || !consent)

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      {showDialog ? (
        <CookieConsentDialog
          mode={dialogMode}
          consent={consent}
          onAcceptAll={acceptAll}
          onCustomize={openPreferences}
          onRejectOptional={rejectOptional}
          onSavePreferences={savePreferences}
          onClosePreferences={() => setPreferencesOpen(false)}
        />
      ) : null}
    </CookieConsentContext.Provider>
  )
}

function subscribeCookieConsentStore(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {}

  const onStorage = (event: StorageEvent) => {
    if (event.key === COOKIE_CONSENT_STORAGE_KEY) onStoreChange()
  }

  window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, onStoreChange)
  window.addEventListener("storage", onStorage)

  return () => {
    window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, onStoreChange)
    window.removeEventListener("storage", onStorage)
  }
}

function getCookieConsentSnapshot() {
  if (typeof window === "undefined") return undefined

  try {
    const rawConsent = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
    if (rawConsent === lastRawConsent) return lastParsedConsent

    lastRawConsent = rawConsent
    lastParsedConsent = parseStoredConsent(rawConsent)
    return lastParsedConsent
  } catch {
    lastRawConsent = null
    lastParsedConsent = null
    return null
  }
}

function getServerCookieConsentSnapshot() {
  return undefined
}

let lastRawConsent: string | null | undefined
let lastParsedConsent: CookieConsentRecord | null = null

export function useCookieConsent() {
  const context = useContext(CookieConsentContext)

  if (!context) {
    throw new Error(
      "useCookieConsent must be used within CookieConsentProvider"
    )
  }

  return context
}
