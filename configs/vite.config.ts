import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  root: path.join(__dirname, '..'),
  publicDir: 'public',
  plugins: [
    react(),
    // Bundle analyzer - generates bundle analysis report
    visualizer({
      filename: 'dist/bundle-analysis.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap' // 'sunburst', 'treemap', 'network'
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    open: false
  },
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
      ],
      output: {
        // 手动代码分割 - 优化bundle大小
        manualChunks: {
          // 核心React框架
          'react-vendor': ['react', 'react-dom'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux', 'reselect'],
          
          // UI库 - 最大的依赖之一
          'mui-vendor': [
            '@mui/material', 
            '@mui/icons-material', 
            '@emotion/react', 
            '@emotion/styled'
          ],
          
          // 富文本编辑器
          'editor-vendor': ['@tiptap/react', '@tiptap/starter-kit'],
          
          // 图形和流程库
          'flow-vendor': ['reactflow'],
          
          // 文档处理 - 较大的库
          'document-vendor': ['docx', 'pdf-lib', 'file-saver'],
          
          // 数据库和存储 (lowdb已在external中，不能包含在manualChunks中)
          
          // 开发工具 (仅开发环境)
          ...(process.env.NODE_ENV === 'development' && {
            'dev-tools': ['rollup-plugin-visualizer']
          })
        },
        // 改进chunk文件名
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId 
            ? chunkInfo.facadeModuleId.split('/').pop().replace(/\.[jt]sx?$/, '') 
            : 'unknown';
          return `js/[name]-[hash].js`;
        }
      }
    },
    target: 'es2020',
    emptyOutDir: true,
    // 设置chunk大小警告限制 (Vite级别)
    chunkSizeWarningLimit: 300 // 300KB per chunk
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