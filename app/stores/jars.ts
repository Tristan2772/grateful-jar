import type { SelectJarWithNotes } from "~/lib/db/schema";

const dashboardPages = new Set (["dashboard", "dashboard-add-jar", "dashboard-add-shelf"]);
const currentJarPages = new Set (["dashboard-jars-slug", "dashboard-jars-slug-add", "dashboard-jars-slug-edit"]);

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
    if (allJars.value && dashboardPages.has(route.name?.toString() || "")) {
      sidebarStore.loading = false;
      sidebarStore.sidebarItems = allJars.value.map(jar => ({
        id: `jar-${jar.id}`,
        label: jar.name,
        to: { name: "dashboard-jars-slug", params: { slug: jar.slug } },
      }));
    }
    else if (currentJar.value && currentJarPages.has(route.name?.toString() || "")) {
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
