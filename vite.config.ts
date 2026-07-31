import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    react(),
    // Ship polyfilled nomodule bundles so older Android/iOS browsers
    // (pre-ES2020) get a working page instead of a blank screen.
    // whatwg-fetch is required explicitly: the legacy bundle's SystemJS
    // loader itself calls `fetch` to load the app chunk, and core-js does
    // not polyfill it — without this, browsers lacking native fetch silently
    // fail to load the app after the polyfill shell runs (blank page, no error).
    legacy({
      targets: ['defaults', 'not IE 11'],
      additionalLegacyPolyfills: ['whatwg-fetch'],
    }),
  ],
})
