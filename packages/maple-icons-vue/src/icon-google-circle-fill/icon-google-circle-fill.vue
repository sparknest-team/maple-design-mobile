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
      d="M32.571 33.526c-2.084 1.92-4.927 3.05-8.322 3.05a12.57 12.57 0 0 1-12.572-12.577A12.58 12.58 0 0 1 24.25 11.416a12.1 12.1 0 0 1 8.414 3.277L29.061 18.3a6.79 6.79 0 0 0-4.807-1.88c-3.277 0-6.045 2.213-7.037 5.186a7.6 7.6 0 0 0-.394 2.392c0 .833.144 1.638.394 2.391.992 2.973 3.763 5.187 7.032 5.187 1.696 0 3.133-.449 4.254-1.202a5.78 5.78 0 0 0 2.513-3.8h-6.767V21.71h11.844q.226 1.238.227 2.57c0 3.835-1.371 7.055-3.749 9.246M24 1A23 23 0 1 0 24 47 23 23 0 0 0 24 1"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

defineOptions({ name: 'MIconGoogleCircleFill' })

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
