import type { MetadataRoute } from "next"

import { blogPostPath, getAllBlogPosts } from "@/lib/blog"
import { absoluteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllBlogPosts()

  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: posts[0]?.publishedAt ?? new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: absoluteUrl(blogPostPath(post.slug)),
      lastModified: post.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: post.heroImage ? [absoluteUrl(post.heroImage)] : undefined,
    })),
  ]
}
