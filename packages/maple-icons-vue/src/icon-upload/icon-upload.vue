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
    <path d="M9 16v-6H5l7-7 7 7h-4v6zm-4 4v-2h14v2z" />
  </svg>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

defineOptions({ name: 'MIconUpload' })

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
