<script setup lang="ts">
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'
import { t } from './locale'

const lastAction = ref('')
const handleSelect = (value: unknown, option: { label?: unknown }) => {
  lastAction.value = String(value)
  Message.info(String(option.label))
}
</script>

<template>
  <mp-space direction="column" align="flex-start">
    <mp-split-button
      status="primary"
      placement="bottom-start"
      :offset-y="8"
      :popup-max-height="160"
      :hide-on-select="false"
      @click="lastAction = 'publish'"
      @select="handleSelect"
    >
      {{ t('choose') }}
      <template #content>
        <mp-menu-option :label="t('saveNow')" value="draft" />
        <mp-menu-option :label="t('saveAndPublish')" value="publish" />
        <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
      </template>
    </mp-split-button>
    <span aria-live="polite">{{ t('lastAction') }}: {{ lastAction || t('none') }}</span>
    <span>{{ t('popupHint') }}</span>
  </mp-space>
</template>
