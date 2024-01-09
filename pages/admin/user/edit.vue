<script setup lang="ts">
import { checkErrorInterface, type IErrorResponse } from '~/types';

useHead({
  title: "Edit User",
});

definePageMeta({
  validate: async(route) => {
    return /^[0-9a-z](\/?[0-9a-z])*\/?$/.test(route.query.code as string);
  }
});

const route = useRoute();
const userController = useUser();

await useAsyncData('loadUserDetail', async() => {
  try {
    await userController.getUser(route.query.code as string);
  } catch (error: IErrorResponse | any) {
    if (!checkErrorInterface(error)) {
      return showError(error);
    }
    return showError({
      statusCode: error.statusCode,
      message: error.message
    });
  }
});
</script>

<template>
  <span class="text-sm">
    <NuxtLink class="text-link" to="/admin/user">User Management</NuxtLink>
    <span> / Edit User</span>
  </span>
  <h1 class="font-sans font-medium text-3xl my-5 rounded-lg">
    Edit User
  </h1>
  <UserForm is-edit />
</template>
