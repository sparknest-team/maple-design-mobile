<script setup lang="ts">
import { ref } from 'vue'

const lastAction = ref('尚未操作')
const record = (label: string) => {
  lastAction.value = `已选择 ${label}`
}
</script>

<template>
  <mp-space direction="column">
    <div>纯文本：仅展示路径</div>
    <mp-breadcrumb>
      <mp-breadcrumb-item>Home</mp-breadcrumb-item>
      <mp-breadcrumb-item>Channel</mp-breadcrumb-item>
      <mp-breadcrumb-item>News</mp-breadcrumb-item>
    </mp-breadcrumb>
    <div>链接：悬停或聚焦查看反馈</div>
    <mp-breadcrumb>
      <mp-breadcrumb-item href="#/home" @click.prevent="record('Home')">Home</mp-breadcrumb-item>
      <mp-breadcrumb-item href="#/channel" @click.prevent="record('Channel')">Channel</mp-breadcrumb-item>
      <mp-breadcrumb-item>News</mp-breadcrumb-item>
    </mp-breadcrumb>
    <div>点击操作：支持 Enter / 空格</div>
    <mp-breadcrumb>
      <mp-breadcrumb-item @click="record('Home')">Home</mp-breadcrumb-item>
      <mp-breadcrumb-item @click="record('Channel')">Channel</mp-breadcrumb-item>
      <mp-breadcrumb-item>News</mp-breadcrumb-item>
    </mp-breadcrumb>
    <span role="status">{{ lastAction }}</span>
  </mp-space>
</template>
