<script setup></script>

<template>
  <mp-divider />
  <mp-divider type="dashed" />
  <mp-divider type="dotted" />
  <mp-divider type="double" :thickness="3" />
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
