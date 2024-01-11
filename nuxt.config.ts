// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    apiSecret: '',
    public: {
      apiBase: '',
      port: 8000
    }
  },

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxt/image"]
})