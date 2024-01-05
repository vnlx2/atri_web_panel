<script setup lang="ts">
import { profileMenuShown, setProfileMenuShown, sidebarOpen } from '~/composables/states';

const isProfileMenuShown = profileMenuShown();
const isSidebarOpen = sidebarOpen();

onMounted(() => {
    window.addEventListener('resize', setSidebarShownForDesktop);
    setSidebarShownForDesktop();
});

function setSidebarShownForDesktop() {
    setSidebarOpen((window.innerWidth >= 1024));
}

function toggleProfileMenu() {
    setProfileMenuShown(!isProfileMenuShown.value);
}

function toggleSidebar() {
    setSidebarOpen(!isSidebarOpen.value);
}

async function logout() {
    try {
        await logout();
        const token = useCookie('token');
        token.value = null;
        return navigateTo('/');
    } catch (error) {
        generalErrorAlert(error);
    }
}
</script>

<template>
    <header class="flex justify-between items-center px-3 py-3 text-black z-0 lg:absolute lg:right-0 lg:pr-10 lg:px-0">
        <button @click="toggleSidebar" class="block ml-3 lg:hidden">
            <i class="ri-menu-line text-2xl"></i>
        </button>
        <div class="relative basis-[40%] text-right sm:basis-1/4 lg:basis-auto">
            <button :class="[isProfileMenuShown ? 'text-indigo-500' : '']" class="profile-picture h-full py-2 rounded transition-colors hover:text-indigo-600" @click="toggleProfileMenu">
                <div class="mx-3 flex">
                    <div class="hidden md:flex mr-2 text-left flex-col justify-center">
                        <p class="text-md font-medium">Moonchild</p>
                        <p class="text-sm">Super Admin</p>
                    </div>
                    <div class="flex items-center">
                        <NuxtImg src="/assets/profile.svg" width="40" />
                    </div>
                    <div class="flex items-center mx-1">
                        <i :class="{'rotate-180': isProfileMenuShown}" class="transition-transform ri-arrow-drop-down-line text-2xl"></i>
                    </div>
                </div>
            </button>
            <ul :class="[!isProfileMenuShown ? 'invisible opacity-0 -translate-y-10' : 'visible opacity-100 translate-y-0']" class="profile-menu absolute w-full p-1 bg-white shadow-sm text-gray-700 pt-1 right-5 rounded transition">
                <li class="block p-2">
                    <a @click="logout" href="" class="flex">
                        <i class="ri-logout-box-line block"></i>
                        <p>Logout</p>
                    </a>
                </li>
            </ul>
        </div>
    </header>
</template>