<script setup lang="ts">
useHead({
  title: "Add Birthday",
});
</script>

<template>
  <span class="text-sm">
    <NuxtLink class="text-link" to="/admin/user">Birthday</NuxtLink>
    <span> / Add Birthday</span>
  </span>
  <h1 class="font-sans font-medium text-3xl my-5 rounded-lg">
    Add Birthday
  </h1>
  <BirthdayForm />
</template>
