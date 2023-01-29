<script setup>
import { useRoute } from 'vue-router';
import { computed } from '@vue/reactivity';
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

const route = useRoute();
const currentRouteName = computed(() => route.name);

function logout() {
    cookies.remove('token');
    route.push({ name: 'login' });
}
</script>

<style>
/* we will explain what these classes do next! */
.slide-enter-active {
    display: block;
    transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
}

.slide-leave-active {
    display: block;
    transform: translateX(0);
    -webkit-transform: translateX(0);
}

.slide-enter-from,
.slide-leave-to {
    display: none;
}
</style>

<template>
    <Transition name="slide">
        <nav class="flex flex-col top-0 left-0 w-80 bg-white h-screen border-r">
            <div class="flex justify-center items-center h-14 text-lg">
                <p>ATRI Control Panel</p>
            </div>
            <div class="overflow-y-auto overflox-x-hidden flex flex-col">
                <ul class="py-4 space-y-1">
                    <li>
                        <a href="/"
                            class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-500 pr-6" :class="{ 'border-blue-500': currentRouteName === 'Dashboard' }">
                            <span class="inline-flex justify-center items-center ml-4">
                                <i class="ri-home-line"></i>
                            </span>
                            <span class="ml-2 text-sm tracking-wide truncate">Dashboard</span>
                        </a>
                        <a href="/visualnovel"
                            class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-500 pr-6" :class="{ 'border-blue-500': currentRouteName === 'Visual Novel' }">
                            <span class="inline-flex justify-center items-center ml-4">
                                <i class="ri-gamepad-line"></i>
                            </span>
                            <span class="ml-2 text-sm tracking-wide truncate">Visual Novel</span>
                        </a>
                        <a href="/visualnovel"
                            class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-500 pr-6" :class="{ 'border-blue-500': currentRouteName === 'FanTL' }">
                            <span class="inline-flex justify-center items-center ml-4">
                                <i class="ri-team-line"></i>
                            </span>
                            <span class="ml-2 text-sm tracking-wide truncate">Fan TL Team</span>
                        </a>
                        <a href="#"
                            class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-500 pr-6" :class="{ 'border-blue-500': currentRouteName === 'Setting' }">
                            <span class="inline-flex justify-center items-center ml-4">
                                <i class="ri-settings-2-line"></i>
                            </span>
                            <span class="ml-2 text-sm tracking-wide truncate">Setting and Others</span>
                        </a>
                    </li>
                </ul>
                <ul class="bottom-0 py-3 mt-auto content-end">
                    <li>
                        <a href="#"
                            class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-500 pr-6" @click="logout">
                            <span class="inline-flex justify-center items-center ml-4">
                                <i class="ri-logout-circle-line"></i>
                            </span>
                            <span class="ml-2 text-sm tracking-wide truncate">Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </Transition>
</template>