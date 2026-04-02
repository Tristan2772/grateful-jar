<script lang="ts" setup>
import type { RouteLocationRaw } from "vue-router";

const props = defineProps<{
  label: string;
  link?: string;
  to?: RouteLocationRaw;
  showLabel: boolean;
  isHoveredJar?: boolean;
  icon?: string;
  component?: "JarIcon" | "JarSettingsIcon";
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
      :to="props.link || props.to"
      class="btn btn-ghost gap-2 p-2 bg-base-100 hover:bg-base-300 w-full flex-nowrap"
      :class="{ 'bg-base-200': route.path === props.link, 'bg-base-300': isHoveredJar, 'justify-center': !showLabel, 'justify-start': showLabel }"
    >
      <AppJarIcon v-if="(!props.icon && !props.component) || props.component === 'JarIcon'" />
      <AppJarSettingsIcon v-if="props.component === 'JarSettingsIcon'" />
      <Icon
        v-if="props.icon"
        :name="props.icon"
        size="24"
      />
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
