import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

// SANITY_STUDIO_DATASET is exposed to the browser bundle; SANITY_DATASET alone is not.
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production'

export default defineConfig({
  name: 'default',
  title: dataset === 'production' ? 'Bakery Site' : `Bakery Site (${dataset})`,

  projectId: '1bzd5noi',
  dataset,

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
