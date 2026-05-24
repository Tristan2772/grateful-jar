<script lang="ts" setup>
const props = defineProps<{
  noteId: number;
  name: string;
  description: string | null;
  startedAt: number;
  endedAt: number;
  isHovered?: boolean;
}>();

const route = useRoute();
</script>

<template>
  <NuxtLink
    :to="{ name: 'dashboard-jars-slug-id', params: { slug: route.params.slug, id: props.noteId } }"
    class="card-body bg-base-100 text-left flex flex-col items-left p-2 pb-6 min-h-32 sm:min-h-54 max-h-54 w-full overflow-y-hidden"
  >
    <div>
      <p class="text-sm italic text-gray-500">
        <span v-if="props.startedAt !== props.endedAt">
          {{ formatDateYearLast(props.startedAt) }} / {{ formatDateYearLast(props.endedAt) }}
        </span>
        <span v-else>
          {{ formatDateYearLast(props.startedAt) }}
        </span>
      </p>
      <h3 class="text-xl border-b-4 border-double min-h-16 max-h-16 line-clamp-2 transition-colors duration-300" :class="{ 'text-secondary': props.isHovered }">
        {{ props.name }}
      </h3>
    </div>
    <p v-if="props.description" class="w-full border-b-2 line-clamp-4">
      {{ props.description }}
    </p>
  </NuxtLink>
</template>
