<script setup></script>

<template>
  <mp-popover offset-x="36px" offset-y="18px">
    <mp-button status="primary">偏移量</mp-button>
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
