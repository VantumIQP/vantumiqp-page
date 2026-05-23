import { describe, expect, test } from "bun:test"

import sitemap from "./sitemap"

describe("sitemap", () => {
  test("includes the homepage, blog index, and every starter post", async () => {
    const entries = await sitemap()
    const urls = entries.map((entry) => entry.url)

    expect(urls).toContain("https://vantumiqp.com/")
    expect(urls).toContain("https://vantumiqp.com/blog")
    expect(urls).toContain(
      "https://vantumiqp.com/blog/why-teams-outgrow-screenshot-reporting"
    )
    expect(urls).toContain(
      "https://vantumiqp.com/blog/what-apache-superset-gives-a-modern-bi-workspace"
    )
    expect(urls).toContain(
      "https://vantumiqp.com/blog/governed-dashboards-without-slowing-analysts-down"
    )
  })
})
