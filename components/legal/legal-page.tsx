import Link from "next/link"
import Image from "next/image"

import { BRAND_LOGO_SRC } from "@/lib/brand-assets"
import { cn } from "@/lib/utils"

type LegalSection = {
  title: string
  body: string[]
}

type LegalPageProps = {
  title: string
  description: string
  updated: string
  sections: LegalSection[]
}

export function LegalPage({
  title,
  description,
  updated,
  sections,
}: LegalPageProps) {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={BRAND_LOGO_SRC}
              alt="VantumIQP logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span className="text-base font-medium tracking-[-0.03em]">
              VantumIQP
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to home
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium tracking-[0.22em] text-muted-foreground uppercase">
            Legal
          </p>
          <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] text-balance sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            {description}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Effective date: {updated}
          </p>
        </div>

        <div className="mt-12 divide-y divide-border border-y border-border">
          {sections.map((section, index) => (
            <section
              key={section.title}
              className={cn(
                "grid gap-4 py-7 md:grid-cols-[0.34fr_0.66fr]",
                index === 0 && "pt-8"
              )}
            >
              <h2 className="text-lg font-medium tracking-[-0.02em]">
                {section.title}
              </h2>
              <div className="space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </main>
  )
}
