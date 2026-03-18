<template>
  <div>
    <section data-hero class="min-h-screen flex items-center px-5 sm:px-16 py-20">
      <div class="max-w-2xl">
        <div class="reveal text-[13px] tracking-[0.2em] text-[#999] mb-6 font-normal">CONTACT</div>
        <h1 class="reveal font-display text-[clamp(32px,5vw,64px)] font-normal leading-tight tracking-tight text-white mb-6">
          Let's get<br /><span class="text-accent">in touch</span>
        </h1>
        <p class="reveal text-[15px] text-[#999] leading-relaxed max-w-md">
          협업, 프로젝트 제안, 또는 그냥 이야기 나누고 싶다면 언제든 연락주세요.
        </p>
      </div>
    </section>

    <section class="px-5 sm:px-16 pb-20 sm:pb-32">
      <div class="reveal-stagger border-t border-[#111]">
        <a
          href="mailto:idisgh@naver.com"
          class="group flex items-center justify-between py-7 sm:py-9 border-b border-[#111] no-underline transition-[padding] duration-200 hover:pl-2"
        >
          <div class="text-[13px] text-[#999] tracking-widest font-medium">EMAIL</div>
          <div class="text-sm sm:text-lg text-white font-normal flex items-center gap-3 sm:gap-4">
            {{ profile.email }}
            <span class="text-accent text-xl transition-transform duration-200 group-hover:translate-x-1">→</span>
          </div>
        </a>
        <a
          :href="profile.github"
          target="_blank"
          class="group flex items-center justify-between py-7 sm:py-9 border-b border-[#111] no-underline transition-[padding] duration-200 hover:pl-2"
        >
          <div class="text-[13px] text-[#999] tracking-widest font-medium">GITHUB</div>
          <div class="text-sm sm:text-lg text-white font-normal flex items-center gap-3 sm:gap-4">
            github.com/idisgh
            <span class="text-accent text-xl transition-transform duration-200 group-hover:translate-x-1">→</span>
          </div>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { profile } from '~/data/portfolio'
useScrollReveal()
</script>
