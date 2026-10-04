import { copyFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/kalanubhuti/' : '/',
  plugins: [
    react(),
    {
      name: 'github-pages-spa',
      closeBundle() {
        if (command !== 'build') return;
        copyFileSync('dist/index.html', 'dist/404.html');
        writeFileSync('dist/.nojekyll', '');
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
}));
