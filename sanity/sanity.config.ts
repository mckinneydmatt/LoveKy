import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

// sanity.cli.ts loads sanity.env in Node before this bundle runs — no fs imports here.
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production'
const projectId = process.env.PUBLIC_SANITY_PROJECT_ID ?? '1bzd5noi'

export default defineConfig({
  name: 'default',
  title: dataset === 'production' ? 'Bakery Site' : `Bakery Site (${dataset})`,

  projectId,
  dataset,

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
