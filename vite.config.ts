import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig, type Plugin} from 'vite';

/** Every page the router knows, minus Home. Keep in sync with `pages` in src/content.ts. */
const ROUTES = ['services', 'portfolio', 'about', 'reviews', 'book'];

/**
 * The site is one React app with its own tiny router. So that /services etc.
 * load directly on ANY static host (no rewrite rules needed), the build writes
 * a copy of index.html into a folder per route, plus a 404.html fallback.
 */
function staticRoutes(): Plugin {
  let outDir = 'dist';
  return {
    name: 'indulura-static-routes',
    apply: 'build',
    configResolved(c) {
      outDir = resolve(c.root, c.build.outDir);
    },
    closeBundle() {
      const html = readFileSync(resolve(outDir, 'index.html'), 'utf8');
      for (const r of ROUTES) {
        mkdirSync(resolve(outDir, r), {recursive: true});
        writeFileSync(resolve(outDir, r, 'index.html'), html);
      }
      writeFileSync(resolve(outDir, '404.html'), html);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), staticRoutes()],
  build: {
    target: 'es2020',
  },
});
