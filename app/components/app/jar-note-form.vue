<script lang="ts" setup>
import { InsertJarNote } from "~/lib/db/schema";

const props = defineProps<{
  initialValues?: InsertJarNote;
  submitLabel: string;
  submitIcon: "NoteUpdateIcon" | "tabler:plus";
  onSubmit: (note: InsertJarNote) => Promise<any>;
  onSubmitComplete: () => void;
}>();

const defaultValues: InsertJarNote = {
  name: "",
  description: "",
  startedAt: Date.now() - (24 * 60 * 60 * 1000),
  endedAt: Date.now(),
};

const formInitialValues = computed(() => props.initialValues || defaultValues);
</script>

<template>
  <AppJarBaseForm
    v-slot="{ errors, loading }"
    :schema="InsertJarNote"
    :initial-values="formInitialValues"
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
    <AppDateFormField
      label="Started At"
      name="startedAt"
      :value="formInitialValues.startedAt"
      :error="errors.startedAt"
      :disabled="loading"
    />
    <AppDateFormField
      label="Ended At"
      name="endedAt"
      :value="formInitialValues.endedAt"
      :error="errors.endedAt"
      :disabled="loading"
    />
  </AppJarBaseForm>
</template>
