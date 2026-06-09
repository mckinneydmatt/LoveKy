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
      ],
    }),
    defineField({
      name: 'social',
      title: 'Social',
      type: 'object',
      fields: [
        defineField({
          name: 'instagramUrl',
          title: 'Instagram URL',
          type: 'url',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'instagramHandle',
          title: 'Instagram handle',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'object',
      description: 'Shared copy for the order page. Individual cakes are managed under Products.',
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
