<script setup lang="ts">
import { Message } from '@maplejs/maple-ui'
import { t } from './locale'

const publish = () => {
  Message.info(t('published'))
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <mp-space wrap align="center">
    <mp-split-button
      v-for="size in sizes"
      :key="size"
      :size="size"
      status="primary"
      @click="publish"
      @select="handleSelect"
    >
      {{ size }}

      <template #content>
        <mp-menu-option :label="t('saveNow')" value="draft" />
        <mp-menu-option :label="t('saveAndPublish')" value="publish" />
        <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
      </template>
    </mp-split-button>
  </mp-space>
</template>
