# Data Layer Overview

The **data layer** fetches content from Sanity (or fallbacks) and provides typed JavaScript objects to Astro pages. See the full pipeline in [Sanity to HTML](../03-sanity-to-html.md).

---

## Entry points

| Function | File | Returns |
|----------|------|---------|
| `getSite()` | [`src/lib/getSite.ts`](../src/lib/getSite.ts) | `SiteConfig` — all site-wide content |
| `getProducts()` | [`src/lib/getProducts.ts`](../src/lib/getProducts.ts) | `Product[]` — orderable cakes |

Every page calls `getSite()`. Only `/order` also calls `getProducts()`.

---

## Flow diagram

```
Astro page frontmatter
       ↓
getSite() / getProducts()
       ↓
isSanityConfigured()?
   No → defaultSite / defaultProducts
   Yes → getSanityClient().fetch(GROQ)
       ↓
mapSiteSettings() / mapProduct()
       ↓
SiteConfig / Product[]
       ↓
{site.tagline} in template → HTML
```

---

## Promise caching

Both loaders cache their promise so multiple calls in one build share one fetch:

```typescript
let sitePromise: Promise<SiteConfig> | null = null;

export function getSite(): Promise<SiteConfig> {
  if (!sitePromise) {
    sitePromise = loadSite();
  }
  return sitePromise;
}
```

**Why:** `BaseLayout` and each page both call `getSite()`. Without caching, Sanity would be queried twice per page.

---

## File map

| Doc | Files |
|-----|-------|
| [Content types](content-types.md) | `src/content/site.ts`, `products.ts`, `seo.ts` |
| [Sanity integration](sanity-integration.md) | `client.ts`, `queries.ts`, `types.ts` |
| [Loaders and mappers](loaders-and-mappers.md) | `getSite.ts`, `getProducts.ts`, `mapSiteSettings.ts`, `mapProduct.ts` |
| [Fallback data](fallback-data.md) | `shared/defaultSite.ts`, `defaultProducts.ts` |

---

## Pipeline step reference

| Step | Doc section |
|------|-------------|
| 3. GROQ query | [sanity-integration.md](sanity-integration.md) |
| 4. Fetch | [loaders-and-mappers.md](loaders-and-mappers.md) |
| 5. Map | [loaders-and-mappers.md](loaders-and-mappers.md) |
| Fallback | [fallback-data.md](fallback-data.md) |

---

## See also

- [Sanity to HTML](../03-sanity-to-html.md)
- [Config and environment](../05-config-and-env.md)
