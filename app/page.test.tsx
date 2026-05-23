import { describe, expect, test } from "bun:test"
import { renderToStaticMarkup } from "react-dom/server"

import Page from "./page"

describe("VantumIQP landing page", () => {
  test("prioritizes demo access over pricing", () => {
    const html = renderToStaticMarkup(<Page />)

    expect(html).toContain("Request demo access")
    expect(html).toContain("Powered by Apache Superset")
    expect(html).not.toContain("Pricing")
  })

  test("renders the provided logo without cover-cropping it", () => {
    const html = renderToStaticMarkup(<Page />)

    expect(html).toContain('alt="VantumIQP logo"')
    expect(html).toContain("vantumiqp_logo.png")
    expect(html).toContain("object-contain")
  })

  test("uses the VantumIQP name and shows a real product screenshot", () => {
    const html = renderToStaticMarkup(<Page />)

    expect(html).toContain("VantumIQP is a calm BI workspace")
    expect(html).toContain("See VantumIQP on your own reporting questions.")
    expect(html).toContain('alt="VantumIQP dashboard screenshot"')
    expect(html).toContain("dashboard-3.jpg")
    expect(html).toContain("sql-editor.jpg")
    expect(html).toContain("make-visual.jpg")
  })

  test("uses tokenized shadcn radii for the page surfaces", () => {
    const html = renderToStaticMarkup(<Page />)

    expect(html).not.toContain("rounded-[2rem]")
    expect(html).not.toContain("rounded-[1.75rem]")
  })

  test("uses semantic shell colors and the revised navbar actions", () => {
    const html = renderToStaticMarkup(<Page />)

    expect(html).toContain("Sign in")
    expect(html).toContain("Blog")
    expect(html).toContain("bg-background")
    expect(html).not.toContain("bg-[#f6f7f3]")
  })

  test("promotes the latest blog posts without weakening the demo funnel", () => {
    const html = renderToStaticMarkup(<Page />)

    expect(html).toContain("Field Notes")
    expect(html).toContain("Governed Dashboards Without Slowing Analysts Down")
    expect(html).toContain("What Apache Superset Gives a Modern BI Workspace")
    expect(html).toContain("Why Teams Outgrow Screenshot Reporting")
    expect(html).toContain('href="/blog"')
    expect(html).toContain("Request demo access")
  })
})
