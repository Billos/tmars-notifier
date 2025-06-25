import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Target depends if the node env is development or production
const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [vue()],
  root: './frontend',
  server: {
    host: '0.0.0.0', // Écouter sur toutes les interfaces (nécessaire pour Docker)
    port: 5173,
    proxy: {
      '/api': {
        target: isProduction ? 'http://localhost:3000' : 'http://backend:3000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: '../dist/frontend'
  }
})
