import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:3000/",
  //       changeOrigin: true,
  //       secure: false
  //     }

  //   }
  // },
  plugins: [react()],
  resolve:{
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@img': fileURLToPath(new URL('./src/assets/images', import.meta.url))
    }
  }
})
