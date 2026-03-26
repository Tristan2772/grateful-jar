export const useJarsStore = defineStore("useJarsStore", () => {
  const { data, status, refresh } = useFetch("/api/jars", {
    lazy: true,
  });
  const sidebarStore = useSidebarStore();

  // todo: set FAVORITE jars in scrollable sidebar
  // todo: area, otherwise set ALL jars in sidebar
  watchEffect(() => {
    if (data.value) {
      sidebarStore.loading = false;
      sidebarStore.sidebarItems = data.value.map(jar => ({
        id: `location-${jar.id}`,
        label: jar.name,
        link: "#",
      }));
    }
    sidebarStore.loading = status.value === "pending";
  });

  return {
    jars: data,
    status,
    refresh,
  };
});
