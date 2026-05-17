export default defineNuxtConfig({
  compatibilityDate: '2026-05-16',
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss', '@vueuse/motion/nuxt', '@nuxtjs/google-fonts'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
    },
  },
  googleFonts: {
    families: {
      'Space Grotesk': [400, 500, 600, 700],
      'JetBrains Mono': [400, 500],
    },
    display: 'swap',
    preload: true,
    prefetch: true,
    download: false,
  },
  nitro: {
    prerender: {
      routes: ['/'],
    },
  },
  routeRules: {
    '/': { prerender: true },
  },
})
