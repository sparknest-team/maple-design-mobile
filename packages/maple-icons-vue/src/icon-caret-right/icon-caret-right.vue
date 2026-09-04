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
      d="M34.829 23.063c.6.48.6 1.394 0 1.874L17.949 38.44c-.785.629-1.949.07-1.949-.937V10.497c0-1.007 1.164-1.566 1.95-.937z"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

defineOptions({ name: 'MIconCaretRight' })

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
