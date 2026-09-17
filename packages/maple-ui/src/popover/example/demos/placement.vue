<script setup>
import { ref } from 'vue'

const placementValue = ref('bottom-start')
const placementOptions = ref([
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'right',
  'right-start',
  'right-end',
  'left',
  'left-start',
  'left-end',
])
</script>

<template>
  <mp-select v-model="placementValue" :hint="false">
    <mp-option v-for="(item, index) in placementOptions" :key="index" :label="item" />
  </mp-select>
  <div class="placement-container">
    <mp-popover :placement="placementValue">
      <mp-button status="primary">
        <m-icon-star-fill />
      </mp-button>
      <template #content>
        <mp-cell>选项</mp-cell>
        <mp-cell>选项</mp-cell>
        <mp-cell>选项</mp-cell>
      </template>
    </mp-popover>
  </div>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
