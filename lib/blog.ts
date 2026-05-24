import matter from "gray-matter"
import { existsSync, readdirSync, readFileSync } from "node:fs"
import { basename, join } from "node:path"

const BLOG_CONTENT_DIR = join(process.cwd(), "content", "blog")
const WORDS_PER_MINUTE = 220

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
})

export type FaqItem = {
  question: string
  answer: string
}

export type BlogPost = {
  slug: string
  title: string
  description: string
  publishedAt: string
  author: string
  tags: string[]
  heroImage?: string
  heroImageAlt?: string
  readingTime: string
  faq?: FaqItem[]
}

type BlogFrontmatter = {
  title?: unknown
  description?: unknown
  publishedAt?: unknown
  author?: unknown
  tags?: unknown
  heroImage?: unknown
  heroImageAlt?: unknown
  faq?: unknown
}

function assertString(
  value: unknown,
  field: keyof BlogFrontmatter,
  filename: string
) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${filename} is missing ${field}`)
  }

  return value.trim()
}

function assertTags(value: unknown, filename: string) {
  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    value.some((tag) => typeof tag !== "string" || tag.trim().length === 0)
  ) {
    throw new Error(`${filename} is missing tags`)
  }

  return value.map((tag) => tag.trim())
}

function assertIsoDate(value: string, filename: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`${filename} has an invalid publishedAt date`)
  }

  const parsed = new Date(`${value}T00:00:00.000Z`)
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`${filename} has an invalid publishedAt date`)
  }

  return value
}

function readingTimeFor(content: string) {
  const words = content.match(/\b[\w'-]+\b/g)?.length ?? 0
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))

  return `${minutes} min read`
}

function parseFaq(value: unknown): FaqItem[] {
  if (!Array.isArray(value)) return []
  return value.filter(
    (item) =>
      item !== null &&
      typeof item === "object" &&
      typeof item.question === "string" &&
      item.question.trim().length > 0 &&
      typeof item.answer === "string" &&
      item.answer.trim().length > 0
  ).map((item) => ({ question: item.question.trim(), answer: item.answer.trim() }))
}

function parseBlogPost(filename: string, source: string): BlogPost {
  const { content, data } = matter(source)
  const frontmatter = data as BlogFrontmatter
  const publishedAt = assertIsoDate(
    assertString(frontmatter.publishedAt, "publishedAt", filename),
    filename
  )
  const heroImage =
    typeof frontmatter.heroImage === "string" &&
    frontmatter.heroImage.trim().length > 0
      ? frontmatter.heroImage.trim()
      : undefined
  const heroImageAlt =
    typeof frontmatter.heroImageAlt === "string" &&
    frontmatter.heroImageAlt.trim().length > 0
      ? frontmatter.heroImageAlt.trim()
      : undefined

  const faq = parseFaq(frontmatter.faq)

  return {
    slug: basename(filename, ".mdx"),
    title: assertString(frontmatter.title, "title", filename),
    description: assertString(frontmatter.description, "description", filename),
    publishedAt,
    author: assertString(frontmatter.author, "author", filename),
    tags: assertTags(frontmatter.tags, filename),
    ...(heroImage ? { heroImage } : {}),
    ...(heroImageAlt ? { heroImageAlt } : {}),
    readingTime: readingTimeFor(content),
    ...(faq.length > 0 ? { faq } : {}),
  }
}

export function readBlogPostsFromDirectory(directory: string): BlogPost[] {
  if (!existsSync(directory)) {
    return []
  }

  return readdirSync(directory)
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) =>
      parseBlogPost(filename, readFileSync(join(directory, filename), "utf8"))
    )
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function getAllBlogPosts() {
  return readBlogPostsFromDirectory(BLOG_CONTENT_DIR)
}

export function getLatestBlogPosts(count: number) {
  return getAllBlogPosts().slice(0, count)
}

export function getBlogPost(slug: string) {
  return getAllBlogPosts().find((post) => post.slug === slug)
}

export function formatBlogDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00.000Z`))
}

export function blogPostPath(slug: string) {
  return `/blog/${slug}`
}
