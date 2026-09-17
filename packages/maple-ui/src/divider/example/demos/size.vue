<script setup></script>

<template>
  <mp-divider size-x="md" />
  <mp-divider :size-x="36" size-y="lg" />
  <mp-divider :size-x="[24, 0]" />
</template>

<style lang="less" scoped>
.divider-example-vertical-container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;

  span {
    font-size: 14px;
    color: #888;
  }
}
</style>
