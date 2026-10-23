<script setup lang="ts">
import { ref } from 'vue'

const value = ref<number | undefined>(12)
const disabled = ref(false)
const readonly = ref(false)
const clearable = ref(true)
const hint = ref(false)
</script>
<template>
  <div class="number-demo">
    <div class="number-demo__options">
      <mp-checkbox v-model="disabled">Disabled</mp-checkbox>
      <mp-checkbox v-model="readonly">Read-only</mp-checkbox>
      <mp-checkbox v-model="clearable">Clearable</mp-checkbox>
      <mp-checkbox v-model="hint">Floating hint</mp-checkbox>
    </div>
    <mp-input-number
      v-model="value"
      :disabled="disabled"
      :readonly="readonly"
      :clearable="clearable"
      :hint="hint"
      placeholder="Quantity"
    />
    <output>Numeric value：{{ value ?? 'Empty' }}</output>
  </div>
</template>
<style scoped>
.number-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.number-demo__options {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
