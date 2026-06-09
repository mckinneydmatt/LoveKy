import {defineCliConfig} from 'sanity/cli'
import {activeDataset, activeProjectId, loadSanityEnv} from '../loadSanityEnv.mjs'

loadSanityEnv()

export default defineCliConfig({
  api: {
    projectId: activeProjectId(),
    dataset: activeDataset(),
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    appId: 'xtihmtgctxoipku27j3e728a',
  }
})
