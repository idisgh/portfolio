<template>
  <div>
    <!-- Hero -->
    <section data-hero class="min-h-screen flex items-center px-5 sm:px-16 py-20">
      <div class="max-w-2xl">
        <div class="reveal text-[13px] tracking-[0.2em] text-[#999] mb-6 font-normal">ABOUT</div>
        <h1 class="reveal font-display text-[clamp(24px,4vw,52px)] font-normal leading-snug tracking-tight text-white mb-6 [word-break:keep-all]">{{ profile.tagline }}</h1>
        <p class="reveal text-[15px] text-[#999] leading-relaxed max-w-xl">{{ profile.description }}</p>
      </div>
    </section>

    <!-- Career -->
    <section class="px-5 sm:px-16 py-16 sm:py-20 border-t border-[#111]">
      <div class="max-w-[860px]">
        <div class="reveal text-[13px] tracking-[0.2em] text-[#999] mb-8 font-normal">CAREER</div>
        <div>
          <div
            v-for="career in careers"
            :key="career.company"
            class="reveal flex flex-col sm:grid gap-4 sm:gap-10 py-9 border-t border-[#111] last:border-b last:border-[#111]"
            style="grid-template-columns: 220px 1fr"
          >
            <div>
              <div class="text-[15px] font-medium text-white mb-1.5">{{ career.company }}</div>
              <div class="text-xs text-[#999]">{{ career.period }}</div>
            </div>
            <div>
              <div class="text-[13px] text-accent font-normal mb-3">{{ career.role }}</div>
              <ul class="flex flex-col gap-1.5 list-none">
                <li
                  v-for="task in career.tasks"
                  :key="task"
                  class="text-[13px] text-[#999] leading-relaxed pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-[#333]"
                >{{ task }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section class="px-5 sm:px-16 py-16 sm:py-20 border-t border-[#111]">
      <div class="max-w-[860px]">
        <div class="reveal text-[13px] tracking-[0.2em] text-[#999] mb-8 font-normal">SKILLS</div>
        <div class="reveal-stagger grid gap-8 sm:gap-10" style="grid-template-columns: repeat(auto-fit, minmax(160px, 1fr))">
          <div v-for="(items, category) in { Markup: skills.markup, Frontend: skills.frontend, Tools: skills.tools }" :key="category">
            <h3 class="text-[13px] font-medium text-accent tracking-widest mb-3.5">{{ category }}</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="item in items"
                :key="item"
                class="text-xs text-[#999] bg-[#0e0e0e] border border-[#1a1a1a] rounded px-2.5 py-1"
              >{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { profile, careers, skills } from '~/data/portfolio'
useScrollReveal()
</script>
