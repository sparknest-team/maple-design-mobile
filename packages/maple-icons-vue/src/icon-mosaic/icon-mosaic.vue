<template>
  <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 48 48" :class="['mp-svg-icon', { 'mp-svg-icon--spin': props.spin }]" :style="style" fill="none" :aria-hidden="!props.title" :stroke-width="props.strokeWidth" :stroke-linecap="props.strokeLinecap" :stroke-linejoin="props.strokeLinejoin" role="img" @click="emit('click', $event)"><title v-if="props.title">{{ props.title }}</title><path fill="currentColor" stroke="none" d="M6 7h4v4H6zM6 23h4v4H6zM6 38h4v4H6zM14 15h4v4h-4zM14 31h4v4h-4zM22 7h4v4h-4zM22 23h4v4h-4zM22 38h4v4h-4zM30 15h4v4h-4zM30 31h4v4h-4zM38 7h4v4h-4zM38 23h4v4h-4zM38 38h4v4h-4z"/><path d="M6 7h4v4H6zM6 23h4v4H6zM6 38h4v4H6zM14 15h4v4h-4zM14 31h4v4h-4zM22 7h4v4h-4zM22 23h4v4h-4zM22 38h4v4h-4zM30 15h4v4h-4zM30 31h4v4h-4zM38 7h4v4h-4zM38 23h4v4h-4zM38 38h4v4h-4z"/></svg>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

defineOptions({ name: 'MIconMosaic' })

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
