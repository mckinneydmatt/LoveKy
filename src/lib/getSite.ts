import { createClient } from "@sanity/client";
import { defaultSite, type SiteConfig } from "../content/site";
import { mapSiteSettings } from "./sanity/mapSiteSettings";
import { SITE_SETTINGS_QUERY } from "./sanity/queries";
import { isSanityConfigured } from "./sanity/types";

let sitePromise: Promise<SiteConfig> | null = null;

async function loadSite(): Promise<SiteConfig> {
  if (!isSanityConfigured()) {
    return defaultSite;
  }

  try {
    const client = createClient({
      projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
      dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? "production",
      apiVersion: "2026-03-01",
      useCdn: false,
    });

    const doc = await client.fetch(SITE_SETTINGS_QUERY);
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
