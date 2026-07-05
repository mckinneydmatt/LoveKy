# Home Page (`index.astro`)

**Route:** `/`  
**File:** [`src/pages/index.astro`](../src/pages/index.astro)

**Purpose:** Homepage with hero, product spotlight, featured reviews, and Instagram embed.

---

## Frontmatter (lines 1–11)

| Line | Code | Purpose |
|------|------|---------|
| 2–6 | imports | `BaseLayout`, `ReviewCard`, `InstagramEmbed`, SEO helper, `getSite` |
| 8 | `const site = await getSite()` | **Pipeline step 6** — all CMS site settings |
| 9 | `pageDescriptions(site)` | Meta description for `<head>` |
| 10 | `site.reviews.slice(0, 2)` | First two reviews for homepage preview |

---

## Sanity fields used

| UI element | Sanity / data path |
|------------|-------------------|
| Logo | `site.logos.primary` (fallback, not CMS) |
| Tagline | Site Settings → Tagline |
| Description | Site Settings → Site description |
| Hero image | Site Settings → Home → Hero image |
| Spotlight title, subhead, text, etc. | Site Settings → Home → Spotlight |
| Spotlight image | Site Settings → Home → Spotlight → Image |
| Reviews (×2) | Site Settings → Reviews |
| Page meta | Derived from tagline + description |

Trace: [Sanity to HTML](../03-sanity-to-html.md)

---

## Template sections

### Hero (lines 14–57)

- Pattern background (CSS class `pattern-bg`)
- Logo image + screen-reader-only business name
- Conditional tagline: `{site.tagline && (...)}` — hidden if null
- Description paragraph
- CTA buttons to `/order` and `/about` (hardcoded labels)
- Hero cake photo from `site.home.heroImage`

### Spotlight (lines 59–93)

Product feature block using `site.home.spotlight.*`. Shows "Photo coming soon" if image URL missing.

### Reviews preview (lines 95–116)

Maps `featuredReviews` to `<ReviewCard />` components. Link to full `/reviews` page.

### Instagram (lines 118–137)

Hardcoded heading "Follow along". `<InstagramEmbed />` — handle not from CMS.

---

## Dependencies

- **Imports:** `getSite`, `ReviewCard`, `InstagramEmbed`, `BaseLayout`
- **Imported by:** File-based routing only

---

## See also

- [What is Astro?](../02-what-is-astro.md) — example page structure
- [ReviewCard](../08-components/review-instagram.md)
