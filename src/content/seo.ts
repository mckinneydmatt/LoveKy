import { site, defaultMetaDescription } from "./site";

/** Update in astro.config.mjs when the live domain is confirmed. */
export const siteUrl = "https://lovekycakes.com";

export const defaultOgImage = site.logos.primaryOnDark;

export const pageDescriptions = {
  home: defaultMetaDescription,
  about:
    "Meet Ky, the Carmel, Indiana baker behind Love, Ky Cakes. Home-based bakery with more than 10 years of experience making cakes with personal care.",
  contact: `Contact ${site.name} by phone, text, or email. ${site.contact.hours}. ${site.order.intro}`,
  order: `Order and pay online for a ${site.order.product} from ${site.name}. Free delivery within 30 miles of Carmel.`,
  reviews: `Customer reviews for ${site.name}, a home bakery in Carmel, Indiana specializing in cakes.`,
} as const;

export function pageTitle(title: string) {
  return title === "Home" ? site.name : `${site.name} | ${title}`;
}

export function absoluteUrl(pathname: string, origin: string) {
  return new URL(pathname, origin).href;
}

export function localBusinessSchema(origin: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: site.name,
    description: site.description,
    url: origin,
    email: site.contact.email,
    telephone: site.contact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Carmel",
      addressRegion: "IN",
      addressCountry: "US",
    },
    areaServed: site.contact.location,
    sameAs: [site.social.instagram],
  };
}
