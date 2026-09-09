<script setup lang="ts">
import { ref } from 'vue'

const span = ref(8)
const offset = ref(4)
</script>
<template>
  <div>
    <div class="controls">
      Span<mp-radio-group v-model="span"
        ><mp-radio v-for="value in [4, 8, 12]" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group
      >
    </div>
    <div class="controls">
      Offset<mp-radio-group v-model="offset"
        ><mp-radio v-for="value in [0, 4, 8]" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group
      >
    </div>
    <mp-row :gutter="12"
      ><mp-col :span="span" :offset="offset"
        ><div class="cell">{{ span }} / +{{ offset }}</div></mp-col
      ><mp-col :span="4"><div class="cell soft">4</div></mp-col></mp-row
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
