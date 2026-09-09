<script setup lang="ts">
import { Message } from '@maplejs/maple-ui'
import { t } from './locale'

const publish = () => {
  Message.info(t('published'))
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
</script>

<template>
  <mp-split-button status="primary" @click="publish" @select="handleSelect">
    {{ t('publish') }}
    <template #icon="{ open }">
      <m-icon-menu-down
        :style="{
          transform: open ? 'rotate(180deg)' : undefined,
          transition: 'transform 0.2s',
        }"
      />
    </template>
    <template #content>
      <mp-menu-option :label="t('saveNow')" value="draft" />
      <mp-menu-option :label="t('saveAndPublish')" value="publish" />
      <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
    </template>
  </mp-split-button>
</template>
