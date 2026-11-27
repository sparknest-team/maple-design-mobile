<script setup lang="ts">
import { ref } from 'vue'
import { Message } from '@maple-design/ui-vue'

const lastAction = ref('')
const handleSelect = (value: unknown, option: { label?: unknown }) => {
  lastAction.value = String(value)
  Message.info(String(option.label))
}
</script>

<template>
  <mp-space direction="column" align="flex-start">
    <mp-split-button
      placement="bottom-start"
      :offset-y="8"
      :popup-max-height="160"
      :hide-on-select="false"
      @click="lastAction = 'publish'"
      @select="handleSelect"
    >
      选择操作
      <template #content>
        <mp-menu-option label="保存草稿" value="draft" />
        <mp-menu-option label="保存并发布" value="publish" />
        <mp-menu-option label="暂无权限" value="restricted" disabled />
      </template>
    </mp-split-button>
    <span aria-live="polite">最近操作: {{ lastAction || '暂无操作' }}</span>
    <span>选择后菜单保持展开，可连续选择；点击外部关闭。</span>
  </mp-space>
</template>
