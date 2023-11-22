<script setup>
import { setProfileMenuShown } from "~/composables/states";
definePageMeta({
  middleware: ["auth"],
});

const isSidebarOpen = sidebarOpen();

onMounted(() => {
  window.addEventListener("click", closeProfileMenu);
});

onBeforeUnmount(() => {
  window.addEventListener("click", closeProfileMenu);
});

function closeProfileMenu() {
  if (
    !event.target.closest(".profile-menu") &&
    !event.target.closest(".profile-picture")
  ) {
    setProfileMenuShown(false);
  }
}
</script>

<template>
  <div class="flex h-screen relative z-0">
    <AppSidebar />
    <div
      :class="[
        isSidebarOpen
          ? 'max-lg:blur-lg max-lg:bg-black/20'
          : 'blur-none bg-main',
      ]"
      class="flex flex-col flex-grow transition-colors lg:bg-main"
    >
      <AppHeader />
      <NuxtPage class="p-5 w-5/6" />
    </div>
  </div>
</template>
