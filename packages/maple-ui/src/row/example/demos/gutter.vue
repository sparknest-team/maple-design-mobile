<script setup lang="ts">
import { ref } from 'vue'

const gap = ref(16)
const vertical = ref(true)
</script>
<template>
  <div class="row-demo">
    <div class="controls">
      <mp-radio-group v-model="gap"
        ><mp-radio v-for="value in [0, 8, 16, 24]" :key="value" :value="value">{{ value }}px</mp-radio></mp-radio-group
      ><mp-switch v-model="vertical" aria-label="Vertical gutter" />Vertical gap
    </div>
    <mp-row :gutter="[gap, vertical ? gap : 0]"
      ><mp-col v-for="i in 6" :key="i" :span="8"
        ><div class="cell">{{ i }}</div></mp-col
      ></mp-row
    >
    <mp-row
      :gutter="[
        { xs: 8, md: 24 },
        { xs: 8, md: 16 },
      ]"
      ><mp-col v-for="i in 4" :key="i" :span="12"><div class="cell soft">Responsive gap</div></mp-col></mp-row
    >
  </div>
</template>

<style scoped>
.row-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
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
