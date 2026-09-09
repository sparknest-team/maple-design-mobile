<script setup lang="ts">
import { ref } from 'vue'
</script>
<template>
  <div class="pagination-demo">
    <mp-pagination :total="200" show-total
      ><template #total="{ total }">{{ total }} records</template></mp-pagination
    >
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
