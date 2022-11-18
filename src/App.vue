<script setup>
import { computed } from '@vue/reactivity';
import { mapGetters } from 'vuex';
  const isLogin = computed(() => mapGetters("auth", { getLoginToken: "getLoginStatus" }));
</script>

<template>
  <router-view :class="(!isAuthentic)?'bg-login bg-center bg-cover' : ''"></router-view>
</template>
