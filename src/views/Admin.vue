<script setup>
import { computed } from '@vue/reactivity';
import Footer from './components/Footer.vue';
import SidebarVue from './components/Sidebar.vue';
</script>

<template>
    <div class="flex">
        <SidebarVue></SidebarVue>
        <div class="w-full h-screen relative p-6 bg-gray-50">
            <router-view></router-view>
            <Footer></Footer>
        </div>        
    </div>
</template>

<script>
export default {
    data() {
        return {
            isSidebarOpen: false,
        };
    },
    provide() {
        return {
            isSidebarOpen: computed(() => this.isSidebarOpen),
            tokenData: this.$cookies.get("token"),
        };
    },
    methods: {
        sidebarToggle() {
            console.log(`Before ${this.isSidebarOpen}`);
            this.isSidebarOpen = !this.isSidebarOpen;
            console.log(`After ${this.isSidebarOpen}`);
        }
    },
    components: { Footer }
}
</script>
