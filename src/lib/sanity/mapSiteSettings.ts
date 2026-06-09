import { defaultSite, type GalleryPhoto, type SiteConfig, type SocialLink } from "../../content/site";
import { urlFor, type SanitySiteSettingsDoc } from "./types";

export function mapSiteSettings(doc: SanitySiteSettingsDoc): SiteConfig {
  const ownerImage = doc.about?.ownerImage
    ? urlFor(doc.about.ownerImage).width(800).auto("format").url()
    : defaultSite.about.image;

  const heroImage = doc.home?.heroImage
    ? urlFor(doc.home.heroImage).width(1200).auto("format").url()
    : defaultSite.home.heroImage;

  const spotlightImage = doc.home?.spotlight?.image
    ? urlFor(doc.home.spotlight.image).width(1080).auto("format").url()
    : defaultSite.home.spotlight.image;

  const socialLinks: SocialLink[] =
    doc.social?.links?.length
      ? doc.social.links.map((link) => ({
          icon: link.icon ?? "instagram",
          name: link.name ?? "",
          url: link.url ?? "",
          label: link.label ?? "",
        }))
      : defaultSite.social.links;

  const galleryPhotos: GalleryPhoto[] =
    doc.about?.galleryPhotos?.length
      ? doc.about.galleryPhotos.map((photo, index) => ({
          image: photo.image
            ? urlFor(photo.image).width(640).auto("format").url()
            : (defaultSite.about.galleryPhotos[index]?.image ?? null),
          side: photo.side ?? defaultSite.about.galleryPhotos[index]?.side ?? "right",
        }))
      : defaultSite.about.galleryPhotos;

  return {
    name: doc.name ?? defaultSite.name,
    tagline: doc.tagline ?? defaultSite.tagline,
    description: doc.description ?? defaultSite.description,
    contact: {
      email: doc.contact?.email ?? defaultSite.contact.email,
      phone: doc.contact?.phone ?? defaultSite.contact.phone,
      hours: doc.contact?.hours ?? defaultSite.contact.hours,
      location: doc.contact?.location ?? defaultSite.contact.location,
      address: {
        street: doc.contact?.address?.street ?? defaultSite.contact.address.street,
        city: doc.contact?.address?.city ?? defaultSite.contact.address.city,
        state: doc.contact?.address?.state ?? defaultSite.contact.address.state,
        zip: doc.contact?.address?.zip ?? defaultSite.contact.address.zip,
      },
    },
    social: {
      links: socialLinks,
    },
    home: {
      heroImage,
      spotlight: {
        title: doc.home?.spotlight?.title ?? defaultSite.home.spotlight.title,
        subhead: doc.home?.spotlight?.subhead ?? defaultSite.home.spotlight.subhead,
        text: doc.home?.spotlight?.text ?? defaultSite.home.spotlight.text,
        ingredientNote:
          doc.home?.spotlight?.ingredientNote ?? defaultSite.home.spotlight.ingredientNote,
        ctaLabel: doc.home?.spotlight?.ctaLabel ?? defaultSite.home.spotlight.ctaLabel,
        secondaryLine:
          doc.home?.spotlight?.secondaryLine ?? defaultSite.home.spotlight.secondaryLine,
        image: spotlightImage,
      },
    },
    order: {
      intro: doc.order?.intro ?? defaultSite.order.intro,
      deliveryNote: doc.order?.deliveryNote ?? defaultSite.order.deliveryNote,
      disclaimer: doc.order?.disclaimer ?? defaultSite.order.disclaimer,
      message: doc.order?.message?.length ? doc.order.message : defaultSite.order.message,
    },
    about: {
      title: doc.about?.title ?? defaultSite.about.title,
      subhead: doc.about?.subhead ?? defaultSite.about.subhead,
      image: ownerImage,
      signatureImage: defaultSite.about.signatureImage,
      paragraphs: doc.about?.paragraphs?.length
        ? doc.about.paragraphs
        : defaultSite.about.paragraphs,
      pullQuote: doc.about?.pullQuote ?? defaultSite.about.pullQuote,
      galleryPhotos,
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
