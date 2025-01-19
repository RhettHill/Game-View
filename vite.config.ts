import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build:{
    assetsDir: '',
  },
  base: '/Game-View/',
  plugins: [react()],
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
});
