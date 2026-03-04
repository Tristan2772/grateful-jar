<script lang="ts" setup>
import AppTitleNavbar from "../components/app/title-navbar.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppTitleNavbar />
    <main>
      <slot />
    </main>
  </div>
</template>
