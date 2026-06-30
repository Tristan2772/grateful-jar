<script lang="ts" setup>
import type { FetchError } from "ofetch";

const props = defineProps<{
  isFirstShelf?: boolean;
  shelfId?: number;
}>();
const shelvesStore = useShelvesStore();
const jarsStore = useJarsStore();
const isOpen = ref(false);

function openDialog() {
  isOpen.value = true;
  (document.activeElement as HTMLAnchorElement).blur();
}

const isDeleting = ref(false);
const deleteError = ref("");

async function confirmDelete() {
  try {
    isOpen.value = false;
    deleteError.value = "";
    isDeleting.value = true;
    await $fetch(`/api/shelves/${props.shelfId}`, {
      method: "DELETE",
    });
    shelvesStore.refresh();
    jarsStore.allJarsRefresh();
    navigateTo("/dashboard");
  }
  catch (e) {
    const error = e as FetchError;
    deleteError.value = error.data?.statusMessage || error.statusMessage || "An unknown error occurred";
  }
  isDeleting.value = false;
}
</script>

<template>
  <div>
    <h2 class="text-center bg-base-200 text-lg py-2 relative flex items-center justify-center">
      <span class="truncate px-8 pr-12"><slot /></span>
      <div v-if="!props.isFirstShelf" class="dropdown dropdown-top dropdown-end absolute right-2 top-1.5">
        <div
          tabindex="0"
          role="button"
          class="btn btn-ghost btn-sm border-0 bg-base-200 hover:bg-base-100"
        >
          <Icon name="tabler:dots-vertical" size="18" />
        </div>
        <ul tabindex="-1" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm mb-3 border-2 border-secondary">
          <li>
            <NuxtLink :to="`/dashboard/shelves/${props.shelfId}/edit`">
              <AppShelfSettingsIcon />
              Edit
            </NuxtLink>
          </li>
          <li><a @click="openDialog"><Icon name="tabler:trash-x-filled" size="24" />Delete</a></li>
        </ul>
      </div>
    </h2>
    <AppDialog
      :is-open="isOpen"
      title="Are you sure?"
      description="Deleting this shelf cannot be undone. Are you sure you want to do this?"
      confirm-class="btn-error"
      confirm-label="Yes, Delete this Shelf."
      @on-closed="isOpen = false"
      @on-confirmed="confirmDelete"
    />
  </div>
</template>
