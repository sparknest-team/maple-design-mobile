<script setup>
import { computed } from 'vue'

const routes = computed(() => [
  { path: '/', to: { query: { breadcrumb: 'home-fill' } }, label: '首页' },
  { path: '/channel', to: { query: { breadcrumb: 'channel' } }, label: '频道' },
  { path: '/news', to: { query: { breadcrumb: 'news' } }, label: '资讯' },
])
const maxRoutes = computed(() => [
  { path: '/', label: '首页' },
  { path: '/sub-home', label: '二级首页' },
  { path: '/all-channel', label: '全部频道' },
  { path: '/channel', label: '频道' },
  { path: '/news', label: '资讯' },
  { path: '/post', label: '详情' },
])
</script>

<template>
  <mp-breadcrumb :max-count="3">
    <mp-breadcrumb-item>首页</mp-breadcrumb-item>
    <mp-breadcrumb-item>二级首页</mp-breadcrumb-item>
    <mp-breadcrumb-item>全部频道</mp-breadcrumb-item>
    <mp-breadcrumb-item>频道</mp-breadcrumb-item>
    <mp-breadcrumb-item>资讯</mp-breadcrumb-item>
    <mp-breadcrumb-item>详情</mp-breadcrumb-item>
  </mp-breadcrumb>
  <mp-breadcrumb :routes="maxRoutes" :max-count="3" @click.prevent>
    <template #more-icon="{ omittedItems }">
      <mp-tooltip :content="omittedItems.map((item) => item.label).join(' / ')">
        <m-icon-more />
      </mp-tooltip>
    </template>
  </mp-breadcrumb>
</template>
