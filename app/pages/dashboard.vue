<script lang="ts" setup>
const isSidebarOpen = ref(false);
const jarsStore = useJarsStore();
const shelvesStore = useShelvesStore();
const route = useRoute();
const sidebarStore = useSidebarStore();
const { currentJar } = storeToRefs(jarsStore);

onMounted(() => {
  isSidebarOpen.value = localStorage.getItem("isSidebarOpen") === "true";
  if (route.path !== "/dashboard") {
    jarsStore.allJarsRefresh();
    shelvesStore.refresh();
  }
});

effect(() => {
  // ------------------ if user is on dashboard -----------------
  if (route.name === "dashboard") {
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
  if (route.name === "dashboard-jars-slug") {
    // ----------------- set Top items --------------
    sidebarStore.sidebarTopItems = [{
      id: "link-dashboard",
      label: "Back to Jars",
      link: "/dashboard",
      icon: "tabler:arrow-left",
    }, {
      id: "link-jar",
      label: currentJar.value ? currentJar.value.name : "View Notes",
      to: {
        name: "dashboard-jars-slug",
        params: {
          slug: currentJar.value?.slug,
        },
      },
    }, {
      id: "link-jar-edit",
      label: "Edit Jar",
      to: {
        name: "dashboard-jars-slug-edit",
        params: {
          slug: currentJar.value?.slug,
        },
      },
      component: "JarSettingsIcon",
    }, {
      id: "link-jar-add",
      label: "New Note",
      to: {
        name: "dashboard-jars-slug-add",
        params: {
          slug: currentJar.value?.slug,
        },
      },
      icon: "tabler:plus",
    }];
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

      <div class="flex-1 min-w-0 relative bg-radial-[at_50%_95%] from-base-300 to-base-100 to-75%">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
