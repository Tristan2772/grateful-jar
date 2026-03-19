<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.preference === "dark";
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
  // Sync theme on initial load
  if (import.meta.client) {
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDarkMode = colorMode.preference === "dark"
      || (colorMode.preference === "system" && systemPrefersDark);
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "night" : "winter",
    );
  }
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
