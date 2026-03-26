<script lang="ts" setup>
const props = defineProps<{
  isFirstShelf?: boolean;
}>();
</script>

<template>
  <h2 class="text-center bg-base-300 text-lg py-2 relative">
    <slot />
    <div v-if="!props.isFirstShelf" class="dropdown dropdown-bottom dropdown-end absolute right-2 top-0.5">
      <div
        tabindex="0"
        role="button"
        class="btn btn-ghost bg-base-300 hover:bg-base-200"
      >
        <Icon name="tabler:dots-vertical" size="18" />
      </div>
      <ul tabindex="-1" class="dropdown-content menu bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm mt-1">
        <li><a>Edit</a></li>
        <li><a>Delete</a></li>
      </ul>
    </div>
  </h2>
</template>
