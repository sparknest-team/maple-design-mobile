<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" :class="['mp-svg-icon', { 'mp-svg-icon--spin': props.spin }]" :style="style" fill="currentColor" :aria-hidden="!props.title" :stroke-width="props.strokeWidth" :stroke-linecap="props.strokeLinecap" :stroke-linejoin="props.strokeLinejoin" role="img" @click="emit('click', $event)"><title v-if="props.title">{{ props.title }}</title><path d="M21 19v-2H8v2zm0-6v-2H8v2zM8 7h13V5H8zM4 5v2h2V5zM3 5c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1zm1 6v2h2v-2zm-1 0c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1zm1 6v2h2v-2zm-1 0c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1z"/></svg>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

defineOptions({ name: 'MIconFormatListCheckbox' })

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
