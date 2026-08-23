import {defineArrayMember, defineField, defineType} from 'sanity'
import {fallbackHint, noFallbackHint, site, siteFallback} from './fallbackPlaceholders'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  description: 'Business info, homepage, about page, and shared site copy.',
  fields: [
    defineField({
      name: 'name',
      title: 'Business name',
      type: 'string',
      description: `Business name. Used in the browser tab, footer copyright, and page titles. ${fallbackHint}`,
      placeholder: siteFallback(site.name),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: `Short tagline under the logo on the homepage and in the footer. ${fallbackHint}`,
      placeholder: siteFallback(site.tagline),
    }),
    defineField({
      name: 'description',
      title: 'Site description',
      type: 'text',
      rows: 3,
      description: `One-sentence summary of the bakery. Shown on the homepage hero and in search/social previews. ${fallbackHint}`,
      placeholder: siteFallback(site.description),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      description: 'Contact details shown on the Contact page, footer, and order form.',
      fields: [
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          description: `Contact email. Shown on the Contact page and footer. ${fallbackHint}`,
          placeholder: siteFallback(site.contact.email),
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'phone',
          title: 'Phone',
          type: 'string',
          description: `Phone number. Shown on the Contact page and footer. ${fallbackHint}`,
          placeholder: siteFallback(site.contact.phone),
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'hours',
          title: 'Hours',
          type: 'string',
          description: `Business hours. Shown on the Contact page and footer. ${fallbackHint}`,
          placeholder: siteFallback(site.contact.hours),
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'location',
          title: 'Location',
          type: 'string',
          description: `City/area label. Shown on the Contact page. ${fallbackHint}`,
          placeholder: siteFallback(site.contact.location),
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'address',
          title: 'Kitchen address',
          type: 'object',
          description: 'Home kitchen address. Shown in the footer and on the order form disclaimer.',
          fields: [
            defineField({
              name: 'street',
              title: 'Street',
              type: 'string',
              description: `Street address. Shown in the footer and order form. ${fallbackHint}`,
              placeholder: siteFallback(site.contact.address.street),
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'city',
              title: 'City',
              type: 'string',
              description: `City. Shown in the footer and order form. ${fallbackHint}`,
              placeholder: siteFallback(site.contact.address.city),
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'state',
              title: 'State',
              type: 'string',
              description: `State abbreviation. Shown in the footer and order form. ${fallbackHint}`,
              placeholder: siteFallback(site.contact.address.state),
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'zip',
              title: 'ZIP',
              type: 'string',
              description: `ZIP code. Shown in the footer and order form. ${fallbackHint}`,
              placeholder: siteFallback(site.contact.address.zip),
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'social',
      title: 'Social',
      type: 'object',
      description: `Social media links shown in the footer. If you remove all links, the site restores the default set from code. ${noFallbackHint}`,
      fields: [
        defineField({
          name: 'links',
          title: 'Social links',
          type: 'array',
          description: 'Add one entry per platform. Each link appears in the footer "Follow along" section.',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  description: 'Which icon to display in the footer.',
                  options: {
                    list: [
                      {title: 'Instagram', value: 'instagram'},
                      {title: 'TikTok', value: 'tiktok'},
                      {title: 'Facebook', value: 'facebook'},
                    ],
                  },
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'name',
                  title: 'Platform name',
                  type: 'string',
                  description: 'Platform name for accessibility.',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                  description: 'Full profile URL. Used as the link in the footer.',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'label',
                  title: 'Display label',
                  type: 'string',
                  description: 'Visible link text in the footer.',
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {
                select: {title: 'name', subtitle: 'label'},
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'home',
      title: 'Homepage',
      type: 'object',
      description: 'Content for the homepage hero and cake spotlight section.',
      fields: [
        defineField({
          name: 'carouselPhotos',
          title: 'Hero carousel photos',
          type: 'array',
          description:
            'Rotating photos shown in the homepage hero carousel. Add, remove, or reorder photos here. If you remove all photos, the site restores the default set of cake photos from code.',
          of: [
            defineArrayMember({
              type: 'image',
              options: {hotspot: true},
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt text',
                  type: 'string',
                  description:
                    'Short description of the photo for screen readers and search engines (e.g. "Chocolate cake with sprinkles on a wood cake stand").',
                  validation: (rule) => rule.required().warning('Alt text helps with accessibility and SEO'),
                }),
              ],
              preview: {
                select: {title: 'alt', media: 'asset'},
              },
            }),
          ],
          validation: (rule) => rule.max(10).warning('Keep the carousel to about 10 photos or fewer for fast loading'),
        }),
        defineField({
          name: 'spotlight',
          title: 'Cake spotlight',
          type: 'object',
          description: '"The Cake" section on the homepage, below the hero.',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: `Main heading in the homepage spotlight section. ${fallbackHint}`,
              placeholder: siteFallback(site.home.spotlight.title),
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'subhead',
              title: 'Subhead',
              type: 'string',
              description: `Bold line under the spotlight title on the homepage. ${fallbackHint}`,
              placeholder: siteFallback(site.home.spotlight.subhead),
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Body text',
              type: 'text',
              rows: 4,
              description: `Main paragraph in the homepage spotlight section. ${fallbackHint}`,
              placeholder: siteFallback(site.home.spotlight.text),
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'ingredientNote',
              title: 'Ingredient note',
              type: 'text',
              rows: 2,
              description: `Smaller note about ingredients, shown below the spotlight body text. ${fallbackHint}`,
              placeholder: siteFallback(site.home.spotlight.ingredientNote),
            }),
            defineField({
              name: 'ctaLabel',
              title: 'CTA button label',
              type: 'string',
              description: `Text on the "Order" button in the spotlight section. ${fallbackHint}`,
              placeholder: siteFallback(site.home.spotlight.ctaLabel),
            }),
            defineField({
              name: 'secondaryLine',
              title: 'Secondary line',
              type: 'string',
              description: `Small line under the spotlight button. ${fallbackHint}`,
              placeholder: siteFallback(site.home.spotlight.secondaryLine),
            }),
            defineField({
              name: 'image',
              title: 'Spotlight photo',
              type: 'image',
              options: {hotspot: true},
              description:
                'Tall cake photo on the left side of the homepage spotlight section. Leave empty until you have a photo you own and can use on the site — a temporary placeholder image is shown until you upload one here.',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Order page',
      type: 'object',
      description: 'Shared copy for the Order page. Individual cakes are managed under Products.',
      fields: [
        defineField({
          name: 'intro',
          title: 'Order intro',
          type: 'text',
          rows: 2,
          description: `Paragraph under the "Good Taste Awaits..." heading on the Order page. ${fallbackHint}`,
          placeholder: siteFallback(site.order.intro),
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'deliveryNote',
          title: 'Delivery note',
          type: 'string',
          description: `Small note under the cake price on the Order page. ${fallbackHint}`,
          placeholder: siteFallback(site.order.deliveryNote),
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'disclaimer',
          title: 'Disclaimer',
          type: 'text',
          rows: 2,
          description: `Legal disclaimer above the checkbox on the Order page. ${fallbackHint}`,
          placeholder: siteFallback(site.order.disclaimer),
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'message',
          title: 'Order closing message',
          type: 'array',
          description: `Personal note(s) shown in the box below the order form. If you remove all items, the site restores the default paragraphs from code. ${fallbackHint}`,
          of: [
            defineArrayMember({
              type: 'text',
              rows: 3,
              placeholder: siteFallback(site.order.message[0]),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'about',
      title: 'About',
      type: 'object',
      description: 'Content for the About page.',
      fields: [
        defineField({
          name: 'title',
          title: 'Page title',
          type: 'string',
          description: `Main heading at the top of the About page. ${fallbackHint}`,
          placeholder: siteFallback(site.about.title),
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'subhead',
          title: 'Subhead',
          type: 'string',
          description: `Bold line under the About page title. ${fallbackHint}`,
          placeholder: siteFallback(site.about.subhead),
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'pullQuote',
          title: 'Pull quote paragraph',
          type: 'string',
          description: `Must match one bio paragraph exactly — that paragraph gets special styling on the About page. ${fallbackHint}`,
          placeholder: siteFallback(site.about.pullQuote),
        }),
        defineField({
          name: 'paragraphs',
          title: 'Bio paragraphs',
          type: 'array',
          description: `Kylee's story, one paragraph per item. HTML like <em> tags is allowed. If you remove all items, the site restores the default bio from code. ${fallbackHint}`,
          of: [
            defineArrayMember({
              type: 'text',
              rows: 3,
              placeholder: siteFallback(site.about.paragraphs[0]),
            }),
          ],
          validation: (rule) => rule.required().min(1),
        }),
        defineField({
          name: 'ownerImage',
          title: 'Owner photo',
          type: 'image',
          options: {hotspot: true},
          description:
            'Main photo on the About page (right column). Leave empty until you have a photo you own — the site shows "Photo coming soon" until you upload one here.',
        }),
        defineField({
          name: 'galleryPhotos',
          title: 'Gallery photos',
          type: 'array',
          description:
            'Two smaller tilted photos below the main About photo. Leave slots empty until you have photos you own — the site shows "Photo coming soon" for empty slots.',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'image',
                  title: 'Photo',
                  type: 'image',
                  options: {hotspot: true},
                  description:
                    'Gallery image. Leave empty until you have a photo you own — the site shows "Photo coming soon" for this slot.',
                }),
                defineField({
                  name: 'side',
                  title: 'Tilt side',
                  type: 'string',
                  description: 'Which direction the photo tilts on the About page.',
                  options: {
                    list: [
                      {title: 'Right', value: 'right'},
                      {title: 'Left', value: 'left'},
                    ],
                  },
                  initialValue: 'right',
                }),
              ],
              preview: {
                select: {title: 'side', media: 'image'},
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      description: `Customer reviews shown on the Reviews page and the first two on the homepage. If you remove all reviews, the site restores the default placeholder reviews from code.`,
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 3,
              description: 'The review text. Required for each review you add.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'author',
              title: 'Author',
              type: 'string',
              description: 'Who wrote the review.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'isPlaceholder',
              title: 'Placeholder review',
              type: 'boolean',
              initialValue: false,
              description: 'Check to show faded "coming soon" styling instead of a real review.',
            }),
          ],
          preview: {
            select: {title: 'author', subtitle: 'quote'},
          },
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO descriptions',
      type: 'object',
      description: 'Short descriptions for search engines and social sharing. One per page.',
      fields: [
        defineField({
          name: 'about',
          title: 'About page',
          type: 'text',
          rows: 2,
          description: `Meta description for the About page (browser tab and Google). ${fallbackHint}`,
          placeholder: siteFallback(site.seo.about),
        }),
        defineField({
          name: 'contact',
          title: 'Contact page',
          type: 'text',
          rows: 2,
          description: `Meta description for the Contact page. ${fallbackHint}`,
          placeholder: siteFallback(site.seo.contact),
        }),
        defineField({
          name: 'order',
          title: 'Order page',
          type: 'text',
          rows: 2,
          description: `Meta description for the Order page. ${fallbackHint}`,
          placeholder: siteFallback(site.seo.order),
        }),
        defineField({
          name: 'reviews',
          title: 'Reviews page',
          type: 'text',
          rows: 2,
          description: `Meta description for the Reviews page. ${fallbackHint}`,
          placeholder: siteFallback(site.seo.reviews),
        }),
      ],
    }),
    defineField({
      name: 'formspreeOrderEndpoint',
      title: 'Formspree order endpoint',
      type: 'string',
      description:
        'Formspree URL (https://formspree.io/f/xxxxx). Powers the Order page submit button. No site fallback — if empty, the order button stays disabled.',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
