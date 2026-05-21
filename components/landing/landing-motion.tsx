"use client"

import { useEffect } from "react"

const reducedMotionQuery = "(prefers-reduced-motion: reduce)"

const heroSelectors = [
  "hero-kicker",
  "hero-title",
  "hero-copy",
  "hero-actions",
  "hero-chip",
  "hero-dashboard",
]

const sectionSelectors = "[data-animate='section-heading']"
const cardSelectors = "[data-animate='capability-card'], [data-animate='cta-card']"
const featureSelectors =
  "[data-animate='product-preview'], [data-animate='workflow-shell'], [data-animate='demo-panel'], [data-animate='demo-form']"

const hoverSelectors = [
  "[data-animate='interactive-button']",
  "[data-animate='nav-link']",
  "[data-motion='lift']",
]

function animateSelector(name: string) {
  return `[data-animate='${name}']`
}

export function LandingMotion() {
  useEffect(() => {
    let active = true
    let context: { revert: () => void } | undefined
    const cleanups: Array<() => void> = []

    async function runMotion() {
      if (window.matchMedia(reducedMotionQuery).matches) return

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ])

      if (!active) return

      gsap.registerPlugin(ScrollTrigger)

      const scope = document.querySelector<HTMLElement>(
        "[data-gsap-scope='landing']"
      )

      if (!scope) return

      context = gsap.context(() => {
        const heroShell = scope.querySelector<HTMLElement>(
          animateSelector("hero-shell")
        )

        const hero = Object.fromEntries(
          heroSelectors.map((name) => [
            name,
            gsap.utils.toArray<HTMLElement>(animateSelector(name), scope),
          ])
        ) as Record<string, HTMLElement[]>

        const heroTimeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          delay: 0.06,
        })

        if (heroShell) {
          heroTimeline.from(heroShell, {
            autoAlpha: 0,
            duration: 0.45,
          })
        }

        heroTimeline
          .from(hero["hero-kicker"], { autoAlpha: 0, y: 6, duration: 0.36 })
          .from(
            hero["hero-title"],
            {
              autoAlpha: 0,
              y: 8,
              clipPath: "inset(0 0 18% 0)",
              duration: 0.7,
              clearProps: "clipPath,transform,opacity,visibility",
            },
            "-=0.12"
          )
          .from(
            hero["hero-copy"],
            { autoAlpha: 0, y: 8, duration: 0.42 },
            "-=0.35"
          )
          .from(
            hero["hero-actions"],
            { autoAlpha: 0, y: 5, duration: 0.34 },
            "-=0.24"
          )
          .from(
            hero["hero-chip"],
            { autoAlpha: 0, y: 4, duration: 0.28, stagger: 0.04 },
            "-=0.1"
          )
          .from(
            hero["hero-dashboard"],
            { autoAlpha: 0, y: 10, duration: 0.52 },
            "-=0.16"
          )

        gsap.utils
          .toArray<HTMLElement>(sectionSelectors, scope)
          .forEach((section) => {
            gsap.from(section, {
              autoAlpha: 0,
              y: 12,
              duration: 0.46,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 86%",
                once: true,
              },
            })
          })

        gsap.utils
          .toArray<HTMLElement>(featureSelectors, scope)
          .forEach((feature) => {
            gsap.from(feature, {
              autoAlpha: 0,
              clipPath: "inset(0 0 7% 0)",
              duration: 0.62,
              ease: "power2.out",
              clearProps: "clipPath,opacity,visibility",
              scrollTrigger: {
                trigger: feature,
                start: "top 82%",
                once: true,
              },
            })
          })

        gsap.utils
          .toArray<HTMLElement>(cardSelectors, scope)
          .forEach((card, index) => {
            gsap.from(card, {
              autoAlpha: 0,
              y: 10,
              duration: 0.42,
              delay: (index % 4) * 0.035,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                once: true,
              },
            })
          })

        gsap.utils
          .toArray<HTMLElement>(hoverSelectors.join(", "), document)
          .forEach((element) => {
            const icon = element.querySelector<HTMLElement>(
              "[data-animate='hover-icon'], svg[data-icon='inline-end']"
            )

            const onEnter = () => {
              gsap.to(element, {
                y: -2,
                duration: 0.24,
                ease: "power2.out",
              })

              if (icon) {
                gsap.to(icon, {
                  x: 2,
                  duration: 0.25,
                  ease: "power2.out",
                })
              }
            }

            const onLeave = () => {
              gsap.to(element, {
                y: 0,
                duration: 0.3,
                ease: "power2.out",
              })

              if (icon) {
                gsap.to(icon, {
                  x: 0,
                  duration: 0.24,
                  ease: "power2.out",
                })
              }
            }

            element.addEventListener("pointerenter", onEnter)
            element.addEventListener("pointerleave", onLeave)
            element.addEventListener("focus", onEnter)
            element.addEventListener("blur", onLeave)

            cleanups.push(() => {
              element.removeEventListener("pointerenter", onEnter)
              element.removeEventListener("pointerleave", onLeave)
              element.removeEventListener("focus", onEnter)
              element.removeEventListener("blur", onLeave)
            })
          })
      }, scope)
    }

    void runMotion()

    return () => {
      active = false
      cleanups.forEach((cleanup) => cleanup())
      context?.revert()
    }
  }, [])

  return null
}
