# Love, Ky Cakes

Static Astro site for Love, Ky Cakes — a home bakery in Carmel, Indiana.

## Stack

- [Astro 6](https://astro.build) + Tailwind v4
- [Sanity CMS](https://sanity.io) for editable site content
- Content fetched at build time (static HTML)

## Commands

| Command | Action |
| :------ | :----- |
| `npm install` | Install Astro dependencies |
| `npm run dev` | Start Astro dev server at `localhost:4321` |
| `npm run build` | Build static site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run sanity:dev` | Start Sanity Studio at `localhost:3333` |
| `npm run sanity:deploy` | Deploy Studio to `*.sanity.studio` |
| `npm run sanity:seed` | Seed Site Settings from defaults (requires Sanity login) |

## Sanity CMS setup

**Project:** Bakery Site (`1bzd5noi`) · **Dataset:** `production`

1. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

2. Log in to Sanity CLI (one time):
   ```bash
   npx sanity@latest login
   ```

3. Seed initial content:
   ```bash
   npm run sanity:seed
   ```

4. Edit content locally:
   ```bash
   npm run sanity:dev
   ```
   Open [http://localhost:3333](http://localhost:3333) → **Site Settings**

5. Deploy Studio for Kylee:
   ```bash
   npm run sanity:deploy
   ```

### Content updates on the live site

The Astro site fetches Sanity content at **build time**. After Kylee publishes changes in Studio, trigger a rebuild:

1. In your host (e.g. Netlify), create a **build hook** URL
2. In [sanity.io/manage](https://sanity.io/manage) → Bakery Site → **API** → **Webhooks**, add the build hook URL on publish

Until a webhook is configured, run a manual deploy/rebuild after content changes.

### Fallback behavior

If `PUBLIC_SANITY_PROJECT_ID` is missing or Sanity is unreachable, the site falls back to defaults in `src/content/site.ts` so builds still succeed.

## Project structure

```
src/
  content/site.ts     # Default/fallback content + types
  lib/getSite.ts      # Fetches from Sanity at build time
  lib/sanity/         # GROQ query, mapper, types
  pages/              # Static pages
sanity/
  schemaTypes/        # Sanity schema (Site Settings singleton)
  seed/               # One-time content seed script
```
