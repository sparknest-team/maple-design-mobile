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
      <span>科学计数法步长：1e-7</span>
      <mp-input-number v-model="tiny" :step="1e-7" :precision="0" />
      <output>{{ tiny }}</output>
    </label>
    <label>
      <span>空值开始，最大值为 -1</span>
      <mp-input-number v-model="negative" :max="-1" clearable />
      <output>{{ negative ?? '空值' }}</output>
    </label>
    <label>
      <span>边界优先：最大值 0.15，精度 1</span>
      <mp-input-number v-model="bounded" :min="0" :max="0.15" :step="0.1" :precision="1" />
      <output>{{ bounded }}</output>
    </label>
    <label>
      <span>格式化展示与业务数字分离</span>
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
