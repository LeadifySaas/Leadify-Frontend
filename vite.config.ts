import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    tanstackRouter(),
    react(),
  ],
  resolve: {
    alias: {
      '@/styled-system': path.resolve(__dirname, 'styled-system'),
      '@': path.resolve(__dirname, 'src')
    },
  }
})