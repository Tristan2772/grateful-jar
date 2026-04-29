<script lang="ts" setup>
import type { Jar } from "~/lib/types";

const props = defineProps<{
  isFirstShelf?: boolean;
  jarsList?: Jar[];
  shelfId?: number;
}>();

const jarsStore = useJarsStore();
</script>

<template>
  <!-- ----------------------------- if jars exist -------------------------------- -->
  <div
    v-if="jarsList && jarsList.length > 0"
    class="flex flex-col"
  >
    <div class="flex gap-4 p-4 overflow-x-auto overflow-y-hidden">
      <div
        v-for="jar in props.jarsList"
        :key="jar.id"
      >
        <NuxtLink
          :to="{
            name: 'dashboard-jars-slug',
            params: { slug: jar.slug },
          }"
          class="flex flex-col card-compact max-h-65 min-h-65 aspect-square rounded-full p-3 border-2 border-solid"
          :class="jarsStore.hoveredJarName === jar.name ? 'border-primary bg-base-300' : 'bg-base-100' "
          @mouseenter="jarsStore.hoveredJarName = jar.name"
          @mouseleave="jarsStore.hoveredJarName = ''"
        >
          <div class="card-body text-center">
            <h3 class="text-xl">
              {{ jar.name }}
            </h3>
            <p>{{ jar.description }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
    <AppShelfTitle :is-first-shelf :shelf-id>
      <slot />
    </AppShelfTitle>
  </div>

  <!-- ---------------------------------- if no jars on shelf ---------------------------------- -->
  <div v-if="jarsList && jarsList.length === 0">
    <div class="p-4">
      <div class="flex card-compact bg-base-100 max-h-65 min-h-65 aspect-square rounded-full p-3 border-2 border-dashed">
        <div class="card-body text-center flex flex-col items-center justify-center gap-4">
          <p class="text-lg max-h-fit">
            Add a new jar to this shelf.
          </p>
          <NuxtLink to="/dashboard/add-jar" class="btn btn-secondary w-40">
            Add Jar
            <Icon name="tabler:plus" size="24" />
          </NuxtLink>
        </div>
      </div>
    </div>
    <AppShelfTitle :shelf-id>
      <slot />
    </AppShelfTitle>
  </div>
</template>
