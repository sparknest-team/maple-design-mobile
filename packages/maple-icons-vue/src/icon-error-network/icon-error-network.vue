<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    stroke-opacity="0"
    viewBox="0 0 120 120"
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
    <ellipse cx="60" cy="112.836" fill="url(#a)" rx="60" ry="7.164" />
    <path
      fill="#E6EBF5"
      fill-rule="evenodd"
      d="M27.747 53.831c-1.224 1.16-3.16 1.194-4.353.002l-4.297-4.293c-1.156-1.155-1.18-3.03.008-4.153 10.671-10.084 24.843-16.253 40.473-16.253 15.582 0 29.714 6.131 40.374 16.161 1.229 1.156 1.162 3.103-.084 4.24l-4.296 3.928c-1.206 1.102-3.068 1.027-4.255-.096-8.745-8.282-18.764-12.1-31.74-12.1-12.93 0-23.082 4.268-31.83 12.564"
      clip-rule="evenodd"
    />
    <path
      fill="#DDE3F0"
      fill-rule="evenodd"
      d="M40.285 67.474c-1.291 1.094-3.233 1.092-4.402-.131l-3.707-3.878c-1.125-1.176-1.113-3.043.113-4.113 7.243-6.324 17.218-10.716 27.29-10.716 10.069 0 20.181 4.39 27.45 10.71 1.23 1.072 1.239 2.944.107 4.12l-4.024 4.178c-1.171 1.217-3.107 1.216-4.384.112-5.32-4.595-11.729-7.43-19.15-7.43-7.415 0-13.944 2.614-19.293 7.148"
      clip-rule="evenodd"
    />
    <path
      fill="#C8CEDE"
      fill-rule="evenodd"
      d="M53.659 82.559c-1.454.91-3.425.984-4.626-.242l-3.891-3.97c-1.141-1.165-1.148-3.046.186-3.983 3.911-2.748 9.43-4.355 14.25-4.355 4.832 0 9.955 2.056 13.727 4.963 1.296 1 1.28 2.886.125 4.047l-3.315 3.335c-1.2 1.21-3.154 1.134-4.597.227a11.15 11.15 0 0 0-5.94-1.732c-2.142 0-4.169.614-5.919 1.71"
      clip-rule="evenodd"
    />
    <path fill="#fff" d="M83.164 93.269c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15" />
    <path d="M77.288 72.392 89.04 84.145M77.288 84.145 89.04 72.392" />
    <defs>
      <linearGradient id="a" x1="60" x2="60" y1="101.821" y2="120" gradientUnits="userSpaceOnUse">
        <stop stop-color="#fff" />
        <stop offset="1" stop-color="#F0F3FA" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

defineOptions({ name: 'MIconErrorNetwork' })

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
