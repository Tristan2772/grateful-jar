<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(value) {
    colorMode.preference = value ? "dark" : "light";
    // Manually set data-theme for DaisyUI
    if (import.meta.client) {
      document.documentElement.setAttribute(
        "data-theme",
        value ? "night" : "winter",
      );
    }
  },
});

onMounted(() => {
  document.documentElement.setAttribute(
    "data-theme",
    colorMode.value === "dark" ? "night" : "winter",
  );
});
</script>

<template>
  <label class="swap swap-rotate mx-4">
    <input v-model="isDark" type="checkbox">
    <Icon
      name="tabler:sun"
      size="24px"
      class="swap-on"
    />
    <Icon
      name="tabler:moon"
      size="24px"
      class="swap-off"
    />
  </label>
</template>
