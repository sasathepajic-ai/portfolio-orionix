import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // helpful for WSL, Docker, or network-mounted drives
    },
    open: true, // optional: auto-opens in browser
  },
})
