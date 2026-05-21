import { describe, expect, test } from "bun:test"
import { renderToStaticMarkup } from "react-dom/server"

import PrivacyPage from "./privacy/page"
import TermsPage from "./terms/page"

describe("Legal pages", () => {
  test("publishes a privacy policy with owner, contact, and processor details", () => {
    const html = renderToStaticMarkup(<PrivacyPage />)

    expect(html).toContain("Privacy Policy")
    expect(html).toContain("Adnan Crnovršanin")
    expect(html).toContain("office@actaer.com")
    expect(html).toContain("Formspree")
    expect(html).toContain("Vercel Analytics")
    expect(html).toContain("Microsoft Clarity")
    expect(html).toContain("Cookie choices")
    expect(html).toContain("Essential storage is always active")
    expect(html).toContain("preferences, analytics, and marketing")
  })

  test("publishes terms that identify the operator and demo-access scope", () => {
    const html = renderToStaticMarkup(<TermsPage />)

    expect(html).toContain("Terms and Conditions")
    expect(html).toContain("Adnan Crnovršanin")
    expect(html).toContain("office@actaer.com")
    expect(html).toContain("demo access")
    expect(html).toContain("third-party services")
  })
})
