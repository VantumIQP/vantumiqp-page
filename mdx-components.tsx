/* eslint-disable @next/next/no-img-element */
import type { MDXComponents } from "mdx/types"

import { cn } from "@/lib/utils"

const components: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        "font-heading text-4xl leading-none tracking-[-0.03em] text-foreground sm:text-5xl",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "mt-12 font-heading text-3xl leading-tight tracking-[-0.02em] text-foreground",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "mt-8 text-xl font-medium tracking-[-0.02em] text-foreground",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn("mt-5 leading-8 text-muted-foreground", className)}
      {...props}
    />
  ),
  a: ({ className, ...props }) => (
    <a
      className={cn(
        "font-medium text-primary underline underline-offset-4 transition-colors hover:text-foreground",
        className
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        "mt-5 flex list-disc flex-col gap-2 pl-6 text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        "mt-5 flex list-decimal flex-col gap-2 pl-6 text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("leading-7 marker:text-primary", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "mt-8 border-l-2 border-primary bg-muted/60 px-5 py-4 text-base leading-7 text-foreground",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "mt-6 overflow-x-auto rounded-xl border border-border bg-card p-4 text-sm text-foreground",
        className
      )}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }) => (
    <img
      alt={alt ?? ""}
      className={cn(
        "mt-8 w-full rounded-xl border border-border bg-muted object-cover",
        className
      )}
      {...props}
    />
  ),
}

export function useMDXComponents(): MDXComponents {
  return components
}
