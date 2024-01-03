<script setup lang="ts">
import type { IErrorResponse } from '~/types';

useHead({
  title: 'Loading...',
});

definePageMeta({
  validate: async(route) => {
    return /^\d+$/.test(route.params.code as string);
  }
});

const route = useRoute();
const vnController = useVisualNovel();

const checkErrorInterface = (value: IErrorResponse): value is IErrorResponse => !!value?.statusCode;

await useAsyncData('loadVNDetail', async() => {
  try {
    await vnController.getVisualNovel(parseInt(route.params.code as string));
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
  <Suspense>
    <VisualNovelView />
    <template #fallback>
      <div>
        <span class="text-sm">
          <NuxtLink class="text-link" to="/admin/visualnovel"
            >VisualNovel</NuxtLink
          >
          <span> / Loading</span>
        </span>
        <h1 class="font-sans font-medium text-3xl my-5 rounded-lg">Loading...</h1>
        <div class="bg-white rounded-lg shadow-md px-10 py-5">
          <!-- General Data -->
          <h3 class="font-sans font-medium text-2xl rounded-lg pb-5">
            General Information
          </h3>
          <div class="flex">
            <!-- Left Side -->
            <div class="w-1/3 pr-5">
              <!-- Image -->
              <div class="max-w-xs mx-auto">
                <div class="w-56 h-72 bg-gray-300 animate-pulse"></div>
              </div>
            </div>
            <!-- Right Side -->
            <div class="w-2/3 max-w-4xl px-5 space-y-5">
              <!-- Code -->
              <div class="grid gap-x-2 grid-cols-3">
                <h6
                  class="block text-lg font-sans antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900"
                >
                  Code
                </h6>
                <div class="min-w-full w-64 h-5 bg-gray-300 rounded-lg animate-pulse"></div>
              </div>
              <!-- Title -->
              <div class="grid grid-cols-3">
                <h6
                  class="block text-lg font-sans antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900"
                >
                  Title
                </h6>
                <div class="min-w-full w-64 h-5 bg-gray-300 rounded-lg animate-pulse"></div>
              </div>
              <!-- Aliases -->
              <div class="grid grid-cols-3">
                <h6
                  class="block text-lg font-sans antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900"
                >
                  Aliases
                </h6>
                <div class="min-w-full w-64 h-5 bg-gray-300 rounded-lg animate-pulse"></div>
              </div>
              <!-- Length -->
              <div class="grid grid-cols-3">
                <h6
                  class="block text-lg font-sans antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900"
                >
                  Length
                </h6>
                <div class="min-w-full w-64 h-5 bg-gray-300 rounded-lg animate-pulse"></div>
              </div>
              <!-- Rating -->
              <div class="grid grid-cols-3">
                <h6
                  class="block text-lg font-sans antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900"
                >
                  Rating
                </h6>
                <div class="min-w-full w-64 h-5 bg-gray-300 rounded-lg animate-pulse"></div>
              </div>
              <!-- Description -->
              <div class="grid">
                <h6
                  class="block text-lg font-sans antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900"
                >
                  Description
                </h6>
                <div class="min-w-full w-64 h-5 my-2 bg-gray-300 rounded-lg animate-pulse"></div>
                <div class="min-w-full w-64 h-5 my-2 bg-gray-300 rounded-lg animate-pulse"></div>
                <div class="min-w-full w-64 h-5 my-2 bg-gray-300 rounded-lg animate-pulse"></div>
                <div class="min-w-min w-32 h-5 my-2 bg-gray-300 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        <!-- Download URL Data -->
        <div class="bg-white rounded-lg shadow-md px-10 mt-10 py-5">
          <h3 class="font-sans font-medium text-2xl rounded-lg pb-5">
            Download List
          </h3>
          <table :class="['w-full min-w-max table-auto text-left']">
            <thead>
              <tr>
                <th class="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <p>Language</p>
                </th>
                <th class="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <p>Type</p>
                </th>
                <th class="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <p>Provider</p>
                </th>
                <th class="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <p>URL</p>
                </th>
              </tr>
            </thead>
            <tbody v-for="index in 3" :key="index">
              <tr>
                <td>
                  <div class="min-w-full w-10 h-5 m-2 bg-gray-300 rounded-lg animate-pulse"></div>
                </td>
                <td>
                  <div class="min-w-full w-10 h-5 m-2 bg-gray-300 rounded-lg animate-pulse"></div>
                </td>
                <td>
                  <div class="min-w-full w-10 h-5 m-2 bg-gray-300 rounded-lg animate-pulse"></div>
                </td>
                <td>
                  <div class="min-w-full w-10 h-5 m-2 bg-gray-300 rounded-lg animate-pulse"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="my-5 flex flex-row space-x-5">
        <button
          type="button"
          @click="navigateTo('/admin/visualnovel')"
          class="bg-blue-600 hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 transition-colors text-white font-medium p-2 rounded-md shadow-sm mt-5 px-3"
        >
          <p>Back</p>
        </button>
      </div>
    </template>
  </Suspense>
</template>
