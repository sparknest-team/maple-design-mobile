<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" :class="['mp-svg-icon', { 'mp-svg-icon--spin': props.spin }]" :style="style" fill="currentColor" :aria-hidden="!props.title" :stroke-width="props.strokeWidth" :stroke-linecap="props.strokeLinecap" :stroke-linejoin="props.strokeLinejoin" role="img" @click="emit('click', $event)"><title v-if="props.title">{{ props.title }}</title><path d="M20 12c0 4.42-3.58 8-8 8s-8-3.58-8-8a7.998 7.998 0 0 1 10.2-7.69l1.57-1.57A9.8 9.8 0 0 0 12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10M7.91 10.08 6.5 11.5 11 16 21 6l-1.41-1.42L11 13.17z"/></svg>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

defineOptions({ name: 'MIconCheckboxMarkedCircle' })

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
