<script setup>
import { ref } from 'vue'

const value = ref('09:00')
const hint = ref(false)
const error = ref(false)
const line = ref(true)
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <mp-checkbox v-model="hint">Floating hint</mp-checkbox>
    <mp-checkbox v-model="error">Explicit error state</mp-checkbox>
    <mp-checkbox v-model="line">Border / underline</mp-checkbox>
    <mp-time
      v-model="value"
      format="HH:mm"
      variant="outline"
      placeholder="Choose time"
      :hint="hint"
      :error="error"
      :line="line"
      focus-color="#6750a4"
    />
    <span>{{ value }}</span>
  </mp-space>
</template>
