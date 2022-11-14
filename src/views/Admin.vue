<script setup>
    import { computed } from '@vue/reactivity';
    import HeaderVue from './components/Navbar.vue';
    import SidebarVue from './components/Sidebar.vue';
</script>

<template>
    <div class="flex">
        <SidebarVue></SidebarVue>
        <div class="w-full h-screen flex flex-col p-6 bg-gray-50">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isSidebarOpen: false
            }
        },
        provide() {
            return {
                isSidebarOpen: computed(() => this.isSidebarOpen)
            }
        },        
        methods: {
            sidebarToggle() {
                console.log(`Before ${this.isSidebarOpen}`);
                this.isSidebarOpen = !this.isSidebarOpen;
                console.log(`After ${this.isSidebarOpen}`);
            }
        }
    }
</script>
