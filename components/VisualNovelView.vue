<script setup lang="ts">
import { type IErrorResponse } from "~/types";

const route = useRoute();
const vnController = useVisualNovel();
const { visualNovelForm } = storeToRefs(vnController);
const vnImageKey = ref(0);
const language: Record<string, string> = {
  jp: "Japanese",
  en: "English",
  id: "Indonesia",
};

vnImageKey.value = parseInt(route.params.code as string);

useHead({
  title: visualNovelForm.value.title,
});

function setAltImage(e: any) {
  e.target.src = "/assets/img/not_found_img.jpg";
  e.target.srcset =
    "/assets/img/not_found_img.jpg 1x, /assets/img/not_found_img.jpg 2x";
}
</script>

<template>
  <span class="text-sm">
    <NuxtLink class="text-link" to="/admin/visualnovel">VisualNovel</NuxtLink>
    <span> / {{ visualNovelForm.title }}</span>
  </span>
  <h1 class="font-sans font-medium text-3xl my-5 rounded-lg">
    {{ visualNovelForm.title }}
  </h1>
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
          <img
            :key="vnImageKey"
            class="mx-auto max-w-xs"
            :src="
              visualNovelForm.image !== undefined ? visualNovelForm.image : ''
            "
            @error="setAltImage"
          />
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
          <p class="text-lg">v{{ visualNovelForm.code }}</p>
        </div>
        <!-- Title -->
        <div class="grid grid-cols-3">
          <h6
            class="block text-lg font-sans antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900"
          >
            Title
          </h6>
          <p class="text-lg">{{ visualNovelForm.title }}</p>
        </div>
        <!-- Aliases -->
        <div class="grid grid-cols-3">
          <h6
            class="block text-lg font-sans antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900"
          >
            Aliases
          </h6>
          <p class="text-lg">
            {{ visualNovelForm.aliases === "" ? "-" : visualNovelForm.aliases }}
          </p>
        </div>
        <!-- Length -->
        <div class="grid grid-cols-3">
          <h6
            class="block text-lg font-sans antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900"
          >
            Length
          </h6>
          <p class="text-lg">{{ visualNovelForm.length }}</p>
        </div>
        <!-- Rating -->
        <div class="grid grid-cols-3">
          <h6
            class="block text-lg font-sans antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900"
          >
            Rating
          </h6>
          <p class="text-lg">{{ visualNovelForm.rating }}</p>
        </div>
        <!-- Description -->
        <div class="grid">
          <h6
            class="block text-lg font-sans antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900"
          >
            Description
          </h6>
          <p class="text-lg text-justify whitespace-pre-line" v-html="visualNovelForm.description">
          </p>
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
      <tbody>
        <tr
          v-if="
            visualNovelForm.downloadUrl !== undefined &&
            visualNovelForm.downloadUrl.length > 0
          "
          v-for="(vnDl, index) in visualNovelForm.downloadUrl"
          :key="index"
        >
          <td class="p-4 border-b border-blue-gray-50">
            <p>{{ language[vnDl.language!] }}</p>
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <p>{{ vnDl.type }}</p>
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <p>{{ vnDl.provider }}</p>
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <a :href="vnDl.url" class="text-blue-500 underline">{{
              vnDl.url
            }}</a>
          </td>
        </tr>
        <tr v-else>
          <td colspan="4">
            <p class="text-center py-2">Empty Download List</p>
          </td>
        </tr>
      </tbody>
    </table>
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
