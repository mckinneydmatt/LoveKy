export interface Review {
  quote: string;
  author: string;
  isPlaceholder: boolean;
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
  };
  social: {
    instagram: string;
    handle: string;
  };
  order: {
    product: string;
    price: string | null;
    intro: string;
    deliveryNote: string;
    disclaimer: string;
    ingredients: string | null;
    message: string[];
  };
  about: {
    image: string | null;
    signatureImage: string;
    paragraphs: string[];
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
export const defaultSite: SiteConfig = {
  name: "Love, Ky Cakes",
  tagline: "For people with good taste",
  description:
    "Home-based bakery in Carmel, Indiana specializing in cakes, made with personal care and a signature heart.",
  contact: {
    email: "lovekycakes@gmail.com",
    phone: "317-771-0627",
    hours: "Call or text 8am–8pm, Monday–Saturday",
    location: "Carmel, Indiana",
  },
  social: {
    instagram: "https://instagram.com/love.kycakes",
    handle: "@love.kycakes",
  },
  order: {
    product: "10-inch chocolate cake with whipped chocolate frosting",
    price: "$44",
    intro: "Free delivery within 30 miles of Carmel. Mileage beyond that is 73¢ per mile.",
    deliveryNote: "Kylee will confirm your order and delivery details.",
    disclaimer: "Made in a home kitchen not tested by the health department.",
    ingredients: null,
    message: [
      "Every cake I make goes out the door the way you'd send something to someone you care about — made with intention, finished with care, and meant to make someone's day a little sweeter. That's not a promise I take lightly. Whether it's for a birthday or just another Tuesday, I want what's in that box to feel like it was made just for you. Because it was.",
      "So thank you for your order, and I hope you enjoy every slice.",
    ],
  },
  about: {
    image: null,
    signatureImage: "/signature/signature-powder-blush.png",
    paragraphs: [
      "I'm Kylee, the one-woman kitchen behind Love, Ky Cakes.",
      "I've been making my favorite chocolate cake for friends and family for years, and everyone always said the same thing: \"Kylee, this cake is so good you could sell it.\"",
      "I just smiled and said thank you. But life has a funny way of nudging you toward the things you love, and eventually I listened.",
      "So here we are.",
      "Love, Ky Cakes.",
    ],
  },
  reviews: [
    {
      quote: "Review coming soon.",
      author: "Love, Ky Cakes customer",
      isPlaceholder: true,
    },
    {
      quote: "Review coming soon.",
      author: "Love, Ky Cakes customer",
      isPlaceholder: true,
    },
  ],
  logos: {
    primary: "/logos/primary-black.png",
    primaryOnDark: "/logos/primary-red-heart.png",
    secondary: "/logos/secondary-white.png",
    header: "/logos/header.png",
  },
  formEndpoints: {
    order: "",
  },
  seo: {
    about:
      "Meet Ky, the Carmel, Indiana baker behind Love, Ky Cakes. Home-based bakery with more than 10 years of experience making cakes with personal care.",
    contact:
      "Contact Love, Ky Cakes by phone, text, or email. Call or text 8am–8pm, Monday–Saturday. Free delivery within 30 miles of Carmel.",
    order:
      "Order a 10-inch chocolate cake with whipped chocolate frosting from Love, Ky Cakes. Free delivery within 30 miles of Carmel.",
    reviews:
      "Customer reviews for Love, Ky Cakes, a home bakery in Carmel, Indiana specializing in cakes.",
  },
};

export function defaultMetaDescription(site: SiteConfig): string {
  return site.tagline ? `${site.tagline} — ${site.description}` : site.description;
}
