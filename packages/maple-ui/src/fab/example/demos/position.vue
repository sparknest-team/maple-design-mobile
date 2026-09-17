<script setup>
import { ref } from 'vue'

const position = ref('right-bottom')
</script>

<template>
  <mp-radio-group v-model="position">
    <mp-radio value="left-top">left-top</mp-radio>
    <mp-radio value="right-top">right-top</mp-radio>
    <mp-radio value="left-bottom">left-bottom</mp-radio>
    <mp-radio value="right-bottom">right-bottom</mp-radio>
  </mp-radio-group>
  <div class="fab-demo-stage">
    <mp-fab :fixed="false" :popup-container="false" :position="position" />
  </div>
</template>

<style scoped>
.fab-demo-stage {
  position: relative;
  min-height: 210px;
  margin-top: 16px;
  overflow: hidden;
  border: 1px dashed var(--mp-color-border-2);
  border-radius: 8px;
  --mp-fab-top: 16px;
}
</style>
