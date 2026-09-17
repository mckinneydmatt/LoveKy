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
    carouselPhotos: [
      {
        src: '/carousel/love ky cakes-97.jpg',
        alt: 'Overhead view of a chocolate sprinkle cake with a slice cut out, next to a plated slice',
      },
      {
        src: '/carousel/love ky cakes-6.jpg',
        alt: 'Round cake with smooth icing on a dark wood pedestal stand, with playful shadow-puppet hands reaching toward it',
      },
      {
        src: '/carousel/love ky cakes-44.jpg',
        alt: 'Several to-go containers of chocolate cake tied with white string',
      },
      {
        src: '/carousel/love ky cakes-16.jpg',
        alt: 'Pink Love, Ky Cakes business card with a heart accent',
      },
      {
        src: '/carousel/love ky cakes-115.jpg',
        alt: 'Close-up of chocolate sprinkles on a frosted cake with a slice cut out',
      },
    ],
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
    intro: "Select your cake, customize it below, and let us know when and where you'd like it. Pickup and delivery details are part of the form.",
    deliveryNote: 'Kylee will confirm your order and delivery details.',
    message: [
      "Every cake I make goes out the door the way you'd send something to someone you care about — made with intention, finished with care, and meant to make someone's day a little sweeter. That's not a promise I take lightly. Whether it's for a birthday or just another Tuesday, I want what's in that box to feel like it was made just for you. Because it was.",
      'So thank you for your order, and I hope you enjoy every slice.',
    ],
    ingredients: {
      heading: 'Ingredients & Allergen Information',
      sections: [
        {
          heading: 'Signature Chocolate Cake',
          body: 'Sugar, flour, cocoa powder, baking soda, baking powder, salt, eggs, milk, vegetable oil and vanilla.',
        },
        {
          heading: 'Signature Whipped Chocolate Frosting',
          body: 'Heavy whipping cream, powdered sugar, cocoa powder and vanilla.',
        },
        {
          heading: 'Whipped Vanilla Bean Frosting',
          body: 'Heavy whipping cream, powdered sugar, vanilla extract and vanilla bean paste.',
        },
        {
          heading: 'Gluten-Free Chocolate Cake',
          body: 'Made with King Arthur Gluten-Free Measure for Measure Flour in place of traditional flour.',
        },
        {
          heading: 'Contains',
          body: 'Milk and eggs.',
        },
        {
          heading: 'Gluten-Free Note',
          body: 'Our gluten-free cakes are made with gluten-free ingredients; however, they are prepared in a commercial kitchen where products containing wheat are also prepared.',
        },
      ],
    },
    form: {
      chooseCakeLabel: 'Choose your cake',
      selectedSummaryLabel: 'Selected cake summary',
      cakeType: {
        label: 'Cake Type',
        regularLabel: 'Regular',
        glutenFreeLabel: 'Gluten-Free',
      },
      frosting: {
        label: 'Frosting',
        options: ['Signature Whipped Chocolate', 'Whipped Vanilla Bean'],
      },
      sprinkles: {
        label: 'Sprinkles',
        options: [
          {label: 'Chocolate Sprinkles', showsNoteField: false, notePlaceholder: ''},
          {label: 'No Sprinkles', showsNoteField: false, notePlaceholder: ''},
          {
            label: 'Fun Sprinkles',
            showsNoteField: true,
            notePlaceholder: 'Any colors in mind? (Pink, blue, rainbow, etc.)',
          },
        ],
      },
      nameLabel: 'Name',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      deliveryDateLabel: 'Preferred date',
      fulfillment: {
        label: 'Pickup or Delivery',
        options: [
          {
            label: "Kokomo Pickup – Marty's",
            description: "Free pickup at Marty's Place Market & Kitchen, Monday–Saturday during business hours.",
            requiresAddress: false,
          },
          {
            label: 'Carmel Delivery',
            description: 'Free delivery to Carmel addresses.',
            requiresAddress: true,
          },
          {
            label: 'Outside Carmel',
            description: '$10 delivery fee for addresses up to 25 miles from downtown Carmel.',
            requiresAddress: true,
          },
          {
            label: 'Beyond 25 Miles',
            description:
              'Delivery is not available. Customers may contact Kylee to discuss possible pickup arrangements.',
            requiresAddress: false,
          },
        ],
        addressLabel: 'Delivery address',
      },
      celebratingLabel: 'What are you celebrating?',
      instructionsLabel: 'Special instructions',
      instructionsPlaceholder: 'Anything else I should know about your order?',
      hearAboutUs: {
        label: 'How did you hear about Love, Ky Cakes?',
        options: [
          {label: 'Friend or family', showsNoteField: false, notePlaceholder: ''},
          {label: 'Instagram', showsNoteField: false, notePlaceholder: ''},
          {label: 'Facebook', showsNoteField: false, notePlaceholder: ''},
          {label: 'Google', showsNoteField: false, notePlaceholder: ''},
          {label: '@startswithaquestion', showsNoteField: false, notePlaceholder: ''},
          {label: "Marty's", showsNoteField: false, notePlaceholder: ''},
          {label: 'Returning customer', showsNoteField: false, notePlaceholder: ''},
          {label: 'Other', showsNoteField: true, notePlaceholder: 'Please tell us more'},
        ],
      },
      submitDisclaimer:
        'Submitting this form does not confirm your order. Kylee will contact you to confirm availability and order details.',
      submitLabel: 'Submit Order Request',
      errorMessage: 'Something went wrong sending your request. Please try again, or call or text us directly.',
      successHeading: 'Thank you!',
      successQuestionsLabel: 'Questions? Reach us at',
    },
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
    primary: '/logos/primary-blue.png',
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
    contact: 'Contact Love, Ky Cakes by phone, text, or email. Call or text 8am–8pm, Monday–Saturday.',
    order:
      'Order a Signature Chocolate Cake or Signature Mini Cakes from Love, Ky Cakes in Carmel, Indiana. Pickup and delivery options available.',
    reviews:
      'Customer reviews for Love, Ky Cakes, a home bakery in Carmel, Indiana specializing in cakes.',
  },
} as const
