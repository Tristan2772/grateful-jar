import type { SelectJarWithNotes } from "~/lib/db/schema";

import { CURRENT_JAR_PAGES, DASHBOARD_PAGES } from "~/lib/constants";

export const useJarsStore = defineStore("useJarsStore", () => {
  const route = useRoute();
  const jarUrlWithSlug = computed(() => `/api/jars/${route.params.slug}`);

  const { data: allJars, status: allJarsStatus, refresh: allJarsRefresh } = useFetch("/api/jars", {
    lazy: true,
  });

  const { data: currentJar, status: currentJarStatus, error: currentJarError, refresh: currentJarRefresh } = useFetch<SelectJarWithNotes>(jarUrlWithSlug, {
    lazy: true,
    immediate: false,
    watch: false,
  });

  const sidebarStore = useSidebarStore();

  effect(() => {
    if (allJars.value && DASHBOARD_PAGES.has(route.name?.toString() || "")) {
      sidebarStore.loading = false;
      sidebarStore.sidebarItems = allJars.value.map(jar => ({
        id: `jar-${jar.id}`,
        label: jar.name,
        to: { name: "dashboard-jars-slug", params: { slug: jar.slug } },
      }));
    }
    else if (currentJar.value && CURRENT_JAR_PAGES.has(route.name?.toString() || "")) {
      sidebarStore.sidebarItems = [];
    }
    sidebarStore.loading = allJarsStatus.value === "pending";
  });

  const hoveredJarName = ref<string | null>(null);
  return {
    hoveredJarName,
    allJars,
    allJarsStatus,
    allJarsRefresh,
    currentJar,
    currentJarStatus,
    currentJarError,
    currentJarRefresh,
  };
});
