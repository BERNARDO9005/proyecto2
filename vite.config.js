import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false
  },
  build: {
    chunkSizeWarningLimit: 5000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-plotly': ['plotly.js-dist-min'],
          'vendor-math': ['mathjs', 'katex'],
          'vendor-react': ['react', 'react-dom', 'lucide-react']
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'node'
  }
});
