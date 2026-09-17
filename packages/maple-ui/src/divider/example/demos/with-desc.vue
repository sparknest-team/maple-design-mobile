<script setup></script>

<template>
  <mp-divider description="文字描述" />
  <mp-divider description="靠左" text-align="start" />
  <mp-divider description="靠右" text-align="end" />
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
