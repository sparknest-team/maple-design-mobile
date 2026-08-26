<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    stroke-width="4"
    viewBox="0 0 48 48"
    :class="['mp-svg-icon', { 'mp-svg-icon--spin': props.spin }]"
    :style="style"
    fill="none"
    :aria-hidden="!props.title"
    role="img"
    @click="emit('click', $event)"
  >
    <title v-if="props.title">{{ props.title }}</title>
    <path stroke="none" d="M38 25v-2h2v2zM23 25v-2h2v2zM8 25v-2h2v2z" />
    <path d="M38 25v-2h2v2zM23 25v-2h2v2zM8 25v-2h2v2z" />
  </svg>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

defineOptions({ name: 'MIconMore' })

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
