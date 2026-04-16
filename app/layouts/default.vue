<template>
  <div class="flex flex-col min-h-screen max-h-screen max-w-screen overflow-hidden">
    <AppTitleNavbar />
    <main class="flex-1 flex overflow-y-auto bg-base-300">
      <slot />
    </main>
  </div>
</template>
