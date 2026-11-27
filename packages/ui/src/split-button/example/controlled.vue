<script setup lang="ts">
import { ref } from 'vue'
import { Message } from '@maple-design/ui-vue'

const publish = () => {
  Message.info('发布成功')
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
const open = ref(false)
</script>

<template>
  <mp-space direction="column" align="flex-start">
    <mp-space wrap>
      <mp-button @click.stop="open = true">展开菜单</mp-button>
      <mp-button @click.stop="open = false">关闭菜单</mp-button>
    </mp-space>
    <mp-split-button v-model:open="open" @click="publish" @select="handleSelect">
      发布

      <template #content>
        <mp-menu-option label="保存草稿" value="draft" />
        <mp-menu-option label="保存并发布" value="publish" />
        <mp-menu-option label="暂无权限" value="restricted" disabled />
      </template>
    </mp-split-button>
    <span aria-live="polite">{{ open ? '已展开' : '已关闭' }}</span>
  </mp-space>
</template>
