<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <button :disabled="authStore.loading" class="btn btn-secondary" @click="authStore.signIn">
    Sign in with Google
    <span v-if="authStore.loading" class="loading loading-spinner loading-md" />
    <Icon v-else-if="!authStore.loading" name="tabler:brand-google" size="24" />
  </button>
</template>
