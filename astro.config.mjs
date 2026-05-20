// @ts-check
import { defineConfig } from 'astro/config';
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
  // sanity({
  //   projectId: "psq3k6n0",
  //   dataset: "production",
  //   studioBasePath: "/admin",
  //   useCdn: true, // changed to true for static
  //   apiVersion: "2025-06-03", // insert the current date to access the latest version of the API
  //   // studioBasePath: '/admin' // disabled to avoid dynamic route issues during debug
  // })
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