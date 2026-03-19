<script lang="ts" setup>
const props = defineProps<{
  label: string;
  link: string;
  showLabel: boolean;
}>();
const route = useRoute();
</script>

<template>
  <div
    class="tooltip-right"
    :data-tip="showLabel ? undefined : props.label"
    :class="{ tooltip: !showLabel }"
  >
    <NuxtLink
      :to="props.link"
      class="btn btn-ghost gap-2 p-2 bg-base-100 hover:bg-base-300 w-full flex-nowrap"
      :class="{ 'bg-base-200': route.path === props.link, 'justify-center': !showLabel, 'justify-start': showLabel }"
    >
      <slot />
      <Transition name="grow">
        <span v-if="props.showLabel">
          {{ props.label }}
        </span>
      </Transition>
    </NuxtLink>
  </div>
</template>

<style scoped>
.grow-enter-active {
  animation: grow 0.3s ease-in;
}
.grow-leave-active {
  animation: grow 0.1s ease-out reverse;
}
@keyframes grow {
  0% {
    scale: 0;
  }
  100% {
    scale: 1;
  }
}
</style>
