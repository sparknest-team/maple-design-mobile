<template>
  <svg xmlns="http://www.w3.org/2000/svg" stroke-opacity="0" viewBox="0 0 120 120" :class="['mp-svg-icon', { 'mp-svg-icon--spin': props.spin }]" :style="style" fill="none" :aria-hidden="!props.title" :stroke-width="props.strokeWidth" :stroke-linecap="props.strokeLinecap" :stroke-linejoin="props.strokeLinejoin" role="img" @click="emit('click', $event)"><title v-if="props.title">{{ props.title }}</title><path fill="url(#a)" d="M120 112.776c0 3.99-26.863 7.224-60 7.224s-60-3.234-60-7.224 26.863-7.225 60-7.225 60 3.235 60 7.225"/><path fill="#D3D9E6" d="M77.882 54.544V37.203l-54.245 8.402v20.77l50.858-7.878a4 4 0 0 0 3.387-3.953"/><path fill="#DDE3F0" d="m77.882 37.203 20.633 8.402v21.874c0 2.84-2.877 4.776-5.508 3.705l-12.633-5.145a4 4 0 0 1-2.492-3.704zM23.637 45.662l20.633 8.402v39.283l-18.142-7.388a4 4 0 0 1-2.491-3.704z"/><path fill="#E6EBF5" d="m44.27 53.92 54.245-8.402v36.024a4 4 0 0 1-3.387 3.953L44.27 93.372z"/><path fill="#F0F3FA" d="M48.455 64.085a4 4 0 0 0 4.314 2.434l46.098-7.153a4 4 0 0 0 3.087-5.471l-3.438-8.377-54.228 8.414zM38.574 62.447a4 4 0 0 1-4.827 1.473L20.67 58.6a4 4 0 0 1-1.817-5.93l4.79-7.15 20.632 8.45z"/><path fill="#C8CEDE" fill-rule="evenodd" d="M74.877 16.076a.454.454 0 0 1 .161.618l-8.486 14.684a.446.446 0 0 1-.613.163.453.453 0 0 1-.16-.618l8.485-14.684a.446.446 0 0 1 .613-.163m-18.313 3.428a.45.45 0 0 1 .457.441l.218 10.48a.45.45 0 0 1-.438.462.45.45 0 0 1-.457-.442l-.218-10.48a.45.45 0 0 1 .438-.461M43.22 27.297a.445.445 0 0 1 .632-.041l5.277 4.678c.185.165.204.45.04.637a.445.445 0 0 1-.632.041l-5.276-4.678a.454.454 0 0 1-.04-.637" clip-rule="evenodd"/><defs><linearGradient id="a" x1="60" x2="60" y1="101.669" y2="120" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#F0F3FA"/></linearGradient></defs></svg>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

defineOptions({ name: 'MIconEmptyDefault' })

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
