# Getting Started

Step-by-step guide to run the Love, Ky Cakes website on your computer.

---

## Prerequisites

- **Node.js 22.12 or newer** — JavaScript runtime for building the site. Check with `node --version`.
- **npm** — Comes with Node.js. Installs dependencies and runs scripts.
- **Git** — To clone the repository (optional if you already have the files).

No database installation is required. Content comes from Sanity's cloud service.

---

## Install

From the project root:

```bash
npm install
```

This reads [`package.json`](../package.json) and installs Astro, Sanity client, Tailwind, and other dependencies into `node_modules/`.

For Sanity Studio (only needed when editing schemas or running Studio locally):

```bash
npm install --prefix sanity
```

Or Studio dependencies install automatically when you run `npm run sanity:dev`.

---

## Run the website locally

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321). The dev server reloads when you change files.

During dev, Astro re-runs frontmatter on each page load, so Sanity content updates appear on refresh. See [Sanity to HTML — Timing](03-sanity-to-html.md#timing-build-time-vs-live-site).

---

## Run Sanity Studio locally

```bash
npm run sanity:dev
```

Open [http://localhost:3333](http://localhost:3333). Log in with your Sanity account to edit content.

Studio and the Astro site are **separate servers**. Editing in Studio does not automatically refresh the Astro dev server — refresh the browser on `localhost:4321` to see CMS changes.

---

## Production build

```bash
npm run build
```

Output goes to `dist/`. Preview it locally:

```bash
npm run preview
```

---

## Folder tour

| Path | What it is |
|------|------------|
| `src/pages/` | Website pages — one file per URL |
| `src/components/` | Reusable UI (navbar, order form, etc.) |
| `src/layouts/` | Page wrapper (`BaseLayout.astro`) |
| `src/lib/` | Data loading from Sanity |
| `src/content/` | TypeScript types for site data |
| `shared/` | Default content when Sanity is unavailable |
| `sanity/` | Sanity Studio app (CMS admin) |
| `public/` | Static files copied as-is (images, favicon) |
| `sanity.env` | Sanity project ID and dataset (committed) |
| `.env` | Optional secrets (gitignored) |
| `dist/` | Build output (gitignored, created by `npm run build`) |

---

## Useful npm scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `astro dev` | Local website |
| `build` | `astro build` | Production build |
| `preview` | `astro preview` | Preview `dist/` |
| `sanity:dev` | Studio dev server | Edit CMS locally |
| `sanity:deploy` | Deploy Studio | Publish Studio to `*.sanity.studio` |
| `sanity:seed:all` | Seed Site Settings + Products | Load default content into Sanity |

---

## VS Code

The repo includes [`.vscode/launch.json`](../.vscode/launch.json) to debug `astro dev` and [`.vscode/extensions.json`](../.vscode/extensions.json) recommending the Astro extension.

---

## Next steps

1. [Concepts Glossary](02-concepts-glossary.md) — define unfamiliar terms
2. [What is Astro?](02-what-is-astro.md) — how the framework works
3. [Sanity to HTML](03-sanity-to-html.md) — how CMS content reaches the page
4. [Architecture](04-architecture.md) — full system picture

For deployment and account ownership, see [HANDOFF.md](../HANDOFF.md).
