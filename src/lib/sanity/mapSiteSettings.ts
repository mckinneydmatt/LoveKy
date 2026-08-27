import {
  defaultSite,
  type CarouselPhoto,
  type GalleryPhoto,
  type SiteConfig,
  type SocialLink,
} from "../../content/site";
import { urlFor, type SanitySiteSettingsDoc } from "./types";

export function mapSiteSettings(doc: SanitySiteSettingsDoc): SiteConfig {
  const ownerImage = doc.about?.ownerImage
    ? urlFor(doc.about.ownerImage).width(800).auto("format").url()
    : defaultSite.about.image;

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

  const carouselPhotos: CarouselPhoto[] =
    doc.home?.carouselPhotos?.length
      ? doc.home.carouselPhotos.map((photo, index) => ({
          src: urlFor(photo).width(1800).auto("format").url(),
          alt: photo.alt ?? defaultSite.home.carouselPhotos[index]?.alt ?? "",
        }))
      : defaultSite.home.carouselPhotos;

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
      carouselPhotos,
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
      form: {
        chooseCakeLabel: doc.order?.form?.chooseCakeLabel ?? defaultSite.order.form.chooseCakeLabel,
        selectedSummaryLabel:
          doc.order?.form?.selectedSummaryLabel ?? defaultSite.order.form.selectedSummaryLabel,
        nameLabel: doc.order?.form?.nameLabel ?? defaultSite.order.form.nameLabel,
        emailLabel: doc.order?.form?.emailLabel ?? defaultSite.order.form.emailLabel,
        phoneLabel: doc.order?.form?.phoneLabel ?? defaultSite.order.form.phoneLabel,
        deliveryDateLabel: doc.order?.form?.deliveryDateLabel ?? defaultSite.order.form.deliveryDateLabel,
        quantityLabel: doc.order?.form?.quantityLabel ?? defaultSite.order.form.quantityLabel,
        instructionsLabel: doc.order?.form?.instructionsLabel ?? defaultSite.order.form.instructionsLabel,
        instructionsPlaceholder:
          doc.order?.form?.instructionsPlaceholder ?? defaultSite.order.form.instructionsPlaceholder,
        ingredientsLabel: doc.order?.form?.ingredientsLabel ?? defaultSite.order.form.ingredientsLabel,
        disclaimerAckLabel:
          doc.order?.form?.disclaimerAckLabel ?? defaultSite.order.form.disclaimerAckLabel,
        submitLabel: doc.order?.form?.submitLabel ?? defaultSite.order.form.submitLabel,
        errorMessage: doc.order?.form?.errorMessage ?? defaultSite.order.form.errorMessage,
        successHeading: doc.order?.form?.successHeading ?? defaultSite.order.form.successHeading,
        successQuestionsLabel:
          doc.order?.form?.successQuestionsLabel ?? defaultSite.order.form.successQuestionsLabel,
      },
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
