import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['html-to-image', 'uuid']
  },
  build: {
    commonjsOptions: {
      include: [/html-to-image/, /node_modules/]
    },
    rollupOptions: {
      external: [/@rollup\/rollup-linux-x64-gnu/]
    }
  }
});
