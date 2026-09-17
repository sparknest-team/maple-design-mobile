<script setup>
import { ref } from 'vue'

const trigger = ref('click')
</script>

<template>
  <mp-select v-model="trigger" :hint="false">
    <mp-option label="click" />
    <mp-option label="hover" />
  </mp-select>
  <mp-tooltip content="Tooltip" style="margin-top: 15px" :trigger="trigger">
    <mp-button status="primary">触发方式</mp-button>
  </mp-tooltip>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
