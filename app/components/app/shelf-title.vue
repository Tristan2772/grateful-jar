<script lang="ts" setup>
const props = defineProps<{
  isFirstShelf?: boolean;
  shelfId?: number;
}>();
</script>

<template>
  <h2 class="text-center bg-base-200 text-lg py-2 relative">
    <slot />
    <div v-if="!props.isFirstShelf" class="dropdown dropdown-top dropdown-end absolute right-2 top-1.5">
      <div
        tabindex="0"
        role="button"
        class="btn btn-ghost btn-sm border-0 bg-base-200 hover:bg-base-100"
      >
        <Icon name="tabler:dots-vertical" size="18" />
      </div>
      <ul tabindex="-1" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm mb-2">
        <li>
          <NuxtLink :to="`/dashboard/shelves/${props.shelfId}/edit`">
            Edit
          </NuxtLink>
        </li>
        <li><a><Icon name="tabler:trash-x-filled" size="24" />Delete</a></li>
      </ul>
    </div>
  </h2>
</template>
