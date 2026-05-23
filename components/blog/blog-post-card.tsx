import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { blogPostPath, formatBlogDate, type BlogPost } from "@/lib/blog"
import { cn } from "@/lib/utils"

type BlogPostCardProps = {
  post: BlogPost
  featured?: boolean
}

export function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  return (
    <Card
      data-animate="blog-card"
      data-motion="blog-lift"
      className={cn(
        "border-border bg-card py-0 shadow-sm transition-transform duration-200 hover:-translate-y-1",
        featured && "lg:grid lg:grid-cols-[1.08fr_0.92fr]"
      )}
    >
      {post.heroImage ? (
        <Link
          href={blogPostPath(post.slug)}
          className={cn(
            "relative block overflow-hidden border-b border-border bg-muted",
            featured
              ? "aspect-[16/10] lg:aspect-auto lg:border-r lg:border-b-0"
              : "aspect-[16/9]"
          )}
        >
          <Image
            src={post.heroImage}
            alt={post.heroImageAlt ?? ""}
            fill
            sizes={
              featured
                ? "(min-width: 1024px) 620px, 92vw"
                : "(min-width: 1024px) 380px, 92vw"
            }
            className="object-cover object-top transition-transform duration-500 group-hover/card:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent" />
        </Link>
      ) : null}

      <div className="flex flex-col">
        <CardHeader className="gap-4 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="secondary" className="rounded-full">
              {post.tags[0]}
            </Badge>
            <span>{formatBlogDate(post.publishedAt)}</span>
            <span>{post.readingTime}</span>
          </div>
          <div className="flex flex-col gap-3">
            <CardTitle
              className={cn(
                "tracking-[-0.03em]",
                featured ? "text-3xl sm:text-4xl" : "text-xl"
              )}
            >
              <Link
                href={blogPostPath(post.slug)}
                className="transition-colors hover:text-primary"
              >
                {post.title}
              </Link>
            </CardTitle>
            <CardDescription className="text-sm leading-6">
              {post.description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="mt-auto px-5 pb-5 sm:px-6 sm:pb-6">
          <Link
            href={blogPostPath(post.slug)}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground"
          >
            Read article
            <ArrowRight data-icon="inline-end" />
          </Link>
        </CardContent>
        {featured ? (
          <CardFooter className="bg-muted/45 text-xs text-muted-foreground">
            VantumIQP field notes for analytics teams.
          </CardFooter>
        ) : null}
      </div>
    </Card>
  )
}
