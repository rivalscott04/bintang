import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

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
  plugins: [react(), tailwindcss(), asyncCssPlugin()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    // Lighthouse: source maps for large first-party chunks (e.g. three-*.js)
    sourcemap: true,
    modulePreload: {
      resolveDependencies: (_filename, deps) =>
        deps.filter((dep) => !dep.includes('three-') && !dep.includes('leaflet-')),
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/leaflet') || id.includes('react-leaflet')) {
            return 'leaflet';
          }
          if (
            id.includes('node_modules/three') ||
            id.includes('@react-three') ||
            id.includes('virtual-tour')
          ) {
            return 'three';
          }
        },
      },
    },
  },
});
