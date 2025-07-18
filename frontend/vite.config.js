import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,       // 👈 This is what allows access from your phone
    port: 5173        // 👈 Optional, defaults to 5173
  },
  build: {
    rollupOptions: {
      external: ['@firebase/app', '@firebase/auth'], // Your existing config is kept
    },
  },
})
