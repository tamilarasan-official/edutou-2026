import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Absolute asset paths: the site has client-side routes (/programmes, /about/...).
  base: '/',
  // `npm start` serves the build with `vite preview`; allow any domain the host
  // (e.g. Dokploy) routes to it, otherwise Vite answers "Blocked request".
  preview: {
    allowedHosts: true,
  },
  build: {
    // Keep the Framer CSS as authored (avoid down-levelling modern CSS syntax).
    cssTarget: ['chrome111', 'edge111', 'firefox114', 'safari16.4'],
  },
});
