<script lang="ts" setup>
const route = useRoute();
const error = route.query.error || "An unknown error has occurred.";
</script>

<template>
  <div class="card bg-base-300 container mt-4 min-h-72 text-center mx-auto flex flex-col justify-center items-center gap-4">
    <div role="alert" class="alert alert-error flex min-w-1/2">
      <Icon name="tabler:square-rounded-letter-x-filled" size="24" />
      <span>Uh oh! {{ error }}</span>
    </div>
    <NuxtLink class="btn btn-primary" to="/">
      Home <Icon name="tabler:arrow-left" />
    </NuxtLink>
  </div>
</template>
