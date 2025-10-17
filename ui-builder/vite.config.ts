import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path'

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.tsx',
                'resources/js/main.tsx'
            ],
            refresh: true,
        }),
        react({
            jsxRuntime: 'automatic',
        }),
        dts({
            entryRoot: 'resources/js',  
            outDir: 'dist', 
        }),
    ],

    build: {
        cssCodeSplit: true,        
        lib: {
          entry: path.resolve(__dirname, 'resources/js/index.ts'), 
          name: 'UiBuilder',
          fileName: 'ui-builder',
          formats: ['es', 'cjs'],
        },
        outDir: 'dist',
        emptyOutDir: true,        
      },

    resolve: {
        alias: {
            '@': '/resources/js',
        },
        dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
        include: ['react', 'react-dom'],
        // Force re-optimization when dependencies change
        force: false,
    },
    // Configure HMR to be more resilient
    server: {
        hmr: {
            // Don't show error overlay - prevents white screen on HMR errors
            overlay: false,
        },
        // Watch options to prevent file descriptor issues
        watch: {
            ignored: ['**/node_modules/**', '**/storage/**', '**/vendor/**'],
        },
    },
    // Clear module cache on restart to prevent stale HMR state
    clearScreen: false,
    
})