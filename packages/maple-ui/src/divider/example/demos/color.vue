<script setup></script>

<template>
  <mp-divider color="var(--mp-color-primary)" />
  <mp-divider :thickness="3" color="#6750A4" :opacity="0.5" />
  <mp-divider hairline />
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
