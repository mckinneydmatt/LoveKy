// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');
const projectId = env.PUBLIC_SANITY_PROJECT_ID;
const dataset = env.PUBLIC_SANITY_DATASET ?? 'production';

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
  },
});
