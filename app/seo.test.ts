import { describe, expect, test } from "bun:test"

describe("SEO metadata", () => {
  test("defines descriptive landing page metadata", async () => {
    const seoModule = await import("../lib/seo").catch(() => undefined)

    expect(seoModule).toBeDefined()
    expect(seoModule?.metadata).toMatchObject({
      title: {
        default: "VantumIQP | Calm BI workspace for dashboards and SQL",
      },
      description: expect.stringContaining("BI workspace"),
      alternates: {
        canonical: "/",
      },
      openGraph: {
        title: expect.stringContaining("VantumIQP"),
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
      },
    })
  })

  test("generates crawl routes from the configured site URL", async () => {
    const [robotsModule, sitemapModule] = await Promise.all([
      import("./robots").catch(() => undefined),
      import("./sitemap").catch(() => undefined),
    ])

    expect(robotsModule).toBeDefined()
    expect(sitemapModule).toBeDefined()

    const robots = robotsModule?.default()
    const sitemap = sitemapModule?.default()

    expect(robots).toMatchObject({
      rules: {
        userAgent: "*",
        allow: "/",
      },
    })
    expect(robots?.sitemap).toContain("/sitemap.xml")
    expect(sitemap?.[0].url).toMatch(/^https:\/\/.+/)
    expect(sitemap?.[0].changeFrequency).toBe("monthly")
  })
})
