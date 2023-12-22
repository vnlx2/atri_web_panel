<script setup>
useHead({
    title: 'Dashboard',
});

const vnController = useVisualNovel();
const { getVisualNovelsDashboard } = vnController;
const { dashboard } = storeToRefs(vnController);
await useLazyAsyncData('dashboardData', async () => await getVisualNovelsDashboard(), {
    initialCache: false
});
// onBeforeMount(async () => {
// });
</script>

<template>
    <div class="px-8 py-14 w-full h-full">
        <h1 class="font-sans font-medium text-3xl my-5 rounded-lg">Dashboard</h1>
        <div class="grid grid-rows-3 gap-y-5 md:grid-cols-3 md:gap-x-5">
            <div class="border flex flex-col p-6 bg-white">
                <span>Number of VN in VNDB</span>
                <p class="text-3xl py-3 font-semibold">{{ dashboard.vndb }}</p>
            </div>
            <div class="border flex flex-col p-6 bg-white">
                <span>Number of VN in Database</span>
                <p class="text-3xl py-3 font-semibold">{{ dashboard.all }}</p>
            </div>
            <div class="border flex flex-col p-6 bg-white">
                <span>Number of VN in Database with URL</span>
                <p class="text-3xl py-3 font-semibold">{{ dashboard.withDownloadUrl }}</p>
            </div>
        </div>
    </div>
</template>