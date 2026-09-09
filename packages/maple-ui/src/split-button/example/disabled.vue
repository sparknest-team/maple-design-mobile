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
  <mp-space wrap>
    <mp-split-button
      disabled
      status="primary"
      :button-props="{ disabled: false }"
      :trigger-button-props="{ disabled: false }"
      @click="publish"
      @select="handleSelect"
    >
      {{ t('allDisabled') }}

      <template #content>
        <mp-menu-option :label="t('saveNow')" value="draft" />
        <mp-menu-option :label="t('saveAndPublish')" value="publish" />
        <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
      </template>
    </mp-split-button>
    <mp-split-button status="primary" :button-props="{ disabled: true }" @click="publish" @select="handleSelect">
      {{ t('mainDisabled') }}

      <template #content>
        <mp-menu-option :label="t('saveNow')" value="draft" />
        <mp-menu-option :label="t('saveAndPublish')" value="publish" />
        <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
      </template>
    </mp-split-button>
    <mp-split-button
      status="primary"
      :trigger-button-props="{ disabled: true }"
      @click="publish"
      @select="handleSelect"
    >
      {{ t('triggerDisabled') }}

      <template #content>
        <mp-menu-option :label="t('saveNow')" value="draft" />
        <mp-menu-option :label="t('saveAndPublish')" value="publish" />
        <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
      </template>
    </mp-split-button>
  </mp-space>
</template>
