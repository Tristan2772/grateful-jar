<script lang="ts" setup>
import type { FetchError } from "ofetch";

const jarStore = useJarsStore();
const { currentJar: jar, currentJarError: error, currentJarStatus: status } = storeToRefs(jarStore);
const route = useRoute();
const isOpen = ref(false);

function openDialog() {
  isOpen.value = true;
  (document.activeElement as HTMLAnchorElement).blur();
}

const deleteError = ref("");
const isDeleting = ref(false);

const loading = computed(() => status.value === "pending" || isDeleting.value);

const errorMessage = computed(() => error.value?.statusMessage || deleteError.value);

async function confirmDelete() {
  try {
    isOpen.value = false;
    deleteError.value = "";
    isDeleting.value = true;
    await $fetch(`/api/jars/${route.params.slug}`, {
      method: "DELETE",
    });
    navigateTo("/dashboard");
  }
  catch (e) {
    const error = e as FetchError;
    deleteError.value = error.data?.statusMessage || error.statusMessage || "An unknown error occurred";
  }
  isDeleting.value = false;
}

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
    <div v-if="loading">
      <span class="loading loading-spinner p-4 loading-xl" />
    </div>
    <div v-if="errorMessage && !loading">
      <div role="alert" class="alert alert-error">
        <Icon name="tabler:square-rounded-letter-x-filled" size="24" />
        <span>{{ errorMessage }}</span>
      </div>
    </div>
    <div v-if="route.name === 'dashboard-jars-slug' && jar && !loading">
      <div class="flex">
        <div class="flex flex-col gap-4 items-center absolute bottom-15 left-0 right-0">
          <h2 class="text-2xl flex items-center gap-2">
            {{ jar.name }}
            <div class="dropdown dropdown-bottom dropdown-end">
              <div
                tabindex="0"
                role="button"
                class="btn btn-sm btn-ghost hover:bg-base-100 p-2"
              >
                <Icon name="tabler:dots-vertical" size="18" />
              </div>
              <ul tabindex="-1" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm mb-2">
                <li>
                  <NuxtLink
                    :to="{
                      name: 'dashboard-jars-slug-edit',
                      params: {
                        slug: route.params.slug,
                      },
                    }"
                  >
                    <AppJarSettingsIcon />
                    Edit
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="" @click="openDialog">
                    <Icon name="tabler:trash-x-filled" size="24" />
                    Delete
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </h2>
          <p class="text-sm">
            {{ jar.description }}
          </p>
        </div>
        <div class="note-container p-4 flex ">
          <div v-if="!jar.jarNotes.length" class="zig-zag bg-base-100 h-35">
            <div class="card-body text-center flex flex-col items-center justify-center gap-4">
              <p class="text-lg max-h-fit">
                Add a note to get started.
              </p>
              <NuxtLink to="/dashboard/add-jar" class="btn btn-secondary w-40">
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
    <AppDialog
      :is-open="isOpen"
      title="Are you sure?"
      description="Deleting this jar will delete all associated notes. This cannot be undone. Are you sure you want to do this?"
      confirm-class="btn-error"
      confirm-label="Yes, Delete this Jar."
      @on-closed="isOpen = false"
      @on-confirmed="confirmDelete"
    />
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
