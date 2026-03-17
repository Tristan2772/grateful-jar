<script lang="ts" setup>
const props = defineProps<{
  label: string;
  link: string;
  showLabel: boolean;
}>();
const route = useRoute();
</script>

<template>
  <div class="tooltip-right" :data-tip="showLabel ? undefined : props.label" :class="{ tooltip: !showLabel }">
    <NuxtLink
      :to="props.link"
      class="btn btn-ghost gap-2 p-2 bg-base-100 hover:bg-base-300 w-full"
      :class="{ 'bg-base-200': route.path === props.link, 'justify-center': !showLabel, 'justify-start': showLabel }"
    >
      <slot />
      <span v-if="props.showLabel">
        {{ props.label }}
      </span>
    </NuxtLink>
  </div>
</template>
