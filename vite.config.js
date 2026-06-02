import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/** Parse file .env sederhana (tanpa dependensi tambahan). */
function parseEnvFile(filename) {
  const filePath = resolve(process.cwd(), filename);
  if (!existsSync(filePath)) return {};
  const vars = {};
  for (const line of readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    vars[key] = value;
  }
  return vars;
}

/** Kurangi CLS dari font swap (@fontsource default: swap). */
function fontDisplayOptionalPlugin() {
  return {
    name: 'font-display-optional',
    transform(code, id) {
      if (id.includes('@fontsource') && id.endsWith('.css')) {
        return code.replace(/font-display:\s*swap/g, 'font-display: optional');
      }
    },
  };
}

/** Defer main stylesheet agar tidak memblokir first paint (Lighthouse mobile). */
function asyncCssPlugin() {
  return {
    name: 'async-css',
    apply: 'build',
    transformIndexHtml(html) {
      return html.replace(
        /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/g,
        (_, href) =>
          `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="${href}"></noscript>`,
      );
    },
  };
}

export default defineConfig(({ mode, command }) => {
  const isProdBuild = command === 'build' && mode === 'prod';
  const prodApiBaseUrl = isProdBuild ? parseEnvFile('.env.prod').VITE_API_BASE_URL : undefined;

  if (isProdBuild && !prodApiBaseUrl) {
    console.warn(
      '[vite] .env.prod tidak ditemukan atau VITE_API_BASE_URL kosong — salin dari .env.prod.example',
    );
  }

  // Dev: loadEnv(development) + .env.development. Build prod: paksa nilai dari .env.prod
  // (process.env.VITE_* di shell/IDE bisa menimpa file env bawaan Vite).
  const viteEnvDefine =
    isProdBuild && prodApiBaseUrl
      ? {
          'import.meta.env.VITE_API_BASE_URL': JSON.stringify(prodApiBaseUrl),
          'import.meta.env.MODE': JSON.stringify(mode),
          'import.meta.env.DEV': 'false',
          'import.meta.env.PROD': 'true',
        }
      : undefined;

  return {
  plugins: [react(), tailwindcss(), fontDisplayOptionalPlugin(), asyncCssPlugin()],
  define: viteEnvDefine,
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/assets': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/storage': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    // VirtualTour3D + three.js sengaja di chunk terpisah (~1MB); sudah lazy-loaded.
    chunkSizeWarningLimit: 1200,
    // Source map memakan RAM besar saat build (three.js ~1MB). Di VPS kecil pakai BUILD_LEAN=1.
    sourcemap: process.env.BUILD_LEAN !== '1',
    // Keep Vite's preload helper out of the three.js chunk (otherwise index.js pulls ~900KB).
    modulePreload: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React must stay out of the three chunk: otherwise index.js pulls ~1MB on first paint.
          if (
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/react/') ||
            id.includes('node_modules/scheduler/')
          ) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/leaflet') || id.includes('react-leaflet')) {
            return 'leaflet';
          }
          // Three.js: jangan manualChunk: biar hanya ikut dynamic import VirtualTour3D.
        },
      },
    },
  },
  };
});
