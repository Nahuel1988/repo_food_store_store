import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
     proxy: {
       '/pedidos_websocket':{
        target: 'http://localhost:8000',
        ws: true,
       }
     }
   },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})