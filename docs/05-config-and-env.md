# Config and Environment

Line-by-line walkthrough of configuration files that wire Astro to Sanity and set up the build.

**Location in system:** These files run before any page is built. They connect the pieces described in [Sanity to HTML](03-sanity-to-html.md).

---

## `sanity.env`

**Purpose:** Committed configuration pointing at the Sanity project. Safe to commit — project ID is not a secret.

```
PUBLIC_SANITY_PROJECT_ID=1bzd5noi
PUBLIC_SANITY_DATASET=production
SANITY_DATASET=production
SANITY_STUDIO_DATASET=production
```

| Variable | Used by | Meaning |
|----------|---------|---------|
| `PUBLIC_SANITY_PROJECT_ID` | Astro site, Studio | Sanity project "address" |
| `PUBLIC_SANITY_DATASET` | Astro site | Which dataset to read (`production`) |
| `SANITY_DATASET` | CLI, seed scripts | Same dataset for Node scripts |
| `SANITY_STUDIO_DATASET` | Studio build | Dataset label in Studio UI |

`PUBLIC_` prefix means Astro/Vite may expose the value to client-side code. The Sanity client uses it at build time.

Optional secrets go in `.env` (gitignored). See `.env.example`.

---

## `loadSanityEnv.mjs`

**Purpose:** Load `sanity.env` and `.env` into `process.env` before Astro or Sanity CLI runs.

### `parseEnvFile(filePath)` (lines 10–35)

Reads a file line by line:

- Skips empty lines and comments (`#`)
- Splits `KEY=value` on first `=`
- Returns a plain object of key-value pairs

### `loadSanityEnv()` (lines 41–58)

1. Merges `sanity.env` then `.env` (`.env` overrides)
2. Sets each key on `process.env` if not already set
3. Copies `SANITY_DATASET` → `SANITY_STUDIO_DATASET` if Studio var missing

**Why needed:** Astro config and Sanity CLI both need project ID before their modules load.

### `activeDataset()` (lines 60–67)

Returns dataset with fallback chain: `SANITY_STUDIO_DATASET` → `SANITY_DATASET` → `PUBLIC_SANITY_DATASET` → `'production'`.

### `activeProjectId()` (lines 69–71)

Returns `PUBLIC_SANITY_PROJECT_ID` or default `'1bzd5noi'`.

---

## `astro.config.mjs`

**Purpose:** Main Astro configuration — site URL, integrations, Tailwind, Sanity env injection.

```javascript
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';
import { activeDataset, activeProjectId, loadSanityEnv } from './loadSanityEnv.mjs';

loadSanityEnv();
const projectId = activeProjectId();
const dataset = activeDataset();
```

**Lines 8–10:** Load env immediately so `projectId` and `dataset` are available.

```javascript
export default defineConfig({
  site: 'https://lovekycakes.com',
```

**Line 15:** Canonical site URL for sitemap and absolute URLs in SEO.

```javascript
  integrations: [
    sitemap(),
    ...(projectId
      ? [
          sanity({
            projectId,
            dataset,
            apiVersion: '2026-03-01',
            useCdn: false,
          }),
        ]
      : []),
  ],
```

**Lines 16–27:**

- `sitemap()` — generates `sitemap.xml` at build
- `@sanity/astro` — only registered if project ID exists
- `useCdn: false` — always fetch fresh content from Sanity (not CDN cache)

```javascript
  vite: {
    plugins: [tailwindcss()],
    define: {
      'import.meta.env.PUBLIC_SANITY_PROJECT_ID': JSON.stringify(projectId),
      'import.meta.env.PUBLIC_SANITY_DATASET': JSON.stringify(dataset),
    },
  },
});
```

**Lines 29–35:**

- Tailwind v4 via Vite plugin
- `define` injects env vars so `import.meta.env.PUBLIC_SANITY_PROJECT_ID` works in [`client.ts`](../src/lib/sanity/client.ts)

**If this breaks:** Missing project ID disables Sanity integration; site uses fallbacks only.

---

## `tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- **extends** — Astro's strict TypeScript rules
- **include** — all source files plus Astro-generated types
- **exclude** — build output not type-checked

---

## `src/env.d.ts`

**Purpose:** Tell TypeScript about env vars and Astro/Sanity module types.

```typescript
/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
  readonly PUBLIC_SANITY_PROJECT_ID?: string;
  readonly PUBLIC_SANITY_DATASET?: string;
}
```

Without this, `import.meta.env.PUBLIC_SANITY_PROJECT_ID` would cause type errors.

---

## See also

- [Sanity integration](06-data-layer/sanity-integration.md)
- [Sanity CLI config](10-sanity-studio/config-and-seed.md)
