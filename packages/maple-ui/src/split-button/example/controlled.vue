<script setup lang="ts">
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'
import { t } from './locale'

const publish = () => {
  Message.info(t('published'))
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
const open = ref(false)
</script>

<template>
  <mp-space direction="column" align="flex-start">
    <mp-space wrap>
      <mp-button @click.stop="open = true">{{ t('openMenu') }}</mp-button>
      <mp-button @click.stop="open = false">{{ t('closeMenu') }}</mp-button>
    </mp-space>
    <mp-split-button v-model:open="open" status="primary" @click="publish" @select="handleSelect">
      {{ t('publish') }}

      <template #content>
        <mp-menu-option :label="t('saveNow')" value="draft" />
        <mp-menu-option :label="t('saveAndPublish')" value="publish" />
        <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
      </template>
    </mp-split-button>
    <span aria-live="polite">{{ open ? t('opened') : t('closed') }}</span>
  </mp-space>
</template>
