import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cleanPlugin from 'vite-plugin-clean';

export default defineConfig({
  plugins: [
    react(),
    cleanPlugin({
      targetFiles: ['dist'] // Specify the directories or files to clean
    })
  ],
  resolve: {
    alias: {
      'react-router-dom': 'react-router-dom'
    }
  }
});

