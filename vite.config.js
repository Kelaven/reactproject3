import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/reactproject3/",

  plugins: [react(), sentryVitePlugin({
    org: "jsm-e2",
    project: "javascript-react"
  })],

  build: {
    sourcemap: true
  }
})