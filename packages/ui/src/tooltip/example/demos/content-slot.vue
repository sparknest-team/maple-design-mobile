<script setup></script>

<template>
  <mp-tooltip>
    <mp-button status="primary">内容插槽</mp-button>

    <template #content>
      <m-icon-star-fill />
    </template>
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
