import { defaultSite, type SiteConfig } from "../../content/site";
import { urlFor, type SanitySiteSettingsDoc } from "./types";

export function mapSiteSettings(doc: SanitySiteSettingsDoc): SiteConfig {
  const ownerImage = doc.about?.ownerImage
    ? urlFor(doc.about.ownerImage).width(800).auto("format").url()
    : null;

  return {
    name: doc.name ?? defaultSite.name,
    tagline: doc.tagline ?? defaultSite.tagline,
    description: doc.description ?? defaultSite.description,
    contact: {
      email: doc.contact?.email ?? defaultSite.contact.email,
      phone: doc.contact?.phone ?? defaultSite.contact.phone,
      hours: doc.contact?.hours ?? defaultSite.contact.hours,
      location: doc.contact?.location ?? defaultSite.contact.location,
    },
    social: {
      instagram: doc.social?.instagramUrl ?? defaultSite.social.instagram,
      handle: doc.social?.instagramHandle ?? defaultSite.social.handle,
    },
    order: {
      product: doc.order?.product ?? defaultSite.order.product,
      price: doc.order?.price ?? defaultSite.order.price,
      intro: doc.order?.intro ?? defaultSite.order.intro,
      deliveryNote: doc.order?.deliveryNote ?? defaultSite.order.deliveryNote,
      disclaimer: doc.order?.disclaimer ?? defaultSite.order.disclaimer,
      ingredients: doc.order?.ingredients ?? defaultSite.order.ingredients,
      message: doc.order?.message?.length ? doc.order.message : defaultSite.order.message,
    },
    about: {
      image: ownerImage,
      signatureImage: defaultSite.about.signatureImage,
      paragraphs: doc.about?.paragraphs?.length
        ? doc.about.paragraphs
        : defaultSite.about.paragraphs,
    },
    reviews:
      doc.reviews?.map((review) => ({
        quote: review.quote ?? "",
        author: review.author ?? "",
        isPlaceholder: review.isPlaceholder ?? false,
      })) ?? defaultSite.reviews,
    logos: defaultSite.logos,
    formEndpoints: {
      order: doc.formspreeOrderEndpoint ?? defaultSite.formEndpoints.order,
    },
    seo: {
      about: doc.seo?.about ?? defaultSite.seo.about,
      contact: doc.seo?.contact ?? defaultSite.seo.contact,
      order: doc.seo?.order ?? defaultSite.seo.order,
      reviews: doc.seo?.reviews ?? defaultSite.seo.reviews,
    },
  };
}
