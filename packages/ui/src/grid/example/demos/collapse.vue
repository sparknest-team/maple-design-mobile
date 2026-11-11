<script setup lang="ts">
import { ref } from 'vue'

const collapsed = ref(true)
const rows = ref(1)
</script>
<template>
  <div>
    <div class="controls">
      <mp-switch v-model="collapsed" aria-label="Collapsed" />Collapsed<mp-radio-group v-model="rows"
        ><mp-radio :value="1">1 row</mp-radio><mp-radio :value="2">2 rows</mp-radio></mp-radio-group
      >
    </div>
    <mp-grid :cols="4" :col-gap="12" :row-gap="12" :collapsed="collapsed" :collapsed-rows="rows">
      <mp-grid-item v-for="i in 9" :key="i" class="cell">{{ i }}</mp-grid-item>
      <mp-grid-item v-slot="{ overflow }" suffix
        ><mp-button block variant="outline" @click="collapsed = !collapsed">{{
          overflow ? 'More' : 'Less'
        }}</mp-button></mp-grid-item
      >
    </mp-grid>
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
