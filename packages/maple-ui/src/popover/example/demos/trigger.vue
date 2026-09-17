<script setup>
import { ref } from 'vue'

const trigger = ref('click')
</script>

<template>
  <mp-select v-model="trigger" :hint="false">
    <mp-option label="click" />
    <mp-option label="hover" />
    <mp-option label="contextMenu" />
  </mp-select>
  <mp-popover style="margin-top: 15px" :trigger="trigger">
    <mp-button status="primary">触发方式</mp-button>

    <template #content>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
    </template>
  </mp-popover>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
