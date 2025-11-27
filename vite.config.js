import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // En producción (GitHub Pages), usa /fullstack-interview/
  // En desarrollo (Codespaces/local), usa /
  base: mode === 'production' ? '/fullstack-interview/' : '/',
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  publicDir: 'public'
}));
