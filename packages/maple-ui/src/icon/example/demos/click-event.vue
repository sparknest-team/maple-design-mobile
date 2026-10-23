<script setup lang="ts">
import { Message } from '@maplejs/maple-ui'
</script>
<template>
  <mp-icon size="28" color="var(--mp-color-primary)" style="cursor: pointer" @click="Message.success('点击成功')">
    <m-icon-check-circle />
  </mp-icon>
</template>
