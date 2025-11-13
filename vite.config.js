import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Use base path for GitHub Pages, root for Vercel
  base: process.env.VERCEL ? '/' : '/HYU/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
