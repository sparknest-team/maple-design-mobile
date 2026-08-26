<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :class="['mp-svg-icon', { 'mp-svg-icon--spin': props.spin }]"
    :style="style"
    fill="currentColor"
    :aria-hidden="!props.title"
    role="img"
    @click="emit('click', $event)"
  >
    <title v-if="props.title">{{ props.title }}</title>
    <path d="M9 10v6h6v-6h4l-7-7-7 7zm3-4.2L14.2 8H13v6h-2V8H9.8zM19 18H5v2h14z" />
  </svg>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

defineOptions({ name: 'MIconUploadOutline' })

const props = defineProps<{ size?: string | number; color?: string; rotate?: number; spin?: boolean; title?: string }>()
const emit = defineEmits<{ click: [event: MouseEvent] }>()
const style = computed<CSSProperties>(() => ({
  width: '1em',
  height: '1em',
  flexShrink: 0,
  color: props.color,
  fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size,
  transform: props.rotate ? `rotate(${props.rotate}deg)` : undefined,
}))
</script>
