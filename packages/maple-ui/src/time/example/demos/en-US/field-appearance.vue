<script setup>
import { ref } from 'vue'

const value = ref('09:00')
const hint = ref(true)
const error = ref(false)
const line = ref(true)
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <label><input v-model="hint" type="checkbox" /> Floating hint</label>
    <label><input v-model="error" type="checkbox" /> Explicit error state</label>
    <label><input v-model="line" type="checkbox" /> Border / underline</label>
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
