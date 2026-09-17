<script setup>
import { computed } from 'vue'

const routes = computed(() => [
  { path: '/', to: { query: { breadcrumb: 'home-fill' } }, label: '首页' },
  { path: '/channel', to: { query: { breadcrumb: 'channel' } }, label: '频道' },
  { path: '/news', to: { query: { breadcrumb: 'news' } }, label: '资讯' },
])
const routesWithChildren = computed(() => [
  routes.value[0],
  {
    ...routes.value[1],
    children: [
      { path: '/goods', label: '商品' },
      { path: '/wallet', label: '钱包' },
    ],
  },
  routes.value[2],
])
const droplist = computed(() => [
  { path: '/goods', label: '商品' },
  { path: '/wallet', label: '钱包' },
])
</script>

<template>
  <mp-space direction="column" :size="['2.666vmin', '2.666vmin']">
    <mp-breadcrumb :routes="routesWithChildren" @click.prevent />
    <mp-breadcrumb>
      <mp-breadcrumb-item>首页</mp-breadcrumb-item>
      <mp-breadcrumb-item :droplist="droplist">频道</mp-breadcrumb-item>
      <mp-breadcrumb-item>资讯</mp-breadcrumb-item>
    </mp-breadcrumb>
    <mp-breadcrumb>
      <mp-breadcrumb-item>首页</mp-breadcrumb-item>
      <mp-breadcrumb-item>
        <template #droplist>
          <mp-menu-option value="goods">商品</mp-menu-option>
          <mp-menu-option value="wallet">钱包</mp-menu-option>
        </template>
        频道
      </mp-breadcrumb-item>
      <mp-breadcrumb-item>资讯</mp-breadcrumb-item>
    </mp-breadcrumb>
  </mp-space>
</template>
