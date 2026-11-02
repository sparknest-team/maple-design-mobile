<script setup lang="ts">
import { ref } from 'vue'
import type { NavMenuInstance } from '../../..'

const menu = ref<NavMenuInstance>()
const unmountOnClose = ref(false)
const options = [
  { key: 0, label: '不限' },
  { key: 'design', label: '设计资源' },
]
</script>
<template>
  <mp-space direction="column" style="width: 100%">
    <mp-space>
      <span>关闭后卸载</span>
      <mp-switch v-model="unmountOnClose" />
      <mp-button @click="menu?.close()">关闭当前面板</mp-button>
    </mp-space>
    <mp-nav-menu ref="menu" mode="horizontal">
      <mp-nav-menu-item label="草稿表单" :unmount-on-close="unmountOnClose">
        <template #content="{ close }">
          <mp-space direction="column" style="width: 100%">
            <mp-input default-value="" placeholder="输入后关闭，再打开查看草稿" aria-label="面板内部草稿" />
            <mp-button @click="close">关闭并返回入口</mp-button>
          </mp-space>
        </template>
      </mp-nav-menu-item>
      <mp-nav-menu-item label="分类" :options="options" />
    </mp-nav-menu>
    <p>默认保留面板内部草稿；开启卸载后再次展开会重新创建。关闭面板不会提交或重置业务筛选值。</p>
  </mp-space>
</template>
