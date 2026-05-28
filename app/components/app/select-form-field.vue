<script lang="ts" setup>
import type { SelectShelf } from "~/lib/db/schema";

const props = defineProps<{
  label: string;
  name: string;
  error?: string;
  disabled: boolean;
  initialShelfId?: number | null;
}>();

const { value, handleChange } = useField<number | null>(() => props.name);

const shelvesStore = useShelvesStore();
const { shelves } = storeToRefs(shelvesStore);

function isShelf(value: unknown): value is SelectShelf {
  return !!value
    && typeof value === "object"
    && "id" in value
    && "name" in value;
}

const shelfOptions = computed<SelectShelf[]>(() => {
  if (!Array.isArray(shelves.value)) {
    return [];
  }

  return shelves.value.filter(isShelf);
});

function onSelectChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  handleChange(target.value === "" ? null : Number(target.value));
}
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ (props.label) }}
    </legend>
    <select
      class="select"
      :value="value"
      @change="onSelectChange"
    >
      <option value="">
        No Shelf
      </option>

      <option
        v-for="shelf in shelfOptions"
        :key="shelf.id"
        :value="shelf.id"
        :selected="props.initialShelfId === shelf.id"
      >
        {{ shelf.name }}
      </option>
    </select>
    <p v-if="props.error" class="fieldset-label text-error">
      {{ props.error }}
    </p>
  </fieldset>
</template>
