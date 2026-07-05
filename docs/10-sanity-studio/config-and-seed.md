# Sanity Config and Seed Scripts

---

## `sanity.config.ts`

**Purpose:** Studio app entry — project ID, dataset, plugins, schema registration.

```typescript
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production'
const projectId = process.env.PUBLIC_SANITY_PROJECT_ID ?? '1bzd5noi'

export default defineConfig({
  name: 'default',
  title: dataset === 'production' ? 'Bakery Site' : `Bakery Site (${dataset})`,
  projectId,
  dataset,
  plugins: [structureTool({structure}), visionTool()],
  schema: { types: schemaTypes },
})
```

| Part | Purpose |
|------|---------|
| `structureTool({structure})` | Custom sidebar from `structure.ts` |
| `visionTool()` | GROQ query playground in Studio |
| Env vars | Loaded by `sanity.cli.ts` before bundle runs |

---

## `sanity.cli.ts`

**Purpose:** CLI configuration for `sanity dev`, `sanity deploy`, seed scripts.

```typescript
loadSanityEnv()
export default defineCliConfig({
  api: { projectId: activeProjectId(), dataset: activeDataset() },
  deployment: { autoUpdates: true, appId: 'xtihmtgctxoipku27j3e728a' },
})
```

- **`appId`** — pins deployed Studio hostname so deploy skips prompt
- Uses same `loadSanityEnv.mjs` as Astro

---

## `structure.ts`

**Purpose:** Studio sidebar layout.

```typescript
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('product').title('Products'),
      S.divider(),
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    ])
```

- **Products** — list of all product documents
- **Site Settings** — opens singleton with fixed ID `siteSettings`

---

## `seed/seedSiteSettings.ts`

**Purpose:** Create or replace the Site Settings document with default copy.

**Run:** `npm run sanity:seed` or `npm run sanity:seed:all`

```typescript
const client = getCliClient({apiVersion: '2026-03-01'})
// ... builds siteSettings object matching schema ...
await client.createOrReplace(siteSettings)
```

- **`createOrReplace`** — upsert by `_id: 'siteSettings'`
- Content mirrors [`shared/defaultSite.ts`](../shared/defaultSite.ts)
- Requires Sanity login (`--with-user-token` in package.json script)

---

## `seed/seedProducts.ts`

**Purpose:** Seed default chocolate cake product.

**Run:** `npm run sanity:seed:products`

```typescript
await client.createOrReplace({
  _id: 'product-chocolate-cake',
  _type: 'product',
  name: '...',
  slug: { _type: 'slug', current: 'chocolate-cake' },
  price: '$44',
  ingredients: '...',
  active: true,
  sortOrder: 1,
})
```

---

## Root package.json scripts

| Script | Action |
|--------|--------|
| `sanity:dev` | Studio on port 3333 |
| `sanity:deploy` | Deploy Studio to sanity.studio |
| `sanity:seed` | Seed Site Settings only |
| `sanity:seed:products` | Seed products only |
| `sanity:seed:all` | Both seeds |

---

## See also

- [Config and environment](../05-config-and-env.md)
- [Fallback data](../06-data-layer/fallback-data.md)
