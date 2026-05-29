import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

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

export default defineConfig({
  plugins: [react(), tailwindcss(), fontDisplayOptionalPlugin(), asyncCssPlugin()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    // Lighthouse: source maps for large first-party chunks (e.g. three-*.js)
    sourcemap: true,
    // Keep Vite's preload helper out of the three.js chunk (otherwise index.js pulls ~900KB).
    modulePreload: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React must stay out of the three chunk — otherwise index.js pulls ~1MB on first paint.
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
          // Three.js: jangan manualChunk — biar hanya ikut dynamic import VirtualTour3D.
        },
      },
    },
  },
});
