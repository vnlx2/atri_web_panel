// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    apiEndpoint: process.env.API_ENDPOINT
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxt/image"]
})