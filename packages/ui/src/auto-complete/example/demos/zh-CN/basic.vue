<template>
  <mp-auto-complete
    v-model="value"
    :options="options"
    placeholder="输入或选择城市"
    clearable
    style="width: 100%; max-width: 320px"
  />
  <p>当前值：{{ value || '-' }}</p>
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
