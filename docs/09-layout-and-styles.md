# Layout and Styles

**Files:**

- [`src/layouts/BaseLayout.astro`](../src/layouts/BaseLayout.astro) — HTML shell for every page
- [`src/styles/global.css`](../src/styles/global.css) — Tailwind + brand styles

---

## BaseLayout.astro

**Purpose:** Shared `<html>`, SEO meta, JSON-LD, fonts, Navbar, Footer, and page slot.

**Location:** Wraps every page in `src/pages/`.

### Frontmatter (lines 1–31)

| Line | Purpose |
|------|---------|
| 11 | `getSite()` — site name, contact for schema/nav/footer |
| 12 | `import "../styles/global.css"` — load Tailwind once |
| 14–18 | Props: `title`, optional `description`, optional `ogImage` |
| 20–25 | Destructure props with defaults from SEO helpers |
| 27–31 | Build title, canonical URL, OG image URL, JSON-LD schema |

### Head (lines 36–79)

| Element | Source |
|---------|--------|
| `<meta description>` | Page prop or `defaultMetaDescription(site)` |
| Canonical, OG, Twitter tags | `resolvedTitle`, `description`, `ogImageUrl`, `canonicalUrl` |
| Favicon links | Static `/favicon/*` |
| Google Fonts | Dancing Script + Montserrat |
| `<title>` | `resolvedTitle` |
| JSON-LD script | `localBusinessSchema(site, siteOrigin)` — helps Google show bakery info |

### Body (lines 81–88)

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
<Navbar site={site} />
<main id="main-content"><slot /></main>
<Footer site={site} />
```

- **Skip link** — accessibility: keyboard users jump to content
- **`<slot />`** — where each page's content is inserted

### Sanity connection

`getSite()` runs again here (cached). Meta tags use CMS-driven `site.name`, descriptions, social URLs in schema.

---

## global.css

**Purpose:** Tailwind import, brand design tokens, reusable component classes.

**Not CMS-managed** — code changes required to alter colors/layout.

### Tailwind import (line 1)

```css
@import "tailwindcss";
```

Tailwind v4 via Vite plugin in `astro.config.mjs`.

### `@theme` (lines 3–13)

Defines CSS variables used as Tailwind colors/fonts:

| Token | Hex | Usage |
|-------|-----|-------|
| `powder-blush` | #e2a79e | Buttons, accents |
| `soft-blossom` | #f8b9cf | Borders, backgrounds |
| `frozen-water` | #def1ef | Page background |
| `blue-slate` | #326273 | Body text |
| `vintage-berry` | #8e4263 | Headings, nav |
| `nail-polish` | #ed1c24 | Primary CTA |

Fonts: Montserrat (sans), Dancing Script / Adventures Unlimited (script taglines).

### `@layer base` (lines 15–46)

Global defaults: smooth scroll, body colors, heading weight, link transitions, focus outlines.

### `@layer components` (lines 48–205)

Reusable classes used across pages:

| Class | Purpose |
|-------|---------|
| `.container-page` | Centered max-width container with padding |
| `.skip-link` | Screen-reader-only until focused |
| `.btn-blush`, `.btn-secondary`, etc. | Button variants |
| `.form-input` | Order form fields |
| `.section-heading`, `.section-pad` | Page section spacing |
| `.tagline`, `.tagline-lg` | Script font headings |
| `.pattern-bg` | Heart pattern on hero |
| `.home-spotlight*` | Homepage spotlight layout (responsive grid) |
| `.about-gallery-photo*` | Tilted gallery on about page |

---

## See also

- [Content types — SEO](../06-data-layer/content-types.md)
- [What is Astro?](../02-what-is-astro.md)
