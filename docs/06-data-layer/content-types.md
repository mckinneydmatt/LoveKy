# Content Types and SEO Helpers

**Purpose:** Define the shape of data the website expects (`SiteConfig`, `Product`) and helper functions for SEO meta tags.

**Location:** Between Sanity mappers and Astro pages — mappers produce these types; pages consume them.

---

## `src/content/site.ts`

### Imports (lines 1)

```typescript
import { defaultSite as sharedDefaultSite } from "../../shared/defaultSite";
```

Re-exports the shared default object so fallbacks live in one place.

### `SocialLink` interface (lines 3–8)

```typescript
export interface SocialLink {
  icon: "instagram" | "tiktok" | "facebook";
  name: string;
  url: string;
  label: string;
}
```

One social media link in the footer. `icon` restricts values to icons [`SocialIcon`](../src/components/SocialIcon.astro) supports.

### `Review` interface (lines 10–14)

Customer review: quote text, author name, optional placeholder flag for Studio drafts.

### `GalleryPhoto` interface (lines 16–19)

About page gallery item: image URL (or null) and which side it floats (`left` | `right`).

### `SiteConfig` interface (lines 21–83)

The main site data object. Every field maps from Sanity Site Settings (see [schemas](../10-sanity-studio/schemas.md)):

| Section | Fields | Used on |
|---------|--------|---------|
| Top-level | `name`, `tagline`, `description` | Home, footer, meta |
| `contact` | email, phone, hours, location, address | Contact, footer, order form |
| `social.links` | array of `SocialLink` | Footer |
| `home` | heroImage, spotlight | Homepage |
| `order` | intro, deliveryNote, disclaimer, message | Order page |
| `about` | title, paragraphs, gallery, etc. | About page |
| `reviews` | array of `Review` | Home, reviews |
| `logos` | primary, header, secondary | Navbar, footer, home — **from fallback only** |
| `formEndpoints.order` | Formspree URL | Order form |
| `seo` | per-page descriptions | Meta tags |

### `defaultSite` (line 86)

```typescript
export const defaultSite: SiteConfig = sharedDefaultSite;
```

Used when Sanity is unavailable. See [Fallback Data](fallback-data.md).

### `defaultMetaDescription(site)` (lines 88–90)

Builds default meta description: `"tagline — description"` or just description if no tagline. Used by `BaseLayout` when a page omits `description` prop.

---

## `src/content/products.ts`

### `Product` interface (lines 3–9)

```typescript
export interface Product {
  id: string;
  name: string;
  price: string | null;
  description: string | null;
  ingredients: string | null;
}
```

One orderable cake. `id` comes from Sanity slug or `_id`. Nullable fields hide UI sections when empty.

### `defaultProducts` (line 11)

Spread of shared default array — one chocolate cake when Sanity has no products.

---

## `src/content/seo.ts`

**Purpose:** SEO helpers — page titles, descriptions, Open Graph image, JSON-LD schema.

### `siteUrl` (line 4)

Hardcoded production URL. Should match `site` in `astro.config.mjs`.

### `defaultOgImage(site)` (lines 6–8)

Returns `site.logos.primaryOnDark` for social share previews.

### `pageDescriptions(site)` (lines 10–18)

Object with meta description per page route. Home uses tagline + description; others use `site.seo.*` from CMS.

### `pageTitle(site, title)` (lines 20–22)

- Home → just `site.name`
- Other pages → `"Love, Ky Cakes | Order"` format

### `absoluteUrl(pathname, origin)` (lines 24–26)

Joins path and origin into full URL for canonical and OG tags.

### `localBusinessSchema(site, origin)` (lines 28–48)

Returns JSON-LD object for Google rich results (Bakery type with address, phone, social links). Injected in `BaseLayout` `<head>`.

---

## See also

- [Loaders and mappers](loaders-and-mappers.md)
- [BaseLayout](../09-layout-and-styles.md)
