import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Target depends if the node env is development or production
const isProduction = process.env.NODE_ENV === 'production'

// Get production URL from environment variable
const PRODUCTION_URL = process.env.PRODUCTION_URL
const PRODUCTION_DOMAIN = new URL(PRODUCTION_URL).hostname

// Authorize production domain to access the backend API
const getApiTarget = () => {
  if (isProduction) {
    return PRODUCTION_URL
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
    allowedHosts: [
      'localhost',
      PRODUCTION_DOMAIN,
    ],
    cors: {
      origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        PRODUCTION_URL
      ],
      credentials: true
    },
    proxy: {
      '/api': {
        target: getApiTarget(),
        changeOrigin: true,
        secure: true,
        headers: {
          'Origin': PRODUCTION_URL
        }
      }
    }
  },
  build: {
    outDir: '../dist/frontend'
  }
})
