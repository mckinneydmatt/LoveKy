# Reviews Page (`reviews.astro`)

**Route:** `/reviews`  
**File:** [`src/pages/reviews.astro`](../src/pages/reviews.astro)

**Purpose:** Full list of customer reviews.

---

## Frontmatter (lines 1–9)

`getSite()`, `pageDescriptions(site)`.

---

## Sanity fields used

| UI element | Source |
|------------|--------|
| All reviews | Site Settings → Reviews array |
| Meta description | Site Settings → SEO → Reviews |

Intro line "Real reviews from Love, Ky Cakes customers." is **hardcoded**.

---

## Template (lines 11–30)

Maps `site.reviews` to `<ReviewCard />` for each entry with `quote`, `author`, `isPlaceholder`.

Grid layout: one column mobile, two columns on medium+ screens.

---

## See also

- [ReviewCard](../08-components/review-instagram.md)
- [Home page](../07-pages/home.md) — shows first 2 reviews only
