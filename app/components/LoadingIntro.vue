<template>
  <div ref="introEl" class="loading-intro" :style="bgStyle">
    <div class="green-glow" :style="glowStyle" />
    <div class="intro-content">
      <div v-if="!mini" class="logo-icon" :style="{ borderColor: accent, color: accent }">
        <span>H</span>
      </div>
      <div class="intro-name">
        <span
          v-for="(char, i) in nameChars"
          :key="i"
          :ref="el => { if (el) charEls[i] = el as HTMLElement }"
          class="char"
        >{{ char }}</span>
      </div>
      <div ref="progressEl" class="progress-bar">
        <div ref="progressFillEl" class="progress-fill" :style="{ background: accent }" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const props = withDefaults(defineProps<{
  mini?: boolean
  accent?: string
}>(), {
  mini: false,
  accent: '#00dc82',
})
const emit = defineEmits<{ done: [] }>()

const introEl = ref<HTMLElement>()
const progressFillEl = ref<HTMLElement>()
const charEls = ref<HTMLElement[]>([])

const nameText = 'Gilgoon'
const nameChars = nameText.split('')

// accent 컬러를 rgba로 변환 (hex → rgb)
function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

const rgb = computed(() => {
  try { return hexToRgb(props.accent) } catch { return '0, 220, 130' }
})

const bgStyle = computed(() => ({
  background: `radial-gradient(ellipse at 50% 30%, rgba(${rgb.value}, 0.06) 0%, #080808 60%)`,
}))

const glowStyle = computed(() => ({
  background: `radial-gradient(circle, rgba(${rgb.value}, 0.18) 0%, transparent 70%)`,
}))

onMounted(() => {
  const tl = gsap.timeline()
  gsap.set(charEls.value, { opacity: 0, y: props.mini ? 10 : 20 })
  gsap.set(progressFillEl.value, { scaleX: 0, transformOrigin: 'left center' })

  if (props.mini) {
    tl
      .to(charEls.value, { opacity: 1, y: 0, duration: 0.03, stagger: 0.04, ease: 'power2.out' })
      .to(progressFillEl.value, { scaleX: 1, duration: 0.4, ease: 'power2.inOut' }, '-=0.1')
      .to({}, { duration: 0.1 })
      .to(introEl.value, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => emit('done') })
  } else {
    tl
      .to(charEls.value, { opacity: 1, y: 0, duration: 0.05, stagger: 0.06, ease: 'power2.out' })
      .to(progressFillEl.value, { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }, '-=0.1')
      .to({}, { duration: 0.3 })
      .to(introEl.value, { opacity: 0, duration: 0.5, ease: 'power2.in', onComplete: () => emit('done') })
  }
})
</script>

<style scoped>
.loading-intro {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #080808;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.green-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  pointer-events: none;
  transition: background 0.6s ease;
}

.intro-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  position: relative;
  z-index: 1;
}

.logo-icon {
  width: 48px;
  height: 48px;
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 400;
}

.intro-name {
  display: flex;
  gap: 2px;
  font-size: 32px;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: #ffffff;
}

.char { display: inline-block; }

.progress-bar {
  width: 200px;
  height: 2px;
  background: #1a1a1a;
  border-radius: 1px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 1px;
}
</style>
