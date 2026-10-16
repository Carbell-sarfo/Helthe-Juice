// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import path from "path";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify(),
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