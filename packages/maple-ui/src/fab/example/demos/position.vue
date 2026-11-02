<script setup>
import { ref } from 'vue'

const position = ref('bottom-right')
</script>

<template>
  <mp-radio-group v-model="position">
    <mp-radio value="top-left">top-left</mp-radio>
    <mp-radio value="top-right">top-right</mp-radio>
    <mp-radio value="bottom-left">bottom-left</mp-radio>
    <mp-radio value="bottom-right">bottom-right</mp-radio>
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
