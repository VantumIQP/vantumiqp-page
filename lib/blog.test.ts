import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { mkdtemp, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { tmpdir } from "node:os"

import {
  getAllBlogPosts,
  getBlogPost,
  getLatestBlogPosts,
  readBlogPostsFromDirectory,
} from "./blog"

let tempDir: string

beforeEach(async () => {
  tempDir = await mkdtemp(join(tmpdir(), "vantumiqp-blog-"))
})

afterEach(async () => {
  await rm(tempDir, { recursive: true, force: true })
})

async function writePost(filename: string, frontmatter: string, body: string) {
  await writeFile(
    join(tempDir, filename),
    `---\n${frontmatter.trim()}\n---\n\n${body.trim()}\n`,
    "utf8"
  )
}

describe("blog content loader", () => {
  test("discovers mdx files, derives slugs, and sorts newest first", async () => {
    await writePost(
      "older-post.mdx",
      `
title: "Older post"
description: "Older description"
publishedAt: "2026-05-01"
author: "VantumIQP"
tags: ["BI"]
`,
      "Older body"
    )
    await writePost(
      "newer-post.mdx",
      `
title: "Newer post"
description: "Newer description"
publishedAt: "2026-05-20"
author: "VantumIQP"
tags: ["Dashboards", "Governance"]
heroImage: "/images/vantumiqp/dashboard-3.jpg"
heroImageAlt: "Dashboard view"
`,
      "Newer body with enough words to estimate reading time."
    )
    await writeFile(join(tempDir, "notes.txt"), "ignore me", "utf8")

    const posts = await readBlogPostsFromDirectory(tempDir)

    expect(posts.map((post) => post.slug)).toEqual(["newer-post", "older-post"])
    expect(posts[0]).toMatchObject({
      title: "Newer post",
      description: "Newer description",
      publishedAt: "2026-05-20",
      author: "VantumIQP",
      tags: ["Dashboards", "Governance"],
      heroImage: "/images/vantumiqp/dashboard-3.jpg",
      heroImageAlt: "Dashboard view",
      readingTime: "1 min read",
    })
  })

  test("rejects posts missing required metadata", async () => {
    await writePost(
      "broken-post.mdx",
      `
title: "Broken post"
publishedAt: "2026-05-20"
author: "VantumIQP"
tags: ["BI"]
`,
      "Broken body"
    )

    expect(() => readBlogPostsFromDirectory(tempDir)).toThrow(
      "broken-post.mdx is missing description"
    )
  })

  test("exposes starter posts from the project content directory", async () => {
    const posts = await getAllBlogPosts()

    expect(posts.map((post) => post.title)).toEqual([
      "Governed Dashboards Without Slowing Analysts Down",
      "What Apache Superset Gives a Modern BI Workspace",
      "Why Teams Outgrow Screenshot Reporting",
    ])
    expect(getLatestBlogPosts(2).map((post) => post.slug)).toEqual([
      "governed-dashboards-without-slowing-analysts-down",
      "what-apache-superset-gives-a-modern-bi-workspace",
    ])
    expect(getBlogPost("why-teams-outgrow-screenshot-reporting")?.title).toBe(
      "Why Teams Outgrow Screenshot Reporting"
    )
  })
})
