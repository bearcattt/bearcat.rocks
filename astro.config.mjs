// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      minify: true,
      cssMinify: true,
      sourcemap: false,
    },
    plugins: [tailwindcss()],
    server: {
      allowedHosts: '',
    },
  },
});
