// @ts-check
import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
// import react from '@astrojs/react';   // to be able to use React Files
// import netlify from '@astrojs/netlify';

import tailwindcss from '@tailwindcss/vite';  // Tailwind
import sitemap from '@astrojs/sitemap'; // Sitemap for SEO
import path from "path";

// import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  output: 'static', // Enables Static Site Generation
  // adapter: netlify(), // Configures Astro for Netlify serverless functions
  site: "https://helthejuice.netlify.app/",
  integrations: [
  sitemap(),
  sanity({
      projectId: 'your-project-id', // Replace with your actual Sanity project ID
      dataset: 'production',
      useCdn: false,
    }),
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