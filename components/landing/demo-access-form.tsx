import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function DemoAccessForm() {
  return (
    <Card className="border-border bg-card/95 py-0 text-card-foreground shadow-sm backdrop-blur">
      <CardHeader className="gap-3 border-b border-border px-5 py-5 sm:px-6">
        <CardTitle className="font-heading text-3xl leading-none text-card-foreground">
          Request demo access
        </CardTitle>
        <CardDescription className="max-w-lg text-sm leading-6 text-muted-foreground">
          Tell us where your reporting gets stuck. We&apos;ll send guided access
          and a walkthrough tailored to the dashboards you want to build.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 sm:p-6">
        <form className="space-y-5" action="#" method="post">
          <FieldGroup>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  placeholder="Ada Lovelace"
                  className="border-input bg-background text-foreground placeholder:text-muted-foreground"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Work email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ada@company.com"
                  className="border-input bg-background text-foreground placeholder:text-muted-foreground"
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="company">Company</FieldLabel>
              <Input
                id="company"
                name="company"
                placeholder="Analytical Engines Ltd."
                className="border-input bg-background text-foreground placeholder:text-muted-foreground"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="use-case">
                What do you want to explore?
              </FieldLabel>
              <Textarea
                id="use-case"
                name="use-case"
                placeholder="Sales performance, product usage, executive reporting..."
                className="min-h-28 border-input bg-background text-foreground placeholder:text-muted-foreground"
              />
              <FieldDescription className="text-muted-foreground">
                A sentence or two is enough.
              </FieldDescription>
            </Field>
          </FieldGroup>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-muted-foreground">
              Demo access only for now. No checkout detour.
            </p>
            <Button
              type="submit"
              size="lg"
              className="h-11 rounded-full bg-primary px-5 text-primary-foreground hover:bg-primary/90"
            >
              Request demo access
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
