<script setup lang="ts">
import { ref } from 'vue'

const justifies = ['start', 'center', 'end', 'space-around', 'space-between'] as const
const aligns = ['start', 'center', 'end', 'stretch'] as const
const justify = ref<(typeof justifies)[number]>('space-between')
const align = ref<(typeof aligns)[number]>('center')
</script>
<template>
  <div class="row-demo">
    <mp-radio-group v-model="justify"
      ><mp-radio v-for="value in justifies" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group
    >
    <mp-radio-group v-model="align"
      ><mp-radio v-for="value in aligns" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group
    >
    <mp-row :justify="justify" :align="align"
      ><mp-col v-for="i in 3" :key="i" :span="6"
        ><div class="cell" :style="{ minHeight: `${36 + i * 24}px`, height: '100%' }">{{ i }}</div></mp-col
      ></mp-row
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
