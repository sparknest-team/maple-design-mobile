<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    viewBox="0 0 48 48"
    :class="['mp-svg-icon', { 'mp-svg-icon--spin': props.spin }]"
    :style="style"
    fill="none"
    :aria-hidden="!props.title"
    :stroke-width="props.strokeWidth"
    :stroke-linecap="props.strokeLinecap"
    :stroke-linejoin="props.strokeLinejoin"
    role="img"
    @click="emit('click', $event)"
  >
    <title v-if="props.title">{{ props.title }}</title>
    <path
      fill="currentColor"
      stroke="none"
      d="M7.85 32.825s1.153 3.136 3.264 5.955c0 0-3.779 1.281-3.458 4.61 0 0-.128 3.714 8.069 3.458 0 0 5.764-.45 7.494-2.88h1.52c1.73 2.432 7.494 2.88 7.494 2.88 8.193.256 8.068-3.457 8.068-3.457.318-3.33-3.458-4.611-3.458-4.611 2.11-2.82 3.264-5.955 3.264-5.955 5.122 8.259 4.611-1.154 4.611-1.154-.96-5.57-4.995-9.221-4.995-9.221.576-5.058-1.537-5.955-1.537-5.955C37.742.844 24.26 1.12 23.978 1.126 23.694 1.12 10.21.846 9.767 16.495c0 0-2.113.897-1.537 5.955 0 0-4.034 3.65-4.995 9.221.005 0-.51 9.413 4.615 1.154"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

defineOptions({ name: 'MIconQq' })

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
