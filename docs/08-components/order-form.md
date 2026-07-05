# OrderForm Component

**File:** [`src/components/OrderForm.astro`](../src/components/OrderForm.astro) (~370 lines)

**Purpose:** Order **request** form (not checkout). Collects customer info and POSTs to Formspree. Product data comes from Sanity at build time; submission happens in the browser at runtime.

**Used by:** [`order.astro`](../src/pages/order.astro)

---

## Frontmatter (lines 1–16)

```typescript
interface Props {
  site: SiteConfig;
  products: Product[];
}

const { site, products } = Astro.props;

const formAction = site.formEndpoints.order || undefined;
const defaultProduct = products[0];
const priceDisplay = defaultProduct?.price ?? "Price TBD";
const multipleProducts = products.length > 1;
```

| Variable | Purpose |
|----------|---------|
| `formAction` | Formspree URL from Sanity; `undefined` if not configured |
| `defaultProduct` | First product (by `sortOrder`) for initial summary |
| `multipleProducts` | Show radio picker only if more than one product |

---

## Template: wrapper and form (lines 18–26)

```html
<div id="order-form-wrapper">
<form id="order-form" method="POST" action={formAction} data-endpoint={formAction}>
```

- **`method="POST"`** — standard form submit (intercepted by JS)
- **`data-endpoint`** — script checks this before attaching submit handler
- **`action`** — Formspree URL baked into HTML at build time

---

## Form config notice (lines 27–36)

If `!formAction`, shows message directing editor to Sanity Site Settings. Submit button disabled (line 233).

---

## Product selection (lines 38–80)

Only rendered when `multipleProducts`:

- `<fieldset>` with radio inputs per product
- Each `<label>` has `data-product-*` attributes for client JS
- Displays name, price, description from Sanity `Product`

**Pipeline:** Products from GROQ → `getProducts()` → props → HTML labels.

---

## Selected product summary (lines 82–99)

Always visible block showing:

- Product name (`defaultProduct.name`)
- Price (`priceDisplay`)
- Description (hidden if empty via `class:list`)
- `site.order.deliveryNote` from CMS

Updated by client JS when user picks different radio.

---

## Customer fields (lines 101–184)

| Field | `name` attribute | Required | Notes |
|-------|------------------|----------|-------|
| Name | `name` | yes | `autocomplete="name"` |
| Email | `email` | yes | |
| Phone | `phone` | yes | |
| Delivery date | `delivery-date` | yes | Min date set by JS (tomorrow) |
| Quantity | `quantity` | no | Default 1 |
| Product (hidden) | `product` | — | Cake name sent to Formspree |
| Instructions | `instructions` | no | Textarea |

All use `class="form-input"` from global CSS.

---

## Ingredients (lines 186–195)

Shown if `defaultProduct.ingredients` exists. `#selected-product-ingredients` updated by JS on product change.

---

## Disclaimer (lines 197–218)

- `site.order.disclaimer` text from CMS
- Kitchen address from `site.contact.address`
- Required checkbox `disclaimer-ack`

---

## Error and submit (lines 220–237)

- `#order-form-error` — hidden until failed submit
- Submit button disabled when no Formspree URL

---

## Success panel (lines 240–262)

Hidden until successful submit. Shows thank-you, delivery note, email/phone links from `site.contact`.

---

## Client script: delivery date (lines 265–271)

```typescript
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
dateInput.min = tomorrow.toISOString().split("T")[0];
```

Prevents selecting today or past dates. Runs once when page loads in browser.

---

## Client script: product selection (lines 273–321)

`updateSelectedProduct(label)` reads `dataset.productName`, etc. from selected label and updates:

- Hidden `#product` input (sent to Formspree)
- Summary heading, price, description
- Ingredients section visibility

Radio `change` listeners call this when user picks a different cake.

---

## Client script: Formspree submit (lines 323–368)

Only runs if `orderForm.dataset.endpoint` is set.

```typescript
orderForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  // ... loading state ...
  const response = await fetch(orderForm.action, {
    method: "POST",
    body: new FormData(orderForm),
    headers: { Accept: "application/json" },
  });
```

| Step | Behavior |
|------|----------|
| `preventDefault()` | Stop normal navigation to Formspree |
| `FormData(orderForm)` | Collect all named fields |
| `Accept: application/json` | Formspree returns JSON (no redirect) |
| `response.ok` | Hide form, show success panel, scroll into view |
| Error | Show alert, re-enable button |

**Runtime only:** Browser POSTs to Formspree — not Sanity, not Astro server.

---

## What happens if this breaks

| Issue | Symptom |
|-------|---------|
| No Formspree URL in CMS | Notice shown, submit disabled |
| Formspree down | Error alert, user can retry |
| No products | Empty form headings; hidden product field empty |
| JS disabled | Native form POST may redirect to Formspree (fallback) |

---

## See also

- [Order flow](../11-order-flow.md)
- [Order page](../07-pages/order.md)
- [Products schema](../10-sanity-studio/schemas.md)
