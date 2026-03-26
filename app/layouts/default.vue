<template>
  <div class="flex flex-col min-h-screen max-w-screen overflow-hidden">
    <AppTitleNavbar />
    <main class="flex-1 flex flex-col">
      <slot />
    </main>
  </div>
</template>
