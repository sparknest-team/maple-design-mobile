<script setup></script>

<template>
  <div v-ripple class="ripple-example__block mp-elevation--2">点击</div>
</template>

<style lang="less" scoped>
@import '../../../style/elevation.less';

.ripple-example__block {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  user-select: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  background-color: var(--mp-color-fill-3);
  transition: background-color 0.25s;
}
</style>
