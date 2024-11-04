import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:"/react-forum/",
  server: {
    proxy: {
      '/api': {
        target: 'https://test.backendserviceforumapi.online',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
