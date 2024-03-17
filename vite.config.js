import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      //'/api': 'http://localhost:3001',
      '*/api': 'http://localhost:3001'
    }
  },
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "voting system",
        short_name: "voting system",
        start_url: "/",
        display: "standalone",
        theme_color: '#000000',
        icons: [
          { src: "./vite.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
          { src: "./vite.svg", sizes: "192x192", type: "image/svg+xml", purpose: "any maskable" }
        ],
      },
      prefer_related_applications: true,
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      workbox: {},
      notification: true
    })
  ],
})
