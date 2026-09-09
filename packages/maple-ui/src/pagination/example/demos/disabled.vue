<script setup lang="ts">
import { ref } from 'vue'

const disabled = ref(true)
const single = ref(false)
</script>
<template>
  <div class="pagination-demo">
    <div class="pagination-demo-controls">
      <mp-switch v-model="disabled" /> Disabled<mp-switch v-model="single" /> Single page
    </div>
    <mp-pagination
      :total="single ? 5 : 200"
      :disabled="disabled"
      hide-on-single-page
      show-jumper
      show-page-size
      show-total
    />
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
