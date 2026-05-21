import { describe, expect, test } from "bun:test"
import { renderToStaticMarkup } from "react-dom/server"

import Page from "./page"

describe("VantumIQP landing page", () => {
  const renderPage = () => renderToStaticMarkup(<Page />)

  test("prioritizes demo access over pricing", () => {
    const html = renderPage()

    expect(html).toContain("Request demo access")
    expect(html).toContain("Powered by Apache Superset")
    expect(html).not.toContain("Pricing")
  })

  test("renders the provided logo without cover-cropping it", () => {
    const html = renderPage()

    expect(html).toContain('alt="VantumIQP logo"')
    expect(html).toContain("vantumiqp_logo.png")
    expect(html).toContain("object-contain")
  })

  test("scales the navbar logo across screen breakpoints", () => {
    const html = renderPage()

    expect(html).toContain("h-8 w-8")
    expect(html).toContain("sm:h-9 sm:w-9")
    expect(html).toContain("lg:h-10 lg:w-10")
    expect(html).toContain(
      'sizes="(min-width: 1024px) 40px, (min-width: 640px) 36px, 32px"'
    )
  })

  test("uses the VantumIQP name and shows a real product screenshot", () => {
    const html = renderPage()

    expect(html).toContain("VantumIQP is a calm BI workspace")
    expect(html).toContain("See VantumIQP on your own reporting questions.")
    expect(html).toContain('alt="VantumIQP dashboard screenshot"')
    expect(html).toContain("dashboard-3.jpg")
    expect(html).toContain("sql-editor.jpg")
    expect(html).toContain("make-visual.jpg")
  })

  test("uses tokenized shadcn radii for the page surfaces", () => {
    const html = renderPage()

    expect(html).not.toContain("rounded-[2rem]")
    expect(html).not.toContain("rounded-[1.75rem]")
  })

  test("uses semantic shell colors and the revised navbar actions", () => {
    const html = renderPage()

    expect(html).toContain("Sign in")
    expect(html).toContain("bg-background")
    expect(html).not.toContain("bg-[#f6f7f3]")
  })

  test("exposes stable hooks for GSAP micro animations", () => {
    const html = renderPage()

    expect(html).toContain('data-gsap-scope="landing"')
    expect(html).toContain('data-animate="hero-title"')
    expect(html).toContain('data-animate="hero-dashboard"')
    expect(html).toContain('data-animate="section-heading"')
    expect(html).toContain('data-animate="capability-card"')
    expect(html).toContain('data-animate="product-preview"')
    expect(html).toContain('data-animate="workflow-shell"')
    expect(html).toContain('data-animate="demo-panel"')
  })

  test("keeps GSAP transforms off Next image elements", () => {
    const html = renderPage()

    expect(html).toContain('data-animate="surface-media"')
    expect(html).not.toContain('data-animate="image-parallax"')
    expect(html).not.toContain('data-animate="card-image"')
    expect(html).not.toContain('data-parallax="image"')
  })

  test("gives image fetch priority based on viewport importance", () => {
    const html = renderPage()

    expect(html).toContain('fetchPriority="high"')
    expect(html).toContain("night-sea.avif")

    const lowPriorityImages = html.match(/fetchPriority="low"/g) ?? []
    expect(lowPriorityImages.length).toBeGreaterThanOrEqual(8)
  })

  test("publishes answer-focused structured data for AI and search extraction", () => {
    const html = renderPage()

    expect(html).toContain('type="application/ld+json"')
    expect(html).toContain('"@type":"SoftwareApplication"')
    expect(html).toContain('"@type":"FAQPage"')
    expect(html).toContain("What is VantumIQP?")
  })
})
