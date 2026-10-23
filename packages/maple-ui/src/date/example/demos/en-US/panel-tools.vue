<script setup lang="ts">
import { ref } from 'vue'

const selected = ref('2025-01-15')
const viewport = ref('2025-01-01')
const acceptNavigation = ref(true)
const shortcuts = [
  { label: 'Month start', value: '2025-01-01' },
  { label: 'Next month', value: () => '2025-02-01' },
  { label: 'Disabled', value: '2025-03-01', disabled: true },
]
function navigate(value: unknown) {
  if (acceptNavigation.value && typeof value === 'string') {
    viewport.value = value
  }
}
</script>
<template>
  <div>
    <p>Selected: {{ selected }}; viewport: {{ viewport }}</p>
    <mp-checkbox v-model="acceptNavigation">Accept viewport navigation</mp-checkbox>
    <mp-date-picker
      v-model="selected"
      :picker-value="viewport"
      :shortcuts="shortcuts"
      :disable-confirm="false"
      presentation="calendar"
      @update:picker-value="navigate"
    />
    <p>Range shortcuts use the same confirmation and validation.</p>
    <mp-date-range-picker
      :default-value="['2025-01-10', '2025-01-15']"
      :shortcuts="[{ label: 'First week', value: ['2025-01-01', '2025-01-07'] }]"
      :disable-confirm="false"
      presentation="calendar"
    />
  </div>
</template>
