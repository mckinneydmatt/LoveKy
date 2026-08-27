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
    address?: {
      street?: string;
      city?: string;
      state?: string;
      zip?: string;
    };
  };
  social?: {
    links?: Array<{
      icon?: "instagram" | "tiktok" | "facebook";
      name?: string;
      url?: string;
      label?: string;
    }>;
  };
  home?: {
    carouselPhotos?: Array<SanityImageSource & {alt?: string}>;
    spotlight?: {
      title?: string;
      subhead?: string;
      text?: string;
      ingredientNote?: string;
      ctaLabel?: string;
      secondaryLine?: string;
      image?: SanityImageSource;
    };
  };
  order?: {
    intro?: string;
    deliveryNote?: string;
    disclaimer?: string;
    message?: string[];
    form?: {
      chooseCakeLabel?: string;
      selectedSummaryLabel?: string;
      nameLabel?: string;
      emailLabel?: string;
      phoneLabel?: string;
      deliveryDateLabel?: string;
      quantityLabel?: string;
      instructionsLabel?: string;
      instructionsPlaceholder?: string;
      ingredientsLabel?: string;
      disclaimerAckLabel?: string;
      submitLabel?: string;
      errorMessage?: string;
      successHeading?: string;
      successQuestionsLabel?: string;
    };
  };
  about?: {
    title?: string;
    subhead?: string;
    pullQuote?: string;
    paragraphs?: string[];
    ownerImage?: SanityImageSource;
    galleryPhotos?: Array<{
      image?: SanityImageSource;
      side?: "left" | "right";
    }>;
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
