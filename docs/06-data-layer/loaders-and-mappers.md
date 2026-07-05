# Loaders and Mappers

**Purpose:** Fetch Sanity content at build time and convert it to `SiteConfig` and `Product[]` for Astro pages.

**Pipeline steps:** 4 (Fetch) and 5 (Map). See [Sanity to HTML](../03-sanity-to-html.md).

---

## `src/lib/getSite.ts`

### Module-level cache (line 6)

```typescript
let sitePromise: Promise<SiteConfig> | null = null;
```

Stores one in-flight/completed promise per build.

### `loadSite()` (lines 8–19)

```typescript
async function loadSite(): Promise<SiteConfig> {
  if (!isSanityConfigured()) {
    return defaultSite;
  }

  try {
    const doc = await getSanityClient().fetch(SITE_SETTINGS_QUERY);
    return doc ? mapSiteSettings(doc) : defaultSite;
  } catch {
    return defaultSite;
  }
}
```

| Line | Behavior |
|------|----------|
| 9–11 | No project ID → skip API, use fallback |
| 14 | HTTP + GROQ fetch to Sanity |
| 15 | Empty result → fallback; else map |
| 16–18 | Network/API error → fallback (site always builds) |

### `getSite()` (lines 21–26)

Public API. Creates promise once, returns same promise on subsequent calls.

---

## `src/lib/getProducts.ts`

Same pattern as `getSite`:

```typescript
async function loadProducts(): Promise<Product[]> {
  if (!isSanityConfigured()) {
    return defaultProducts;
  }

  try {
    const docs = await getSanityClient().fetch(PRODUCTS_QUERY);
    if (!docs?.length) {
      return defaultProducts;
    }
    return docs.map(mapProduct);
  } catch {
    return defaultProducts;
  }
}
```

**Difference:** Maps **array** of documents with `.map(mapProduct)`. Empty array triggers full fallback (default chocolate cake).

---

## `src/lib/sanity/mapProduct.ts`

```typescript
export function mapProduct(doc: SanityProductDoc): Product {
  return {
    id: doc.slug?.current ?? doc._id ?? "",
    name: doc.name ?? "",
    price: doc.price ?? null,
    description: doc.description ?? null,
    ingredients: doc.ingredients ?? null,
  };
}
```

| Field | Source | Notes |
|-------|--------|-------|
| `id` | slug or `_id` | Used as radio value in order form |
| `name` | required in schema | Empty string if missing |
| Others | nullable | UI hides sections when null |

No per-field fallback to default product — empty Sanity fields stay empty on site.

---

## `src/lib/sanity/mapSiteSettings.ts`

Converts `SanitySiteSettingsDoc` → `SiteConfig`. Uses `?? defaultSite.field` for most text fields.

### Image handling (lines 5–15)

```typescript
const heroImage = doc.home?.heroImage
  ? urlFor(doc.home.heroImage).width(1200).auto("format").url()
  : defaultSite.home.heroImage;
```

Same pattern for owner image (800px), spotlight (1080px), gallery (640px).

### Arrays (lines 17–35)

- **Social links:** Map each link with defaults for missing icon/name/url
- **Gallery photos:** Map with index-based fallback for missing images/sides

### Fields always from fallback (lines 93–94)

```typescript
logos: defaultSite.logos,
// ...
signatureImage: defaultSite.about.signatureImage,
```

Logos and signature are **not** CMS-managed — always from `shared/defaultSite.ts` and `public/`.

### Form endpoint (lines 94–96)

```typescript
formEndpoints: {
  order: doc.formspreeOrderEndpoint ?? defaultSite.formEndpoints.order,
},
```

Formspree URL from Sanity field `formspreeOrderEndpoint`.

---

## What happens if this breaks

| Failure | Result |
|---------|--------|
| Sanity down | Full default site/products |
| Wrong project ID | Fetch fails → defaults |
| Empty tagline in CMS | Shows default tagline from shared |
| Missing Formspree URL | Order submit button disabled |

---

## See also

- [Fallback data](fallback-data.md)
- [Order form](../08-components/order-form.md)
