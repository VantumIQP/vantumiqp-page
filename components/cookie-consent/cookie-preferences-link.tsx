"use client"

import type { ComponentPropsWithoutRef } from "react"

import { COOKIE_CONSENT_OPEN_EVENT } from "@/lib/cookie-consent"
import { cn } from "@/lib/utils"

type CookiePreferencesLinkProps = ComponentPropsWithoutRef<"button">

export function CookiePreferencesLink({
  className,
  ...props
}: CookiePreferencesLinkProps) {
  return (
    <button
      type="button"
      className={cn(
        "text-left transition-colors hover:text-foreground",
        className
      )}
      onClick={() => {
        window.dispatchEvent(new Event(COOKIE_CONSENT_OPEN_EVENT))
      }}
      {...props}
    >
      Cookie preferences
    </button>
  )
}
