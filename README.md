# Next.js template

This is a Next.js template with shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button"
```

## Demo form submissions

The CTA form submits to Formspree. Set the public form ID before running or
deploying the site:

```bash
NEXT_PUBLIC_FORMSPREE_FORM_ID=your-form-id
```

You can also set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` to the full
`https://formspree.io/f/your-form-id` endpoint.

## SEO configuration

Set the public production URL so canonical metadata, robots, sitemap, and JSON-LD
use the deployed domain:

```bash
NEXT_PUBLIC_SITE_URL=https://vantumiqp.com
```
