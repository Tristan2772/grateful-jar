<script lang="ts" setup>
import type { FetchError } from "ofetch";

import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

import { InsertJar } from "~/lib/db/schema";

const props = defineProps<{
  initialValues?: InsertJar | null;
  submitLabel: string;
  submitIcon: string;
  onSubmit: (jar: InsertJar) => Promise<any>;
  onSubmitComplete: () => void;
}>();

const loading = ref(false);
const isSubmitted = ref(false);
const submitError = ref("");

const router = useRouter();

const { handleSubmit, errors, meta, setErrors } = useForm({
  validationSchema: toTypedSchema(InsertJar),
  initialValues: {
    name: props.initialValues?.name || "",
    description: props.initialValues?.description || "",
  },
});

const onSubmit = handleSubmit(async (values: InsertJar) => {
  try {
    submitError.value = "";
    loading.value = true;
    await props.onSubmit(values);
    isSubmitted.value = true;
    props.onSubmitComplete();
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data) {
      setErrors(error.data?.data);
    }
    submitError.value = error.data?.statusMessage || error.statusMessage || "An unknown error occurred";
  }
  loading.value = false;
});
onBeforeRouteLeave(() => {
  if (!isSubmitted.value && meta.value.dirty) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm("Are you sure you want to leave? All unsaved changes will be lost.");
    if (!confirm) {
      return false;
    }
  }
  return true;
});
</script>

<template>
  <div
    v-if="submitError"
    role="alert"
    class="alert alert-error flex min-w-1/2"
  >
    <Icon name="tabler:square-rounded-letter-x-filled" size="24" />
    <span>{{ submitError }}</span>
  </div>
  <form @submit.prevent="onSubmit">
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
    <div class="flex justify-end gap-2 mt-2">
      <button
        :disabled="loading"
        type="button"
        class="btn btn-outline"
        @click="router.back()"
      >
        <Icon name="tabler:arrow-left" size="24" />
        Cancel
      </button>
      <button
        :disabled="loading"
        type="submit"
        class="btn btn-secondary"
      >
        {{ props.submitLabel }}
        <span v-if="loading" class="loading loading-spinner loading-sm" />
        <Icon
          v-if="!loading"
          :name="props.submitIcon"
          size="24"
        />
      </button>
    </div>
  </form>
</template>
