import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/MineSweeper/', 
  plugins: [react()],
  build: {
    outDir: '../docs', 
    emptyOutDir: true,
  }
})