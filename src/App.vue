<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

</template>

<style scoped>
</style>