import {createReadStream} from 'node:fs'
import {resolve} from 'node:path'
import {getCliClient} from 'sanity/cli'
import {activeDataset, loadSanityEnv} from '../../loadSanityEnv.mjs'

loadSanityEnv()
console.log(`Seeding carousel photos → dataset: ${activeDataset()}`)

const client = getCliClient({apiVersion: '2026-03-01'})

const photos = [
  {
    file: 'love ky cakes-97.jpg',
    key: 'carousel-97',
    alt: 'Overhead view of a chocolate sprinkle cake with a slice cut out on a wooden stand, next to a plated slice, a dish of chocolate sprinkles, and eucalyptus greenery',
  },
  {
    file: 'love ky cakes-6.jpg',
    key: 'carousel-6',
    alt: 'Round cake with smooth mocha buttercream on a dark wood pedestal stand, with playful shadow-puppet hands reaching toward it',
  },
  {
    file: 'love ky cakes-44.jpg',
    key: 'carousel-44',
    alt: 'Several to-go containers of piped chocolate buttercream tied with white string, being arranged by hand on a marble counter',
  },
  {
    file: 'love ky cakes-16.jpg',
    key: 'carousel-16',
    alt: 'Pink Love, Ky Cakes business card with a heart accent, resting on a woven fabric surface',
  },
  {
    file: 'love ky cakes-115.jpg',
    key: 'carousel-115',
    alt: 'Macro close-up of chocolate sprinkles on a frosted cake with a slice cut out',
  },
]

export default async function seedCarouselPhotos() {
  await client.createIfNotExists({_id: 'siteSettings', _type: 'siteSettings'})

  const carouselPhotos = []
  for (const photo of photos) {
    const filePath = resolve(import.meta.dirname, '../../public/carousel', photo.file)
    console.log(`Uploading ${photo.file}...`)
    const asset = await client.assets.upload('image', createReadStream(filePath), {
      filename: photo.file,
    })
    carouselPhotos.push({
      _key: photo.key,
      _type: 'image',
      asset: {_type: 'reference', _ref: asset._id},
      alt: photo.alt,
    })
  }

  await client.patch('siteSettings').set({'home.carouselPhotos': carouselPhotos}).commit()
  console.log(`Set ${carouselPhotos.length} carousel photos on siteSettings.`)
}

seedCarouselPhotos().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
