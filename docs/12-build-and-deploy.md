# Build and Deploy

What happens when the site is built and how CMS changes reach production.

---

## `npm run build` step by step

1. **Load env** — `loadSanityEnv.mjs` reads `sanity.env`
2. **Astro config** — registers Sanity integration, Tailwind, sitemap
3. **For each page** in `src/pages/`:
   - Run frontmatter (`await getSite()`, etc.)
   - Fetch Sanity via GROQ (or use fallbacks)
   - Map documents to `SiteConfig` / `Product[]`
   - Render template to HTML strings
4. **Write output** to `dist/` — HTML, CSS, copied `public/` assets
5. **Generate sitemap** via `@astrojs/sitemap`

No server process remains after build completes.

---

## When CMS edits appear on the live site

| Action | Live site updates? |
|--------|-------------------|
| Edit + publish in Sanity Studio | **No** — until next Netlify build |
| `npm run dev` locally + refresh | **Yes** — immediately |
| Manual Netlify deploy | **Yes** |
| Sanity webhook → Netlify build hook | **Yes** (when configured) |

See [Sanity to HTML — Timing](03-sanity-to-html.md#timing-build-time-vs-live-site).

---

## Netlify deployment

Configured outside this repo (see [HANDOFF.md](../HANDOFF.md)):

- Build command: `npm run build`
- Publish directory: `dist`
- Env vars: `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`

---

## Studio deployment

Separate from the public site:

```bash
npm run sanity:deploy
```

Deploys to `https://love-ky-cakes.sanity.studio/`. Does not rebuild the Astro site.

---

## Seeding CMS content

For new environments or reset:

```bash
npm run sanity:seed:all
```

Requires Sanity CLI authentication.

---

## See also

- [Architecture](04-architecture.md)
- [Getting started](01-getting-started.md)
- [HANDOFF.md](../HANDOFF.md) — webhooks, domain, account ownership
