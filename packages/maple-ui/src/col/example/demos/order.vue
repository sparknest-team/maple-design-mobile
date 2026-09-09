<script setup lang="ts">
import { ref } from 'vue'

const reverse = ref(false)
</script>
<template>
  <div>
    <div class="controls"><mp-switch v-model="reverse" aria-label="Reverse order" />Reverse order</div>
    <mp-row :gutter="12"
      ><mp-col v-for="i in 3" :key="i" :span="8" :order="reverse ? 3 - i : 0"
        ><div class="cell">{{ i }}</div></mp-col
      ></mp-row
    >
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
