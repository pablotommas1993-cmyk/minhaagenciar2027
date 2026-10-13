import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.join(root, 'src') } },
  build: {
    outDir: path.join(root, 'dist-ssr'),
    rollupOptions: {
      input: {
        GoogleAdsGestao: path.join(root, 'src/pages/GoogleAdsGestao.tsx'),
        Nova: path.join(root, 'src/pages/Nova.tsx'),
      },
    },
  },
});
