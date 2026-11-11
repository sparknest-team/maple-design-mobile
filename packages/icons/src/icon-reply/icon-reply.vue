<template>
  <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 48 48" :class="['mp-svg-icon', { 'mp-svg-icon--spin': props.spin }]" :style="style" fill="none" :aria-hidden="!props.title" :stroke-width="props.strokeWidth" :stroke-linecap="props.strokeLinecap" :stroke-linejoin="props.strokeLinejoin" role="img" @click="emit('click', $event)"><title v-if="props.title">{{ props.title }}</title><path d="m6.642 24.684 14.013 14.947a.2.2 0 0 0 .345-.137v-8.949A23 23 0 0 1 26 30c6.208 0 11.84 2.459 15.978 6.456a.01.01 0 0 0 .017-.007Q42 36.224 42 36c0-10.493-8.506-19-19-19q-1.013 0-2 .104V8.506a.2.2 0 0 0-.346-.137L6.642 23.316a1 1 0 0 0 0 1.368Z"/></svg>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

defineOptions({ name: 'MIconReply' })

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
