import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    react(),
    // Ship polyfilled nomodule bundles so older Android/iOS browsers
    // (pre-ES2020) get a working page instead of a blank screen.
    legacy({ targets: ['defaults', 'not IE 11'] }),
  ],
})
