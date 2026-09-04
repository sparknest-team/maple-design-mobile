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
      d="M29 16h12a1 1 0 0 1 1 1v22a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V17a1 1 0 0 1 1-1h12m10 0 8-9m-8 9H19m0 0-8-9m17.281 21.88-6.195 4.475a1 1 0 0 1-1.586-.81v-8.262a1 1 0 0 1 1.521-.853l6.196 3.786a1 1 0 0 1 .064 1.664Z"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

defineOptions({ name: 'MIconLiveBroadcast' })

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
