import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5373,
  },
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      manifest: 'biggie_pos\\public\\site.webmanifest', 
      workbox: {
        cleanupOutdatedCaches: true,
        sourcemap: true,
      },
    }),
  ],
});
