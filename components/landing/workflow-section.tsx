"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, RefreshCw, Plus, Code2, Users } from "lucide-react"

import { SectionHeading } from "@/components/landing/section-heading"
import { cn } from "@/lib/utils"

const STEP_DURATION = 4500

// ── Preview Components ─────────────────────────────────────────────────────

function ConnectPreview() {
  const sources = [
    { name: "PostgreSQL", status: "connected" },
    { name: "BigQuery",   status: "connected" },
    { name: "MySQL",      status: "syncing"   },
    { name: "Snowflake",  status: "idle"      },
  ]
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between pb-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Data Sources
        </span>
        <span className="text-[11px] font-medium text-primary">4 connections</span>
      </div>
      {sources.map((s, i) => (
        <div
          key={s.name}
          className="animate-in fade-in slide-in-from-left-4 flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2.5"
          style={{ animationDuration: "350ms", animationDelay: `${i * 70}ms`, animationFillMode: "both" }}
        >
          <div className="flex items-center gap-2.5">
            <span
              className={cn(
                "size-2 rounded-full",
                s.status === "connected" && "bg-emerald-500",
                s.status === "syncing"   && "animate-pulse bg-amber-500",
                s.status === "idle"      && "bg-border"
              )}
            />
            <span className="text-sm font-medium">{s.name}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {s.status === "connected" && <CheckCircle2 className="size-3.5 text-emerald-500" />}
            {s.status === "syncing"   && <RefreshCw    className="size-3.5 animate-spin text-amber-500" />}
            {s.status === "idle"      && <Plus         className="size-3.5" />}
            <span className="capitalize">{s.status}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function ExplorePreview() {
  const [showResults, setShowResults] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShowResults(true), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-border bg-muted/50 p-3.5 font-mono text-[12px] leading-5">
        <div className="mb-3 flex items-center gap-2 border-b border-border pb-2.5">
          <Code2 className="size-3.5 text-primary" />
          <span className="text-muted-foreground">query.sql</span>
          <span className="ml-auto rounded-sm bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
            Run ▶
          </span>
        </div>
        <div className="space-y-0.5">
          <div>
            <span className="text-sky-500">SELECT</span>{" "}
            <span>category,</span>
          </div>
          <div className="pl-3">
            <span className="text-sky-500">SUM</span>
            <span>(revenue)</span>{" "}
            <span className="text-sky-500">AS</span>{" "}
            <span className="text-amber-500">total_rev</span>
          </div>
          <div>
            <span className="text-sky-500">FROM</span>{" "}
            <span className="text-emerald-500">sales_data</span>
          </div>
          <div>
            <span className="text-sky-500">GROUP BY</span>{" "}
            <span>category</span>
          </div>
        </div>
      </div>

      {showResults ? (
        <div
          className="animate-in fade-in slide-in-from-bottom-2 overflow-hidden rounded-lg border border-border"
          style={{ animationDuration: "400ms" }}
        >
          <div className="grid grid-cols-2 bg-muted px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <span>category</span>
            <span className="text-right">total_rev</span>
          </div>
          {[
            { cat: "SaaS",       val: "248,100" },
            { cat: "Enterprise", val: "189,420" },
            { cat: "SMB",        val: "97,680"  },
          ].map((row) => (
            <div
              key={row.cat}
              className="grid grid-cols-2 border-t border-border px-3 py-2 text-xs"
            >
              <span className="font-medium">{row.cat}</span>
              <span className="text-right font-mono text-emerald-600 dark:text-emerald-400">
                {row.val}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-24 animate-pulse rounded-lg bg-muted/60" />
      )}
    </div>
  )
}

function VisualizePreview() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const bars = [
    { label: "Q4 '24", pct: 87, val: "244k" },
    { label: "Q3 '24", pct: 72, val: "202k" },
    { label: "Q2 '24", pct: 68, val: "191k" },
    { label: "Q1 '24", pct: 54, val: "152k" },
  ]

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Revenue by Quarter
        </span>
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          ↑ 18.4%
        </span>
      </div>

      <div className="space-y-2">
        {bars.map((bar, i) => (
          <div key={bar.label} className="flex items-center gap-3">
            <span className="w-11 shrink-0 text-right text-xs text-muted-foreground">
              {bar.label}
            </span>
            <div className="relative h-5 flex-1 overflow-hidden rounded-md bg-muted">
              <div
                className="absolute inset-y-0 left-0 rounded-md bg-primary"
                style={{
                  width: mounted ? `${bar.pct}%` : "0%",
                  transition: `width 700ms ${i * 110}ms cubic-bezier(0.16,1,0.3,1)`,
                }}
              />
            </div>
            <span className="w-10 shrink-0 text-right text-xs font-mono font-medium tabular-nums">
              {bar.val}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 border-t border-border pt-3">
        {[
          { label: "Total",  value: "$789k" },
          { label: "Avg/Q",  value: "$197k" },
          { label: "Growth", value: "+18%"  },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-sm font-semibold tabular-nums">{s.value}</div>
            <div className="text-[11px] text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SharePreview() {
  const people = [
    { initials: "AC", name: "Alex Chen",   role: "CEO",      access: "Full access",      bg: "bg-blue-500"    },
    { initials: "ML", name: "Morgan Lee",  role: "VP Sales", access: "Sales dashboards", bg: "bg-emerald-500" },
    { initials: "JP", name: "Jordan Park", role: "Analyst",  access: "SQL Explorer",     bg: "bg-amber-500"   },
  ]
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between pb-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Shared with
        </span>
        <span className="flex items-center gap-1 text-[11px] font-medium text-primary">
          <Users className="size-3" />
          3 stakeholders
        </span>
      </div>
      {people.map((p, i) => (
        <div
          key={p.name}
          className="animate-in fade-in slide-in-from-right-4 flex items-center gap-3 rounded-lg border border-border bg-background p-3"
          style={{ animationDuration: "350ms", animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
        >
          <div
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white",
              p.bg
            )}
          >
            {p.initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">{p.name}</div>
            <div className="text-xs text-muted-foreground">{p.role}</div>
          </div>
          <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {p.access}
          </span>
        </div>
      ))}
    </div>
  )
}

// ── Step Config ────────────────────────────────────────────────────────────

const steps = [
  {
    step: "01",
    title: "Connect",
    description: "Bring in the datasets your team already trusts.",
    previewTitle: "Data Sources",
    previewSub: "Active connections",
    Preview: ConnectPreview,
  },
  {
    step: "02",
    title: "Explore",
    description: "Write SQL, slice metrics, and inspect the story behind the numbers.",
    previewTitle: "SQL Explorer",
    previewSub: "Query & inspect",
    Preview: ExplorePreview,
  },
  {
    step: "03",
    title: "Visualize",
    description: "Turn findings into charts, dashboards, and executive-ready summaries.",
    previewTitle: "Dashboard Builder",
    previewSub: "Charts & metrics",
    Preview: VisualizePreview,
  },
  {
    step: "04",
    title: "Share",
    description: "Give every stakeholder a view that matches their role and context.",
    previewTitle: "Access Controls",
    previewSub: "Role-aware sharing",
    Preview: SharePreview,
  },
]

// ── Main Component ─────────────────────────────────────────────────────────

export function WorkflowSection() {
  const [active, setActive]     = useState(0)
  const [paused, setPaused]     = useState(false)
  const [timerKey, setTimerKey] = useState(0)

  // Auto-advance
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setActive((s) => (s + 1) % steps.length)
      setTimerKey((k) => k + 1)
    }, STEP_DURATION)
    return () => clearInterval(id)
  }, [paused, timerKey])

  const goto = (i: number) => {
    setActive(i)
    setTimerKey((k) => k + 1)
  }

  const { Preview, previewTitle, previewSub } = steps[active]

  return (
    <section id="workflow" className="px-4 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-start lg:gap-16">

        {/* ── Left: step list ── */}
        <div className="space-y-10">
          <SectionHeading
            eyebrow="Workflow"
            title="A simpler path from asking to knowing."
            description="The product should feel as legible as the outcome. Each step is there to shorten the distance between a question and a decision."
          />

          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => {
              setTimerKey((k) => k + 1)
              setPaused(false)
            }}
          >
            {/* Vertical connecting line */}
            <div className="absolute bottom-5 left-[17px] top-5 w-px bg-border" />

            <div className="space-y-1">
              {steps.map((item, i) => {
                const isActive = i === active
                const isPast   = i < active

                return (
                  <button
                    key={item.step}
                    onClick={() => goto(i)}
                    className={cn(
                      "group relative grid w-full grid-cols-[auto_1fr] gap-4 rounded-xl px-3 py-4 text-left transition-colors duration-200",
                      isActive ? "bg-muted/70" : "hover:bg-muted/30"
                    )}
                  >
                    {/* Step circle */}
                    <div
                      className={cn(
                        "relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold tracking-wider transition-all duration-300",
                        isActive
                          ? "border-primary bg-primary text-primary-foreground ring-4 ring-primary/15"
                          : isPast
                          ? "border-primary/40 bg-primary/10 text-primary"
                          : "border-border bg-background text-muted-foreground"
                      )}
                    >
                      {item.step}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-1.5 pt-1">
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "text-base font-medium transition-colors duration-200",
                            isActive ? "text-foreground" : "text-muted-foreground"
                          )}
                        >
                          {item.title}
                        </span>

                        {/* Progress bar */}
                        {isActive && (
                          <div className="h-[3px] w-20 overflow-hidden rounded-full bg-border">
                            <div
                              key={`prog-${timerKey}`}
                              className="h-full rounded-full bg-primary"
                              style={{
                                animationName: "workflow-progress",
                                animationDuration: `${STEP_DURATION}ms`,
                                animationTimingFunction: "linear",
                                animationFillMode: "both",
                                animationPlayState: paused ? "paused" : "running",
                              }}
                            />
                          </div>
                        )}
                      </div>

                      <p
                        className={cn(
                          "text-sm leading-6 transition-all duration-300",
                          isActive
                            ? "text-muted-foreground"
                            : "text-muted-foreground/50"
                        )}
                      >
                        {item.description}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Right: animated preview window ── */}
        <div className="lg:sticky lg:top-24">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_8px_40px_rgba(15,23,42,0.08)]">

            {/* Window chrome */}
            <div className="flex items-center gap-3 border-b border-border bg-muted/50 px-5 py-3.5">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-rose-400/80" />
                <span className="size-2.5 rounded-full bg-amber-400/80" />
                <span className="size-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <div className="flex-1 text-center text-xs font-medium text-foreground/70">
                {previewTitle}
              </div>
              <span className="text-xs text-muted-foreground/50">{previewSub}</span>
            </div>

            {/* Preview body — key forces remount + re-animation on step change */}
            <div
              key={active}
              className="animate-in fade-in slide-in-from-bottom-3 min-h-[280px] p-5"
              style={{ animationDuration: "350ms" }}
            >
              <Preview />
            </div>

            {/* Step dot indicators */}
            <div className="flex items-center justify-center gap-2 border-t border-border py-3.5">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goto(i)}
                  aria-label={`Go to step ${i + 1}`}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    i === active
                      ? "h-2 w-6 bg-primary"
                      : "size-2 bg-muted-foreground/25 hover:bg-muted-foreground/45"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
