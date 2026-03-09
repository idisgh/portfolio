<template>
  <div class="floating-symbols" aria-hidden="true">
    <!-- wrap: scroll scale 담당 / inner: float 담당 (transform 분리) -->
    <div
      v-for="(sym, i) in symbols"
      :key="i"
      :ref="el => { if (el) wrapEls[i] = el as HTMLElement }"
      class="symbol-wrap"
      :style="sym.style"
    >
      <div
        :ref="el => { if (el) innerEls[i] = el as HTMLElement }"
        class="symbol-inner"
      >
        {{ sym.char }}
      </div>
    </div>
    <div class="glow-blob glow-1" />
    <div class="glow-blob glow-2" />
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const wrapEls = ref<HTMLElement[]>([])
const innerEls = ref<HTMLElement[]>([])

const symbols = [
  { char: '{', style: { top: '15%', left: '8%', fontSize: '80px', opacity: 0.12 }, dir: -1 },   // 왼쪽
  { char: '$', style: { top: '60%', left: '5%', fontSize: '60px', opacity: 0.08 }, dir: -1 },   // 왼쪽
  { char: '/', style: { top: '30%', right: '12%', fontSize: '100px', opacity: 0.1 }, dir: 1 },  // 오른쪽
  { char: '#', style: { bottom: '25%', left: '35%', fontSize: '70px', opacity: 0.08 }, dir: -1 },
  { char: '*', style: { top: '55%', right: '8%', fontSize: '55px', opacity: 0.1 }, dir: 1 },   // 오른쪽
  { char: '>', style: { top: '75%', right: '25%', fontSize: '50px', opacity: 0.08 }, dir: 1 },  // 오른쪽
  { char: ';', style: { top: '20%', right: '30%', fontSize: '40px', opacity: 0.07 }, dir: 1 },
]

const scaleValues = [2.5, 2, 3, 1.8, 2.2, 2, 1.6]
// 각 심볼마다 다른 날아가는 스크롤 구간 (px)
const scrollEnds = [350, 550, 450, 700, 400, 600, 500]

onMounted(async () => {
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  // inner: floating + 3D 회전 루프
  innerEls.value.forEach((el, i) => {
    if (!el) return
    gsap.to(el, {
      y: gsap.utils.random(-30, 30),
      x: gsap.utils.random(-15, 15),
      rotateY: gsap.utils.random(-35, 35),
      rotateX: gsap.utils.random(-20, 20),
      duration: gsap.utils.random(4, 8),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.3,
    })
  })

  // wrap: 스크롤 scrub — 커졌다가 사라지는 하나의 연속 timeline
  wrapEls.value.forEach((el, i) => {
    if (!el) return
    const maxScale = scaleValues[i] || 2
    const baseOpacity = parseFloat(String(symbols[i].style.opacity)) || 0.1

    const dir = symbols[i].dir ?? 1
    const xOffset = dir * gsap.utils.random(150, 280, true)()
    const scrollEnd = `+=${scrollEnds[i] || 500}`

    gsap.to(el, {
      scale: maxScale * 2,
      x: xOffset,
      opacity: 0,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: scrollEnd,
        scrub: 1.5,
      },
    })
  })
})
</script>

<style scoped>
.floating-symbols {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.symbol-wrap {
  position: absolute;
  transform-origin: center center;
  will-change: transform;
  perspective: 300px;
  transform-style: preserve-3d;
}

.symbol-inner {
  font-family: 'Inter', monospace;
  font-weight: 700;
  user-select: none;
  will-change: transform;
  transform-style: preserve-3d;
  background: linear-gradient(135deg, #ffffff 20%, #888888 60%, #333333 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter:
    drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.8))
    drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 20px rgba(0, 0, 0, 0.4));
}

.glow-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}

.glow-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, color-mix(in srgb, var(--accent) 12%, transparent) 0%, transparent 70%);
  top: -100px;
  right: -50px;
  transition: background 0.8s ease;
}

.glow-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, color-mix(in srgb, var(--accent) 8%, transparent) 0%, transparent 70%);
  bottom: -80px;
  left: 100px;
  transition: background 0.8s ease;
}
</style>
