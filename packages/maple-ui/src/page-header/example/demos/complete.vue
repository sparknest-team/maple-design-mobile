<script setup>
import { Message } from '@maplejs/maple-ui'

const handleBack = () => Message.info('点击返回')
const handleAction = () => Message.success('已关注项目')
const handleCreate = () => Message.info('点击创建任务')
</script>

<template>
  <mp-card variant="outline" size="sm">
    <mp-page-header show-back @back="handleBack">
      <template #header>
        <mp-breadcrumb>
          <mp-breadcrumb-item>工作台</mp-breadcrumb-item>
          <mp-breadcrumb-item>项目</mp-breadcrumb-item>
        </mp-breadcrumb>
      </template>
      <template #avatar><mp-avatar shape="square" :size="32">D</mp-avatar></template>
      <template #title>
        <mp-space direction="column" :size="0">
          <span>设计系统</span>
          <small>项目概览</small>
        </mp-space>
      </template>
      <template #extra><mp-button @click="handleAction">关注</mp-button></template>
      <span>统一设计规范与组件资源，帮助团队高效协作。</span>
      <mp-cell title="负责人"><template #extra>林晓</template></mp-cell>
      <mp-cell title="所属团队"><template #extra>设计平台</template></mp-cell>
      <mp-divider />
      <mp-grid :cols="3" :col-gap="12">
        <mp-grid-item><mp-statistic title="组件" :value="48" tabular-nums /></mp-grid-item>
        <mp-grid-item><mp-statistic title="进行中" :value="12" tabular-nums /></mp-grid-item>
        <mp-grid-item><mp-statistic title="成员" :value="8" tabular-nums /></mp-grid-item>
      </mp-grid>
      <template #footer>
        <mp-divider :spacing="[0, 16]" />
        <mp-grid :cols="1" :row-gap="16">
          <mp-grid-item>
            <mp-space justify="space-between" size="xs" wrap>
              <small>项目编号 DS-001</small>
              <small>最近更新：今天</small>
            </mp-space>
          </mp-grid-item>
          <mp-grid-item><mp-button block status="primary" @click="handleCreate">创建任务</mp-button></mp-grid-item>
        </mp-grid>
      </template>
    </mp-page-header>
  </mp-card>
</template>
