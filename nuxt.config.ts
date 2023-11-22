import { config } from "dotenv"

// https://nuxt.com/docs/api/configuration/nuxt-config
config();
export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      apiBase: ''
    }
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxt/image"]
})