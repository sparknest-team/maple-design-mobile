<script setup lang="ts">
import { ref } from 'vue'

const total = ref(200)
const current = ref(18)
const autoAdjust = ref(true)
function reset() {
  total.value = 200
  current.value = 18
}
</script>
<template>
  <div class="pagination-demo">
    <div class="pagination-demo-controls">
      <mp-switch v-model="autoAdjust" /> Auto adjust<mp-button @click="total = 25">Reduce total</mp-button
      ><mp-button @click="reset">Reset</mp-button>
    </div>
    <mp-pagination v-model="current" :total="total" :auto-adjust="autoAdjust" show-total show-page-size />
    <span>Current: {{ current }} · Total: {{ total }}</span>
  </div>
</template>
<style scoped>
.pagination-demo {
  display: grid;
  gap: 16px;
  min-width: 0;
}
.pagination-demo-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
