# vantumiqp Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, Bluefish-inspired vantumiqp landing page centered on demo access.

**Architecture:** Keep the route server-rendered in `app/page.tsx`, use focused landing-page helpers in `components/landing`, and rely on shadcn primitives for interaction surfaces and the form. Serve the user-provided artwork from `public/images/vantumiqp` and keep copy/data local to the page so the initial version stays simple.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, shadcn/ui base components, Bun test runner.

---

### Task 1: Add a failing landing-page test

**Files:**
- Create: `app/page.test.tsx`
- Modify: `package.json`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, expect, test } from "bun:test"
import { renderToStaticMarkup } from "react-dom/server"

import Page from "./page"

describe("vantumiqp landing page", () => {
  test("prioritizes demo access over pricing", () => {
    const html = renderToStaticMarkup(<Page />)

    expect(html).toContain("Request demo access")
    expect(html).toContain("Powered by Apache Superset")
    expect(html).not.toContain("Pricing")
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test app/page.test.tsx`

Expected: FAIL because the starter page does not yet contain the landing-page copy.

- [ ] **Step 3: Add a test script**

```json
"test": "bun test"
```

- [ ] **Step 4: Re-run the test**

Run: `bun test app/page.test.tsx`

Expected: FAIL for the same missing-copy reason.

### Task 2: Prepare assets and layout foundations

**Files:**
- Create: `public/images/vantumiqp/*`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Move the supplied image assets into `public/images/vantumiqp`**

- [ ] **Step 2: Add a display font variable in `app/layout.tsx`**

- [ ] **Step 3: Extend global tokens and base styles in `app/globals.css` for the page background, smooth scrolling, and heading font usage**

### Task 3: Build reusable landing-page pieces

**Files:**
- Create: `components/landing/section-heading.tsx`
- Create: `components/landing/demo-access-form.tsx`
- Create: `components/landing/dashboard-preview.tsx`

- [ ] **Step 1: Create a compact section-heading helper**

- [ ] **Step 2: Build the demo form with shadcn `Card`, `FieldGroup`, `Input`, `Textarea`, and `Button`**

- [ ] **Step 3: Build a stylized dashboard preview using semantic HTML and Tailwind utilities**

### Task 4: Implement the landing page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace the starter content with the nav, hero, capabilities, workflow, showcase, CTA, and footer sections**

- [ ] **Step 2: Use shadcn cards, badges, buttons, separators, and the reusable form/dashboard components**

- [ ] **Step 3: Ensure the page has no pricing section and a single strong demo-conversion path**

### Task 5: Verify and refine

**Files:**
- Modify if needed: `app/page.tsx`
- Modify if needed: `app/globals.css`
- Modify if needed: `components/landing/*`

- [ ] **Step 1: Run tests**

Run: `bun test app/page.test.tsx`

Expected: PASS.

- [ ] **Step 2: Run static verification**

Run:

```bash
bun run typecheck
bun run lint
bun run build
```

Expected: all commands exit successfully.

- [ ] **Step 3: Run the app locally and refine responsive layout, spacing, and visual polish**
