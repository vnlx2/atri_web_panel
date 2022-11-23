<script setup>
</script>

<template>
  <router-view :class="(!this.$cookies.get('token'))?'bg-login bg-center bg-cover' : ''"></router-view>
</template>
