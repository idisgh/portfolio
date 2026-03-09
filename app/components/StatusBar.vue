<template>
  <div class="fixed bottom-0 left-14 right-0 h-11 bg-[rgba(8,8,8,0.9)] border-t border-[#1a1a1a] flex items-center px-6 z-[100] backdrop-blur-md">
    <div class="flex gap-8">
      <span class="flex gap-1.5 text-xs text-[#999]">
        <span>Based in</span>
        <span>Seoul 🇰🇷</span>
      </span>
      <span class="flex gap-1.5 text-xs text-[#999]">
        <span>Local time</span>
        <span>{{ currentTime }} {{ timeEmoji }}</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const currentTime = ref('')
const timeEmoji = ref('☀️')

const updateTime = () => {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes().toString().padStart(2, '0')
  currentTime.value = `${hours}:${minutes}`
  if (hours >= 6 && hours < 12) timeEmoji.value = '🌅'
  else if (hours >= 12 && hours < 18) timeEmoji.value = '☀️'
  else if (hours >= 18 && hours < 21) timeEmoji.value = '🌆'
  else timeEmoji.value = '🌙'
}

let timer: ReturnType<typeof setInterval>
onMounted(() => { updateTime(); timer = setInterval(updateTime, 10000) })
onUnmounted(() => clearInterval(timer))
</script>
