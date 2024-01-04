<script setup>
import { sidebarOpen } from '~/composables/states';

const route = useRoute();
const currentPage = route.name;
const isSidebarOpen = sidebarOpen();

function closeSidebar() {
    setSidebarOpen(false);
}
</script>

<template>
    <aside :class="{'translate-x-0': isSidebarOpen}" class="-translate-x-full transition duration-300 ease-in-out w-[90%] h-screen absolute lg:sticky lg:top-0 z-10 md:w-[35%] lg:w-[30%] xl:w-[20%] 2xl:w-[15%] bg-white text-gray-700 p-6">
        <div class="flex justify-between items-center lg:block">
            <div>
                <h2 class="text-xl font-bold subpixel-antialiased tracking-wider font-sans">ATRI Admin Panel</h2>
            </div>
            <button @click="closeSidebar" class="block lg:hidden">
                <i class="ri-close-line text-3xl"></i>
            </button>
        </div>
        <div class="my-4 border-b border-gray-300 " />
        <ul>
            <li>
                <NuxtLink to="/admin" :class="'flex flex-row items-center space-x-5 text-md py-2 my-2 px-3 rounded-md h-11 transition-all hover:bg-gray-100'" :exact-active-class="'active-menu'">
                    <i class="ri-dashboard-2-line text-lg"></i>
                    <p>Dashboard</p>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/admin/visualnovel" :class="'flex flex-row items-center space-x-5 text-md py-2 my-2 px-3 rounded-md h-11 transition-all hover:bg-gray-100'" :active-class="'active-menu'">
                    <i class="ri-gamepad-line text-lg"></i>
                    <p>Visual Novel</p>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/admin/fantl" :class="'flex flex-row items-center space-x-5 text-md py-2 my-2 px-3 rounded-md h-11 transition-all hover:bg-gray-100'" :active-class="'active-menu'">
                    <i class="ri-team-line text-lg"></i>
                    <p>Fan TL Team</p>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/admin/birthday" :class="'flex flex-row items-center space-x-5 text-md py-2 my-2 px-3 rounded-md h-11 transition-all hover:bg-gray-100'" :active-class="'active-menu'">
                    <i class="ri-cake-2-line text-lg"></i>
                    <p>Birthday</p>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/admin/users" :class="'flex flex-row items-center space-x-5 text-md py-2 my-2 px-3 rounded-md h-11 transition-all hover:bg-gray-100'" :active-class="'active-menu'">
                    <i class="ri-group-line text-lg"></i>
                    <p>Users</p>
                </NuxtLink>
            </li>
        </ul>
    </aside>
</template>