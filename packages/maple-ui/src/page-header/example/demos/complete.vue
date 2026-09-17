<script setup>
import { Message } from '@maplejs/maple-ui'

const handleBack = () => Message.info('点击返回')
</script>

<template>
  <mp-page-header show-back @back="handleBack">
    <template #header>
      <mp-breadcrumb>
        <mp-breadcrumb-item>首页</mp-breadcrumb-item>
        <mp-breadcrumb-item>详情</mp-breadcrumb-item>
      </mp-breadcrumb>
    </template>
    <template #avatar><mp-avatar>M</mp-avatar></template>
    <template #title>标题</template>
    <template #subtitle>详情</template>
    <template #extra><mp-button variant="text">操作</mp-button></template>
    页面摘要或统计信息
    <template #footer>最近更新：今天</template>
  </mp-page-header>
</template>
