import type { SelectShelf } from "~/lib/db/schema";

export const useShelvesStore = defineStore("useShelvesStore", () => {
  const route = useRoute();
  const shelfUrlWithId = computed(() => `/api/shelves/${route.params.id}`);

  const { data, status, refresh } = useFetch("/api/shelves", {
    lazy: true,
  });

  const { data: currentShelf, status: currentShelfStatus, error: currentShelfError, refresh: currentShelfRefresh } = useFetch<SelectShelf>(shelfUrlWithId, {
    lazy: true,
    immediate: false,
    watch: false,
  });

  return {
    shelves: data,
    status,
    refresh,
    currentShelf,
    currentShelfStatus,
    currentShelfError,
    currentShelfRefresh,
  };
});
