"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const navLinks = [
  { href: "#product", label: "Product" },
  { href: "#workflow", label: "Workflow" },
  { href: "#demo", label: "Demo" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sectionIds = ["product", "workflow", "demo"]
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: "-20% 0px -60% 0px" }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-[0_1px_16px_rgba(0,0,0,0.07)]"
          : "bg-background border-b border-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3">
          <div className="relative h-7 w-10 shrink-0">
            <Image
              src="/images/vantumiqp/vantumiqp_logo.png"
              alt="VantumIQP logo"
              fill
              priority
              className="object-contain"
            />
          </div>
          <span className="text-base font-medium tracking-[-0.03em]">
            VantumIQP
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm md:flex">
          {navLinks.map(({ href, label }) => {
            const sectionId = href.slice(1)
            const isActive = activeSection === sectionId
            return (
              <a
                key={href}
                href={href}
                className={cn(
                  "relative py-0.5 transition-colors",
                  isActive
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-0.5 h-px rounded-full bg-primary" />
                )}
              </a>
            )
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="#demo"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign in
          </a>
          <a
            href="#demo"
            className={cn(
              buttonVariants({ size: "sm" }),
              "h-9 rounded-full bg-primary px-4 text-primary-foreground hover:bg-primary/90"
            )}
          >
            Request demo
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <a
            href="#demo"
            className={cn(
              buttonVariants({ size: "sm" }),
              "h-9 rounded-full bg-primary px-4 text-primary-foreground hover:bg-primary/90"
            )}
          >
            Request demo
          </a>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300 md:hidden",
          menuOpen ? "max-h-64" : "max-h-0"
        )}
      >
        <nav className="flex flex-col border-t border-border px-4 py-2 sm:px-6">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-border/50 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground last:border-0"
            >
              {label}
            </a>
          ))}
          <a
            href="#demo"
            onClick={() => setMenuOpen(false)}
            className="py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign in
          </a>
        </nav>
      </div>
    </header>
  )
}
