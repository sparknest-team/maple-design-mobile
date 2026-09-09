<script setup lang="ts">
import { ref } from 'vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const size = ref<(typeof sizes)[number]>('md')
const items = [
  { status: 'default', path: 'M12 5v14M5 12h14', label: 'Add' },
  { status: 'primary', path: 'm4 12 7-7v4h9v6h-9v4z', label: 'Reply' },
  { status: 'info', path: 'M12 11v6M12 7v1', label: 'Info' },
  { status: 'success', path: 'm5 12 4 4L19 6', label: 'Confirm' },
  { status: 'warning', path: 'M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13', label: 'Delete' },
  { status: 'danger', path: 'M6 6l12 12M6 18 18 6', label: 'Close' },
] as const
</script>
<template>
  <div style="display: grid; gap: 8px; margin-bottom: 20px">
    <span style="font-size: 13px; opacity: 0.7">Size</span
    ><mp-radio-group v-model="size"
      ><mp-radio v-for="value in sizes" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group
    >
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <mp-button
      v-for="item in items"
      :key="item.label"
      :status="item.status"
      :size="size"
      round
      icon-container
      :aria-label="item.label"
      ><template #icon
        ><svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path :d="item.path" /></svg></template
    ></mp-button>
  </div>
</template>
