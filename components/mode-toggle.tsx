"use client"

import * as React from "react"
import { Contrast } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="size-9 rounded-full text-muted-foreground hover:text-foreground"
    >
      <Contrast className="size-4" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
