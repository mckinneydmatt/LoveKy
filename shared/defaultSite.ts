/** Site content used when Sanity is unavailable or a CMS field is empty. */
export const defaultSite = {
  name: 'Love, Ky Cakes',
  tagline: 'For people with good taste',
  description:
    'Home-based bakery in Carmel, Indiana specializing in cakes, made with personal care and a signature heart.',
  contact: {
    email: 'lovekycakes@gmail.com',
    phone: '317-771-0627',
    hours: 'Call or text 8am–8pm, Monday–Saturday',
    location: 'Carmel, Indiana',
    address: {
      street: '35 Rosewalk Circle',
      city: 'Carmel',
      state: 'IN',
      zip: '46032',
    },
  },
  social: {
    links: [
      {
        icon: 'instagram' as const,
        name: 'Instagram',
        url: 'https://instagram.com/love.kycakes',
        label: '@love.kycakes',
      },
      {
        icon: 'tiktok' as const,
        name: 'TikTok',
        url: 'https://www.tiktok.com/@lovekycakes',
        label: '@lovekycakes',
      },
      {
        icon: 'facebook' as const,
        name: 'Facebook',
        url: 'https://www.facebook.com/people/Love-Ky-Cakes/61590607383689/',
        label: 'Love, Ky Cakes',
      },
    ],
  },
  home: {
    heroImage: '/images/chocolate-cake-hero.png',
    spotlight: {
      title: 'The Cake',
      subhead: 'One Cake. Made for You.',
      text: "A two-layer chocolate cake with whipped icing — made from scratch, to order, in my own kitchen. Every single one. No shortcuts, no assembly lines, just me and a recipe I've been perfecting for over a decade. The kind of cake people remember.",
      ingredientNote:
        "Real ingredients. Sugar, flour, cocoa, eggs, milk, vanilla, heavy cream — nothing you can't pronounce.",
      ctaLabel: 'Order Yours',
      secondaryLine: 'Made to order | Home-baked in Carmel, Indiana',
      image: '/images/chocolate-cake-spotlight.png',
    },
  },
  order: {
    intro: 'Free delivery within 30 miles of Carmel. Mileage beyond that is 73¢ per mile.',
    deliveryNote: 'Kylee will confirm your order and delivery details.',
    disclaimer: 'Made in a home kitchen not tested by the health department.',
    message: [
      "Every cake I make goes out the door the way you'd send something to someone you care about — made with intention, finished with care, and meant to make someone's day a little sweeter. That's not a promise I take lightly. Whether it's for a birthday or just another Tuesday, I want what's in that box to feel like it was made just for you. Because it was.",
      'So thank you for your order, and I hope you enjoy every slice.',
    ],
  },
  about: {
    title: "Hi, I'm Kylee.",
    subhead: 'One-woman kitchen. One really good chocolate cake.',
    image: null,
    signatureImage: '/signature/signature-powder-blush.png',
    paragraphs: [
      "I've been baking for over 10 years, but this cake – <em>the</em> cake – started with my mom's birthday. I made it for her, and from that moment on, my family never let me forget it. Birthdays, holidays, random Tuesdays – someone was always asking for it. Then friends started asking. Then co-workers. And every time, without fail, I'd hear the same thing:",
      '<em>"Kylee, you could sell this."</em>',
      "I'd smile, say thank you, and move on. I had a career in accounting. I had a plan. I had a routine.",
      'Then something happened that way too many people can relate to: my company eliminated my position.',
      "For the first time in my adult life, I didn't have a job. And I found myself asking: <em>What do I actually want to do?</em>",
      'The answer surprised me: I want to share my chocolate cake with people. The support I instantly got from loved ones gave me more confidence than 20 years at a desk ever could. And so here we are.',
      'The name means something.',
      "<em>Love, Ky</em> is how I've been signing notes for as long as I can remember, and a friend pointed out that I always sign with a heart. Genuine love and care goes into everything I do. Every cake that leaves my kitchen goes out the same way – signed <em>Love, Ky</em> with a heart – because that's not branding. That's just how I do things.",
      'And food is how I show love.',
      "There's something irreplaceable about making something from scratch for someone else. I believe people can taste the time and care that goes into it. Food has a way of making people feel seen, remembered, and cared for without a single word.",
      "That's how I want every one of my cakes to make people feel. Whether it's for a milestone birthday or just because someone needs a little sweetness in their week – I want what's in that box to feel like it was made just for you.",
      'Because it was.',
    ],
    pullQuote: 'The name means something.',
    galleryPhotos: [
      {image: null, side: 'right' as const},
      {image: null, side: 'left' as const},
    ],
  },
  reviews: [
    {
      quote: 'Review coming soon.',
      author: 'Love, Ky Cakes customer',
      isPlaceholder: true,
    },
    {
      quote: 'Review coming soon.',
      author: 'Love, Ky Cakes customer',
      isPlaceholder: true,
    },
  ],
  logos: {
    primary: '/logos/primary-black.png',
    primaryOnDark: '/logos/primary-red-heart.png',
    secondary: '/logos/secondary-white.png',
    header: '/logos/header.png',
  },
  formEndpoints: {
    order: '',
  },
  seo: {
    about:
      'Meet Ky, the Carmel, Indiana baker behind Love, Ky Cakes. Home-based bakery with more than 10 years of experience making cakes with personal care.',
    contact:
      'Contact Love, Ky Cakes by phone, text, or email. Call or text 8am–8pm, Monday–Saturday. Free delivery within 30 miles of Carmel.',
    order:
      'Order a 10-inch chocolate cake with whipped chocolate frosting from Love, Ky Cakes. Free delivery within 30 miles of Carmel.',
    reviews:
      'Customer reviews for Love, Ky Cakes, a home bakery in Carmel, Indiana specializing in cakes.',
  },
} as const
