import { defaultSite, type SiteConfig } from "../content/site";
import { getSanityClient, isSanityConfigured } from "./sanity/client";
import { mapSiteSettings } from "./sanity/mapSiteSettings";
import { SITE_SETTINGS_QUERY } from "./sanity/queries";

let sitePromise: Promise<SiteConfig> | null = null;

async function loadSite(): Promise<SiteConfig> {
  if (!isSanityConfigured()) {
    return defaultSite;
  }

  try {
    const doc = await getSanityClient().fetch(SITE_SETTINGS_QUERY);
    return doc ? mapSiteSettings(doc) : defaultSite;
  } catch {
    return defaultSite;
  }
}

export function getSite(): Promise<SiteConfig> {
  if (!sitePromise) {
    sitePromise = loadSite();
  }
  return sitePromise;
}
