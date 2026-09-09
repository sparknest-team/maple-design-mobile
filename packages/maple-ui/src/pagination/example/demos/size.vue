<script setup lang="ts">
import { ref } from 'vue'

const size = ref<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md')
const elevation = ref(false)
</script>
<template>
  <div class="pagination-demo">
    <mp-radio-group v-model="size"
      ><mp-radio v-for="value in ['xs', 'sm', 'md', 'lg', 'xl']" :key="value" :value="value">{{
        value
      }}</mp-radio></mp-radio-group
    >
    <div class="pagination-demo-controls"><mp-switch v-model="elevation" /> Elevation</div>
    <mp-pagination :size="size" :elevation="elevation" :total="50" show-page-size show-jumper />
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
