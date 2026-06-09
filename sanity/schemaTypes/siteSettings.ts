import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Business name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Site description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      fields: [
        defineField({name: 'email', title: 'Email', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'phone', title: 'Phone', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'hours', title: 'Hours', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'location', title: 'Location', type: 'string', validation: (rule) => rule.required()}),
        defineField({
          name: 'address',
          title: 'Kitchen address',
          type: 'object',
          fields: [
            defineField({name: 'street', title: 'Street', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'city', title: 'City', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'state', title: 'State', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'zip', title: 'ZIP', type: 'string', validation: (rule) => rule.required()}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'social',
      title: 'Social',
      type: 'object',
      fields: [
        defineField({
          name: 'links',
          title: 'Social links',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Instagram', value: 'instagram'},
                      {title: 'TikTok', value: 'tiktok'},
                      {title: 'Facebook', value: 'facebook'},
                    ],
                  },
                  validation: (rule) => rule.required(),
                }),
                defineField({name: 'name', title: 'Platform name', type: 'string', validation: (rule) => rule.required()}),
                defineField({name: 'url', title: 'URL', type: 'url', validation: (rule) => rule.required()}),
                defineField({name: 'label', title: 'Display label', type: 'string', validation: (rule) => rule.required()}),
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
      fields: [
        defineField({
          name: 'heroImage',
          title: 'Hero image',
          type: 'image',
          options: {hotspot: true},
          description: 'Optional. Falls back to the default chocolate cake hero if empty.',
        }),
        defineField({
          name: 'spotlight',
          title: 'Cake spotlight',
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'subhead', title: 'Subhead', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'text', title: 'Body text', type: 'text', rows: 4, validation: (rule) => rule.required()}),
            defineField({name: 'ingredientNote', title: 'Ingredient note', type: 'text', rows: 2}),
            defineField({name: 'ctaLabel', title: 'CTA button label', type: 'string'}),
            defineField({name: 'secondaryLine', title: 'Secondary line', type: 'string'}),
            defineField({
              name: 'image',
              title: 'Spotlight photo',
              type: 'image',
              options: {hotspot: true},
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Order page',
      type: 'object',
      description: 'Shared copy for the order page. Cakes are managed under Products.',
      fields: [
        defineField({name: 'intro', title: 'Order intro', type: 'text', rows: 2, validation: (rule) => rule.required()}),
        defineField({
          name: 'deliveryNote',
          title: 'Delivery note',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'disclaimer',
          title: 'Disclaimer',
          type: 'text',
          rows: 2,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'message',
          title: 'Order closing message',
          type: 'array',
          of: [defineArrayMember({type: 'text', rows: 3})],
        }),
      ],
    }),
    defineField({
      name: 'about',
      title: 'About',
      type: 'object',
      fields: [
        defineField({name: 'title', title: 'Page title', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'subhead', title: 'Subhead', type: 'string', validation: (rule) => rule.required()}),
        defineField({
          name: 'pullQuote',
          title: 'Pull quote paragraph',
          type: 'string',
          description: 'Must match one bio paragraph exactly for special styling.',
        }),
        defineField({
          name: 'paragraphs',
          title: 'Bio paragraphs',
          type: 'array',
          of: [defineArrayMember({type: 'text', rows: 3})],
          validation: (rule) => rule.required().min(1),
        }),
        defineField({
          name: 'ownerImage',
          title: 'Owner photo',
          type: 'image',
          options: {hotspot: true},
        }),
        defineField({
          name: 'galleryPhotos',
          title: 'Gallery photos',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({name: 'image', title: 'Photo', type: 'image', options: {hotspot: true}}),
                defineField({
                  name: 'side',
                  title: 'Tilt side',
                  type: 'string',
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
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'quote', title: 'Quote', type: 'text', rows: 3, validation: (rule) => rule.required()}),
            defineField({name: 'author', title: 'Author', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'isPlaceholder', title: 'Placeholder review', type: 'boolean', initialValue: false}),
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
      fields: [
        defineField({name: 'about', title: 'About page', type: 'text', rows: 2}),
        defineField({name: 'contact', title: 'Contact page', type: 'text', rows: 2}),
        defineField({name: 'order', title: 'Order page', type: 'text', rows: 2}),
        defineField({name: 'reviews', title: 'Reviews page', type: 'text', rows: 2}),
      ],
    }),
    defineField({
      name: 'formspreeOrderEndpoint',
      title: 'Formspree order endpoint',
      type: 'string',
      description: 'Form action URL for the order form. Leave empty until Formspree is set up.',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
