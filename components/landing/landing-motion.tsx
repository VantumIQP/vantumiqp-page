"use client"

import { useEffect } from "react"

const reducedMotionQuery = "(prefers-reduced-motion: reduce)"

const heroSelectors = [
  "[data-animate='hero-kicker']",
  "[data-animate='hero-title']",
  "[data-animate='hero-copy']",
  "[data-animate='hero-actions']",
  "[data-animate='hero-chip']",
  "[data-animate='hero-dashboard']",
]

const revealSelectors = [
  "[data-animate='section-heading']",
  "[data-animate='product-preview']",
  "[data-animate='capability-card']",
  "[data-animate='workflow-shell']",
  "[data-animate='demo-panel']",
  "[data-animate='demo-form']",
  "[data-animate='cta-card']",
]

const hoverSelectors = [
  "[data-animate='interactive-card']",
  "[data-animate='interactive-button']",
  "[data-animate='nav-link']",
  "[data-motion='lift']",
]

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
        const heroItems = gsap.utils.toArray<HTMLElement>(
          heroSelectors.join(", "),
          scope
        )

        if (heroItems.length > 0) {
          gsap.from(heroItems, {
            autoAlpha: 0,
            y: 18,
            duration: 0.75,
            ease: "power3.out",
            stagger: 0.075,
            delay: 0.08,
          })
        }

        const heroShell = scope.querySelector<HTMLElement>(
          "[data-animate='hero-shell']"
        )

        if (heroShell) {
          gsap.from(heroShell, {
            autoAlpha: 0,
            scale: 0.985,
            duration: 0.9,
            ease: "power3.out",
          })
        }

        const navShell = document.querySelector<HTMLElement>(
          "[data-animate='nav-shell']"
        )

        if (navShell) {
          gsap.from(navShell, {
            autoAlpha: 0,
            y: -10,
            duration: 0.55,
            ease: "power3.out",
          })
        }

        ScrollTrigger.batch(revealSelectors.join(", "), {
          start: "top 82%",
          once: true,
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { autoAlpha: 0, y: 26, filter: "blur(6px)" },
              {
                autoAlpha: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.72,
                ease: "power3.out",
                stagger: 0.08,
                clearProps: "opacity,visibility,transform,filter",
              }
            )
          },
        })

        gsap.utils
          .toArray<HTMLElement>(
            "[data-animate='image-parallax'], [data-parallax='image']",
            scope
          )
          .forEach((image) => {
            gsap.fromTo(
              image,
              { yPercent: -2, scale: 1.03 },
              {
                yPercent: 3,
                ease: "none",
                scrollTrigger: {
                  trigger: image.parentElement ?? image,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.7,
                },
              }
            )
          })

        gsap.utils
          .toArray<HTMLElement>(hoverSelectors.join(", "), document)
          .forEach((element) => {
            const image = element.querySelector<HTMLElement>(
              "[data-animate='card-image']"
            )
            const icon = element.querySelector<HTMLElement>(
              "[data-animate='hover-icon'], svg[data-icon='inline-end']"
            )

            const onEnter = () => {
              gsap.to(element, {
                y: -4,
                scale: 1.006,
                duration: 0.28,
                ease: "power2.out",
              })

              if (image) {
                gsap.to(image, {
                  scale: 1.035,
                  duration: 0.45,
                  ease: "power2.out",
                })
              }

              if (icon) {
                gsap.to(icon, {
                  x: 3,
                  duration: 0.25,
                  ease: "power2.out",
                })
              }
            }

            const onLeave = () => {
              gsap.to(element, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
              })

              if (image) {
                gsap.to(image, {
                  scale: 1,
                  duration: 0.4,
                  ease: "power2.out",
                })
              }

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
