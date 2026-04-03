<script lang="ts" setup>
import { CURRENT_JAR_PAGES, DASHBOARD_PAGES } from "~/lib/constants";

const isSidebarOpen = ref(false);
const jarsStore = useJarsStore();
const shelvesStore = useShelvesStore();
const route = useRoute();
const sidebarStore = useSidebarStore();
const { currentJar, currentJarStatus } = storeToRefs(jarsStore);

if (DASHBOARD_PAGES.has(route.name?.toString() || "")) {
  await jarsStore.allJarsRefresh();
  await shelvesStore.refresh();
}
if (CURRENT_JAR_PAGES.has(route.name?.toString() || "")) {
  await jarsStore.currentJarRefresh();
}

onMounted(() => {
  isSidebarOpen.value = localStorage.getItem("isSidebarOpen") === "true";
});

effect(() => {
  // ------------------ if user is on dashboard -----------------
  if (DASHBOARD_PAGES.has(route.name?.toString() || "")) {
    sidebarStore.sidebarTopItems = [{
      id: "link-dashboard",
      label: "Jars",
      link: "/dashboard",
    }, {
      id: "link-jar-add",
      label: "New Jar",
      link: "/dashboard/add-jar",
      icon: "tabler:plus",
    }];
  }

  // ----------------- if user is on specific jar page -------------------
  else if (CURRENT_JAR_PAGES.has(route.name?.toString() || "")) {
    // ----------------- set Top items --------------
    sidebarStore.sidebarTopItems = [{
      id: "link-dashboard",
      label: "Back to Jars",
      link: "/dashboard",
      icon: "tabler:arrow-left",
    }];
    if (currentJar.value && currentJarStatus.value !== "pending") {
      sidebarStore.sidebarTopItems.push({
        id: "link-jar",
        label: currentJar.value.name,
        to: {
          name: "dashboard-jars-slug",
          params: {
            slug: route.params.slug,
          },
        },
      }, {
        id: "link-jar-edit",
        label: "Edit Jar",
        to: {
          name: "dashboard-jars-slug-edit",
          params: {
            slug: route.params.slug,
          },
        },
        component: "JarSettingsIcon",
      }, {
        id: "link-jar-add",
        label: "New Note",
        to: {
          name: "dashboard-jars-slug-add",
          params: {
            slug: route.params.slug,
          },
        },
        icon: "tabler:plus",
      });
    }
  }
});

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem("isSidebarOpen", isSidebarOpen.value.toString());
}
</script>

<template>
  <div class="flex-1">
    <div class="flex h-full">
      <div class="bg-base-100 transition-all duration-300" :class="{ 'min-w-64 max-w-64': isSidebarOpen, 'min-w-16 max-w-16': !isSidebarOpen }">
        <!-- ------------------------- top of Sidebar ------------------------------ -->
        <div
          class="flex p-2 hover:bg-base-300 hover:cursor-pointer"
          :class="{ 'justify-center': !isSidebarOpen, 'justify-end': isSidebarOpen }"
          @click="toggleSidebar"
        >
          <Icon
            :name="isSidebarOpen ? 'tabler:chevron-left' : 'tabler:chevron-right'"
            size="32"
            class="btn btn-ghost"
          />
        </div>
        <div class="flex flex-col">
          <AppSidebarLink
            v-for="item in sidebarStore.sidebarTopItems"
            :key="item.id"
            :label="item.label"
            :link="item.link"
            :to="item.to"
            :icon="item.icon"
            :component="item.component"
            :show-label="isSidebarOpen"
          />

          <!-- --------------------- mid of Sidebar --------------------------------- -->

          <div v-if="sidebarStore.loading || sidebarStore.sidebarItems.length" class="divider" />
          <div v-if="sidebarStore.loading" class="px-4">
            <div class="skeleton h-4 w-full" />
          </div>
          <div v-if="!sidebarStore.loading && sidebarStore.sidebarItems.length" class="flex flex-col">
            <AppSidebarLink
              v-for="item in sidebarStore.sidebarItems"
              :key="item.id"
              :label="item.label"
              :to="item.to"
              :show-label="isSidebarOpen"
              :is-hovered-jar="jarsStore.hoveredJarName === item.label"
              @mouseenter="jarsStore.hoveredJarName = item.label"
              @mouseleave="jarsStore.hoveredJarName = ''"
            />
          </div>
          <div v-if="route.path.startsWith('/dashboard/jars') && currentJarStatus === 'pending'" class="px-4 py-2">
            <div class="skeleton h-4 w-full" />
          </div>

          <!-- ----------------------- bottom of Sidebar ----------------------- -->
          <div class="divider" />
          <AppSidebarLink
            label="Sign Out"
            link="/sign-out"
            icon="tabler:logout-2"
            :show-label="isSidebarOpen"
          />
        </div>
      </div>

      <!-- --------------------------- main screen -------------------------- -->

      <div class="flex-1 min-w-0 relative bg-linear-to-t from-base-300 from-10% to-base-100 to-40%">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
