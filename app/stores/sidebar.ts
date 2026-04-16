import type { RouteLocationRaw } from "vue-router";

export type SidebarItem = {
  id: string;
  label: string;
  link?: string;
  to?: RouteLocationRaw;
  icon?: string;
  component?: "JarIcon" | "JarSettingsIcon" | "NoteSettingsIcon";
};

export const useSidebarStore = defineStore("useSidebarStore", () => {
  const sidebarItems = ref<SidebarItem[]>([]);
  const sidebarTopItems = ref<SidebarItem[]>([]);
  const loading = ref(false);
  const isSidebarOpen = ref(false);

  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value;
    localStorage.setItem("isSidebarOpen", isSidebarOpen.value.toString());
  }

  return {
    loading,
    sidebarItems,
    sidebarTopItems,
    isSidebarOpen,
    toggleSidebar,
  };
});
