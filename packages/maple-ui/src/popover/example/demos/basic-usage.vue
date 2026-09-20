<script setup></script>

<template>
  <mp-popover title="设备状态">
    <mp-button status="primary">基本使用</mp-button>
    <template #content>
      <p>设备：生产线 A-03</p>
      <p>状态：运行中</p>
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
