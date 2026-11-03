import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Konfigurasi Vite untuk Port 5500 (Standar Live Server)
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 5500,
    host: true,
    strictPort: false
  },
  preview: {
    port: 5500,
    host: true,
    strictPort: false
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
});
