import Image from "next/image"
import {
  ArrowRight,
  BarChart3,
  DatabaseZap,
  Gauge,
  Layers3,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import { DemoAccessForm } from "@/components/landing/demo-access-form"
import { SectionHeading } from "@/components/landing/section-heading"
import { WorkflowSection } from "@/components/landing/workflow-section"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const proofPoints = [
  "40+ chart types",
  "SQL exploration",
  "Role-aware dashboards",
]

const capabilities = [
  {
    icon: BarChart3,
    title: "Shape dashboards quickly",
    description:
      "Turn saved datasets into polished dashboards with flexible charts, filters, and drilldowns.",
  },
  {
    icon: DatabaseZap,
    title: "Query without friction",
    description:
      "Move from SQL exploration to reusable visuals without hopping between disconnected tools.",
  },
  {
    icon: ShieldCheck,
    title: "Keep sharing governed",
    description:
      "Use permissions, curated datasets, and row-level access to keep reporting trustworthy.",
  },
  {
    icon: Gauge,
    title: "See the signal faster",
    description:
      "Bring leaders to the same source of truth with clear summaries and decision-ready views.",
  },
]

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        "relative shrink-0",
        compact ? "h-6 w-8" : "h-7 w-10"
      )}
    >
      <Image
        src="/images/vantumiqp/vantumiqp_logo.png"
        alt="VantumIQP logo"
        fill
        priority={!compact}
        className="object-contain"
      />
    </div>
  )
}

