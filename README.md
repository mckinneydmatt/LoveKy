# Love, Ky Cakes

Astro site for [Love, Ky Cakes](https://lovekycakes.com) with online ordering and Stripe Checkout.

## Commands

| Command | Action |
| :------ | :----- |
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build for production (Netlify static + serverless API routes) |
| `npm run preview` | Preview the production build locally |

## Stripe setup (test mode)

1. Create a [Stripe account](https://dashboard.stripe.com/register) and stay in **test mode**.
2. Copy `.env.example` to `.env` and set your test secret key:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   ```
3. Restart the dev server after changing `.env`.
4. Open `/order`, fill out the form, and pay with a [Stripe test card](https://docs.stripe.com/testing#cards) (e.g. `4242 4242 4242 4242`).

No pre-created Stripe Product is required — checkout uses inline `price_data` from `src/content/site.ts` (`priceCents`).

## Netlify deploy

1. Connect the repo to Netlify and set the build command to `npm run build`.
2. Add environment variables in **Site settings → Environment variables**:
   - `STRIPE_SECRET_KEY` — use `sk_test_...` for staging, `sk_live_...` for production
   - `STRIPE_WEBHOOK_SECRET` — from the webhook endpoint (step 3)
3. After the first deploy, register a webhook in the [Stripe Dashboard](https://dashboard.stripe.com/webhooks):
   - Endpoint URL: `https://lovekycakes.com/api/stripe-webhook` (or your Netlify preview URL while testing)
   - Events: `checkout.session.completed`
   - Copy the signing secret into `STRIPE_WEBHOOK_SECRET` on Netlify
4. Redeploy or trigger a new build so the webhook secret is available.

Completed orders are logged from the webhook handler. Check Netlify function logs or the Stripe Dashboard during the draft phase.

## Local webhook testing

Use the [Stripe CLI](https://stripe.com/docs/stripe-cli) to forward events to your dev server:

```sh
stripe listen --forward-to localhost:4321/api/stripe-webhook
```

Copy the webhook signing secret the CLI prints into `STRIPE_WEBHOOK_SECRET` in `.env`, then restart `npm run dev`.

## Order flow

1. Customer completes the order form on `/order` (includes delivery address).
2. The site creates a Stripe Checkout Session via `/api/checkout`.
3. Customer pays on Stripe's hosted checkout page.
4. Stripe redirects to `/order/success`.
5. Stripe sends `checkout.session.completed` to `/api/stripe-webhook` with order metadata.

Delivery mileage beyond 30 miles of Carmel is **not** charged automatically in this draft — Kylee confirms any additional fee after the order.

## Project structure

```text
src/
  components/OrderForm.astro   # Order form → Stripe Checkout
  content/site.ts              # Product copy and priceCents
  lib/stripe.ts                # Server-side Stripe client
  lib/orderValidation.ts       # Checkout request validation
  pages/api/checkout.ts        # Create Checkout Session
  pages/api/stripe-webhook.ts  # Payment completion webhook
  pages/order.astro            # Order page
  pages/order/success.astro    # Post-payment confirmation
```
