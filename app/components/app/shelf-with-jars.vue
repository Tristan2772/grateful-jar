<script lang="ts" setup>
import type { jars } from "~/lib/db/schema/jars";

type Jar = typeof jars.$inferSelect;
const props = defineProps<{
  jarsList?: Jar[];
}>();
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
        <div class="flex flex-col card-compact bg-base-300 max-h-65 min-h-65 aspect-square rounded-full p-3 border-2 border-solid">
          <div class="card-body text-center">
            <h3 class="text-xl">
              {{ jar.name }}
            </h3>
            <p>{{ jar.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <AppShelfTitle :is-first-shelf="true">
      <slot />
    </AppShelfTitle>
  </div>

  <!-- ---------------------------------- if no jars on shelf ---------------------------------- -->
  <div v-if="jarsList && jarsList.length === 0">
    <div class="p-4">
      <div class="flex card-compact bg-base-300 max-h-65 min-h-65 aspect-square rounded-full p-3 border-2 border-dashed">
        <div class="card-body text-center flex flex-col items-center justify-center gap-4">
          <p class="text-xl max-h-fit">
            Add a jar to this shelf.
          </p>
          <NuxtLink to="/dashboard/add-jar" class="btn btn-primary w-40">
            Add Jar
            <Icon name="tabler:plus" size="24" />
          </NuxtLink>
        </div>
      </div>
    </div>
    <AppShelfTitle>
      <slot />
    </AppShelfTitle>
  </div>
</template>
