<script setup lang="ts">
import { ref } from 'vue'

const buffer = ref(2)
const more = ref(false)
</script>
<template>
  <div class="pagination-demo">
    <div class="pagination-demo-controls">
      <mp-radio-group v-model="buffer"
        ><mp-radio v-for="value in [0, 1, 2]" :key="value" :value="value">Buffer {{ value }}</mp-radio></mp-radio-group
      ><mp-switch v-model="more" /> Show more
    </div>
    <mp-pagination :total="500" :default-current="12" :buffer-size="buffer" :show-more="more" :responsive="false" />
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
