/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// External packages are expected to be provided by the host at runtime.
// React and JSX runtime come from the host; lucide-react is bundled
// because it is a small, app-agnostic icon library the host does not
// publish.
const external = [
  'react',
  'react-dom',
  'react-dom/client',
  'react/jsx-runtime',
]

export default defineConfig({
  plugins: [react()],
  build: {
    // es2022 for string-named exports (needed to expose a hyphenated
    // widget id the nanite plugin-loader looks up via mod[name]).
    target: 'es2022',
    lib: {
      entry: 'src/index.tsx',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external,
      output: {
        assetFileNames: (info) =>
          info.name && info.name.endsWith('.css') ? 'style.css' : '[name][extname]',
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
    emptyOutDir: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
})
