<script setup lang="ts">
import { ref } from 'vue'

const pageSize = ref(10)
const current = ref(5)
</script>
<template>
  <div class="pagination-demo">
    <mp-pagination
      v-model:current="current"
      v-model:page-size="pageSize"
      :total="200"
      show-page-size
      :page-size-options="[10, 20, 50, 100]"
      :page-size-props="{ placement: 'bottom-start' }"
    />
    <span>Current: {{ current }} · Page size: {{ pageSize }}</span>
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
