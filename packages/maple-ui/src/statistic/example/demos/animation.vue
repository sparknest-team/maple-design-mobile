<script setup>
import { ref } from 'vue'

const started = ref(false)
</script>

<template>
  <mp-space align="flex-end" size="lg">
    <mp-statistic title="增长率" :value="50.52" :precision="2" :value-from="0" :start="started" suffix="%" animation>
      <template #prefix>▲</template>
    </mp-statistic>
    <mp-button status="primary" @click="started = true">开始</mp-button>
  </mp-space>
</template>

<style scoped>
.statistic-example__hint {
  margin: 0 0 12px;
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
  line-height: 1.5;
}
</style>
