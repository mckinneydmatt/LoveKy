import {defaultSite} from '../../shared/defaultSite'

/** Grey placeholder in Studio = this value on the live site when the CMS field is empty. */
export function siteFallback(value: string | null | undefined, maxLength = 120): string | undefined {
  if (value == null || value === '') return undefined
  if (value.length <= maxLength) return value
  return `${value.slice(0, maxLength - 1)}…`
}

export const fallbackHint =
  'Grey text in the field shows what the live site displays if you leave this empty.'

export const noFallbackHint = 'No site fallback for this field — leaving it empty has a different effect.'

export const site = defaultSite
