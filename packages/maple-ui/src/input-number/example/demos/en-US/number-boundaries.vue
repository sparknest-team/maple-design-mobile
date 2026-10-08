<script setup lang="ts">
import { ref } from 'vue'

const tiny = ref(0)
const negative = ref<number>()
const bounded = ref(0.1)
const amount = ref(12)
const formatter = (value: string) => '$' + value
const parser = (value: string) => value.replace(/^\$/, '')
</script>

<template>
  <div class="number-boundaries-demo">
    <label>
      <span>Scientific step: 1e-7</span>
      <mp-input-number v-model="tiny" :step="1e-7" :precision="0" />
      <output>{{ tiny }}</output>
    </label>
    <label>
      <span>Start empty, maximum -1</span>
      <mp-input-number v-model="negative" :max="-1" clearable />
      <output>{{ negative ?? 'Empty' }}</output>
    </label>
    <label>
      <span>Boundary first: maximum 0.15, precision 1</span>
      <mp-input-number v-model="bounded" :min="0" :max="0.15" :step="0.1" :precision="1" />
      <output>{{ bounded }}</output>
    </label>
    <label>
      <span>Formatted display, numeric value</span>
      <mp-input-number v-model="amount" :formatter="formatter" :parser="parser" model-event="input" />
      <output>{{ amount }}</output>
    </label>
  </div>
</template>

<style scoped>
.number-boundaries-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.number-boundaries-demo label {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.number-boundaries-demo output {
  font-variant-numeric: tabular-nums;
}
</style>
