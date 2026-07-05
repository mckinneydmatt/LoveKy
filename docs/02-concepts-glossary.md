# Concepts Glossary

This glossary defines terms used throughout the developer docs. If you are new to web development, read this page first, then continue to [What is Astro?](02-what-is-astro.md) and [Sanity to HTML](03-sanity-to-html.md).

---

## Web basics

### HTML

**HTML** (HyperText Markup Language) is the standard language for web pages. Browsers read HTML files and display headings, paragraphs, images, and links. When this project builds, Astro produces HTML files in the `dist/` folder.

### CSS

**CSS** (Cascading Style Sheets) controls how HTML looks: colors, fonts, spacing, layout. This project uses **Tailwind CSS**, a utility-first framework where you apply small class names like `text-blue-slate` directly in HTML.

### JavaScript

**JavaScript** is a programming language that runs in the browser to add interactivity (mobile menus, form submission). In Astro, JavaScript in `<script>` blocks is sent to the browser. JavaScript in frontmatter runs at build time on the server.

### Static website

A **static website** serves pre-built HTML files. There is no server generating a new page on every visit. Netlify hosts the `dist/` folder as plain files. This is fast and simple.

### Static Site Generation (SSG)

**Static Site Generation** means pages are built once (with `npm run build`) into HTML files, not created fresh for each visitor. See [What is Astro?](02-what-is-astro.md) for how Astro does this.

---

## Frameworks and tools

### Astro

A web framework that turns `.astro` source files into static HTML. See the full chapter: [What is Astro?](02-what-is-astro.md).

### TypeScript

**TypeScript** is JavaScript with type annotations. Types like `SiteConfig` describe the shape of data objects so mistakes are caught during development. Files use `.ts` or `.astro` with TypeScript in frontmatter.

### Node.js

**Node.js** runs JavaScript outside the browser — on your computer or on Netlify's build servers. You need Node.js 22+ to develop and build this project.

### npm

**npm** (Node Package Manager) installs libraries listed in `package.json` and runs scripts like `npm run dev` and `npm run build`.

---

## Content and data

### CMS (Content Management System)

A **CMS** is software for editing website content without changing code. Editors use a friendly interface; the website reads that content.

### Headless CMS

A **headless CMS** separates content editing from the website display. **Sanity Studio** is the editing UI; the **Astro site** fetches content and renders HTML. They are different apps connected by an API. See [Sanity to HTML](03-sanity-to-html.md).

### Sanity CMS

**Sanity** is the headless CMS used by this project. Content is stored as JSON **documents** in Sanity's cloud (**Content Lake**). The Astro site fetches documents at build time using **GROQ** queries.

### Document (Sanity)

In Sanity, a **document** is one content record — like one row in a spreadsheet, but flexible JSON. Examples: one `siteSettings` document for all site copy, multiple `product` documents for cakes.

### GROQ

**GROQ** (Graph-Relational Object Queries) is Sanity's query language. It fetches documents from the Content Lake. Think of it like SQL for Sanity:

| SQL idea | GROQ equivalent in this project |
|----------|--------------------------------|
| `SELECT name FROM site_settings` | `*[_type == "siteSettings"][0]{ name }` |
| `WHERE active = true` | `*[_type == "product" && active == true]` |
| `ORDER BY sort_order` | `\| order(sortOrder asc)` |

There is **no SQL database** in this repo. Sanity is the only persistent content store.

### API (Application Programming Interface)

An **API** is a way for programs to request data. `@sanity/client` calls Sanity's HTTP API during build to fetch documents.

### Environment variable (env var)

An **environment variable** is configuration stored outside code — for example `PUBLIC_SANITY_PROJECT_ID=1bzd5noi` in `sanity.env`. It tells the build where to find Sanity content without hardcoding secrets in source files.

---

## Build and runtime

### Build time

**Build time** is when `npm run build` (or `npm run dev` loading a page) runs Astro frontmatter and fetches Sanity. Data loading functions like `getSite()` run here — not in the visitor's browser.

### Runtime

**Runtime** is when a visitor's browser loads the finished HTML and runs client `<script>` blocks (e.g. order form submit). The browser does **not** call Sanity on normal page loads.

### Fallback

A **fallback** is backup content used when Sanity is unavailable or a field is empty. Hardcoded defaults live in [`shared/defaultSite.ts`](../shared/defaultSite.ts) and [`shared/defaultProducts.ts`](../shared/defaultProducts.ts).

---

## External services

### Formspree

**Formspree** is a third-party service that receives form POST requests and sends email notifications. The order form posts to a Formspree URL stored in Sanity. No custom backend is needed.

### Netlify

**Netlify** hosts the static site. It runs `npm run build` and serves the `dist/` folder. Deployment details are in [HANDOFF.md](../HANDOFF.md).

---

## Project-specific terms

### Frontmatter

The JavaScript/TypeScript block between `---` markers at the top of an `.astro` file. Runs at build time. Example: `const site = await getSite();`

### SiteConfig

The TypeScript type ([`src/content/site.ts`](../src/content/site.ts)) describing all site-wide content: business name, contact info, homepage copy, reviews, etc.

### Product

The TypeScript type ([`src/content/products.ts`](../src/content/products.ts)) describing one orderable cake: name, price, description, ingredients.

---

## See also

- [What is Astro?](02-what-is-astro.md)
- [Sanity to HTML pipeline](03-sanity-to-html.md)
- [Architecture overview](04-architecture.md)
