import {existsSync, readFileSync} from 'fs'
import {dirname, resolve} from 'path'
import {fileURLToPath} from 'url'

const packageDir = dirname(fileURLToPath(import.meta.url))

/** Node-only: load repo-root .env for Sanity CLI commands (seed, dev, deploy). */
export function loadRootEnv() {
  const envPath = resolve(packageDir, '../.env')
  if (!existsSync(envPath)) {
    return
  }

  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) {
      continue
    }

    const separator = trimmed.indexOf('=')
    if (separator === -1) {
      continue
    }

    const key = trimmed.slice(0, separator)
    const value = trimmed.slice(separator + 1)
    if (!process.env[key]) {
      process.env[key] = value
    }
  }

  if (!process.env.SANITY_STUDIO_DATASET && process.env.SANITY_DATASET) {
    process.env.SANITY_STUDIO_DATASET = process.env.SANITY_DATASET
  }
}

export function activeDataset(): string {
  return process.env.SANITY_STUDIO_DATASET ?? process.env.SANITY_DATASET ?? 'production'
}
