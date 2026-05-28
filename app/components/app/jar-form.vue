<script lang="ts" setup>
import { InsertJar } from "~/lib/db/schema";

const props = defineProps<{
  initialValues?: InsertJar;
  initialShelfId?: number;
  submitLabel: string;
  submitIcon: "JarUpdateIcon" | "tabler:plus";
  onSubmit: (jar: InsertJar) => Promise<any>;
  onSubmitComplete: () => void;
}>();
</script>

<template>
  <AppJarBaseForm
    v-slot="{ errors, loading }"
    :schema="InsertJar"
    :initial-values="props.initialValues || {
      name: '',
      description: '',
      shelf: props.initialShelfId,
    }"
    :on-submit
    :on-submit-complete
    :submit-label
    :submit-icon
  >
    <AppFormField
      label="Name"
      name="name"
      :error="errors.name"
      :disabled="loading"
    />
    <AppFormField
      label="Description"
      name="description"
      type="textarea"
      :error="errors.description"
      :disabled="loading"
    />
    <AppSelectFormField
      label="Shelf"
      name="shelf"
      :initial-shelf-id="props.initialShelfId ?? props.initialValues?.shelf"
      :error="errors.shelf"
      :disabled="loading"
    />
  </AppJarBaseForm>
</template>
