import type { APIRoute } from "astro";
import { site } from "../../content/site";
import { parseCheckoutBody } from "../../lib/orderValidation";
import { getStripeClient, isStripeConfigured } from "../../lib/stripe";

export const prerender = false;

export const POST: APIRoute = async ({ request, url }) => {
  if (!isStripeConfigured()) {
    return new Response(JSON.stringify({ error: "Payment is not configured yet" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const parsed = parseCheckoutBody(body);
  if ("error" in parsed) {
    return new Response(JSON.stringify({ error: parsed.error }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const stripe = getStripeClient();
  const origin = url.origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: parsed.email,
      line_items: [
        {
          quantity: parsed.quantity,
          price_data: {
            currency: "usd",
            unit_amount: site.order.priceCents,
            product_data: {
              name: site.order.product,
            },
          },
        },
      ],
      success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/order?canceled=1`,
      metadata: {
        name: parsed.name,
        email: parsed.email,
        phone: parsed.phone,
        deliveryDate: parsed.deliveryDate,
        quantity: String(parsed.quantity),
        deliveryAddress: parsed.deliveryAddress,
        deliveryCity: parsed.deliveryCity,
        deliveryZip: parsed.deliveryZip,
        instructions: parsed.instructions,
        product: site.order.product,
      },
    });

    if (!session.url) {
      return new Response(JSON.stringify({ error: "Unable to start checkout" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Stripe checkout session error:", error);
    return new Response(JSON.stringify({ error: "Unable to start checkout" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
