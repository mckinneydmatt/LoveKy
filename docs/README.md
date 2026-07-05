# Developer Documentation — Love, Ky Cakes

Detailed developer docs for the bakery website codebase. Written for readers with basic web knowledge — terms are defined as they appear.

---

## Recommended reading order

1. [Getting Started](01-getting-started.md) — install and run locally
2. [Concepts Glossary](02-concepts-glossary.md) — define unfamiliar terms
3. [What is Astro?](02-what-is-astro.md) — how the framework works
4. [Sanity to HTML](03-sanity-to-html.md) — **how CMS content becomes the live website**
5. [Architecture](04-architecture.md) — full system picture

Then dive into specific areas as needed.

---

## Quick start

```bash
npm install
npm run dev          # Website → http://localhost:4321
npm run sanity:dev   # CMS Studio → http://localhost:3333
npm run build        # Production build → dist/
```

---

## Documentation index

### Foundation

| Doc | Description |
|-----|-------------|
| [01-getting-started.md](01-getting-started.md) | Prerequisites, install, folder tour |
| [02-concepts-glossary.md](02-concepts-glossary.md) | Term definitions |
| [02-what-is-astro.md](02-what-is-astro.md) | Astro framework primer |
| [03-sanity-to-html.md](03-sanity-to-html.md) | CMS → Astro → HTML pipeline |
| [04-architecture.md](04-architecture.md) | System diagram and external services |
| [05-config-and-env.md](05-config-and-env.md) | astro.config, env loading |

### Data layer

| Doc | Description |
|-----|-------------|
| [06-data-layer/overview.md](06-data-layer/overview.md) | getSite / getProducts overview |
| [06-data-layer/content-types.md](06-data-layer/content-types.md) | SiteConfig, Product, SEO types |
| [06-data-layer/sanity-integration.md](06-data-layer/sanity-integration.md) | Client, GROQ queries |
| [06-data-layer/loaders-and-mappers.md](06-data-layer/loaders-and-mappers.md) | Fetch and map functions |
| [06-data-layer/fallback-data.md](06-data-layer/fallback-data.md) | shared/defaultSite.ts |

### Frontend

| Doc | Description |
|-----|-------------|
| [07-pages/index.md](07-pages/index.md) | Page routes index |
| [07-pages/home.md](07-pages/home.md) | Homepage |
| [07-pages/order.md](07-pages/order.md) | Order page |
| [07-pages/about.md](07-pages/about.md) | About page |
| [07-pages/contact.md](07-pages/contact.md) | Contact page |
| [07-pages/reviews.md](07-pages/reviews.md) | Reviews page |
| [08-components/overview.md](08-components/overview.md) | Components index |
| [08-components/navbar-footer.md](08-components/navbar-footer.md) | Navbar, Footer, SocialIcon |
| [08-components/order-form.md](08-components/order-form.md) | OrderForm (detailed) |
| [08-components/review-instagram.md](08-components/review-instagram.md) | ReviewCard, InstagramEmbed |
| [09-layout-and-styles.md](09-layout-and-styles.md) | BaseLayout, global.css |

### Sanity Studio

| Doc | Description |
|-----|-------------|
| [10-sanity-studio/overview.md](10-sanity-studio/overview.md) | What Studio is |
| [10-sanity-studio/schemas.md](10-sanity-studio/schemas.md) | Field → HTML mapping |
| [10-sanity-studio/config-and-seed.md](10-sanity-studio/config-and-seed.md) | Config and seed scripts |

### Flows

| Doc | Description |
|-----|-------------|
| [11-order-flow.md](11-order-flow.md) | Formspree order submission |
| [12-build-and-deploy.md](12-build-and-deploy.md) | Build process and deploy timing |

---

## Other documentation

| Doc | Audience |
|-----|----------|
| [HANDOFF.md](../HANDOFF.md) | Site owner — accounts, Netlify, webhooks, domain |
| [sanity/README.md](../sanity/README.md) | Sanity Studio quick pointer |

---

## Project summary

- **Stack:** Astro 6 + Tailwind 4 + Sanity CMS + Formspree
- **No SQL database** — Sanity Content Lake stores JSON documents
- **No backend API** — static HTML; order form POSTs to Formspree from the browser
- **Content updates** require a site rebuild to appear in production
