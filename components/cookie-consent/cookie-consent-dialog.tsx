"use client"

import { useEffect, useId, useRef, useState } from "react"
import Link from "next/link"
import { Check, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  COOKIE_CONSENT_CATEGORIES,
  type CookieConsentRecord,
  type OptionalCookieConsentCategory,
} from "@/lib/cookie-consent"
import { cn } from "@/lib/utils"

type CookieConsentDialogProps = {
  mode: "banner" | "preferences"
  consent: CookieConsentRecord | null
  onAcceptAll: () => void
  onCustomize: () => void
  onRejectOptional: () => void
  onSavePreferences: (
    categories: Partial<Record<OptionalCookieConsentCategory, boolean>>
  ) => void
  onClosePreferences: () => void
}

type DraftPreferences = Record<OptionalCookieConsentCategory, boolean>

export function CookieConsentDialog({
  mode,
  consent,
  onAcceptAll,
  onCustomize,
  onRejectOptional,
  onSavePreferences,
  onClosePreferences,
}: CookieConsentDialogProps) {
  const titleId = useId()
  const descriptionId = useId()
  const dialogRef = useRef<HTMLElement>(null)
  const [draftPreferences, setDraftPreferences] = useState<DraftPreferences>(
    () => getDraftPreferences(consent)
  )

  useEffect(() => {
    if (mode !== "preferences") return

    const dialog = dialogRef.current
    const previouslyFocused = document.activeElement
    const firstFocusable = dialog?.querySelector<HTMLElement>(
      'button, [href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )

    firstFocusable?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClosePreferences()
        return
      }

      if (event.key !== "Tab" || !dialog) return

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button, [href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => !element.hasAttribute("disabled"))

      const first = focusable.at(0)
      const last = focusable.at(-1)
      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus()
      }
    }
  }, [mode, onClosePreferences])

  if (mode === "banner") {
    return (
      <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 lg:px-8">
        <section
          aria-label="Cookie consent"
          className="mx-auto flex max-w-5xl flex-col gap-4 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-[0_18px_70px_rgba(15,23,42,0.18)] sm:p-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-medium tracking-[-0.01em]">
              We use essential storage to run this website.
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Optional preferences, analytics, and marketing categories are
              ready for future tools and stay off unless you allow them. You can
              change this choice any time in{" "}
              <Link
                href="/privacy"
                className="font-medium text-foreground underline underline-offset-4"
              >
                our Privacy Policy
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row lg:shrink-0">
            <Button variant="outline" onClick={onRejectOptional}>
              Reject optional
            </Button>
            <Button variant="secondary" onClick={onCustomize}>
              Customize
            </Button>
            <Button onClick={onAcceptAll}>Accept all</Button>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex min-h-svh items-end bg-foreground/40 px-4 py-4 backdrop-blur-sm sm:items-center sm:px-6 lg:px-8">
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="mx-auto flex max-h-[min(720px,calc(100svh-2rem))] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-[0_30px_100px_rgba(15,23,42,0.28)]"
      >
        <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium tracking-[0.22em] text-muted-foreground uppercase">
              Privacy controls
            </p>
            <h2
              id={titleId}
              className="text-2xl font-medium tracking-[-0.03em]"
            >
              Cookie preferences
            </h2>
            <p
              id={descriptionId}
              className="max-w-xl text-sm leading-6 text-muted-foreground"
            >
              Choose which optional categories VantumIQP may use. Essential
              storage is always active because the site cannot work without it.
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Close cookie preferences"
            onClick={onClosePreferences}
            className="shrink-0"
          >
            <X data-icon="inline-start" />
          </Button>
        </header>

        <div className="flex flex-col gap-3 overflow-y-auto px-5 py-5 sm:px-6">
          {COOKIE_CONSENT_CATEGORIES.map((category) => {
            const inputId = `${titleId}-${category.id}`
            const checked = category.required
              ? true
              : draftPreferences[category.id as OptionalCookieConsentCategory]

            return (
              <label
                key={category.id}
                htmlFor={inputId}
                className={cn(
                  "flex gap-4 rounded-lg border border-border bg-background p-4",
                  category.required ? "cursor-default" : "cursor-pointer"
                )}
              >
                <input
                  id={inputId}
                  type="checkbox"
                  className="peer sr-only"
                  checked={checked}
                  disabled={category.required}
                  readOnly={category.required}
                  onChange={(event) => {
                    if (category.required) return

                    setDraftPreferences((current) => ({
                      ...current,
                      [category.id]: event.target.checked,
                    }))
                  }}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors",
                    checked
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-transparent"
                  )}
                >
                  <Check />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium">
                      {category.title}
                    </span>
                    {category.required ? (
                      <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        Always active
                      </span>
                    ) : null}
                  </span>
                  <span className="text-sm leading-6 text-muted-foreground">
                    {category.description}
                  </span>
                </span>
              </label>
            )
          })}
        </div>

        <footer className="flex flex-col gap-2 border-t border-border bg-muted/50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <Button variant="outline" onClick={onRejectOptional}>
            Reject optional
          </Button>
          <Button
            variant="secondary"
            onClick={() => onSavePreferences(draftPreferences)}
          >
            Save preferences
          </Button>
          <Button onClick={onAcceptAll}>Accept all</Button>
        </footer>
      </section>
    </div>
  )
}

function getDraftPreferences(
  consent: CookieConsentRecord | null
): DraftPreferences {
  return {
    preferences: consent?.categories.preferences ?? false,
    analytics: consent?.categories.analytics ?? false,
    marketing: consent?.categories.marketing ?? false,
  }
}
