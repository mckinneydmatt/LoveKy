export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  name,
  tagline,
  description,
  contact,
  social,
  order,
  about{
    paragraphs,
    ownerImage
  },
  reviews,
  seo,
  formspreeOrderEndpoint
}`;

export const PRODUCTS_QUERY = `*[_type == "product" && active == true] | order(sortOrder asc) {
  _id,
  name,
  slug,
  price,
  description,
  ingredients
}`;
