<script setup lang="ts">
import { profileMenuShown, setProfileMenuShown } from '~/composables/states';


const isProfileMenuShown = profileMenuShown();

function toggleProfileMenu() {
    setProfileMenuShown(!isProfileMenuShown.value);
}
</script>

<template>
    <header class="absolute right-0 pr-10 py-3 text-black">
        <div class="relative top-0 inline-block w-full">
            <button :class="[isProfileMenuShown ? 'text-indigo-500' : '']" class="profile-picture flex right-0 h-full py-2 rounded transition-colors hover:text-indigo-600" @click="toggleProfileMenu">
                <div class="mx-3 flex">
                    <div class="mr-2 text-left flex flex-col justify-center">
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
            <ul :class="[!isProfileMenuShown ? 'invisible opacity-0 -translate-y-10' : 'visible opacity-100 translate-y-0']" class="profile-menu absolute w-full p-3 bg-white shadow-sm text-gray-700 pt-1 rounded transition">
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