import Stripe from "stripe";

export function getStripeSecretKey(): string | undefined {
  return import.meta.env.STRIPE_SECRET_KEY;
}

export function isStripeConfigured(): boolean {
  return Boolean(getStripeSecretKey());
}

export function getStripeClient(): Stripe {
  const secretKey = getStripeSecretKey();
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }

  return new Stripe(secretKey);
}
