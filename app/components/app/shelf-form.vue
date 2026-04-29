<script lang="ts" setup>
import { InsertShelf } from "~/lib/db/schema";

const props = defineProps<{
  initialValues?: InsertShelf;
  submitLabel: string;
  submitIcon: "JarUpdateIcon" | "tabler:plus";
  onSubmit: (shelf: InsertShelf) => Promise<any>;
  onSubmitComplete: () => void;
}>();
</script>

<template>
  <AppJarBaseForm
    v-slot="{ errors, loading }"
    :schema="InsertShelf"
    :initial-values="props.initialValues || {
      name: '',
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
  </AppJarBaseForm>
</template>
