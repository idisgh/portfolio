<template>
  <div class="min-h-screen bg-[#080808]">
    <FloatingSymbols />
    <SideNav />
    <main class="sm:ml-14 pb-14 sm:pb-11 mb-0 sm:mb-11 min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-44px)] relative z-10">
      <slot />
    </main>
    <StatusBar />
  </div>
</template>

<script setup lang="ts">
</script>
