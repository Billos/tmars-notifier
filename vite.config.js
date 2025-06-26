import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Target depends if the node env is development or production
const isProduction = process.env.NODE_ENV === 'production'


// Authorize production domain to access the backend API
const getApiTarget = () => {
  if (isProduction) {
    return null
  }
  // En développement, utiliser le service backend Docker
  return 'http://backend:3000'
}

export default defineConfig({
  plugins: [vue()],
  root: './frontend',
  server: {
    host: '0.0.0.0', // Écouter sur toutes les interfaces (nécessaire pour Docker)
    port: 5173,
    allowedHosts: true,
    cors: {
      origin: true,
      credentials: true
    },
    proxy: {
      '/api': {
        target: getApiTarget(),
        changeOrigin: true,
        secure: true,
      }
    }
  },
  build: {
    outDir: '../dist/frontend'
  }
})
