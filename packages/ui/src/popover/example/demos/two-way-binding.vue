<script setup>
import { ref } from 'vue'

const show = ref(false)
function closeMenu() {
  show.value = false
}
</script>

<template>
  <mp-popover v-model:open="show">
    <mp-button status="primary">双向绑定</mp-button>

    <template #content>
      <mp-cell @click="closeMenu">选项</mp-cell>
      <mp-cell @click="closeMenu">选项</mp-cell>
      <mp-cell @click="closeMenu">选项</mp-cell>
    </template>
  </mp-popover>

  <div style="margin-bottom: 100px"></div>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
