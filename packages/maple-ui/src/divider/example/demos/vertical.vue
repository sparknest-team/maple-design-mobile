<script setup></script>

<template>
  <div class="divider-example-vertical-container">
    <span>文字</span>
    <mp-divider orientation="vertical" />
    <span>文字</span>
    <mp-divider orientation="vertical" type="dashed" />
    <span>文字</span>
  </div>
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
