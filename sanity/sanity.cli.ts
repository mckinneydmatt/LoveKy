import {defineCliConfig} from 'sanity/cli'
import {activeDataset, loadRootEnv} from './loadRootEnv'

loadRootEnv()

export default defineCliConfig({
  api: {
    projectId: '1bzd5noi',
    dataset: activeDataset(),
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  }
})
