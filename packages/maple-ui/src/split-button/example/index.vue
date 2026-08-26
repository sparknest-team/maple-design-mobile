<script setup>
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { Message } from '@maplejs/maple-ui'
import { t, use } from './locale'

watchLang(use)
onThemeChange()

const publish = () => Message(t('publish'))
const handleSelect = (_value, option) => Message(String(option.label))
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-split-button status="primary" placement="bottom-end" @click="publish" @select="handleSelect">
    {{ t('publish') }}
    <template #content>
      <mp-menu-option :label="t('saveNow')" />
      <mp-menu-option :label="t('saveAndPublish')" />
    </template>
  </mp-split-button>

  <app-type>{{ t('disabled') }}</app-type>
  <mp-split-button disabled status="primary" placement="bottom-end">
    {{ t('disabled') }}
    <template #content>
      <mp-menu-option :label="t('saveNow')" />
      <mp-menu-option :label="t('saveAndPublish')" />
    </template>
  </mp-split-button>

  <app-type>{{ t('customIcon') }}</app-type>
  <mp-split-button status="primary" placement="bottom-end" @click="publish" @select="handleSelect">
    {{ t('publish') }}
    <template #icon="{ open }">
      <m-icon-menu-down :style="{ transform: open ? 'rotate(180deg)' : undefined }" />
    </template>
    <template #content>
      <mp-menu-option :label="t('saveNow')" />
      <mp-menu-option :label="t('saveAndPublish')" />
    </template>
  </mp-split-button>
</template>
