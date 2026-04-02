import type { RouteLocationRaw } from "vue-router";

export type SidebarItem = {
  id: string;
  label: string;
  link?: string;
  to?: RouteLocationRaw;
  icon?: string;
  component?: "JarIcon" | "JarSettingsIcon";
};

export const useSidebarStore = defineStore("useSidebarStore", () => {
  const sidebarItems = ref<SidebarItem[]>([]);
  const sidebarTopItems = ref<SidebarItem[]>([]);
  const loading = ref(false);

  return {
    loading,
    sidebarItems,
    sidebarTopItems,
  };
});
