# Sanity Integration

**Purpose:** Connect the Astro build to Sanity's API — client setup, GROQ queries, image URLs, and TypeScript types for raw Sanity documents.

**Pipeline steps:** 3 (Query) and part of 4 (Fetch). See [Sanity to HTML](../03-sanity-to-html.md).

---

## `src/lib/sanity/client.ts`

### `getSanityClient()` (lines 6–13)

```typescript
export function getSanityClient() {
  return createClient({
    projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? "production",
    apiVersion: "2026-03-01",
    useCdn: false,
  });
}
```

Creates a Sanity API client for each call (lightweight). Values come from [config](../05-config-and-env.md).

- **`useCdn: false`** — read from origin server, not edge cache. Ensures build gets latest published content.

### Re-export `isSanityConfigured`

From `types.ts` — used by loaders to skip fetch when no project ID.

---

## `src/lib/sanity/queries.ts`

GROQ query strings passed to `.fetch()`.

### `SITE_SETTINGS_QUERY`

```groq
*[_type == "siteSettings" && _id == "siteSettings"][0]{
  name,
  tagline,
  ...
}
```

| Part | Meaning | SQL analogy |
|------|---------|-------------|
| `*` | All documents | `FROM documents` |
| `[_type == "siteSettings" && _id == "siteSettings"]` | Filter | `WHERE type = 'siteSettings' AND id = 'siteSettings'` |
| `[0]` | First match | `LIMIT 1` |
| `{ name, tagline, ... }` | Project fields | `SELECT name, tagline, ...` |

Nested objects (`home{ spotlight{ ... } }`) fetch grouped fields in one request.

**Why fixed `_id`:** Site Settings is a **singleton** — exactly one document with known ID.

### `PRODUCTS_QUERY`

```groq
*[_type == "product" && active == true] | order(sortOrder asc) {
  _id,
  name,
  slug,
  price,
  description,
  ingredients
}
```

| Part | Meaning |
|------|---------|
| `active == true` | Only cakes available to order |
| `\| order(sortOrder asc)` | Sort by `sortOrder` field, lowest first |
| `slug` | Used for product `id` in mapper |

---

## `src/lib/sanity/types.ts`

### `isSanityConfigured()` (lines 7–9)

```typescript
return Boolean(projectId);
```

True if `PUBLIC_SANITY_PROJECT_ID` is set. False → loaders use fallbacks immediately.

### `urlFor(source)` (lines 11–16)

Builds Sanity CDN image URLs from image reference objects:

```typescript
return createImageUrlBuilder({ projectId, dataset }).image(source);
```

Used in `mapSiteSettings` with `.width(1200).auto("format").url()`.

**Throws** if project ID missing — should not run when Sanity unconfigured (mapper only runs after successful fetch).

### `SanitySiteSettingsDoc` (lines 18–83)

TypeScript interface matching GROQ result shape. All fields optional (`?`) because Sanity may omit empty fields.

### `SanityProductDoc` (lines 85–92)

Raw product document: `_id`, `name`, `slug.current`, price, description, ingredients.

---

## See also

- [Loaders and mappers](loaders-and-mappers.md)
- [Sanity schemas](../10-sanity-studio/schemas.md)
