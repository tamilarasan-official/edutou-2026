import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative asset paths so the build works from any folder / sub-path.
  base: './',
  build: {
    // Keep the Framer CSS as authored (avoid down-levelling modern CSS syntax).
    cssTarget: ['chrome111', 'edge111', 'firefox114', 'safari16.4'],
  },
});
