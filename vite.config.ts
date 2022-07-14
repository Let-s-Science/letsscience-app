import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat'
    }
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: 'import { h, Fragment } from \'preact\''
  },
  plugins: [preact(), VitePWA({
    includeAssets: ['vite.svg', 'favicon.ico', 'robots.txt', 'icons/apple-touch-icon.png'],
    registerType: 'autoUpdate',
    injectRegister: 'auto',
    devOptions: {
      enabled: true
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg}']
    },
    manifest: {
      name: 'Name of your app',
      short_name: 'Short name of your app',
      description: 'Description of your app',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    }
  })]
})
