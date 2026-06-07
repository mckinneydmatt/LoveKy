import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET ?? "production";

export function isSanityConfigured(): boolean {
  return Boolean(projectId);
}

export function urlFor(source: SanityImageSource) {
  if (!projectId) {
    throw new Error("Sanity project ID is not configured");
  }
  return createImageUrlBuilder({ projectId, dataset }).image(source);
}

export interface SanitySiteSettingsDoc {
  name?: string;
  tagline?: string | null;
  description?: string;
  contact?: {
    email?: string;
    phone?: string;
    hours?: string;
    location?: string;
  };
  social?: {
    instagramUrl?: string;
    instagramHandle?: string;
  };
  order?: {
    intro?: string;
    deliveryNote?: string;
    disclaimer?: string;
    message?: string[];
  };
  about?: {
    paragraphs?: string[];
    ownerImage?: SanityImageSource;
  };
  reviews?: Array<{
    quote?: string;
    author?: string;
    isPlaceholder?: boolean;
  }>;
  seo?: {
    about?: string;
    contact?: string;
    order?: string;
    reviews?: string;
  };
  formspreeOrderEndpoint?: string | null;
}

export interface SanityProductDoc {
  _id?: string;
  name?: string;
  slug?: { current?: string };
  price?: string | null;
  description?: string | null;
  ingredients?: string | null;
}
