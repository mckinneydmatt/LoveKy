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
    description:
      'Rich chocolate layers with whipped chocolate frosting — the original Love, Ky Cakes favorite.',
    ingredients: null,
    active: true,
    sortOrder: 1,
  },
  {
    _id: 'product-vanilla-bean-cake',
    _type: 'product',
    name: '10-inch vanilla bean cake with buttercream frosting',
    slug: {_type: 'slug', current: 'vanilla-bean-cake'},
    price: '$42',
    description:
      'Classic vanilla bean cake with smooth buttercream — light, simple, and crowd-pleasing.',
    ingredients: null,
    active: true,
    sortOrder: 2,
  },
  {
    _id: 'product-red-velvet-cake',
    _type: 'product',
    name: '10-inch red velvet cake with cream cheese frosting',
    slug: {_type: 'slug', current: 'red-velvet-cake'},
    price: '$48',
    description:
      'Velvety red layers with tangy cream cheese frosting — a celebration classic.',
    ingredients: null,
    active: true,
    sortOrder: 3,
  },
]

export default async function seedProducts() {
  for (const product of products) {
    await client.createOrReplace(product)
  }
  console.log(`Seeded ${products.length} products.`)
}

seedProducts().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
