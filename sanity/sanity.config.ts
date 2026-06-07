import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {activeDataset, activeProjectId, loadSanityEnv} from '../loadSanityEnv.mjs'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

loadSanityEnv()
const dataset = activeDataset()

export default defineConfig({
  name: 'default',
  title: dataset === 'production' ? 'Bakery Site' : `Bakery Site (${dataset})`,

  projectId: activeProjectId(),
  dataset,

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
