import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://emyland-vn--chat301277.replit.app',
        changeOrigin: true,
        secure: true
      }
    }
  }
})