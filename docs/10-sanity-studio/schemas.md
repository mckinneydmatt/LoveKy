# Sanity Schemas

**Files:** [`sanity/schemaTypes/`](../sanity/schemaTypes/)

Schemas define what fields editors see in Studio and what gets stored in the Content Lake. Each field maps to HTML via the pipeline in [Sanity to HTML](../03-sanity-to-html.md).

---

## `index.ts`

```typescript
export const schemaTypes = [product, siteSettings]
```

Registers both document types with Studio.

---

## `fallbackPlaceholders.ts`

Helper for Studio UX:

| Export | Purpose |
|--------|---------|
| `siteFallback(value)` | Truncates default text for grey placeholders in empty fields |
| `fallbackHint` | Description text: empty field → site uses code default |
| `noFallbackHint` | Field behaves differently when empty |
| `site` | Import of `shared/defaultSite` for placeholder values |

---

## Product schema (`product.ts`)

**Document type:** `product` — one per orderable cake.

| Field | Type | On live site |
|-------|------|--------------|
| `name` | string (required) | Order form summary, radio labels, Formspree email |
| `slug` | slug (required) | Internal `Product.id` — not shown in UI |
| `price` | string | Price under cake name; empty hides price |
| `description` | text | Blurb under price |
| `ingredients` | text | Ingredients section on order form |
| `active` | boolean | `false` = hidden from `PRODUCTS_QUERY` |
| `sortOrder` | number | Order when multiple products (lower first) |

**GROQ filter:** `active == true` only. See [PRODUCTS_QUERY](../06-data-layer/sanity-integration.md).

---

## Site Settings schema (`siteSettings.ts`)

**Singleton** document with `_id: "siteSettings"`. All site-wide copy.

### Top-level fields

| Field | Pipeline → HTML |
|-------|-----------------|
| `name` | Page titles, footer copyright, schema.org |
| `tagline` | Homepage hero, footer |
| `description` | Homepage hero, meta description |

### Contact object

| Field | HTML location |
|-------|---------------|
| `email` | Contact page, footer, order success |
| `phone` | Contact page, footer, order success |
| `hours` | Contact page, footer |
| `location` | Contact page |
| `address.*` | Footer, order disclaimer |

### Social → links array

Each item: icon, name, url, label → footer "Follow along" links.

Empty array → full default social links from code.

### Home object

| Field | HTML location |
|-------|---------------|
| `heroImage` | Homepage hero `<img src="cdn.sanity.io/...">` |
| `spotlight.title` | Spotlight `<h2>` |
| `spotlight.subhead` | Spotlight subhead |
| `spotlight.text` | Spotlight paragraph |
| `spotlight.ingredientNote` | Small text below body |
| `spotlight.ctaLabel` | Spotlight order button text |
| `spotlight.secondaryLine` | Line under button |
| `spotlight.image` | Spotlight photo |

### Order object

| Field | HTML location |
|-------|---------------|
| `intro` | Order page intro paragraph |
| `deliveryNote` | Order form summary + success message |
| `disclaimer` | Checkbox section |
| `message[]` | Paragraphs below form |

### About object

| Field | HTML location |
|-------|---------------|
| `title`, `subhead` | About page headings |
| `paragraphs[]` | Story text (`set:html` allows `<em>`) |
| `pullQuote` | Paragraph matching this string gets special styling |
| `ownerImage` | Main about photo |
| `galleryPhotos[]` | Tilted gallery images + side |

**Not in schema:** signature image, logos — always from code.

### Reviews array

| Field | HTML location |
|-------|---------------|
| `quote`, `author` | ReviewCard on home (first 2) and reviews page |
| `isPlaceholder` | "Placeholder" badge styling |

### SEO object

| Field | HTML location |
|-------|---------------|
| `about`, `contact`, `order`, `reviews` | `<meta name="description">` per page |

### formspreeOrderEndpoint

Formspree URL → `site.formEndpoints.order` → order form `action` and submit enable.

**No fallback** — empty disables submit.

---

## See also

- [Config and seed](config-and-seed.md)
- [Loaders and mappers](../06-data-layer/loaders-and-mappers.md)
