<script setup>
import { setProfileMenuShown } from '~/composables/states';

onMounted(() => {
    window.addEventListener('click', closeProfileMenu);
});

onBeforeUnmount(() => {
    window.addEventListener('click', closeProfileMenu);
})

function closeProfileMenu() {
    if (!event.target.closest('.profile-menu') && !event.target.closest('.profile-picture')) {
        setProfileMenuShown(false);
    }
}
</script>

<template>
    <div class="flex bg-main h-screen">
        <AppSidebar />
        <div class="flex flex-col flex-grow">
            <AppHeader />
            <NuxtPage class="p-5 w-5/6" />
        </div>
    </div>
</template>