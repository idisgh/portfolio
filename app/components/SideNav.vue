<template>
  <nav class="fixed left-0 top-0 h-screen w-14 bg-[rgba(8,8,8,0.9)] border-r border-[#1a1a1a] flex flex-col items-center py-5 z-[100] backdrop-blur-md">
    <NuxtLink
      to="/"
      class="w-9 h-9 border border-accent rounded-md flex items-center justify-center text-base font-bold text-accent no-underline mb-8 transition-colors hover:bg-accent/10"
    >G</NuxtLink>

    <div class="flex flex-col gap-1 flex-1">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        :title="item.label"
        class="group relative w-10 h-10 flex items-center justify-center text-[#999] rounded-lg transition-colors hover:text-white hover:bg-white/[0.06]"
        :class="{ 'text-accent': isActive(item) }"
      >
        <component :is="item.icon" />
        <span class="absolute left-[calc(100%+12px)] bg-[#1a1a1a] text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 pointer-events-none -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0">
          {{ item.label }}
        </span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'

const route = useRoute()

const isActive = (item: { to: string; exact?: boolean }) =>
  item.exact ? route.path === item.to : route.path.startsWith(item.to)

const IconHome = defineComponent(() => () =>
  h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'm3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }),
    h('polyline', { points: '9,22 9,12 15,12 15,22' }),
  ])
)
const IconAbout = defineComponent(() => () =>
  h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' }),
    h('circle', { cx: 12, cy: 7, r: 4 }),
  ])
)
const IconWork = defineComponent(() => () =>
  h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('rect', { width: 20, height: 14, x: 2, y: 7, rx: 2, ry: 2 }),
    h('path', { d: 'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' }),
  ])
)
const IconContact = defineComponent(() => () =>
  h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('rect', { width: 20, height: 16, x: 2, y: 4, rx: 2 }),
    h('path', { d: 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' }),
  ])
)

const navItems = [
  { to: '/', label: 'Home', icon: IconHome, exact: true },
  { to: '/about', label: 'About', icon: IconAbout },
  { to: '/work', label: 'Work', icon: IconWork },
  { to: '/contact', label: 'Contact', icon: IconContact },
]
</script>
