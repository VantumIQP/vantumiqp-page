# VantumIQP Tokenized Hero + Navbar Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the VantumIQP landing page with the semantic shadcn theme tokens and redesign the navbar/hero into a cleaner Bluefish × Railway blend.

**Architecture:** Keep the current page structure and existing assets, but update the landing page shell to use semantic Tailwind classes generated from `app/globals.css`. Redesign only the navbar and hero composition while normalizing color usage in the page sections and demo form so the theme remains consistent if token values change later.

**Tech Stack:** Next.js App Router, React, Tailwind CSS v4, shadcn/ui, Bun test runner.

---

### Task 1: Lock in the new navbar and token expectations

**Files:**
- Modify: `app/page.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
test("uses semantic shell colors and the revised navbar actions", () => {
  const html = renderToStaticMarkup(<Page />)

  expect(html).toContain("Sign in")
  expect(html).toContain("bg-background")
  expect(html).not.toContain("bg-[#f6f7f3]")
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test app/page.test.tsx`

Expected: FAIL because the current page still uses the custom background class and has no `Sign in` action.

- [ ] **Step 3: Implement the revised navbar and shell classes**

Update `app/page.tsx` so the outer page and navbar use semantic shadcn classes and include a `Sign in` link plus the existing `Request demo` action.

- [ ] **Step 4: Run the test to verify it passes**

Run: `bun test app/page.test.tsx`

Expected: PASS.

### Task 2: Rework the hero into a product-forward composition

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Refine the hero layout**

Move the hero toward a cleaner centered composition with:

- eyebrow badge
- headline
- supporting copy
- CTA pair
- real product screenshot positioned at the lower edge of the hero

- [ ] **Step 2: Preserve readability over imagery**

Keep photo-specific overlays where needed, but use semantic theme classes for the structural hero surfaces and supporting UI.

- [ ] **Step 3: Verify the page still renders product proof**

Run: `bun test app/page.test.tsx`

Expected: PASS, including the existing dashboard screenshot test.

### Task 3: Normalize colors across used landing components

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/landing/demo-access-form.tsx`

- [ ] **Step 1: Replace raw shell colors with semantic tokens**

Use semantic utilities such as:

- `bg-background`
- `bg-card`
- `bg-muted`
- `text-foreground`
- `text-muted-foreground`
- `border-border`
- `bg-primary`
- `text-primary-foreground`
- `bg-secondary`
- `text-secondary-foreground`

- [ ] **Step 2: Keep image-overlay translucency only where it supports legibility**

Retain translucent whites or dark overlays only on top of artwork, not as the main shell palette.

- [ ] **Step 3: Verify color cleanup**

Run:

```powershell
Get-ChildItem app,components -Recurse -File |
  Select-String -Pattern 'bg-\\[#|text-slate|bg-slate|border-black|text-white/|bg-white/80|ring-black' 
```

Expected: no remaining matches in the actively rendered landing page files except justified image-overlay cases.

### Task 4: Final verification

**Files:**
- Verify: `app/page.tsx`
- Verify: `components/landing/demo-access-form.tsx`

- [ ] **Step 1: Run automated checks**

```bash
bun test
bun run typecheck
bun run lint
```

Expected: all pass.

- [ ] **Step 2: Capture a desktop screenshot**

```bash
npx playwright screenshot --device="Desktop Chrome" --wait-for-timeout=1500 --full-page http://localhost:3000 redesign-check.png
```

Expected: screenshot shows the revised navbar, centered hero, and product-forward composition.
