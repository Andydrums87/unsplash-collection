import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  proxy: 
    "https://unsplash-collection-backend.onrender.com/",
    // "http://localhost:3000",
  
  build: {
    outDir: 'dist',
 },
  server: {  
    host: true  
}
})
