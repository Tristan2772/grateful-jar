<template>
  <div class="navbar bg-base-300 shadow-sm">
    <div class="flex-1">
      <NuxtLink class="btn btn-ghost text-xl" to="/">
        Grateful Jar
      </NuxtLink>
    </div>
    <div class="flex-none flex">
      <AppThemeToggle />
      <AppAuthButton />
    </div>
  </div>
</template>
