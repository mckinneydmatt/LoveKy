export const site = {
  name: "Love, Ky Cakes",
  tagline: "For people with good taste" as string | null,
  description:
    "Home-based bakery in Carmel, Indiana specializing in cakes, made with personal care and a signature heart.",
  contact: {
    email: "lovekycakes@gmail.com",
    phone: "317-771-0627",
    hours: "Call or text 8am–8pm, Monday–Saturday",
    location: "Carmel, Indiana",
    address: {
      street: "35 Rosewalk Circle",
      city: "Carmel",
      state: "IN",
      zip: "46032",
    },
  },
  social: {
    links: [
      {
        icon: "instagram" as const,
        name: "Instagram",
        url: "https://instagram.com/love.kycakes",
        label: "@love.kycakes",
      },
      {
        icon: "tiktok" as const,
        name: "TikTok",
        url: "https://www.tiktok.com/@lovekycakes",
        label: "@lovekycakes",
      },
      {
        icon: "facebook" as const,
        name: "Facebook",
        url: "https://www.facebook.com/people/Love-Ky-Cakes/61590607383689/",
        label: "Love, Ky Cakes",
      },
    ],
  },
  home: {
    heroImage: "/images/chocolate-cake-hero.png",
    spotlight: {
      title: "The Cake",
      subhead: "One Cake. Made for You.",
      text: "A two-layer chocolate cake with whipped icing — made from scratch, to order, in my own kitchen. Every single one. No shortcuts, no assembly lines, just me and a recipe I've been perfecting for over a decade. The kind of cake people remember.",
      ingredientNote:
        "Real ingredients. Sugar, flour, cocoa, eggs, milk, vanilla, heavy cream — nothing you can't pronounce.",
      ctaLabel: "Order Yours",
      secondaryLine: "Made to order | Home-baked in Carmel, Indiana",
      image: "/images/chocolate-cake-spotlight.png",
    },
  },
  order: {
    product: "10-inch chocolate cake with whipped chocolate frosting",
    price: "$44",
    intro:
      "Free delivery within 30 miles of Carmel. Mileage beyond that is 73¢ per mile.",
    deliveryNote:
      "Kylee will confirm your order and delivery details.",
    disclaimer:
      "Made in a home kitchen not tested by the health department.",
    ingredients:
      "Sugar, flour, cocoa powder, baking powder, baking soda, salt, eggs, milk, vegetable oil, vanilla extract, powdered sugar, heavy cream",
    message: [
      "Every cake I make goes out the door the way you'd send something to someone you care about — made with intention, finished with care, and meant to make someone's day a little sweeter. That's not a promise I take lightly. Whether it's for a birthday or just another Tuesday, I want what's in that box to feel like it was made just for you. Because it was.",
      "So thank you for your order, and I hope you enjoy every slice.",
    ],
  },
  about: {
    image: null as string | null,
    signatureImage: "/signature/signature-powder-blush.png",
    paragraphs: [
      "I'm Kylee, the one-woman kitchen behind Love, Ky Cakes.",
      "I've been making my favorite chocolate cake for friends and family for years, and everyone always said the same thing: \"Kylee, this cake is so good you could sell it.\"",
      "I just smiled and said thank you. But life has a funny way of nudging you toward the things you love, and eventually I listened.",
      "So here we are.",
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
    order: "" as string,
  },
} as const;

export const defaultMetaDescription = site.tagline
  ? `${site.tagline} — ${site.description}`
  : site.description;

export type SiteConfig = typeof site;
