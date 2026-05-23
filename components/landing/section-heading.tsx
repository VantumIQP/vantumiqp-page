import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      data-animate="section-heading"
      className={cn(
        "max-w-2xl space-y-4",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Badge
        variant="secondary"
        className="rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[0.68rem] font-medium tracking-[0.28em] text-muted-foreground uppercase shadow-sm backdrop-blur"
      >
        {eyebrow}
      </Badge>
      <div className="space-y-4">
        <h2 className="font-heading text-4xl leading-none tracking-[-0.03em] text-balance text-foreground sm:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  )
}
