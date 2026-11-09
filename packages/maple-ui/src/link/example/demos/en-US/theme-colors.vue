<script setup lang="ts">
import { Themes } from '@maple-design/ui'

const modes = ['light', 'dark'] as const
const statuses = ['primary', 'secondary', 'tertiary'] as const
</script>
<template>
  <mp-theme-provider v-for="mode in modes" :key="mode" :style-vars="Themes.firefly[mode]">
    <p>Firefly {{ mode }}</p>
    <div
      v-for="status in statuses"
      :key="status"
      :style="{
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        padding: '12px',
        background: status === 'secondary' && mode === 'light' ? '#ffffff' : '#17224b',
      }"
    >
      <mp-link :status="status">{{ status }} Link</mp-link>
      <mp-button :status="status" variant="text">{{ status }} Button</mp-button>
    </div>
  </mp-theme-provider>
</template>
