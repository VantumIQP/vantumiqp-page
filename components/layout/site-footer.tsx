import Image from "next/image"
import Link from "next/link"

import { CookiePreferencesLink } from "@/components/cookie-consent/cookie-preferences-link"
import { BRAND_LOGO_SRC } from "@/lib/brand-assets"

const footerLinks = [
  { href: "/#product", label: "Product" },
  { href: "/#workflow", label: "Workflow" },
  { href: "/blog", label: "Blog" },
  { href: "/#answers", label: "Answers" },
  { href: "/#demo", label: "Demo" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
]

export function SiteFooter() {
  return (
    <footer className="px-4 pt-10 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="flex w-fit items-center gap-3 transition-colors hover:text-foreground"
        >
          <div className="relative h-6 w-8 shrink-0">
            <Image
              src={BRAND_LOGO_SRC}
              alt="VantumIQP logo"
              fill
              sizes="32px"
              className="object-contain"
            />
          </div>
          <span>VantumIQP</span>
        </Link>
        <div className="flex flex-wrap items-center gap-5">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <CookiePreferencesLink />
        </div>
      </div>
    </footer>
  )
}
