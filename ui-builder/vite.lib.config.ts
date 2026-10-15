// vite.lib.config.ts (PACKAGE REPO)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: 'resources/js',
      outDir: 'dist',
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'resources/js/index.ts'), // barrel of your public API
      name: 'UiBuilder',
      // will emit dist/ui-builder.js (ESM) and dist/ui-builder.cjs (CJS)
      fileName: (format) => (format === 'es' ? 'ui-builder.js' : 'ui-builder.cjs'),
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      }, 
    },
    cssCodeSplit: false,
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: { 
    dedupe: ['react', 'react-dom'],
    alias: {
      '@': path.resolve(__dirname, 'resources/js'),
    },
  },
})
