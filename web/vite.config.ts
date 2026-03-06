import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias: {
      '~bootstrap':path.resolve(__dirname,'node_modules/bootstrap')
    }
  },
  root: path.resolve(__dirname,'src'),
  server:{
    port:8080,
    host:true
  }
})
