<template>
  <div>
    <LoadingIntro v-if="isLoading" :accent="currentAccent" @done="isLoading = false" />
    <LoadingIntro v-else-if="isTransitioning" mini :accent="currentAccent" @done="isTransitioning = false" />
    <NuxtLayout v-else>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const isLoading = ref(true)
const isTransitioning = ref(false)

const accentColors: Record<string, string> = {
  '/': '#00dc82',
  '/about': '#f5a623',
  '/work': '#00b8ff',
  '/contact': '#ff6b6b',
}

const currentAccent = ref('#00dc82')

const router = useRouter()

const unregisterGuard = router.afterEach((to, from) => {
  if (from.path === to.path) return
  if (isLoading.value) return

  const color = accentColors[to.path] || '#00dc82'
  currentAccent.value = color
  document.documentElement.style.setProperty('--accent', color)

  isTransitioning.value = true
})

onMounted(() => {
  const color = accentColors[window.location.pathname] || '#00dc82'
  currentAccent.value = color
  document.documentElement.style.setProperty('--accent', color)
})

onUnmounted(() => {
  unregisterGuard()
})
</script>

<style>
:root {
  --accent: #00dc82;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  background-color: #080808;
  color: #ffffff;
  font-family: 'Pretendard', 'Space Grotesk', sans-serif;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: #1a1a1a #080808;
}

/* 제목류 → Space Grotesk 우선 */
h1, h2, h3, .hero-title, .page-title, .section-title, .intro-name {
  font-family: 'Space Grotesk', 'Pretendard', sans-serif;
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #080808; }
::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 2px; }
</style>
