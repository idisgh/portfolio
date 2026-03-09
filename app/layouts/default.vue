<template>
  <div class="min-h-screen bg-[#080808]">
    <FloatingSymbols />
    <SideNav />
    <main class="ml-14 mb-11 min-h-[calc(100vh-44px)] relative z-10">
      <slot />
    </main>
    <StatusBar />
  </div>
</template>

<script setup lang="ts">
const searchOpen = ref(false)
</script>
