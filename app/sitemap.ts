import type { MetadataRoute } from "next"

import { siteConfig } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date("2026-05-21"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ]
}
