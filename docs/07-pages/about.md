# About Page (`about.astro`)

**Route:** `/about`  
**File:** [`src/pages/about.astro`](../src/pages/about.astro)

**Purpose:** Owner story, photo, signature, and gallery.

---

## Frontmatter (lines 1–8)

Standard pattern: `getSite()`, `pageDescriptions(site)` for `descriptions.about`.

---

## Sanity fields used

| UI element | Source |
|------------|--------|
| Title, subhead | Site Settings → About |
| Paragraphs | Site Settings → About → Paragraphs (may contain HTML) |
| Pull quote styling | Paragraph matching `site.about.pullQuote` gets `about-pull-quote` class |
| Owner photo | Site Settings → About → Owner image (via `mapSiteSettings` → `site.about.image`) |
| Gallery photos | Site Settings → About → Gallery photos |
| Signature | **Not CMS** — `defaultSite.about.signatureImage` always |
| Meta description | Site Settings → SEO → About |

Placeholder UI when owner or gallery image is null.

---

## Template highlights

### Story column (lines 13–37)

- `site.about.paragraphs.map()` with `set:html={paragraph}` — allows `<em>` tags from CMS
- Signature image below story

### Photo column (lines 39–96)

- Owner image or "Photo coming soon" placeholder
- Gallery: each `galleryPhotos` item with `left`/`right` CSS modifiers for tilted layout

---

## See also

- [mapSiteSettings](../06-data-layer/loaders-and-mappers.md) — image URL building
- [About schema fields](../10-sanity-studio/schemas.md)
