<script setup lang="ts">
const title = pageTitle();
const isProfileMenuShown = ref(false);

function toggleProfileMenu() {
    isProfileMenuShown.value = !isProfileMenuShown.value
    console.log(isProfileMenuShown.value);
}
</script>

<template>
    <header class="px-10 py-3 flex justify-between bg-gray-900 text-white">
        <div class="flex items-center justify-evenly">
            <div class="mr-10">
                <h2 class="text-xl font-bold">ATRI Admin Panel</h2>
            </div>
            <div class="pl-10 border-l h-full flex items-center border-white">
                <h3 class="text-lg font-medium">{{title}}</h3>
            </div>
        </div>
        <div class="relative inline-block h-full">
            <button :class="[isProfileMenuShown ? 'bg-gray-700' : 'bg-transparent']" class="flex h-full py-2 rounded transition-colors hover:bg-gray-600" @click="toggleProfileMenu">
                <div class="mx-3 flex">
                    <div class="flex items-center">
                        <NuxtImg src="/assets/profile.svg" width="40" />
                    </div>
                    <div class="ml-2 text-left flex flex-col justify-center">
                        <p class="text-md font-medium text-gray-200">Moonchild</p>
                        <p class="text-sm text-gray-200">Super Admin</p>
                    </div>
                    <div class="flex items-center mx-1">
                        <i :class="{'rotate-180': isProfileMenuShown}" class="transition-transform ri-arrow-drop-down-line text-2xl"></i>
                    </div>
                </div>
            </button>
            <ul :class="[!isProfileMenuShown ? 'invisible opacity-0 -translate-y-10' : 'visible opacity-100 translate-y-0']" class="absolute w-full p-3 bg-slate-100 shadow-sm text-gray-700 pt-1 rounded-b transition">
                <li class="block p-2">
                    <a href="#" class="flex">
                        <i class="ri-logout-box-line block"></i>
                        <p>Logout</p>
                    </a>
                </li>
            </ul>
        </div>
    </header>
</template>