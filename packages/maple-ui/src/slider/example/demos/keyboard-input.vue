<script setup>
import { ref } from 'vue'

const value = ref(30)
const pair = ref([20, 80])
const marks = { 0: '0', 25: '25', 50: '50', 75: '75', 100: '100' }
</script>
<template>
  <div style="display: grid; gap: 32px; padding: 24px 12px">
    <mp-slider v-model="value" :step="5" :marks="marks" show-ticks show-input aria-label="Volume" />
    <mp-slider
      v-model="pair"
      range
      show-input
      :aria-label="['Minimum', 'Maximum']"
      :format-tooltip="(value) => value + '%'"
    />
  </div>
</template>
