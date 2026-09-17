<script setup lang="ts">
import { ref } from 'vue'

const items = ref([1, 2, 3, 4, 5])
const next = ref(6)
</script>
<template>
  <div>
    <div class="controls">
      <mp-button @click="items.unshift(next++)">Insert first</mp-button
      ><mp-button :disabled="!items.length" @click="items.shift()">Remove first</mp-button
      ><mp-button @click="items.reverse()">Reverse</mp-button>
    </div>
    <mp-grid :cols="3" :col-gap="12" :row-gap="12" collapsed
      ><mp-grid-item v-for="i in items" :key="i" class="cell">{{ i }}</mp-grid-item
      ><mp-grid-item v-slot="{ overflow }" suffix class="cell soft">{{ overflow ? '…' : 'End' }}</mp-grid-item></mp-grid
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
