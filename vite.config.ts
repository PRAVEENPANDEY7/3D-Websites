import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/3D-Websites/' : './',
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
  }
});
