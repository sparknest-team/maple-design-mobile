<script setup lang="ts">
import { ref } from 'vue'
</script>
<template>
  <div class="pagination-demo">
    <mp-pagination
      :total="300"
      :default-current="10"
      :buffer-size="0"
      :responsive="false"
      :page-item-style="{ borderRadius: '8px' }"
      :active-page-item-style="{ fontWeight: '700' }"
    >
      <template #page-item="{ page }">{{ page }}</template>
      <template #page-item-step="{ type }">{{ type === 'previous' ? 'Prev' : 'Next' }}</template>
      <template #page-item-ellipsis>✦</template>
    </mp-pagination>
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
