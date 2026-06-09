import {getCliClient} from 'sanity/cli'
import {activeDataset, loadSanityEnv} from '../../loadSanityEnv.mjs'

loadSanityEnv()
console.log(`Seeding products → dataset: ${activeDataset()}`)

const client = getCliClient({apiVersion: '2026-03-01'})

const products = [
  {
    _id: 'product-chocolate-cake',
    _type: 'product',
    name: '10-inch chocolate cake with whipped chocolate frosting',
    slug: {_type: 'slug', current: 'chocolate-cake'},
    price: '$44',
    description: null,
    ingredients:
      'Sugar, flour, cocoa powder, baking powder, baking soda, salt, eggs, milk, vegetable oil, vanilla extract, powdered sugar, heavy cream',
    active: true,
    sortOrder: 1,
  },
]

export default async function seedProducts() {
  for (const product of products) {
    await client.createOrReplace(product)
  }
  console.log(`Seeded ${products.length} product.`)
}

seedProducts().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
