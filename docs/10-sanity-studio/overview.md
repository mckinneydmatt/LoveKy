# Sanity Studio Overview

**Folder:** [`sanity/`](../sanity/)  
**Live URL:** [love-ky-cakes.sanity.studio](https://love-ky-cakes.sanity.studio/)

---

## What Sanity Studio is

**Sanity Studio** is a React-based admin app for editing website content. It is **not** the public website — it is a separate application in the same repository.

| | Astro site | Sanity Studio |
|---|------------|---------------|
| Folder | `src/` | `sanity/` |
| Dev command | `npm run dev` | `npm run sanity:dev` |
| Port | 4321 | 3333 |
| Output | Static HTML for customers | Edits saved to Sanity cloud |
| Who uses it | Visitors | Kylee / content editors |

---

## How Studio connects to the website

1. Editor changes content in Studio → saves to **Sanity Content Lake**
2. Netlify runs `npm run build` on the Astro site
3. Astro fetches documents via GROQ → embeds in HTML

The website never embeds Studio. They share content through the Sanity API only.

Full pipeline: [Sanity to HTML](../03-sanity-to-html.md)

---

## Content types in this project

| Type | Studio sidebar | Documents |
|------|----------------|-----------|
| **Products** | Products list | One per cake (`product`) |
| **Site Settings** | Site Settings (singleton) | Exactly one (`_id: siteSettings`) |

Defined in [`schemaTypes/`](../sanity/schemaTypes/). See [schemas.md](schemas.md).

---

## Authentication

Studio requires Sanity login (Google or email). CLI seed scripts use `npx sanity login` token via `--with-user-token`.

The public website has no login.

---

## See also

- [Schemas](schemas.md)
- [Config and seed](config-and-seed.md)
- [HANDOFF.md](../HANDOFF.md) — ownership transfer
