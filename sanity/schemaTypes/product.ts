import {defineField, defineType} from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  description:
    'Cakes customers can order. Shown on the Order page. If you delete all products, the site falls back to the default chocolate cake in code — but empty fields on a product here stay empty on the site.',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Full cake name. Shown on the Order page product summary and sent in order emails. No per-field fallback.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      description: 'URL-friendly ID for this product. Used internally — not shown on the site.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (regular)',
      type: 'string',
      description: 'Display price, e.g. "$55". Shown on the Order page under the cake name. No per-field fallback — leave empty to hide the price.',
    }),
    defineField({
      name: 'glutenFreePrice',
      title: 'Price (gluten-free)',
      type: 'string',
      description:
        'Display price when the customer selects Gluten-Free cake type, e.g. "$65". Leave empty if this cake has no gluten-free option.',
    }),
    defineField({
      name: 'servingInfo',
      title: 'Serving info',
      type: 'string',
      description:
        'Short serving/yield note shown under the cake name in the Choose Your Cake list, e.g. "Serves 12 generously — up to 24 smaller party servings". Optional.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Short blurb about this cake. Shown on the Order page under the price. No per-field fallback.',
    }),
    defineField({
      name: 'active',
      title: 'Available to order',
      type: 'boolean',
      initialValue: true,
      description: 'Turn off to hide this cake from the Order page without deleting it.',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      initialValue: 0,
      description: 'Order cakes appear when multiple are active. Lower numbers appear first.',
    }),
  ],
  orderings: [
    {
      title: 'Sort order',
      name: 'sortOrderAsc',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'price'},
  },
})
