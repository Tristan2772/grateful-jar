<script lang="ts" setup>
import type { FetchError } from "ofetch";

const sidebarStore = useSidebarStore();
const route = useRoute();
const jarStore = useJarsStore();
const { currentNote: note, currentNoteError: error, currentNoteStatus: status } = storeToRefs(jarStore);
const isOpen = ref(false);
const isDeleting = ref(false);
const deleteError = ref("");
const loading = computed(() => status.value === "pending" || isDeleting.value);
const errorMessage = computed(() => error.value?.statusMessage || deleteError.value);

function openDialog() {
  isOpen.value = true;
  (document.activeElement as HTMLAnchorElement).blur();
}

async function confirmDelete() {
  try {
    isOpen.value = false;
    deleteError.value = "";
    isDeleting.value = true;
    await $fetch(`/api/jars/${route.params.slug}/${note.value?.id}`, {
      method: "DELETE",
    });
    navigateTo({ name: "dashboard-jars-slug", params: { slug: route.params.slug } });
  }
  catch (e) {
    const error = e as FetchError;
    deleteError.value = error.data?.statusMessage || error.statusMessage || "An unknown error occurred";
  }
  isDeleting.value = false;
}

onMounted(() => {
  setTimeout(() => {
    jarStore.currentNoteRefresh();
  }, 0);
});

onBeforeRouteUpdate((to) => {
  if (to.name === "dashboard-jars-slug-id") {
    jarStore.currentNoteRefresh();
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
    <div v-if="route.name === 'dashboard-jars-slug-id' && note && !loading">
      <div class="flex p-4">
        <div class="flex flex-col gap-2 transition-all duration-300" :class="{ 'left-16': !sidebarStore.isSidebarOpen, 'left-64': sidebarStore.isSidebarOpen }">
          <h2 class="text-2xl flex items-center gap-2">
            {{ note.name }}
            <div class="dropdown dropdown-bottom dropdown-start">
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
                      name: 'dashboard-jars-slug-id-edit',
                      params: {
                        slug: route.params.slug,
                        id: note.id,
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
          <p class="text-sm italic text-gray-500">
            <span v-if="note.startedAt !== note.endedAt">
              {{ formatDateYearLast(note.startedAt) }} / {{ formatDateYearLast(note.endedAt) }}
            </span>
            <span v-else>
              {{ formatDateYearLast(note.startedAt) }}
            </span>
          </p>
          <p class="text-sm min-h-16">
            {{ note.description }}
          </p>
        </div>
        <div class="p-4 flex w-full" />
      </div>
    </div>
    <div v-if="route.name !== 'dashboard-jars-slug-id' && note && status !== 'pending'">
      <NuxtPage />
    </div>
    <AppDialog
      :is-open="isOpen"
      title="Are you sure?"
      description="Deleting this note will delete all associated data. This cannot be undone. Are you sure you want to do this?"
      confirm-class="btn-error"
      confirm-label="Yes, Delete this Note."
      @on-closed="isOpen = false"
      @on-confirmed="confirmDelete"
    />
  </div>
</template>
