# Contact Page (`contact.astro`)

**Route:** `/contact`  
**File:** [`src/pages/contact.astro`](../src/pages/contact.astro)

**Purpose:** Phone, email, hours, location. No form — directs users to order page.

---

## Frontmatter (lines 1–8)

`getSite()` and `pageDescriptions(site)` for contact meta.

---

## Sanity vs hardcoded

| Content | Source |
|---------|--------|
| Phone, email, hours, location | **CMS** — `site.contact.*` |
| Meta description | **CMS** — `site.seo.contact` |
| Intro paragraph (lines 13–16) | **Hardcoded** — not editable in Sanity |
| Section headings "Call or text", "Email" | **Hardcoded** |
| CTA button text | **Hardcoded** |

---

## Template (lines 10–50)

Two cards:

1. **Phone** — `tel:` link with `site.contact.phone`, hours below
2. **Email** — `mailto:` link with `site.contact.email`, location below

Button links to `/order`.

---

## See also

- [Site Settings contact fields](../10-sanity-studio/schemas.md)
