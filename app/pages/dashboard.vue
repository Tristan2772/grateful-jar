<script lang="ts" setup>
import { CURRENT_JAR_PAGES, CURRENT_NOTE_PAGES, DASHBOARD_PAGES } from "~/lib/constants";

const jarsStore = useJarsStore();
const shelvesStore = useShelvesStore();
const route = useRoute();
const sidebarStore = useSidebarStore();
const { currentJar, currentJarStatus, currentNote, currentNoteStatus } = storeToRefs(jarsStore);

if (DASHBOARD_PAGES.has(route.name?.toString() || "")) {
  await jarsStore.allJarsRefresh();
  await shelvesStore.refresh();
}
if (CURRENT_JAR_PAGES.has(route.name?.toString() || "")) {
  await jarsStore.currentJarRefresh();
}
if (CURRENT_NOTE_PAGES.has(route.name?.toString() || "")) {
  await jarsStore.currentJarRefresh();
}

onMounted(() => {
  sidebarStore.isSidebarOpen = localStorage.getItem("isSidebarOpen") === "true";
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

  // ----------------- if user is on specific note page -------------------
  else if (CURRENT_NOTE_PAGES.has(route.name?.toString() || "")) {
    // ----------------- set Top items --------------
    sidebarStore.sidebarTopItems = [{
      id: "link-previous-jar",
      label: "Back to Notes",
      to: {
        name: "dashboard-jars-slug",
        params: {
          slug: route.params.slug,
        },
      },
      icon: "tabler:arrow-left",
    }];
    if (currentNote.value && currentNoteStatus.value !== "pending") {
      sidebarStore.sidebarTopItems.push({
        id: "link-note",
        label: currentNote.value.name,
        to: {
          name: "dashboard-jars-slug",
          params: {
            slug: route.params.slug,
          },
        },
        icon: "tabler:file-text",
      }, {
        id: "link-note-edit",
        label: "Edit Note",
        to: {
          name: "dashboard-jars-slug-id-edit",
          params: {
            slug: route.params.slug,
            id: route.params.id,
          },
        },
        component: "NoteSettingsIcon",
      });
    }
  }
});
</script>

<template>
  <div class="w-full">
    <div class="flex h-full">
      <!-- --------------------------- side bar ----------------------------- -->

      <div class="bg-base-100 transition-all duration-300 top-16 fixed bottom-0 left-0 z-50" :class="{ 'min-w-64 max-w-64': sidebarStore.isSidebarOpen, 'min-w-16 max-w-16': !sidebarStore.isSidebarOpen }">
        <!-- ------------------------- top of Sidebar ------------------------------ -->
        <div
          class="flex p-2 hover:bg-base-300 hover:cursor-pointer"
          :class="{ 'justify-center': !sidebarStore.isSidebarOpen, 'justify-end': sidebarStore.isSidebarOpen }"
          @click="sidebarStore.toggleSidebar()"
        >
          <Icon
            :name="sidebarStore.isSidebarOpen ? 'tabler:chevron-left' : 'tabler:chevron-right'"
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
            :show-label="sidebarStore.isSidebarOpen"
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
              :icon="item.icon"
              :component="item.component"
              :show-label="sidebarStore.isSidebarOpen"
              :is-hovered-jar="jarsStore.hoveredJarName === item.label"
              @mouseenter="jarsStore.hoveredJarName = item.label"
              @mouseleave="jarsStore.hoveredJarName = ''"
            />
          </div>

          <!-- ----------------------- bottom of Sidebar ----------------------- -->
          <div class="divider" />
          <AppSidebarLink
            label="Sign Out"
            link="/sign-out"
            icon="tabler:logout-2"
            :show-label="sidebarStore.isSidebarOpen"
          />
        </div>
      </div>

      <!-- --------------------------- main screen -------------------------- -->

      <div class="flex-1 min-w-0 w-full h-full relative transition-all duration-300" :class="{ 'ml-64': sidebarStore.isSidebarOpen, 'ml-16': !sidebarStore.isSidebarOpen }">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
