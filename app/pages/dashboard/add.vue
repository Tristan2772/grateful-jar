<script lang="ts" setup>
import type { FetchError } from "ofetch";

import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

import { InsertJar } from "~/lib/db/schema";

const { $csrfFetch } = useNuxtApp() as any;

const loading = ref(false);
const router = useRouter();
const isSubmitted = ref(false);
const submitError = ref("");
const { handleSubmit, errors, meta, setErrors } = useForm({
  validationSchema: toTypedSchema(InsertJar),
});

const onSubmit = handleSubmit(async (values) => {
  try {
    submitError.value = "";
    loading.value = true;
    await $csrfFetch("/api/jars", {
      method: "post",
      body: values,
    });
    isSubmitted.value = true;
    navigateTo("/dashboard");
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
  <div class="container max-w-md mx-auto">
    <div class="my-4">
      <h1 class="text-lg">
        Add Jar
      </h1>
      <p class="text-sm">
        A jar is a collection of your memories that you are grateful for. You can add a date and some pictures to each memory to help you best remember what you are grateful for.
      </p>
    </div>
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
        :error="errors.name"
        :disabled="loading"
      />
      <!-- <fieldset class="fieldset">
        <legend class="fieldset-legend">
          Started At
        </legend>
        <Field
          name="started-at"
          type="date"
          class="input w-full"
          :class="{ 'input-error': errors.name }"
        >
          <p v-if="errors.name" class="fieldset-label text-error">
            {{ errors.name }}
          </p>
        </Field>
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          Ended At
        </legend>
        <Field
          name="ended-at"
          type="date"
          class="input w-full"
          :class="{ 'input-error': errors.name }"
        >
          <p v-if="errors.name" class="fieldset-label text-error">
            {{ errors.name }}
          </p>
        </Field>
      </fieldset> -->
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
          Add
          <span v-if="loading" class="loading loading-spinner loading-sm" />
          <Icon
            v-else
            name="tabler:plus"
            size="24"
          />
        </button>
      </div>
    </form>
  </div>
</template>
