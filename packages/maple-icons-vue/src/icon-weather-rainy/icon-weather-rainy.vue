<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" :class="['mp-svg-icon', { 'mp-svg-icon--spin': props.spin }]" :style="style" fill="currentColor" :aria-hidden="!props.title" :stroke-width="props.strokeWidth" :stroke-linecap="props.strokeLinecap" :stroke-linejoin="props.strokeLinejoin" role="img" @click="emit('click', $event)"><title v-if="props.title">{{ props.title }}</title><path d="M6 14.03c.55 0 1 .45 1 1s-.45 1-1 1c-2.76 0-5-2.24-5-5s2.24-5 5-5c1-2.35 3.3-4 6-4 3.43 0 6.24 2.66 6.5 6.03l.5-.03a3.999 3.999 0 1 1 0 8h-1c-.55 0-1-.45-1-1 0-.56.45-1 1-1h1c1.1 0 2-.9 2-2s-.9-2-2-2h-2v-1c0-2.76-2.24-5-5-5-2.5 0-4.55 1.81-4.94 4.18-.33-.12-.69-.18-1.06-.18-1.66 0-3 1.34-3 3s1.34 3 3 3m6 .12c.18.24.37.51.56.79C13 15.56 14 17.03 14 18a2 2 0 1 1-4 0c0-.97 1-2.44 1.44-3.06.19-.28.38-.54.56-.79m0-3.12-.5.56s-.85.96-1.71 2.22C8.93 15.06 8 16.56 8 18c0 2.21 1.79 4 4 4s4-1.79 4-4c0-1.44-.93-2.94-1.79-4.19-.86-1.26-1.71-2.22-1.71-2.22"/></svg>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

defineOptions({ name: 'MIconWeatherRainy' })

const props = withDefaults(defineProps<{
  size?: string | number
  color?: string
  rotate?: number
  spin?: boolean
  title?: string
  strokeWidth?: number
  strokeLinecap?: 'butt' | 'round' | 'square'
  strokeLinejoin?: 'bevel' | 'inherit' | 'miter' | 'round'
}>(), {
  strokeWidth: 4,
  strokeLinecap: 'butt',
  strokeLinejoin: 'miter',
})
const emit = defineEmits<{ click: [event: MouseEvent] }>()
const numericSizeRE = /^-?(?:\d+|\d*\.\d+)$/
const style = computed<CSSProperties>(() => ({
  width: '1em',
  height: '1em',
  flexShrink: 0,
  color: props.color,
  fontSize: typeof props.size === 'number' || numericSizeRE.test(props.size?.trim() ?? '') ? `${props.size}px` : props.size,
  transform: props.rotate ? `rotate(${props.rotate}deg)` : undefined,
}))
</script>
