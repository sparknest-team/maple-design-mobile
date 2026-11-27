<script setup lang="ts">
import { Message } from '@maple-design/ui-vue'

const publish = () => {
  Message.info('发布成功')
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
</script>

<template>
  <mp-split-button @click="publish" @select="handleSelect">
    发布
    <template #icon="{ open }">
      <m-icon-menu-down
        :style="{
          transform: open ? 'rotate(180deg)' : undefined,
          transition: 'transform 0.2s',
        }"
      />
    </template>
    <template #content>
      <mp-menu-option label="保存草稿" value="draft" />
      <mp-menu-option label="保存并发布" value="publish" />
      <mp-menu-option label="暂无权限" value="restricted" disabled />
    </template>
  </mp-split-button>
</template>
