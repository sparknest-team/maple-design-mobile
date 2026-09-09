<script setup lang="ts">
import { ref } from 'vue'

const width = ref(360)
const responsive = ref(true)
</script>
<template>
  <div class="pagination-demo">
    <mp-radio-group v-model="width"
      ><mp-radio v-for="value in [280, 360, 480, 640]" :key="value" :value="value"
        >{{ value }}px</mp-radio
      ></mp-radio-group
    >
    <div class="pagination-demo-controls"><mp-switch v-model="responsive" /> Responsive</div>
    <div :style="{ width: width + 'px', maxWidth: '100%' }">
      <mp-pagination :total="250" :responsive="responsive" show-total show-jumper show-page-size />
    </div>
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
