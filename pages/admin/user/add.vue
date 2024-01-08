<script setup lang="ts">
useHead({
  title: "Add User",
});
</script>

<template>
  <span class="text-sm">
    <NuxtLink class="text-link" to="/admin/user">User Management</NuxtLink>
    <span> / Add User</span>
  </span>
  <h1 class="font-sans font-medium text-3xl my-5 rounded-lg">
    Add User
  </h1>
  <UserForm />
</template>
