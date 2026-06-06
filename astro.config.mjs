// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Update when the live domain is confirmed.
  site: 'https://lovekycakes.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});