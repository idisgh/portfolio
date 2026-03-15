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
import IconHome from '~/components/icons/IconHome.vue'
import IconUser from '~/components/icons/IconUser.vue'
import IconBriefcase from '~/components/icons/IconBriefcase.vue'
import IconMail from '~/components/icons/IconMail.vue'

const route = useRoute()

const isActive = (item: { to: string; exact?: boolean }) =>
  item.exact ? route.path === item.to : route.path.startsWith(item.to)

const navItems = [
  { to: '/', label: 'Home', icon: IconHome, exact: true },
  { to: '/about', label: 'About', icon: IconUser },
  { to: '/work', label: 'Work', icon: IconBriefcase },
  { to: '/contact', label: 'Contact', icon: IconMail },
]
</script>
