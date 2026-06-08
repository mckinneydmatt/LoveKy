import type { APIRoute } from "astro";
import type Stripe from "stripe";
import { getStripeClient } from "../../lib/stripe";

export const prerender = false;

function formatOrderLog(session: Stripe.Checkout.Session): string {
  const metadata = session.metadata ?? {};
  return [
    "New paid order",
    `Customer: ${metadata.name ?? "unknown"} (${metadata.email ?? session.customer_email ?? "no email"})`,
    `Phone: ${metadata.phone ?? "n/a"}`,
    `Product: ${metadata.product ?? "n/a"}`,
    `Quantity: ${metadata.quantity ?? "1"}`,
    `Delivery date: ${metadata.deliveryDate ?? "n/a"}`,
    `Address: ${metadata.deliveryAddress ?? ""}, ${metadata.deliveryCity ?? ""} ${metadata.deliveryZip ?? ""}`,
    `Instructions: ${metadata.instructions || "none"}`,
    `Stripe session: ${session.id}`,
    `Amount paid: ${session.amount_total != null ? `$${(session.amount_total / 100).toFixed(2)}` : "n/a"}`,
  ].join("\n");
}

export const POST: APIRoute = async ({ request }) => {
  const webhookSecret = import.meta.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return new Response("Webhook secret not configured", { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Missing Stripe signature", { status: 400 });
  }

  const stripe = getStripeClient();
  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.info(formatOrderLog(session));
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
