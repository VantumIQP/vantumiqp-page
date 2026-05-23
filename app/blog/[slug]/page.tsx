import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

import { BackToTop } from "@/components/landing/back-to-top"
import { Navbar } from "@/components/landing/navbar"
import { SiteFooter } from "@/components/layout/site-footer"
import { Badge } from "@/components/ui/badge"
import {
  blogPostPath,
  formatBlogDate,
  getAllBlogPosts,
  getBlogPost,
} from "@/lib/blog"
import { absoluteUrl, SITE_NAME } from "@/lib/site"

type BlogPostPageProps = {
  params: Promise<{
    slug: string
  }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const path = blogPostPath(post.slug)
  const title = `${post.title} | ${SITE_NAME}`
  const images = post.heroImage
    ? [
        {
          url: post.heroImage,
          width: 1200,
          height: 630,
          alt: post.heroImageAlt ?? post.title,
        },
      ]
    : undefined

  return {
    title: {
      absolute: title,
    },
    description: post.description,
    alternates: {
      canonical: path,
    },
    authors: [{ name: post.author }],
    keywords: post.tags,
    openGraph: {
      title,
      description: post.description,
      url: path,
      type: "article",
      publishedTime: `${post.publishedAt}T00:00:00.000Z`,
      authors: [post.author],
      tags: post.tags,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      images: post.heroImage ? [post.heroImage] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const { default: Post } = await import(`@/content/blog/${post.slug}.mdx`)
  const postUrl = absoluteUrl(blogPostPath(post.slug))
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    mainEntityOfPage: postUrl,
    url: postUrl,
    image: post.heroImage ? absoluteUrl(post.heroImage) : undefined,
    keywords: post.tags.join(", "),
  }

  return (
    <>
      <Navbar />
      <main className="min-h-svh overflow-hidden bg-background pt-[69px] text-foreground">
        <article>
          <header className="px-4 pt-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border border-border bg-card shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
              {post.heroImage ? (
                <div className="relative aspect-[16/8] bg-muted">
                  <Image
                    src={post.heroImage}
                    alt={post.heroImageAlt ?? ""}
                    fill
                    priority
                    sizes="(min-width: 1024px) 960px, 92vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/22 to-transparent" />
                </div>
              ) : null}

              <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="secondary" className="rounded-full">
                    {post.tags[0]}
                  </Badge>
                  <span>{formatBlogDate(post.publishedAt)}</span>
                  <span>{post.readingTime}</span>
                </div>
                <h1 className="mt-6 max-w-4xl font-heading text-5xl leading-[0.94] tracking-[-0.04em] text-balance text-foreground sm:text-6xl">
                  {post.title}
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
                  {post.description}
                </p>
              </div>
            </div>
          </header>

          <div className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-base">
              <Post />
            </div>
          </div>
        </article>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <BackToTop />
        <SiteFooter />
      </main>
    </>
  )
}
