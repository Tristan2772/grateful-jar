export type SidebarItem = {
  id: string;
  label: string;
  link: string;
};

export const useSidebarStore = defineStore("useSidebarStore", () => {
  const sidebarItems = ref<SidebarItem[]>([]);
  const loading = ref(false);

  return {
    loading,
    sidebarItems,
  };
});
