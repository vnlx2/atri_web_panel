<script setup>
useHead({
  title: 'Home',
  titleTemplate: (title) => `ATRI Admin Panel - ${title}`,
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  charset: "utf-8",
  link: [
    {rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css'}
  ]
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>