<script setup>
import { Message } from '@maple-design/ui-vue'
</script>

<template>
  <mp-popover
    @open="Message.info('open')"
    @opened="Message.success('opened')"
    @close="Message.warning('close')"
    @closed="Message.error('closed')"
  >
    <mp-button status="primary">注册事件</mp-button>

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
