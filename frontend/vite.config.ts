import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
   server: {
    proxy: {
      '/inventory': {
        target: 'http://127.0.0.1:4000',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
})
