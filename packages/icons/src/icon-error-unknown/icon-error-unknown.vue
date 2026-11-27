<template>
  <svg xmlns="http://www.w3.org/2000/svg" stroke-opacity="0" viewBox="0 0 120 120" :class="['mp-svg-icon', { 'mp-svg-icon--spin': props.spin }]" :style="style" fill="none" :aria-hidden="!props.title" :stroke-width="props.strokeWidth" :stroke-linecap="props.strokeLinecap" :stroke-linejoin="props.strokeLinejoin" role="img" @click="emit('click', $event)"><title v-if="props.title">{{ props.title }}</title><ellipse cx="60" cy="113.179" fill="url(#a)" rx="60" ry="6.821"/><path fill="#e6ebf5" d="m59.655 26.439 9.242 24.807-9.351 18.484 6.81 19.188h28.108a3.215 3.215 0 0 0 3.215-3.215v-56.05a3.215 3.215 0 0 0-3.215-3.214z"/><path fill="#f0f3fa" d="m50.67 26.439 9.158 24.807-9.2 18.484 6.692 19.188H25.215A3.215 3.215 0 0 1 22 85.703v-56.05a3.215 3.215 0 0 1 3.215-3.214z"/><mask id="b" fill="#fff"><path d="M29.04 30.876a1.76 1.76 0 1 1 0 3.52 1.76 1.76 0 0 1 0-3.52m2.64 1.76a2.64 2.64 0 1 0-5.28 0 2.64 2.64 0 0 0 5.28 0"/></mask><path fill="#8f97b2" d="M29.04 30.876a1.76 1.76 0 1 1 0 3.52 1.76 1.76 0 0 1 0-3.52m2.64 1.76a2.64 2.64 0 1 0-5.28 0 2.64 2.64 0 0 0 5.28 0"/><path fill="#b1b9cc" d="M29.8 32.636a.76.76 0 0 0-.76-.76v-2a2.76 2.76 0 0 1 2.76 2.76zm-.76.76c.419 0 .76-.34.76-.76h2a2.76 2.76 0 0 1-2.76 2.76zm-.76-.76c0 .42.34.76.76.76v2a2.76 2.76 0 0 1-2.76-2.76zm.76-.76a.76.76 0 0 0-.76.76h-2a2.76 2.76 0 0 1 2.76-2.76zm0-2.88a3.64 3.64 0 0 1 3.64 3.64h-2a1.64 1.64 0 0 0-1.64-1.64zm-3.64 3.64a3.64 3.64 0 0 1 3.64-3.64v2a1.64 1.64 0 0 0-1.64 1.64zm3.64 3.64a3.64 3.64 0 0 1-3.64-3.64h2c0 .905.734 1.64 1.64 1.64zm3.64-3.64a3.64 3.64 0 0 1-3.64 3.64v-2a1.64 1.64 0 0 0 1.64-1.64z" mask="url(#b)"/><mask id="c" fill="#fff"><path d="M37.764 30.876a1.76 1.76 0 1 1 0 3.52 1.76 1.76 0 0 1 0-3.52m2.64 1.76a2.64 2.64 0 1 0-5.28 0 2.64 2.64 0 0 0 5.28 0"/></mask><path fill="#8f97b2" d="M37.764 30.876a1.76 1.76 0 1 1 0 3.52 1.76 1.76 0 0 1 0-3.52m2.64 1.76a2.64 2.64 0 1 0-5.28 0 2.64 2.64 0 0 0 5.28 0"/><path fill="#b1b9cc" d="M38.524 32.636a.76.76 0 0 0-.76-.76v-2a2.76 2.76 0 0 1 2.76 2.76zm-.76.76c.42 0 .76-.34.76-.76h2a2.76 2.76 0 0 1-2.76 2.76zm-.76-.76c0 .42.34.76.76.76v2a2.76 2.76 0 0 1-2.76-2.76zm.76-.76a.76.76 0 0 0-.76.76h-2a2.76 2.76 0 0 1 2.76-2.76zm0-2.88a3.64 3.64 0 0 1 3.64 3.64h-2a1.64 1.64 0 0 0-1.64-1.64zm-3.64 3.64a3.64 3.64 0 0 1 3.64-3.64v2a1.64 1.64 0 0 0-1.64 1.64zm3.64 3.64a3.64 3.64 0 0 1-3.64-3.64h2c0 .906.735 1.64 1.64 1.64zm3.64-3.64a3.64 3.64 0 0 1-3.64 3.64v-2a1.64 1.64 0 0 0 1.64-1.64z" mask="url(#c)"/><path fill="#fff" d="M97.84 95c-8.837 0-16-7.164-16-16s7.163-16 16-16c8.835 0 15.999 7.164 15.999 16s-7.164 16-16 16"/><path fill="#fdddbe" fill-rule="evenodd" d="M83.84 79c0 7.732 6.267 14 14 14 7.731 0 13.999-6.268 13.999-14s-6.268-14-14-14-14 6.268-14 14m-2 0c0 8.836 7.163 16 16 16 8.835 0 15.999-7.164 15.999-16s-7.164-16-16-16-16 7.164-16 16" clip-rule="evenodd"/><circle cx="97.999" cy="87.2" r="1.2" fill="#fdddbe"/><path fill="#fdddbe" fill-rule="evenodd" d="M98 70a1 1 0 0 1 1 1v12a1 1 0 1 1-2 0V71a1 1 0 0 1 1-1" clip-rule="evenodd"/><path fill="#b1b9cc" fill-rule="evenodd" d="M25.9 37.879a.5.5 0 0 1 .5-.5h24.64a.5.5 0 0 1 0 1H26.4a.5.5 0 0 1-.5-.5M69.9 37.879a.5.5 0 0 1 .5-.5h23.759a.5.5 0 0 1 0 1h-23.76a.5.5 0 0 1-.5-.5" clip-rule="evenodd"/><defs><linearGradient id="a" x1="60" x2="60" y1="102.692" y2="120" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#f0f3fa"/></linearGradient></defs></svg>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

defineOptions({ name: 'MIconErrorUnknown' })

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
