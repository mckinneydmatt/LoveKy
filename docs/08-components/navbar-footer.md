# Navbar, Footer, and SocialIcon

---

## `Navbar.astro`

**Purpose:** Sticky site header with logo, navigation links, Order CTA, and mobile hamburger menu.

**Used by:** [`BaseLayout.astro`](../src/layouts/BaseLayout.astro)

### Frontmatter (lines 1–21)

| Code | Purpose |
|------|---------|
| `Props { site: SiteConfig }` | Receives site from layout |
| `navLinks` | Hardcoded routes: Home, Reviews, About, Contact |
| `Astro.url.pathname` | Current URL for active link styling |
| `isCurrent(href)` | Marks active nav item with `aria-current="page"` |

### Template

- Logo from `site.logos.header` (fallback path, not CMS)
- Desktop nav (hidden on mobile) + Order button
- Mobile: Order button + hamburger
- Mobile menu panel with same links

### Client script (lines 131–161)

Vanilla JS — no framework:

| Function | Behavior |
|----------|----------|
| `setMenuOpen(open)` | Toggle menu visibility, ARIA attributes, body scroll lock |
| Button click | Open/close menu |
| Nav link click | Close menu after navigation |
| Escape key | Close menu |

---

## `Footer.astro`

**Purpose:** Site footer with logo, address, contact links, social links, copyright.

### Sanity fields used

| Element | Source |
|---------|--------|
| Logo | `site.logos.secondary` (fallback) |
| Tagline | Site Settings → Tagline |
| Address | Site Settings → Contact → Address |
| Email, phone, hours | Site Settings → Contact |
| Social links | Site Settings → Social → Links |

### Template

Three-column grid (stacks on mobile). `<address>` for street address. Maps `site.social.links` to links with `<SocialIcon />`.

Copyright uses `new Date().getFullYear()` for current year at build time.

---

## `SocialIcon.astro`

**Purpose:** Inline SVG for Instagram, TikTok, or Facebook.

### Props

```typescript
interface Props {
  name: "instagram" | "tiktok" | "facebook";
  class?: string;
}
```

### Template (lines 10–39)

Conditional blocks render one SVG based on `name`. Default class `h-5 w-5`. `aria-hidden="true"` — parent link has accessible label.

---

## See also

- [BaseLayout](../09-layout-and-styles.md)
- [Site Settings schema](../10-sanity-studio/schemas.md)
