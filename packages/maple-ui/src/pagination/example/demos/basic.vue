<script setup lang="ts">
import { ref } from 'vue'

const current = ref(1)
</script>
<template>
  <div class="pagination-demo">
    <mp-pagination v-model="current" :total="50" />
    <span>Current: {{ current }}</span>
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
