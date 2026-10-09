// @ts-check
import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';

import tailwindcss from '@tailwindcss/vite';  // Tailwind
import sitemap from '@astrojs/sitemap'; // Sitemap for SEO
import path from "path";

// https://astro.build/config
export default defineConfig({
  output: 'static', // Enables Static Site Generation
  site: "https://helthejuice.netlify.app/",
  integrations: [
    sitemap(),
    sanity({
      projectId: "psq3k6n0",
      dataset: "production",
      useCdn: true,
      apiVersion: "2025-06-03",
    })
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  }
});