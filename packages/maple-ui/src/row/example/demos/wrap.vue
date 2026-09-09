<script setup lang="ts">
import { ref } from 'vue'

const wrap = ref(true)
const div = ref(false)
</script>
<template>
  <div>
    <div class="controls">
      <mp-switch v-model="wrap" aria-label="Wrap" />Wrap<mp-switch v-model="div" aria-label="Plain div" />Plain div
    </div>
    <div style="overflow: auto; padding: 8px">
      <mp-row :gutter="12" :wrap="wrap" :div="div"
        ><mp-col v-for="i in 3" :key="i" :span="12"
          ><div class="cell">{{ i }}</div></mp-col
        ></mp-row
      >
    </div>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.cell {
  box-sizing: border-box;
  padding: 12px;
  min-width: 0;
  border-radius: 4px;
  background: var(--mp-color-primary);
  color: var(--mp-color-white);
  text-align: center;
  overflow-wrap: anywhere;
}
.soft {
  opacity: 0.7;
}
</style>
