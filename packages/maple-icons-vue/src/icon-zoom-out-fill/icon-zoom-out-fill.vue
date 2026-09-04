<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :class="['mp-svg-icon', { 'mp-svg-icon--spin': props.spin }]"
    :style="style"
    fill="currentColor"
    :aria-hidden="!props.title"
    :stroke-width="props.strokeWidth"
    :stroke-linecap="props.strokeLinecap"
    :stroke-linejoin="props.strokeLinejoin"
    role="img"
    @click="emit('click', $event)"
  >
    <title v-if="props.title">{{ props.title }}</title>
    <path
      d="M9 2c3.87 0 7 3.13 7 7 0 1.57-.5 3-1.39 4.19l.8.81H16l6 6-2 2-6-6v-.59l-.81-.8A6.9 6.9 0 0 1 9 16c-3.87 0-7-3.13-7-7s3.13-7 7-7M5 8v2h8V8z"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

defineOptions({ name: 'MIconZoomOutFill' })

const props = withDefaults(
  defineProps<{
    size?: string | number
    color?: string
    rotate?: number
    spin?: boolean
    title?: string
    strokeWidth?: number
    strokeLinecap?: 'butt' | 'round' | 'square'
    strokeLinejoin?: 'bevel' | 'inherit' | 'miter' | 'round'
  }>(),
  {
    strokeWidth: 4,
    strokeLinecap: 'butt',
    strokeLinejoin: 'miter',
  },
)
const emit = defineEmits<{ click: [event: MouseEvent] }>()
const numericSizeRE = /^-?(?:\d+|\d*\.\d+)$/
const style = computed<CSSProperties>(() => ({
  width: '1em',
  height: '1em',
  flexShrink: 0,
  color: props.color,
  fontSize:
    typeof props.size === 'number' || numericSizeRE.test(props.size?.trim() ?? '') ? `${props.size}px` : props.size,
  transform: props.rotate ? `rotate(${props.rotate}deg)` : undefined,
}))
</script>
