import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  proxy: {"/collections":
    "http://localhost:3000/",
  },
  build: {

    outDir: 'dist',
 },
  server: {  
    host: true  
}
})
