<template>
  <div>
    <!-- Hero -->
    <section ref="heroEl" class="min-h-screen flex items-center px-5 sm:px-16">
      <div class="max-w-[800px]">
        <div ref="sectionLabelEl" class="text-[13px] tracking-[0.2em] text-[#999] mb-8 font-normal">HOME</div>

        <h1 ref="titleEl" class="font-display text-[clamp(36px,6vw,80px)] font-normal leading-tight tracking-tight text-white mb-7">
          <span class="block">
            <span
              v-for="(word, wi) in introWords"
              :key="wi"
              :ref="el => { if (el) wordEls.push(el as HTMLElement) }"
              class="inline-block"
            >{{ word }}&nbsp;</span>
          </span>
          <span class="block">
            <span
              :ref="el => { if (el) wordEls.push(el as HTMLElement) }"
              class="inline-block"
            >{{ profile.nameEn }},</span>
          </span>
          <span class="block">
            <span :ref="el => { if (el) wordEls.push(el as HTMLElement) }" class="inline-block">a&nbsp;</span>
            <span :ref="el => { if (el) wordEls.push(el as HTMLElement) }" class="inline-block text-accent">creative&nbsp;</span>
            <span :ref="el => { if (el) wordEls.push(el as HTMLElement) }" class="inline-block">UI Engineer</span>
          </span>
        </h1>

        <p ref="descEl" class="text-base text-[#999] leading-relaxed max-w-[560px]">{{ profile.description }}</p>
      </div>
    </section>

    <!-- About Section -->
    <section ref="aboutEl" class="px-5 sm:px-16 py-20 sm:py-32 border-t border-[#111]">
      <div class="max-w-[900px]">
        <div class="section-label text-[13px] tracking-[0.2em] text-[#999] mb-3 font-normal">ABOUT</div>
        <h2 class="section-title font-display text-[clamp(24px,3.5vw,48px)] font-normal text-white mb-5 tracking-tight">Who I am</h2>
        <p class="section-text text-base text-[#999] leading-relaxed max-w-[560px] mb-8">{{ profile.tagline }}</p>
        <NuxtLink to="/about" class="link-btn inline-flex text-[13px] font-normal text-white no-underline bg-[#111] border border-[#1f1f1f] rounded-md px-4 py-2 transition-colors duration-200 hover:border-accent hover:text-accent">
          <span v-for="(c, i) in 'about-me'.split('')" :key="i">{{ c }}</span>
        </NuxtLink>
      </div>
    </section>

    <!-- Work Section -->
    <section ref="workEl" class="px-5 sm:px-16 py-20 sm:py-32 border-t border-[#111]">
      <div class="max-w-[900px]">
        <div class="section-label text-[13px] tracking-[0.2em] text-[#999] mb-3 font-normal">WORK</div>
        <h2 class="section-title font-display text-[clamp(24px,3.5vw,48px)] font-normal text-white mb-5 tracking-tight">Projects highlight</h2>
        <div class="work-grid grid gap-px bg-[#111] border border-[#111] rounded-xl overflow-hidden mb-8" style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))">
          <NuxtLink
            v-for="(project, i) in featuredProjects"
            :key="project.id"
            :to="project.link || '/work'"
            class="work-card block bg-[#080808] no-underline transition-colors duration-200 hover:bg-[#0e0e0e]"
            :target="project.link && !project.link.startsWith('/') ? '_blank' : undefined"
          >
            <div v-if="project.thumb" class="w-full h-40 overflow-hidden border-b border-[#111]">
              <img :src="project.thumb" :alt="project.title" class="w-full h-full object-cover grayscale-[40%] transition-[filter] duration-300 group-hover:grayscale-0" />
            </div>
            <div class="p-5 sm:p-6">
              <div class="text-[13px] text-accent font-medium tracking-[0.1em] mb-2.5">{{ String(i + 1).padStart(2, '0') }}</div>
              <h3 class="text-[15px] font-medium text-white mb-2">{{ project.title }}</h3>
              <p class="text-xs text-[#999] leading-relaxed mb-3.5">{{ project.desc }}</p>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="tag in project.tech.slice(0,3)" :key="tag" class="text-[13px] text-[#999] bg-[#111] border border-[#1f1f1f] rounded px-2 py-0.5">{{ tag }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>
        <NuxtLink to="/work" class="link-btn inline-flex text-[13px] font-normal text-white no-underline bg-[#111] border border-[#1f1f1f] rounded-md px-4 py-2 transition-colors duration-200 hover:border-accent hover:text-accent">
          <span v-for="(c, i) in 'all-projects'.split('')" :key="i">{{ c }}</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { profile, projects } from '~/data/portfolio'

let ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger | undefined

const heroEl = ref<HTMLElement>()
const sectionLabelEl = ref<HTMLElement>()
const titleEl = ref<HTMLElement>()
const descEl = ref<HTMLElement>()
const aboutEl = ref<HTMLElement>()
const workEl = ref<HTMLElement>()
const wordEls = ref<HTMLElement[]>([])

const introWords = ['Hi,', "I'm"]
const featuredProjects = projects.filter(p => !p.isPrivate && p.thumb).slice(0, 3)

onUnmounted(() => {
  ScrollTrigger?.getAll().forEach(t => t.kill())
  gsap.killTweensOf([sectionLabelEl.value, titleEl.value, descEl.value, aboutEl.value, workEl.value, ...wordEls.value].filter(Boolean))
})

onMounted(async () => {
  gsap.set([sectionLabelEl.value, ...wordEls.value, descEl.value], { opacity: 0, y: 30 })

  const { ScrollTrigger: ST } = await import('gsap/ScrollTrigger')
  ScrollTrigger = ST
  gsap.registerPlugin(ScrollTrigger)

  const tl = gsap.timeline({ delay: 0.1 })

  tl
    .to(sectionLabelEl.value, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
    .to(wordEls.value, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, '-=0.2')
    .to(descEl.value, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')

  ;[aboutEl.value, workEl.value].forEach(el => {
    if (!el) return
    gsap.fromTo(
      el.querySelectorAll('.section-label, .section-title, .section-text, .link-btn, .work-card'),
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 75%' },
      }
    )
  })
})
</script>
