import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { BlogPostCard } from "@/components/blog/blog-post-card"
import { BackToTop } from "@/components/landing/back-to-top"
import { Navbar } from "@/components/landing/navbar"
import { SectionHeading } from "@/components/landing/section-heading"
import { SiteFooter } from "@/components/layout/site-footer"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { getAllBlogPosts } from "@/lib/blog"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: {
    absolute: "Blog | VantumIQP",
  },
  description:
    "Field notes on business intelligence, Apache Superset, governed dashboards, and analytics workflows from VantumIQP.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | VantumIQP",
    description:
      "Field notes on business intelligence, Apache Superset, governed dashboards, and analytics workflows from VantumIQP.",
    url: "/blog",
    type: "website",
    images: [
      {
        url: "/images/vantumiqp/dashboard-3.jpg",
        width: 1200,
        height: 630,
        alt: "VantumIQP dashboard view",
      },
    ],
  },
}

export default function BlogPage() {
  const posts = getAllBlogPosts()
  const [featuredPost, ...remainingPosts] = posts

  return (
    <>
      <Navbar />
      <main className="min-h-svh overflow-hidden bg-background pt-[69px] text-foreground">
        <section className="px-4 pt-4 sm:px-6 lg:px-8">
          <div className="relative mx-auto overflow-hidden rounded-xl border border-border bg-card text-primary-foreground shadow-[0_30px_90px_rgba(15,23,42,0.16)] lg:max-w-7xl">
            <Image
              src="/images/vantumiqp/gold-horizon.avif"
              alt=""
              fill
              priority
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.2),transparent_30%),linear-gradient(90deg,rgba(7,17,22,0.82),rgba(7,17,22,0.42)_58%,rgba(7,17,22,0.68))]" />

            <div className="relative grid min-h-[500px] gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[0.86fr_0.64fr] lg:items-end lg:px-10 lg:py-12">
              <div className="max-w-3xl">
                <Badge className="rounded-full border border-primary-foreground/15 bg-primary-foreground/10 px-3 py-1 text-[0.68rem] tracking-[0.28em] text-primary-foreground uppercase hover:bg-primary-foreground/10">
                  VantumIQP Blog
                </Badge>
                <h1 className="mt-8 font-heading text-5xl leading-[0.94] tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl">
                  Field notes for calmer analytics work.
                </h1>
                <p className="mt-6 max-w-2xl text-sm leading-7 text-primary-foreground/76 sm:text-base">
                  Practical writing on BI workflow, Apache Superset, governed
                  dashboards, and the habits that make reporting easier to
                  trust.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/#demo"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "h-11 rounded-full bg-primary px-5 text-primary-foreground hover:bg-primary/90"
                    )}
                  >
                    Request demo access
                    <ArrowRight data-icon="inline-end" />
                  </Link>
                  <Link
                    href="/"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "h-11 rounded-full border-primary-foreground/20 bg-primary-foreground/10 px-5 text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
                    )}
                  >
                    Back to product
                  </Link>
                </div>
              </div>

              <div className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/10 p-5 text-sm leading-6 text-primary-foreground/78 backdrop-blur">
                <p className="font-medium text-primary-foreground">
                  Built for credibility, not content volume.
                </p>
                <p className="mt-3">
                  These articles stay close to VantumIQP&apos;s product promise:
                  clear dashboards, SQL exploration, and governed reporting
                  without a CMS layer.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Articles"
              title="Thinking for teams turning data into decisions."
              description="A small, focused library of product and workflow notes for analytics leaders, operators, and builders."
            />

            <div className="mt-10 flex flex-col gap-5">
              {featuredPost ? (
                <BlogPostCard post={featuredPost} featured />
              ) : null}

              <div className="grid gap-5 md:grid-cols-2">
                {remainingPosts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <BackToTop />
        <SiteFooter />
      </main>
    </>
  )
}
