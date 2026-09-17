<script setup></script>

<template>
  <mp-popover disabled>
    <mp-button status="primary" disabled>禁用气泡卡片</mp-button>

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
