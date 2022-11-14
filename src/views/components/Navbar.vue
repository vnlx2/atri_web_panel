<style>
/* we will explain what these classes do next! */
.v-enter-active {
    animation: fadeInDown 0.5s;
}

.v-leave-active {
    animation: fadeOutDown 0.5s;
}

@keyframes fadeInDown {
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
} 

@keyframes fadeOutDown {
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(-20px);
    }
} 
</style>

<template>
    <header class="bg-wthie text-gray-700 px-8 md:px-20 py-3 flex justify-between">
        <div class="flex items-center">
            <button class="pr-5 text-md text-gray-100 hidden" @click="this.$emit('sidebarToggle')">
                <i class="ri-menu-line"></i>
            </button>
        </div>
        <button class="flex items-center font-medium" @click="toggle" @focusout="(this.isOpen) ? this.isOpen = false : this.isOpen">
            <p>Tsumugi</p> 
            <i class="ri-arrow-drop-down-line text-lg pl-2"></i>
        </button>
        <Transition>
            <ul class="bg-white absolute right-0 w-auto mt-8 mr-10 origin-top-right rounded-md shadow-lg md:mr-20 md:w-32" v-if="this.isOpen">
                <li class="px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-800">
                    <a href="" class="flex text-black">
                        <i class="ri-logout-box-line"></i>
                        <p>Logout</p>
                    </a>
                </li>
            </ul>
        </Transition>
    </header>
</template>

<script>
    export default {
        data() {
            return {
                isOpen: false,
            }
        },
        methods: {
            toggle() {
                this.isOpen = !this.isOpen;
            }
        }
    }
</script>