<script setup lang="ts">
import { computed, ref } from 'vue'
import { watchLang } from '@maplejs/maple-cli/client'
import { Message } from '@maplejs/maple-ui'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')
watchLang((value) => {
  language.value = value
})

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
      {{ english ? 'Choose action' : '选择操作' }}
      <template #content>
        <mp-menu-option :label="english ? 'Save draft' : '保存草稿'" value="draft" />
        <mp-menu-option :label="english ? 'Save and publish' : '保存并发布'" value="publish" />
        <mp-menu-option :label="english ? 'Unavailable' : '暂无权限'" value="restricted" disabled />
      </template>
    </mp-split-button>
    <span aria-live="polite"
      >{{ english ? 'Last action' : '最近操作' }}: {{ lastAction || (english ? 'None' : '暂无操作') }}</span
    >
    <span>{{
      english
        ? 'The menu stays open after selection; click outside to close.'
        : '选择后菜单保持展开，可连续选择；点击外部关闭。'
    }}</span>
  </mp-space>
</template>
