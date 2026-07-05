# Love, Ky Cakes

Static marketing and order-request website for a home bakery in Carmel, Indiana. Built with Astro, styled with Tailwind, content managed in Sanity CMS, orders submitted via Formspree.

## Quick start

```bash
npm install
npm run dev          # http://localhost:4321
npm run sanity:dev   # CMS Studio → http://localhost:3333
npm run build        # Production build → dist/
```

Requires Node.js 22.12+.

## Documentation

- **[Developer docs](docs/README.md)** — codebase walkthrough for developers (Astro, Sanity pipeline, every source file)
- **[HANDOFF.md](HANDOFF.md)** — deployment, accounts, and site owner operations

## Stack

Astro 6 · Tailwind CSS 4 · Sanity CMS · Formspree · Netlify

No SQL database or custom backend — content is fetched from Sanity at build time into static HTML.
