<script lang="ts" setup>
const jarStore = useJarsStore();
const { currentJar: jar, currentJarError: error, currentJarStatus: status } = storeToRefs(jarStore);
const route = useRoute();

onMounted(() => {
  setTimeout(() => {
    jarStore.currentJarRefresh();
  }, 0);
});

onBeforeRouteUpdate((to) => {
  if (to.name === "dashboard-jars-slug") {
    jarStore.currentJarRefresh();
  }
});
</script>

<template>
  <div>
    <div v-if="status === 'pending'">
      <span class="loading loading-spinner loading-xl" />
    </div>
    <div v-if="error && status !== 'pending'">
      <div role="alert" class="alert alert-error">
        <Icon name="tabler:square-rounded-letter-x-filled" size="24" />
        <span>{{ error.name }}</span>
      </div>
    </div>
    <div v-if="route.name === 'dashboard-jars-slug' && jar && status !== 'pending'">
      <div class="flex">
        <div class="flex flex-col gap-4 items-center absolute bottom-15 left-0 right-0">
          <h2 class="text-2xl">
            {{ jar.name }}
          </h2>
          <p class="text-sm">
            {{ jar.description }}
          </p>
        </div>
        <div class="note-container py-4 flex">
          <div v-if="!jar.jarNotes.length" class="zig-zag bg-base-300 h-40">
            <div class="card-body text-center flex flex-col items-center justify-center gap-4">
              <p class="text-lg max-h-fit">
                Add a note to get started.
              </p>
              <NuxtLink to="/dashboard/add-jar" class="btn btn-primary w-40">
                Add Note
                <Icon name="tabler:plus" size="24" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="route.name !== 'dashboard-jars-slug' && jar && status !== 'pending'">
      <NuxtPage />
    </div>
  </div>
</template>

<style scoped>
.zig-zag {
  --a: 90deg;
  --s: 15px;
  mask: conic-gradient(from calc(var(--a) / -2) at bottom, #000 0 var(--a), #0000 0);
  mask-size: var(--s) 100%;
}
</style>
