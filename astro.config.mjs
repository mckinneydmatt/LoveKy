// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';
import { activeDataset, activeProjectId, loadSanityEnv } from './loadSanityEnv.mjs';

loadSanityEnv();
const projectId = activeProjectId();
const dataset = activeDataset();

// https://astro.build/config
export default defineConfig({
  // Update when the live domain is confirmed.
  site: 'https://lovekycakes.com',
  integrations: [
    sitemap(),
    ...(projectId
      ? [
          sanity({
            projectId,
            dataset,
            apiVersion: '2026-03-01',
            useCdn: false,
          }),
        ]
      : []),
  ],
  vite: {
    plugins: [tailwindcss()],
    define: {
      'import.meta.env.PUBLIC_SANITY_PROJECT_ID': JSON.stringify(projectId),
      'import.meta.env.PUBLIC_SANITY_DATASET': JSON.stringify(dataset),
    },
  },
});
