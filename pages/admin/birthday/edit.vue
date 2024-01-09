<script setup lang="ts">
import type { IErrorResponse } from '~/types';

useHead({
  title: "Edit Birthday",
});

const route = useRoute();
const birthdayController = useBirthday();

const checkErrorInterface = (value: IErrorResponse): value is IErrorResponse => !!value?.statusCode;

await useAsyncData('loadVNDetail', async() => {
  try {
    await birthdayController.getBirthday(route.query.id as string);
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
    <NuxtLink class="text-link" to="/admin/user">Birthday</NuxtLink>
    <span> / Edit Birthday</span>
  </span>
  <h1 class="font-sans font-medium text-3xl my-5 rounded-lg">
    Edit Birthday
  </h1>
  <BirthdayForm is-edit />
</template>
