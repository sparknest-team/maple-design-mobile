<template>
  <mp-auto-complete
    v-model="value"
    :options="options"
    placeholder="Type or select a city"
    clearable
    style="width: 100%; max-width: 320px"
  />
  <p>Current value: {{ value || '-' }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = [
  'Beijing',
  { value: 310000, label: 'Shanghai' },
  { value: 'chengdu', label: 'Chengdu' },
  { value: 'wuhan', label: 'Wuhan', disabled: true },
]
</script>
