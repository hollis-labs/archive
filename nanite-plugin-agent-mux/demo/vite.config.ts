import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Proxy SSE stream to muxd so the browser sees same-origin.
// muxd listens on tcp:127.0.0.1:9380 (set in ~/.agent-mux/catalog/global.yaml).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5178,
    strictPort: true,
    proxy: {
      '/events/stream': {
        target: 'http://127.0.0.1:9380',
        changeOrigin: true,
      },
      '/proxy/events': {
        target: 'http://127.0.0.1:9380',
        changeOrigin: true,
      },
      '/health': {
        target: 'http://127.0.0.1:9380',
        changeOrigin: true,
      },
    },
  },
})
