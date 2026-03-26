<script lang="ts" setup>
const jarsStore = useJarsStore();
const { jars, status } = storeToRefs(jarsStore);
const shelvesStore = useShelvesStore();
const { shelves, status: shelvesStatus } = storeToRefs(shelvesStore);
function getJarsOnShelf(shelfId: number) {
  return jars.value?.filter(jar => jar.shelf === shelfId);
}
onBeforeMount(() => {
  shelvesStore.refresh();
  jarsStore.refresh();
});
</script>

<template>
  <div>
    <h2 class="text-2xl bg-base-200 p-1">
      Jars
    </h2>
    <div v-if="status === 'pending' || shelvesStatus === 'pending'">
      <span class="loading loading-spinner loading-xl" />
    </div>

    <!-- ------------------------ if there are jars -------------------------------- -->
    <div v-if="jars && jars.length > 0 && !(status === 'pending' || shelvesStatus === 'pending')" class="flex flex-col">
      <AppShelfWithJars :jars-list="jars">
        All Jars
      </AppShelfWithJars>
      <!-- ------------- All Shelves ------------- -->
      <div v-if="shelves && shelves.length > 0">
        <AppShelfWithJars
          v-for="shelf in shelves"
          :key="shelf.id"
          :jars-list="getJarsOnShelf(shelf.id)"
        >
          {{ shelf.name }}
        </AppShelfWithJars>
        <div class="p-4">
          <div class="flex card-compact bg-base-300 max-h-65 min-h-65 w-full p-3 border-2 border-dashed">
            <div class="card-body text-center flex flex-col items-center justify-center gap-4">
              <p class="text-xl max-h-fit">
                Add a new shelf to organize your jars.
              </p>
              <NuxtLink to="/dashboard/add-shelf" class="btn btn-primary w-40">
                Add Shelf
                <Icon name="tabler:plus" size="24" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ------------------------ If there are no jars ----------------------------- -->
    <div v-if="!jars?.length && !(status === 'pending' || shelvesStatus === 'pending')" class="p-4">
      <div class="flex card-compact bg-base-300 max-h-65 min-h-65 aspect-square rounded-full p-3 border-2 border-dashed">
        <div class="card-body text-center flex flex-col items-center justify-center gap-4">
          <p class="text-xl max-h-fit">
            Add a jar to get started.
          </p>
          <NuxtLink to="/dashboard/add-jar" class="btn btn-primary w-40">
            Add Jar
            <Icon name="tabler:plus" size="24" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
