<script setup lang="ts">
import { ref } from 'vue'

const total = ref(true)
const jumper = ref(true)
const pageSize = ref(true)
</script>
<template>
  <div class="pagination-demo">
    <div class="pagination-demo-controls">
      <mp-switch v-model="total" /> Total<mp-switch v-model="jumper" /> Jumper<mp-switch v-model="pageSize" /> Page size
    </div>
    <mp-pagination :total="125" :show-total="total" :show-jumper="jumper" :show-page-size="pageSize" />
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
