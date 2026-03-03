<script setup lang="ts">
import AppTitleNavbar from "./components/app/title-navbar.vue";
</script>

<template>
  <div class="flex flex-col h-screen">
    <AppTitleNavbar class="shrink-0" />
    <NuxtPage class="flex-1 overflow-hidden" />
  </div>
</template>
