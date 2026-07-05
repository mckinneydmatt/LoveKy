# Order Page (`order.astro`)

**Route:** `/order`  
**File:** [`src/pages/order.astro`](../src/pages/order.astro)

**Purpose:** Order request form and post-form message. No payment — leads go to Formspree.

---

## Frontmatter (lines 1–11)

| Line | Purpose |
|------|---------|
| 8 | `getSite()` — order copy, Formspree URL, contact for form |
| 9 | `getProducts()` — **Pipeline step 6 for products** |
| 10 | SEO description from `site.seo.order` |

Only page that calls both `getSite()` and `getProducts()`.

---

## Sanity fields used

| UI element | Source |
|------------|--------|
| Page meta description | Site Settings → SEO → Order |
| Intro paragraph | Site Settings → Order → Intro |
| Form products | Products collection (active only) |
| Delivery note in form | Site Settings → Order → Delivery note |
| Disclaimer | Site Settings → Order → Disclaimer |
| Message block below form | Site Settings → Order → Message (array) |
| Formspree URL | Site Settings → Formspree order endpoint |

Product fields: name, price, description, ingredients — from each `product` document.

---

## Template (lines 13–41)

1. **Heading** — "Good Taste Awaits..." (hardcoded)
2. **`site.order.intro`** — CMS intro text
3. **`<OrderForm site={site} products={products} />`** — passes all form data as props
4. **Message section** — loops `site.order.message` paragraphs with spacing between items

---

## See also

- [Order form component](../08-components/order-form.md)
- [Order flow](../11-order-flow.md)
- [Products schema](../10-sanity-studio/schemas.md)
