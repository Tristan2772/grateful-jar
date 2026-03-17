<script lang="ts" setup>
const isSidebarOpen = ref(false);

onMounted(() => {
  isSidebarOpen.value = localStorage.getItem("isSidebarOpen") === "true";
});

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem("isSidebarOpen", isSidebarOpen.value.toString());
}
</script>

<template>
  <div class="flex-1 flex">
    <div class="bg-base-100 transition-all duration-300" :class="{ 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }">
      <div class="flex p-2 hover:bg-base-300 hover:cursor-pointer" :class="{ 'justify-center': !isSidebarOpen, 'justify-end': isSidebarOpen }">
        <Icon
          :name="isSidebarOpen ? 'tabler:chevron-left' : 'tabler:chevron-right'"
          size="32"
          class="btn btn-ghost"
          @click="toggleSidebar"
        />
      </div>
      <div class="flex flex-col">
        <AppSidebarLink label="My Jars" link="/dashboard" :show-label="isSidebarOpen">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path d="M17 4v1.882c0 .685.387 1.312 1 1.618s1 .933 1 1.618V18a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9.118c0-.685.387-1.312 1-1.618s1-.933 1-1.618V4M6 4h12z" />
            </g>
          </svg>
        </AppSidebarLink>
        <AppSidebarLink label="New Jar" link="/dashboard/add" :show-label="isSidebarOpen">
          <Icon name="tabler:plus" size="24" />
        </AppSidebarLink>
        <div class="divider" />
        <AppSidebarLink label="Sign Out" link="/sign-out" :show-label="isSidebarOpen">
          <Icon name="tabler:logout-2" size="24" />
        </AppSidebarLink>
      </div>
    </div>
    <div class="flex-1" />
  </div>
</template>
