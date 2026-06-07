import {existsSync, readFileSync} from 'node:fs'
import {resolve} from 'node:path'

const repoRoot = resolve(import.meta.dirname)

/**
 * @param {string} filePath
 * @returns {Record<string, string>}
 */
function parseEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return {}
  }

  /** @type {Record<string, string>} */
  const values = {}

  for (const line of readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) {
      continue
    }

    const separator = trimmed.indexOf('=')
    if (separator === -1) {
      continue
    }

    const key = trimmed.slice(0, separator).trim()
    const value = trimmed.slice(separator + 1).trim()
    values[key] = value
  }

  return values
}

/**
 * Load branch-specific Sanity config from sanity.env, then optional secrets from .env.
 * @returns {Record<string, string>}
 */
export function loadSanityEnv() {
  const merged = {
    ...parseEnvFile(resolve(repoRoot, 'sanity.env')),
    ...parseEnvFile(resolve(repoRoot, '.env')),
  }

  for (const [key, value] of Object.entries(merged)) {
    if (process.env[key] === undefined) {
      process.env[key] = value
    }
  }

  if (!process.env.SANITY_STUDIO_DATASET && process.env.SANITY_DATASET) {
    process.env.SANITY_STUDIO_DATASET = process.env.SANITY_DATASET
  }

  return merged
}

export function activeDataset() {
  return (
    process.env.SANITY_STUDIO_DATASET ??
    process.env.SANITY_DATASET ??
    process.env.PUBLIC_SANITY_DATASET ??
    'production'
  )
}

export function activeProjectId() {
  return process.env.PUBLIC_SANITY_PROJECT_ID ?? '1bzd5noi'
}
