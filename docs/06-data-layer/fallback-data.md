# Fallback Data

**Purpose:** Hardcoded content used when Sanity is unavailable, misconfigured, or returns empty fields. Ensures the site always builds and displays sensible copy.

**Pipeline:** Step 5 fallback branch in [Sanity to HTML](../03-sanity-to-html.md).

---

## Why fallbacks exist

1. **Local development** without Sanity credentials
2. **CI/build failures** if Sanity API is temporarily down
3. **Empty CMS fields** — `mapSiteSettings` merges `doc.field ?? defaultSite.field`
4. **Non-CMS assets** — logos always come from here

---

## `shared/defaultSite.ts`

Single source of truth for default site content. Imported by:

- [`src/content/site.ts`](../src/content/site.ts) → `defaultSite`
- [`sanity/seed/seedSiteSettings.ts`](../sanity/seed/seedSiteSettings.ts) → initial CMS seed
- [`sanity/schemaTypes/fallbackPlaceholders.ts`](../sanity/schemaTypes/fallbackPlaceholders.ts) → Studio field hints

### Section breakdown

| Section | Key content | Fallback paths |
|---------|-------------|----------------|
| `name`, `tagline`, `description` | Business identity | Text strings |
| `contact` | Email, phone, hours, Carmel address | Used on contact/footer |
| `social.links` | Instagram, TikTok, Facebook URLs | Footer |
| `home.heroImage` | `/images/chocolate-cake-hero.png` | Local file in `public/` |
| `home.spotlight` | "The Cake" section copy + image | Homepage |
| `order` | Intro, delivery note, disclaimer, thank-you message | Order page |
| `about` | Kylee's story paragraphs, pull quote | About page; `image: null` shows placeholder |
| `reviews` | Sample customer quotes | Home + reviews |
| `logos` | Paths under `/logos/` | Navbar, footer, home |
| `formEndpoints.order` | Empty string | Form disabled until Formspree URL in CMS |
| `seo` | Meta descriptions per page | `<meta description>` |

### About paragraphs

Several paragraphs include HTML (`<em>` tags) rendered with `set:html` on the about page. Pull quote paragraph gets special CSS class.

---

## `shared/defaultProducts.ts`

```typescript
export const defaultProducts = [
  {
    id: 'chocolate-cake',
    name: '10-inch chocolate cake with whipped chocolate frosting',
    price: '$44',
    description: null,
    ingredients: 'Sugar, flour, cocoa powder, ...',
  },
] as const
```

Used when:

- Sanity not configured
- `PRODUCTS_QUERY` returns empty array
- Fetch throws

---

## What is NOT in fallbacks

| Item | Behavior |
|------|----------|
| CMS-uploaded images | Fall back to `defaultSite` image **paths** (local PNGs), not Sanity CDN |
| Formspree URL | Empty until set in Studio |
| Per-product empty fields | Stay empty (no merge from default product except whole-list fallback) |

---

## See also

- [Loaders and mappers](loaders-and-mappers.md)
- [Seed scripts](../10-sanity-studio/config-and-seed.md)
