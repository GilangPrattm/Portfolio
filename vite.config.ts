import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router') || id.includes('react-dom') || id.includes('/react/')) {
              return 'vendor-react'
            }
            if (id.includes('motion')) {
              return 'vendor-motion'
            }
            if (id.includes('lucide-react') || id.includes('react-icons')) {
              return 'vendor-icons'
            }
            if (id.includes('i18next')) {
              return 'vendor-i18n'
            }
          }
        },
      },
    },
  },
})