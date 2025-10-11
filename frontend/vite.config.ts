import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const REPO_NAME = "MineSweeper"; 
export default defineConfig({
  base: `/${REPO_NAME}/`,

  plugins: [react()],
  
  build: {
    outDir: '../dist', 
    emptyOutDir: true,
  }
})