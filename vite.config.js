import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  base: 'piano-grove',
  
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Fichiers à mettre en cache pour le mode hors-ligne
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      // Le manifest : métadonnées de l'app
      manifest: {
        name: 'Piano Grove',
        short_name: 'Piano Grove',
        description: 'Practice 40 hours a day.',
        theme_color: '#1a6b3c',
        background_color: '#0d2137',
        display: 'standalone', // Plein écran, sans barre de navigation
        orientation: 'portrait',
        scope: '/piano-grove/',
        start_url: '/piano-grove/',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable', // 'maskable' pour les icônes adaptatives Android
          },
        ],
      },
    }),
  ],
})
