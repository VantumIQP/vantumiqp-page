import { describe, expect, test } from "bun:test"
import { renderToStaticMarkup } from "react-dom/server"

import { CookieConsentDialog } from "./cookie-consent-dialog"
import { CookiePreferencesLink } from "./cookie-preferences-link"

const noop = () => {}

describe("cookie consent dialog", () => {
  test("renders the initial consent banner with primary actions", () => {
    const html = renderToStaticMarkup(
      <CookieConsentDialog
        mode="banner"
        consent={null}
        onAcceptAll={noop}
        onCustomize={noop}
        onRejectOptional={noop}
        onSavePreferences={noop}
        onClosePreferences={noop}
      />
    )

    expect(html).toContain("We use essential storage")
    expect(html).toContain("Accept all")
    expect(html).toContain("Reject optional")
    expect(html).toContain("Customize")
    expect(html).toContain('href="/privacy"')
  })

  test("renders category preferences with essential locked on", () => {
    const html = renderToStaticMarkup(
      <CookieConsentDialog
        mode="preferences"
        consent={null}
        onAcceptAll={noop}
        onCustomize={noop}
        onRejectOptional={noop}
        onSavePreferences={noop}
        onClosePreferences={noop}
      />
    )

    expect(html).toContain('role="dialog"')
    expect(html).toContain("Cookie preferences")
    expect(html).toContain("Essential")
    expect(html).toContain("Always active")
    expect(html).toContain("Preferences")
    expect(html).toContain("Analytics")
    expect(html).toContain("Marketing")
    expect(html).toContain("Save preferences")
  })

  test("renders a footer control for reopening preferences", () => {
    const html = renderToStaticMarkup(<CookiePreferencesLink />)

    expect(html).toContain("Cookie preferences")
    expect(html).toContain("type=\"button\"")
  })
})
