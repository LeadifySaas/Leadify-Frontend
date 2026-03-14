import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { tanstackRouter } from '@tanstack/router-plugin/vite' // <--- Importa esto
import path from 'path'

export default defineConfig({
  plugins: [
    tanstackRouter(), // <--- Agrega esto aquí
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
  }
})