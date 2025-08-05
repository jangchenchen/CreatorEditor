import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root: path.join(__dirname, '..'),
  publicDir: 'public',
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: [
        'electron',
        'fs',
        'path',
        'os',
        'crypto',
        'stream',
        'util',
        'url',
        'events',
        'lowdb',
        'steno',
        'node:fs',
        'node:fs/promises',
        'node:path',
        'node:url',
        'node:crypto',
        'node:stream',
        'node:util',
        'node:events',
        'node:os'
      ]
    },
    target: 'es2020',
    emptyOutDir: true
  },
  define: {
    global: 'globalThis',
    __dirname: 'import.meta.url'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '..', 'src')
    }
  },
  optimizeDeps: {
    exclude: ['lowdb', 'steno']
  }
})