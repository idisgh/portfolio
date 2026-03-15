import { gsap } from 'gsap'
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'

export function useScrollReveal() {
  let ScrollTriggerRef: typeof ScrollTriggerType | null = null

  onUnmounted(() => {
    // 페이지 이동 시 이 페이지의 ScrollTrigger 인스턴스 전체 정리
    if (ScrollTriggerRef) {
      ScrollTriggerRef.getAll().forEach(t => t.kill())
      gsap.killTweensOf('[data-hero] .reveal, .reveal, .reveal-stagger > *')
    }
  })

  onMounted(async () => {
    // ScrollTrigger 로딩 전에 즉시 숨김 처리 → FOUC 방지
    const heroRevEls = document.querySelectorAll('[data-hero] .reveal')
    gsap.set(heroRevEls, { opacity: 0, y: 40 })

    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)
    ScrollTriggerRef = ScrollTrigger

    // 이전 페이지의 잔여 인스턴스 정리
    ScrollTrigger.getAll().forEach(t => t.kill())

    // ① hero 안의 .reveal → 페이지 진입 시 stagger 순차 등장 (스크롤 불필요)
    if (heroRevEls.length) {
      // 진입: 아래에서 올라오며 등장
      gsap.fromTo(
        heroRevEls,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.1,
        }
      )


    }

    // ② hero 밖의 .reveal → ScrollTrigger
    const otherRevEls = document.querySelectorAll('.reveal:not([data-hero] .reveal)')
    otherRevEls.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        }
      )
    })

    // ③ .reveal-stagger 그룹: 자식 순차 등장
    const groups = document.querySelectorAll('.reveal-stagger')
    groups.forEach((group) => {
      gsap.fromTo(
        group.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 88%',
            once: true,
          },
        }
      )
    })
  })
}
