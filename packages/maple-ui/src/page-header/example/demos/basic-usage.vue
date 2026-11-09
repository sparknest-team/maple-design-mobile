<script setup>
import { Message } from '@maple-design/ui'

const handleBack = () => Message.info('点击返回')
const handleAction = () => Message.success('已关注项目')
const handleCreate = () => Message.info('点击创建任务')
</script>

<template>
  <mp-card variant="outline" size="sm">
    <mp-page-header show-back back-button-aria-label="返回项目列表" @back="handleBack">
      <template #title>
        <mp-space direction="column" :size="0">
          <h2 style="margin: 0; font: inherit">设计系统</h2>
          <small>项目概览</small>
        </mp-space>
      </template>
      <template #extra><mp-button @click="handleAction">关注</mp-button></template>
      <template #footer><mp-button block status="primary" @click="handleCreate">创建任务</mp-button></template>
    </mp-page-header>
  </mp-card>
</template>
