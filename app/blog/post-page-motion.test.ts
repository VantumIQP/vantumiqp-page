import { describe, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"

describe("blog post page motion hooks", () => {
  const source = readFileSync(
    join(process.cwd(), "app", "blog", "[slug]", "page.tsx"),
    "utf8"
  )

  test("uses the shared blog motion layer", () => {
    expect(source).toContain("BlogMotion")
    expect(source).toContain('data-gsap-scope="blog"')
  })

  test("exposes stable hooks for post header, media, and MDX content", () => {
    expect(source).toContain('data-animate="blog-post-header"')
    expect(source).toContain('data-animate="blog-post-media"')
    expect(source).toContain('data-animate="blog-kicker"')
    expect(source).toContain('data-animate="blog-title"')
    expect(source).toContain('data-animate="blog-copy"')
    expect(source).toContain('data-animate="blog-content"')
  })
})
