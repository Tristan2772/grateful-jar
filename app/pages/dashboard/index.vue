<script lang="ts" setup>
const jarsStore = useJarsStore();
const { allJars, allJarsStatus } = storeToRefs(jarsStore);
const shelvesStore = useShelvesStore();
const { shelves, status: shelvesStatus } = storeToRefs(shelvesStore);

function getJarsOnShelf(shelfId: number) {
  return allJars.value?.filter(jar => jar.shelf === shelfId);
}
onBeforeMount(() => {
  shelvesStore.refresh();
  jarsStore.allJarsRefresh();
});
</script>

<template>
  <div>
    <div v-if="allJarsStatus === 'pending' || shelvesStatus === 'pending'">
      <span class="loading loading-spinner loading-xl" />
    </div>
    <!-- ------------------------ if there are jars -------------------------------- -->
    <div v-if="allJars && allJars.length > 0 && !(allJarsStatus === 'pending' || shelvesStatus === 'pending')" class="flex flex-col">
      <h2 class="text-2xl p-1 bg-base-200">
        Jars
      </h2>
      <AppShelfWithJars :jars-list="allJars" :is-first-shelf="true">
        All Jars
      </AppShelfWithJars>
      <!-- ------------- All Shelves ------------- -->
      <div v-if="shelves && shelves.length > 0">
        <AppShelfWithJars
          v-for="shelf in shelves"
          :key="shelf.id"
          :shelf-id="shelf.id"
          :jars-list="getJarsOnShelf(shelf.id)"
        >
          {{ shelf.name }}
        </AppShelfWithJars>
      </div>
      <div class="p-4">
        <div class="flex card-compact bg-base-300 max-h-65 min-h-65 w-full p-3 border-2 border-dashed">
          <div class="card-body text-center flex flex-col items-center justify-center gap-4">
            <p class="text-xl max-h-fit">
              Add a new shelf to organize your jars.
            </p>
            <NuxtLink to="/dashboard/add-shelf" class="btn btn-secondary w-40">
              Add Shelf
              <Icon name="tabler:plus" size="24" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- ------------------------ If there are no jars ----------------------------- -->
    <div v-if="!allJars?.length && !(allJarsStatus === 'pending' || shelvesStatus === 'pending')" class="p-4">
      <div class="flex card-compact bg-base-300 max-h-65 min-h-65 aspect-square rounded-full p-3 border-2 border-dashed">
        <div class="card-body text-center flex flex-col items-center justify-center gap-4">
          <p class="text-xl max-h-fit">
            Add a jar to get started.
          </p>
          <NuxtLink to="/dashboard/add-jar" class="btn btn-secondary w-40 flex items-center">
            Add Jar
            <Icon name="tabler:plus" size="24" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
