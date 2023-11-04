<script setup>
const route = useRoute();
const currentPage = route.name;
</script>

<template>
    <aside class="w-[15%] bg-white text-gray-700 p-6">
        <div>
            <h2 class="text-xl font-bold subpixel-antialiased tracking-wider font-sans">ATRI Admin Panel</h2>
        </div>
        <div class="my-4 border-b border-gray-300 " />
        <ul>
            <li :class="[currentPage === 'dashboard' ? 'active-menu' : 'hover:bg-gray-100']" class="text-md py-2 my-2 px-3 rounded-md h-11 transition-all">
                <a href="/dashboard" class="flex flex-row items-center space-x-5">
                    <i class="ri-dashboard-2-line text-lg"></i>
                    <p>Dashboard</p>
                </a>
            </li>
            <li :class="[currentPage === 'visualnovel' ? 'active-menu' : 'hover:bg-gray-100']" class="text-md py-2 my-2 px-3 rounded-md h-11 transition-all">
                <a href="/visualnovel" class="flex flex-row items-center space-x-5">
                    <i class="ri-gamepad-line text-lg"></i>
                    <p>Visual Novel</p>
                </a>
            </li>
            <li :class="[currentPage === 'fantl' ? 'active-menu' : 'hover:bg-gray-100']" class="text-md py-2 my-2 px-3 rounded-md h-11 transition-all">
                <a href="#" class="flex flex-row items-center space-x-5">
                    <i class="ri-team-line text-lg"></i>
                    <p>Fan TL Team</p>
                </a>
            </li>
            <li :class="[currentPage === 'birthday' ? 'active-menu' : 'hover:bg-gray-100']" class="text-md py-2 my-2 px-3 rounded-md h-11 transition-all">
                <a href="#" class="flex flex-row items-center space-x-5">
                    <i class="ri-cake-2-line text-lg"></i>
                    <p>Birthday</p>
                </a>
            </li>
            <li :class="[currentPage === 'users' ? 'active-menu' : 'hover:bg-gray-100']" class="text-md py-2 my-2 px-3 rounded-md h-11 transition-all">
                <a href="#" class="flex flex-row items-center space-x-5">
                    <i class="ri-group-line text-lg"></i>
                    <p>Users</p>
                </a>
            </li>
        </ul>
    </aside>
</template>