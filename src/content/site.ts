import { defaultSite as sharedDefaultSite } from "../../shared/defaultSite";

export interface SocialLink {
  icon: "instagram" | "tiktok" | "facebook";
  name: string;
  url: string;
  label: string;
}

export interface Review {
  quote: string;
  author: string;
  isPlaceholder: boolean;
}

export interface GalleryPhoto {
  image: string | null;
  side: "left" | "right";
}

export interface CarouselPhoto {
  src: string;
  alt: string;
}

export interface SiteConfig {
  name: string;
  tagline: string | null;
  description: string;
  contact: {
    email: string;
    phone: string;
    hours: string;
    location: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
  };
  social: {
    links: SocialLink[];
  };
  home: {
    carouselPhotos: CarouselPhoto[];
    spotlight: {
      title: string;
      subhead: string;
      text: string;
      ingredientNote: string;
      ctaLabel: string;
      secondaryLine: string;
      image: string;
    };
  };
  order: {
    intro: string;
    deliveryNote: string;
    message: string[];
    ingredients: {
      heading: string;
      sections: { heading: string; body: string }[];
    };
    form: {
      chooseCakeLabel: string;
      selectedSummaryLabel: string;
      cakeType: {
        label: string;
        regularLabel: string;
        glutenFreeLabel: string;
      };
      frosting: {
        label: string;
        options: string[];
      };
      sprinkles: {
        label: string;
        options: { label: string; showsNoteField: boolean; notePlaceholder: string }[];
      };
      nameLabel: string;
      emailLabel: string;
      phoneLabel: string;
      deliveryDateLabel: string;
      fulfillment: {
        label: string;
        options: { label: string; description: string; requiresAddress: boolean }[];
        addressLabel: string;
      };
      celebratingLabel: string;
      instructionsLabel: string;
      instructionsPlaceholder: string;
      hearAboutUs: {
        label: string;
        options: { label: string; showsNoteField: boolean; notePlaceholder: string }[];
      };
      submitDisclaimer: string;
      submitLabel: string;
      errorMessage: string;
      successHeading: string;
      successQuestionsLabel: string;
    };
  };
  about: {
    title: string;
    subhead: string;
    image: string | null;
    signatureImage: string;
    paragraphs: string[];
    pullQuote: string;
    galleryPhotos: GalleryPhoto[];
  };
  reviews: Review[];
  logos: {
    primary: string;
    primaryOnDark: string;
    secondary: string;
    header: string;
  };
  formEndpoints: {
    order: string;
  };
  seo: {
    about: string;
    contact: string;
    order: string;
    reviews: string;
  };
}

/** Fallback content when Sanity is unavailable or not configured. */
export const defaultSite: SiteConfig = sharedDefaultSite;

export function defaultMetaDescription(site: SiteConfig): string {
  return site.tagline ? `${site.tagline} — ${site.description}` : site.description;
}
