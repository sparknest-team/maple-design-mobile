<script setup lang="ts">
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'
import { t } from './locale'

const completed = ref(0)
const publish = async () => {
  await new Promise<void>((resolve) => setTimeout(resolve, 800))
  completed.value += 1
  Message.info(t('published'))
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
</script>

<template>
  <mp-space direction="column" align="flex-start">
    <mp-split-button status="primary" auto-loading @click="publish" @select="handleSelect">
      {{ t('publish') }}

      <template #content>
        <mp-menu-option :label="t('saveNow')" value="draft" />
        <mp-menu-option :label="t('saveAndPublish')" value="publish" />
        <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
      </template>
    </mp-split-button>
    <span aria-live="polite">{{ t('completed') }}: {{ completed }}</span>
  </mp-space>
</template>
