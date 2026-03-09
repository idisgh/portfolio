<template>
  <div>
    <!-- Hero -->
    <section data-hero class="min-h-screen flex items-center px-16 py-20">
      <div class="max-w-2xl">
        <div class="reveal text-[13px] tracking-[0.2em] text-[#999] mb-6 font-normal">WORK</div>
        <h1 class="reveal font-display text-[clamp(36px,5vw,64px)] font-normal tracking-tight text-white mb-3">Projects</h1>
        <p class="reveal text-[15px] text-[#999]">직접 참여하고 개발한 프로젝트입니다.</p>
      </div>
    </section>

    <!-- 필터 -->
    <div class="flex gap-2 px-16 pb-10">
      <button
        v-for="f in filters"
        :key="f"
        class="text-xs text-[#999] bg-transparent border border-[#1a1a1a] rounded-full px-3.5 py-1 cursor-pointer transition-all duration-200 hover:text-white hover:border-[#333]"
        :class="activeFilter === f ? 'text-accent border-accent' : ''"
        @click="activeFilter = f"
      >{{ f }}</button>
    </div>

    <!-- Projects -->
    <section class="px-16 pb-32">
      <div
        v-for="project in filteredProjects"
        :key="project.id"
        class="reveal group flex items-center gap-8 py-9 border-t border-[#111] transition-colors duration-200 hover:bg-white/[0.005]"
      >
        <!-- Thumb -->
        <component
          :is="project.link && !project.isPrivate ? 'a' : 'div'"
          :href="project.link && !project.isPrivate ? project.link : undefined"
          :target="project.link && !project.isPrivate ? '_blank' : undefined"
          v-if="project.thumb"
          class="project-thumb flex-shrink-0 w-[140px] h-[90px] rounded-md overflow-hidden border border-[#1a1a1a] transition-all duration-[350ms] ease-in-out group-hover:w-[200px] group-hover:h-[128px] group-hover:border-[#333] group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)] group-hover:[transform:rotate(-2deg)_transition-delay:300ms]"
          :class="{ 'cursor-pointer': project.link && !project.isPrivate }"
        >
          <img :src="project.thumb" :alt="project.title" class="w-full h-full object-cover grayscale-[30%] transition-[filter] duration-[350ms] group-hover:grayscale-0" />
        </component>
        <div
          v-else
          class="flex-shrink-0 w-[140px] h-[90px] rounded-md border border-[#1a1a1a] bg-[#0e0e0e] flex items-center justify-center text-[28px] font-normal text-[#222]"
        >{{ project.title.charAt(0) }}</div>

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-xs text-accent font-medium">{{ project.year }}</span>
            <span class="text-[13px] text-[#999]">{{ project.type }}</span>
            <span v-if="project.isPrivate" class="text-[13px] text-[#999] bg-[#111] border border-[#1a1a1a] rounded-sm px-1.5 py-0.5">비공개</span>
          </div>
          <div class="flex items-baseline gap-3.5 mb-2.5">
            <component
              :is="project.link && !project.isPrivate ? 'a' : 'h2'"
              :href="project.link && !project.isPrivate ? project.link : undefined"
              :target="project.link && !project.isPrivate ? '_blank' : undefined"
              class="text-lg font-medium text-white tracking-[-0.01em] no-underline transition-colors duration-200"
              :class="{ 'hover:text-accent cursor-pointer': project.link && !project.isPrivate }"
            >{{ project.title }}</component>
            <a
              v-if="project.link && !project.isPrivate"
              :href="project.link"
              target="_blank"
              class="inline-flex items-center text-[11px] font-normal text-accent rounded-full px-2.5 py-0.5 no-underline flex-shrink-0 transition-colors duration-200"
              style="background: color-mix(in srgb, var(--accent) 8%, transparent); border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);"
            >Live</a>
          </div>
          <p class="text-[13px] text-[#999] leading-[1.7] mb-3 max-w-xl">{{ project.desc }}</p>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tag in project.tech"
              :key="tag"
              class="text-[13px] text-[#777] bg-[#0e0e0e] border border-[#1a1a1a] rounded px-2 py-0.5"
            >{{ tag }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { projects } from '~/data/portfolio'
useScrollReveal()

const filters = ['All', '개인 프로젝트', '사내 프로젝트', '실무 프로젝트']
const activeFilter = ref('All')

const publicProjects = projects.filter(p => !p.hidden)

const filteredProjects = computed(() => {
  const list = activeFilter.value === 'All'
    ? publicProjects
    : publicProjects.filter(p => p.type === activeFilter.value)
  return [...list].sort((a, b) => b.year - a.year)
})
</script>

<style scoped>
/* thumb hover transition — Tailwind arbitrary로 표현 불가한 부분만 */
.project-thumb {
  transition: width 0.35s ease, height 0.35s ease, box-shadow 0.35s ease, transform 0.25s ease 0.3s;
}
</style>
