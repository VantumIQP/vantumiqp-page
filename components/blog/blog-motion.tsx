"use client"

import { useEffect } from "react"

const reducedMotionQuery = "(prefers-reduced-motion: reduce)"

const introSelectors = [
  "blog-kicker",
  "blog-title",
  "blog-copy",
  "blog-actions",
  "blog-aside",
]

function animateSelector(name: string) {
  return `[data-animate='${name}']`
}

export function BlogMotion() {
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
        "[data-gsap-scope='blog']"
      )

      if (!scope) return

      context = gsap.context(() => {
        const leadShell = scope.querySelector<HTMLElement>(
          `${animateSelector("blog-hero")}, ${animateSelector("blog-post-header")}`
        )
        const postMedia = scope.querySelector<HTMLElement>(
          animateSelector("blog-post-media")
        )
        const introTargets = introSelectors.flatMap((name) =>
          gsap.utils.toArray<HTMLElement>(animateSelector(name), scope)
        )

        const intro = gsap.timeline({
          defaults: { ease: "power3.out" },
          delay: 0.05,
        })

        if (leadShell) {
          intro.from(leadShell, { autoAlpha: 0, y: 10, duration: 0.48 })
        }

        if (postMedia) {
          intro.from(
            postMedia,
            {
              autoAlpha: 0,
              clipPath: "inset(0 0 8% 0)",
              duration: 0.62,
              clearProps: "clipPath,opacity,visibility,transform",
            },
            leadShell ? "-=0.22" : undefined
          )
        }

        if (introTargets.length > 0) {
          intro.from(
            introTargets,
            {
              autoAlpha: 0,
              y: 8,
              duration: 0.48,
              stagger: 0.055,
              clearProps: "transform,opacity,visibility",
            },
            "-=0.16"
          )
        }

        gsap.utils
          .toArray<HTMLElement>(animateSelector("blog-section-heading"), scope)
          .forEach((heading) => {
            gsap.from(heading, {
              autoAlpha: 0,
              y: 12,
              duration: 0.46,
              ease: "power2.out",
              scrollTrigger: {
                trigger: heading,
                start: "top 86%",
                once: true,
              },
            })
          })

        gsap.utils
          .toArray<HTMLElement>(animateSelector("blog-card"), scope)
          .forEach((card, index) => {
            gsap.from(card, {
              autoAlpha: 0,
              y: 14,
              duration: 0.44,
              delay: (index % 3) * 0.045,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                once: true,
              },
            })
          })

        const articleBody = scope.querySelector<HTMLElement>(
          animateSelector("blog-content")
        )

        if (articleBody) {
          gsap.utils
            .toArray<HTMLElement>(":scope > *", articleBody)
            .forEach((block, index) => {
              gsap.from(block, {
                autoAlpha: 0,
                y: 10,
                duration: 0.38,
                delay: Math.min(index, 5) * 0.025,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: block,
                  start: "top 90%",
                  once: true,
                },
              })
            })
        }

        gsap.utils
          .toArray<HTMLElement>("[data-motion='blog-lift']", scope)
          .forEach((element) => {
            const icon = element.querySelector<HTMLElement>(
              "svg[data-icon='inline-end']"
            )

            const onEnter = () => {
              gsap.to(element, {
                y: -2,
                duration: 0.22,
                ease: "power2.out",
              })

              if (icon) {
                gsap.to(icon, {
                  x: 2,
                  duration: 0.22,
                  ease: "power2.out",
                })
              }
            }

            const onLeave = () => {
              gsap.to(element, {
                y: 0,
                duration: 0.28,
                ease: "power2.out",
              })

              if (icon) {
                gsap.to(icon, {
                  x: 0,
                  duration: 0.22,
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
