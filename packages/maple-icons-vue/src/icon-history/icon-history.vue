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
    <path
      d="M13.5 8H12v5l4.28 2.54.72-1.21-3.5-2.08zM13 3a9 9 0 0 0-9 9H1l3.96 4.03L9 12H6a7 7 0 0 1 7-7 7 7 0 0 1 7 7 7 7 0 0 1-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.9 8.9 0 0 0 13 21a9 9 0 0 0 9-9 9 9 0 0 0-9-9"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

defineOptions({ name: 'MIconHistory' })

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
