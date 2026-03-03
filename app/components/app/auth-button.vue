<script lang="ts" setup>
const signedIn = ref(false);
</script>

<template>
  <div v-if="!signedIn">
    <button class="btn btn-ghost">
      Sign In
    </button>
  </div>
  <div v-if="signedIn">
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn m-1 btn-ghost">
        Click  ⬇️
      </div>
      <ul tabindex="-1" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
        <li>Log out</li>
      </ul>
    </div>
  </div>
</template>
