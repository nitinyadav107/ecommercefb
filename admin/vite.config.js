import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'




export default defineConfig({
  optimizeDeps: {
    include: ['react-hot-toast'],
  },
  ssr: {
    noExternal: ['react-hot-toast'],
  },
  base: '.',
  plugins: [react()],
  server: {
    port: 5174
  },
  build: {
    rollupOptions: {
      external: ['react-hot-toast'],
    },
  },
});
