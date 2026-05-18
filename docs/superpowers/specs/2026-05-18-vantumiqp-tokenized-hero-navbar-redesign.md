# VantumIQP Tokenized Hero + Navbar Redesign

## Goal

Refine the VantumIQP landing page so that:

1. The page uses the semantic color system already defined in `app/globals.css`.
2. The navbar feels more deliberate and SaaS-like.
3. The hero preserves the current painterly visual identity while becoming clearer, stronger, and more product-forward.

## Approved Direction

Use a **blended** direction:

- Borrow Bluefish's open, image-led atmosphere.
- Borrow Railway's sharper product framing and stronger navigation structure.
- Keep the page light overall rather than converting the whole experience into a dark shell.

## Visual System

### Color Rules

Replace one-off visual colors in the landing page with semantic shadcn tokens wherever the UI is not literally part of an image overlay.

Use:

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

Keep translucent white overlays only when they are applied **on top of photography/artwork** and are required for readability. The structural page shell itself should not rely on raw slate/black/white utility colors.

### Radius Rules

Preserve the tokenized shadcn radius work already completed:

- major page surfaces should use `rounded-xl`
- interactive pills such as badges and buttons may remain `rounded-full`

## Navbar Design

### Structure

Navbar should become a stronger application-style header:

- brand cluster left
- primary navigation centered/right of brand
- actions on the far right

### Content

- Brand: VantumIQP logo + wordmark
- Navigation: Product, Workflow, Demo
- Actions: Sign in, Request demo

### Styling

- use semantic shell colors: `bg-background`, `border-border`, `text-foreground`, `text-muted-foreground`
- increase horizontal polish through better spacing and calmer proportions
- keep the request-demo action visually primary via semantic button styling
- keep the navbar clean, not oversized

## Hero Design

### Layout

Move from a left-weighted billboard to a more composed hero:

- centered or near-centered message block
- supporting copy directly beneath headline
- primary and secondary CTAs grouped cleanly
- real product screenshot shown either integrated into the hero lower edge or immediately below it

### Content Hierarchy

1. Eyebrow badge: Powered by Apache Superset
2. Headline
3. Supporting paragraph
4. CTA pair
5. Real dashboard screenshot

### Visual Treatment

- retain painterly image background
- simplify incidental decorations so the image and product are the stars
- use semantic foreground/background colors for text containers and supporting UI
- allow image-specific overlays where needed for contrast

## Existing Sections

The remaining sections should be normalized to the token palette but not structurally reinvented in this pass:

- Product
- Workflow
- Demo-first
- Demo form
- Footer

The mock dashboard component is no longer used on the page and can remain untouched unless future cleanup is requested.

## Testing

Add or update tests to verify:

1. The landing page no longer renders obvious raw shell colors such as the current custom page background class.
2. The navbar includes the new `Sign in` action.
3. The page still renders VantumIQP branding and the real dashboard screenshot.

Then run:

- `bun test`
- `bun run typecheck`
- `bun run lint`

## Out of Scope

- Reworking the content model of downstream sections
- Adding menus, dropdowns, or mobile nav behavior beyond the current page needs
- Changing theme variables in `app/globals.css`
- Replacing the existing artwork assets
