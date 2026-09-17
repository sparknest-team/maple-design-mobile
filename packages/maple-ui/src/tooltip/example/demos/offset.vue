<script setup></script>

<template>
  <mp-tooltip content="Tooltip" :offset-x="64" :offset-y="-10">
    <mp-button status="primary">偏移量</mp-button>
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
