// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import lucideAstroImportOptimizer from './lucide.config.js';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss(), lucideAstroImportOptimizer()],
  },
});
