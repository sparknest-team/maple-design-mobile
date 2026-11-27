<script setup lang="ts">
import { Message } from '@maple-design/ui-vue'

const publish = () => {
  Message.info('发布成功')
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
const variants = ['default', 'outline', 'tonal', 'text'] as const
</script>

<template>
  <mp-space wrap>
    <mp-split-button
      v-for="variant in variants"
      :key="variant"
      :variant="variant"
      @click="publish"
      @select="handleSelect"
    >
      {{ variant }}

      <template #content>
        <mp-menu-option label="保存草稿" value="draft" />
        <mp-menu-option label="保存并发布" value="publish" />
        <mp-menu-option label="暂无权限" value="restricted" disabled />
      </template>
    </mp-split-button>
  </mp-space>
</template>
