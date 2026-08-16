import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // No sourcemaps in production: they would publish readable source.
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        /**
         * Split the vendor weight so the first paint only pays for React and
         * the router. three.js already sits behind a dynamic import for the
         * page transition, and framer-motion is separated so an update to one
         * does not invalidate the cache for the others.
         */
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('three') || id.includes('@react-three')) return 'three'
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('react-router')) return 'router'
          if (id.includes('react-dom') || id.includes('/react/')) return 'react'
          if (id.includes('@emailjs')) return 'emailjs'
          if (id.includes('lucide-react')) return 'icons'
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
})
