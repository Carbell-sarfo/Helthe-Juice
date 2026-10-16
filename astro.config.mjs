// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify'; // Added Netlify Adapter
import tailwindcss from '@tailwindcss/vite';  // Tailwind
import sitemap from '@astrojs/sitemap'; // Sitemap for SEO
import path from "path";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  // adapter: netlify(), // Connects Netlify serverless adapter
  site: "https://helthejuice.netlify.app/",
  integrations: [
    sitemap(),
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