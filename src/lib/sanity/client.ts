import { createClient } from "@sanity/client";
import { isSanityConfigured } from "./types";

export { isSanityConfigured };

export function getSanityClient() {
  return createClient({
    projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? "production",
    apiVersion: "2026-03-01",
    useCdn: false,
  });
}
