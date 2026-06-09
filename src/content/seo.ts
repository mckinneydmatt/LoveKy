import type { SiteConfig } from "./site";

/** Update in astro.config.mjs when the live domain is confirmed. */
export const siteUrl = "https://lovekycakes.com";

export function defaultOgImage(site: SiteConfig): string {
  return site.logos.primaryOnDark;
}

export function pageDescriptions(site: SiteConfig) {
  return {
    home: site.tagline ? `${site.tagline} — ${site.description}` : site.description,
    about: site.seo.about,
    contact: site.seo.contact,
    order: site.seo.order,
    reviews: site.seo.reviews,
  };
}

export function pageTitle(site: SiteConfig, title: string) {
  return title === "Home" ? site.name : `${site.name} | ${title}`;
}

export function absoluteUrl(pathname: string, origin: string) {
  return new URL(pathname, origin).href;
}

export function localBusinessSchema(site: SiteConfig, origin: string) {
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
      streetAddress: site.contact.address.street,
      addressLocality: site.contact.address.city,
      addressRegion: site.contact.address.state,
      postalCode: site.contact.address.zip,
      addressCountry: "US",
    },
    areaServed: site.contact.location,
    sameAs: site.social.links.map((link) => link.url),
  };
}