export default function Page() {
  return (
    <main className="min-h-svh overflow-hidden bg-background text-foreground">
      <header className="relative z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <a href="#" className="flex items-center gap-3">
            <BrandMark />
            <span className="text-base font-medium tracking-[-0.03em]">
              VantumIQP
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a
              href="#product"
              className="transition-colors hover:text-foreground"
            >
              Product
            </a>
            <a
              href="#workflow"
              className="transition-colors hover:text-foreground"
            >
              Workflow
            </a>
            <a href="#demo" className="transition-colors hover:text-foreground">
              Demo
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#demo"
              className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              Sign in
            </a>
            <a
              href="#demo"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-10 rounded-full bg-primary px-4 text-primary-foreground hover:bg-primary/90"
              )}
            >
              Request demo
            </a>
          </div>
        </div>
      </header>

      <section className="px-4 pt-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto min-h-[720px] max-w-7xl overflow-hidden rounded-xl border border-border bg-card text-primary-foreground shadow-[0_30px_90px_rgba(15,23,42,0.18)]">
          <Image
            src="/images/vantumiqp/night-sea.avif"
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,255,255,0.16),transparent_26%),linear-gradient(180deg,rgba(7,17,22,0.22),rgba(7,17,22,0.82)_68%,rgba(7,17,22,0.96))]" />

          <div className="relative flex min-h-[720px] flex-col items-center px-5 pt-8 pb-7 text-center sm:px-8 lg:px-10">
            <div className="flex items-center gap-3">
              <Badge className="rounded-full border border-primary-foreground/15 bg-primary-foreground/10 px-3 py-1 text-[0.68rem] tracking-[0.28em] text-primary-foreground uppercase hover:bg-primary-foreground/10">
                Powered by Apache Superset
              </Badge>
              <div className="hidden items-center gap-2 text-xs text-primary-foreground/70 sm:flex">
                <Sparkles className="size-3.5" />
                Demo access available now
              </div>
            </div>

            <div className="mt-16 max-w-4xl space-y-6">
              <h1 className="font-heading text-5xl leading-[0.94] tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl">
                Open your data. See the story. Share the answer.
              </h1>
              <p className="mx-auto max-w-2xl text-sm leading-7 text-primary-foreground/75 sm:text-base">
                VantumIQP is a calm BI workspace for dashboards, SQL
                exploration, and decision-ready reporting—built on Apache
                Superset and tuned for teams that want clarity before
                complexity.
              </p>

              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="#demo"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-11 rounded-full bg-primary px-5 text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  Request demo access
                  <ArrowRight data-icon="inline-end" />
                </a>
                <a
                  href="#product"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-11 rounded-full border-primary-foreground/20 bg-primary-foreground/10 px-5 text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
                  )}
                >
                  Explore capabilities
                </a>
              </div>
            </div>

            <div className="mt-10 grid w-full max-w-4xl gap-3 sm:grid-cols-3">
              {proofPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground/80 backdrop-blur"
                >
                  {point}
                </div>
              ))}
            </div>

            <figure className="mt-auto w-full max-w-5xl overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
              <div className="flex items-center justify-between border-b border-border bg-muted/70 px-4 py-3 text-xs text-muted-foreground">
                <span>Live product view</span>
                <span>SaaS dashboard example</span>
              </div>
              <div className="relative aspect-[16/7] bg-card">
                <Image
                  src="/images/vantumiqp/dashboard-screenshot.png"
                  alt="VantumIQP dashboard screenshot"
                  fill
                  className="object-contain"
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      <section id="product" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <SectionHeading
              eyebrow="Product"
              title="Everything between the query and the decision."
              description="VantumIQP keeps the core Superset strengths intact, but presents them with a calmer path from raw tables to stakeholder-ready dashboards."
            />

            <div className="relative min-h-[270px] overflow-hidden rounded-xl border border-border">
              <Image
                src="/images/vantumiqp/gold-horizon.avif"
                alt=""
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/45 via-transparent to-primary/20" />
              <div className="absolute bottom-5 left-5 max-w-xs rounded-xl border border-primary-foreground/15 bg-primary-foreground/10 p-4 text-primary-foreground backdrop-blur">
                <p className="text-sm font-medium">From query to boardroom</p>
                <p className="mt-2 text-sm leading-6 text-primary-foreground/75">
                  One place to inspect data, build the visual, and ship the
                  answer.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {capabilities.map(({ icon: Icon, title, description }) => (
              <Card
                key={title}
                className="border-border bg-card py-0 shadow-sm"
              >
                <CardHeader className="gap-4 p-5">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="size-4" />
                  </div>
                  <CardTitle className="font-sans text-base tracking-[-0.02em]">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5 text-sm leading-6 text-muted-foreground">
                  {description}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <WorkflowSection />

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[360px] overflow-hidden rounded-xl border border-border">
            <Image
              src="/images/vantumiqp/sunset-sea.avif"
              alt=""
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-foreground/78 via-foreground/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground sm:p-8">
              <Badge className="mb-4 rounded-full border border-primary-foreground/15 bg-primary-foreground/10 px-3 py-1 text-[0.68rem] tracking-[0.28em] text-primary-foreground uppercase hover:bg-primary-foreground/10">
                Demo-first
              </Badge>
              <h2 className="max-w-lg font-heading text-4xl leading-none tracking-[-0.03em]">
                Start with the workflow. Decide on the rollout later.
              </h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[
              {
                icon: Layers3,
                title: "No maze of plans",
                description:
                  "The first conversation is about fit, datasets, and the dashboards worth proving.",
              },
              {
                icon: Sparkles,
                title: "Guided by the actual use case",
                description:
                  "The demo is shaped around the questions your team already asks every week.",
              },
            ].map(({ icon: Icon, title, description }) => (
              <Card
                key={title}
                className="border-border bg-card py-0"
              >
                <CardContent className="space-y-5 p-5 sm:p-6">
                  <div className="flex size-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    <Icon className="size-4" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-medium tracking-[-0.02em]">
                      {title}
                    </h3>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="px-4 pb-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto overflow-hidden rounded-xl bg-primary px-5 py-6 text-primary-foreground shadow-[0_28px_90px_rgba(15,23,42,0.18)] sm:px-8 sm:py-8 lg:max-w-7xl lg:px-10 lg:py-10">
          <Image
            src="/images/vantumiqp/hero-aurora.avif"
            alt=""
            fill
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_28%),linear-gradient(90deg,rgba(0,0,0,0.32),rgba(0,0,0,0.2))]" />

          <div className="relative grid gap-8 lg:grid-cols-[0.72fr_1.08fr] lg:items-center">
            <div className="space-y-5">
              <Badge className="rounded-full border border-primary-foreground/15 bg-primary-foreground/10 px-3 py-1 text-[0.68rem] tracking-[0.28em] text-primary-foreground uppercase hover:bg-primary-foreground/10">
                Demo access
              </Badge>
              <div className="space-y-4">
                <h2 className="font-heading text-4xl leading-none tracking-[-0.03em] sm:text-5xl">
                  See VantumIQP on your own reporting questions.
                </h2>
                <p className="max-w-lg text-sm leading-7 text-primary-foreground/75 sm:text-base">
                  Bring the metrics that matter. We&apos;ll show you how they
                  can move from SQL to dashboard to shared answer inside one
                  clean BI workspace.
                </p>
              </div>
            </div>

            <DemoAccessForm />
          </div>
        </div>
      </section>

      <footer className="px-4 pt-10 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <BrandMark compact />
            <span>VantumIQP</span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="#product"
              className="transition-colors hover:text-foreground"
            >
              Product
            </a>
            <a
              href="#workflow"
              className="transition-colors hover:text-foreground"
            >
              Workflow
            </a>
            <a href="#demo" className="transition-colors hover:text-foreground">
              Demo
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
