export const useShelvesStore = defineStore("useShelvesStore", () => {
  const { data, status, refresh } = useFetch("/api/shelves", {
    lazy: true,
  });

  return {
    shelves: data,
    status,
    refresh,
  };
});
