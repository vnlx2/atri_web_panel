<script setup>
useHead({
  title: 'Home',
  titleTemplate: (title) => `ATRI Admin Panel - ${title}`,
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  charset: "utf-8",
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
    {rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css'}
  ]
});

useSeoMeta({
  description: "ATRI Admin Panel is a robust web application designed exclusively for managing the ATRI Discord bot, a specialized bot tailored for the Visual Novel Lovers' Discord server.",
  ogTitle: "ATRI Admin Panel",
  ogDescription: "ATRI Admin Panel is a robust web application designed exclusively for managing the ATRI Discord bot, a specialized bot tailored for the Visual Novel Lovers' Discord server.",
  ogImage: '/assets/vnl.png',
  ogUrl: 'https://atri-bot.vnlx.org/'
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>