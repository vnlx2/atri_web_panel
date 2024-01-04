<script setup lang="ts">
import type { IErrorResponse } from '~/types';

useHead({
  title: "Edit Visual Novel"
});

definePageMeta({
  validate: async(route) => {
    return /^\d+$/.test(route.query.code as string);
  }
});

const route = useRoute();
const vnController = useVisualNovel();

const checkErrorInterface = (value: IErrorResponse): value is IErrorResponse => !!value?.statusCode;

await useAsyncData('loadVNDetail', async() => {
  try {
    await vnController.getVisualNovel(parseInt(route.query.code as string));
  } catch (error: IErrorResponse | any) {
    if (checkErrorInterface(error)) {
      showError({
        statusCode: error.statusCode,
        message: error.message
      });
    }
    else {
      showError({statusCode: 500});
    }
  }
});
</script>

<template>
  <span class="text-sm">
    <NuxtLink class="text-link" to="/admin/visualnovel">VisualNovel</NuxtLink>
    <span> / Edit Visual Novel</span>
  </span>
  <h1 class="font-sans font-medium text-3xl my-5 rounded-lg">
    Edit Visual Novel
  </h1>
  <VisualNovelForm />
</template>
