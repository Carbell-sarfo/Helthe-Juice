// astro.config.mjs

// @ts-check
import { defineConfig, envField } from 'astro/config';
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
  env: {
    schema: {
      // Public: safe to ship to the browser (Firebase Web Config)
      PUBLIC_FIREBASE_API_KEY: envField.string({ context: 'client', access: 'public' }),
      PUBLIC_FIREBASE_AUTH_DOMAIN: envField.string({ context: 'client', access: 'public' }),
      PUBLIC_FIREBASE_PROJECT_ID: envField.string({ context: 'client', access: 'public' }),
      PUBLIC_FIREBASE_STORAGE_BUCKET: envField.string({ context: 'client', access: 'public' }),
      PUBLIC_FIREBASE_APP_ID: envField.string({ context: 'client', access: 'public' }),

      // Secret: server only, never reaches the browser
      FIREBASE_PROJECT_ID: envField.string({ context: 'server', access: 'secret' }),
      FIREBASE_CLIENT_EMAIL: envField.string({ context: 'server', access: 'secret' }),
      FIREBASE_PRIVATE_KEY: envField.string({ context: 'server', access: 'secret' }),
      PAYANGEL_API_KEY: envField.string({ context: 'server', access: 'secret' }),
      STORE_CURRENCY: envField.string({ context: 'server', access: 'public', default: 'GHS' }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  }
});