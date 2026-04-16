<script lang="ts" setup>
const props = defineProps<{
  name: string;
  description: string | null;
  startedAt: number;
  endedAt: number;

}>();
</script>

<template>
  <div
    class="card-body bg-base-100 text-left flex flex-col items-left p-2 pb-6 min-h-30 sm:min-h-50 max-h-50 grow w-64 max-w-64 shrink-0 overflow-y-hidden"
  >
    <div>
      <p class="text-sm italic text-gray-500">
        <span v-if="props.startedAt !== props.endedAt">
          {{ formatDate(props.startedAt) }} / {{ formatDate(props.endedAt) }}
        </span>
        <span v-else>
          {{ formatDate(props.startedAt) }}
        </span>
      </p>
      <h3 class="text-xl border-b-4 border-double min-h-16 max-h-16 flex items-end">
        {{ props.name }}
      </h3>
    </div>
    <p v-if="props.description" class="w-full border-b-2">
      {{ props.description }}
    </p>
  </div>
</template>
