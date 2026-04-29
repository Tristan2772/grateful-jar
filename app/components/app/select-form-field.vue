<script lang="ts" setup>
const props = defineProps<{
  label: string;
  name: string;
  error?: string;
  disabled: boolean;
  initialShelfId?: number | null;
}>();

const { value, handleChange } = useField(() => props.name);

const shelvesStore = useShelvesStore();
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ (props.label) }}
    </legend>
    <select
      class="select"
      :value="value"
      @change="(e: Event) => handleChange(
        (e.target as HTMLSelectElement).value === ''
          ? null
          : Number((e.target as HTMLSelectElement).value),
      )"
    >
      <option value="">
        No Shelf
      </option>
      <option
        v-for="shelf in shelvesStore.shelves"
        :key="shelf.id"
        :value="shelf.id"
        :selected="initialShelfId === shelf.id"
      >
        {{ shelf.name }}
      </option>
    </select>
    <p v-if="props.error" class="fieldset-label text-error">
      {{ props.error }}
    </p>
  </fieldset>
</template>
