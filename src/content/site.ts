export const site = {
  name: "Love, Ky Cakes",
  tagline: null as string | null,
  description:
    "Home-based bakery in Carmel, Indiana specializing in 10-inch chocolate cakes, made with personal care and a signature heart.",
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
    product: "10-inch chocolate cake",
    price: null as string | null,
    pickupNote:
      "Pickup in Carmel, Indiana. Full address provided after your order is confirmed.",
    disclaimer:
      "Made in a home kitchen not tested by the health department.",
    ingredients: null as string | null,
  },
  about: {
    image: null as string | null,
    signatureImage: "/signature/signature-powder-blush.png",
    paragraphs: [
      "Ky is the heart behind Love, Ky, a home-based bakery in Carmel, Indiana. She has been baking for more than 10 years, starting with a chocolate cake she made for her mom's birthday that quickly became a family favorite and the cake people kept asking for again and again.",
      "After spending 20 years in accounting, Ky decided to turn a difficult career change into something meaningful: sharing the cake her friends, family, and coworkers had loved for years. Baking gives her a way to create something from scratch, care for people, and make everyday moments feel special.",
      "The name Love, Ky comes from the way she has signed letters for years, with love and her signature heart. Every cake carries that same spirit: personal, heartfelt, and made with genuine care.",
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
  },
  formEndpoints: {
    order: "" as string,
  },
} as const;

export type SiteConfig = typeof site;
