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
      d="m10 17-5-5 1.41-1.42L10 14.17l7.59-7.59L19 8m-7-6A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

defineOptions({ name: 'MIconCheckboxMarkedCircle' })

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
