import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Target depends if the node env is development or production
const isProduction = process.env.NODE_ENV === 'production'

// Get production URL from environment variable (no hardcoded domain)
const PRODUCTION_URL = process.env.PRODUCTION_URL

// Extract domain safely from production URL
let PRODUCTION_DOMAIN = 'localhost'
if (PRODUCTION_URL) {
  try {
    PRODUCTION_DOMAIN = new URL(PRODUCTION_URL).hostname
  } catch (error) {
    console.warn('Invalid PRODUCTION_URL format:', PRODUCTION_URL)
    if (isProduction) {
      throw new Error('PRODUCTION_URL must be a valid URL (e.g., https://your-domain.com)')
    }
  }
}

// Get API target based on environment
const getApiTarget = () => {
  if (isProduction && PRODUCTION_URL) {
    return PRODUCTION_URL
  }
  // En développement, utiliser le service backend Docker ou localhost
  return process.env.VITE_DEV_API_URL || 'http://backend:3000'
}

export default defineConfig({
  plugins: [vue()],
  root: './frontend',
  base: '/ui/',
  server: {
    host: '0.0.0.0', // Écouter sur toutes les interfaces (nécessaire pour Docker)
    port: 5173,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      ...(PRODUCTION_DOMAIN && PRODUCTION_DOMAIN !== 'localhost' ? [PRODUCTION_DOMAIN] : [])
    ],
    cors: {
      origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        ...(PRODUCTION_URL ? [PRODUCTION_URL] : [])
      ],
      credentials: true
    },
    proxy: {
      '/api': {
        target: getApiTarget(),
        changeOrigin: true,
        secure: PRODUCTION_URL ? PRODUCTION_URL.startsWith('https://') : false,
        headers: PRODUCTION_URL ? {
          'Origin': PRODUCTION_URL
        } : {}
      }
    }
  },
  build: {
    outDir: '../dist/frontend'
  }
})
