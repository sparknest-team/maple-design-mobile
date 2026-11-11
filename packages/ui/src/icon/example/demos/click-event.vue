<script setup lang="ts">
import { Message } from '@maple-design/ui-vue'
</script>
<template>
  <mp-button variant="text" round aria-label="确认操作" @click="Message.success('点击成功')">
    <template #icon><m-icon-check-circle /></template>
  </mp-button>
</template>
