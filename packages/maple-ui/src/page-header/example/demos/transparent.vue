<script setup>
import { Message } from '@maplejs/maple-ui'

const handleAction = () => Message.success('已关注项目')
</script>

<template>
  <mp-card variant="tonal" size="sm">
    <mp-page-header>
      <template #title>
        <mp-space direction="column" :size="0">
          <span>设计系统</span>
          <small>项目概览</small>
        </mp-space>
      </template>
      <template #extra><mp-button @click="handleAction">关注</mp-button></template>
      <span>页头默认透明，可以融入页面背景。</span>
    </mp-page-header>
  </mp-card>
</template>
