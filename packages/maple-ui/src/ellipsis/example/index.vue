<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const expand = ref(false)

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('line') }}</app-type>
  <mp-ellipsis style="max-width: 50vmin">{{ t('text') }}</mp-ellipsis>

  <app-type>{{ t('multipleLine') }}</app-type>
  <mp-ellipsis style="max-width: 50vmin" :line-clamp="3">{{ t('text') }}</mp-ellipsis>

  <app-type>{{ t('twoWayBinding') }}</app-type>
  <mp-space direction="column" size="lg">
    <mp-button status="primary" @click="expand = !expand">{{ t('toggle') }}</mp-button>
    <mp-ellipsis v-model:expand="expand" style="max-width: 50vmin">{{ t('text') }}</mp-ellipsis>
  </mp-space>

  <app-type>{{ t('expand') }}</app-type>
  <mp-ellipsis style="max-width: 50vmin" :line-clamp="3" expand-trigger="click" :tooltip="false">{{
    t('text')
  }}</mp-ellipsis>

  <app-type>{{ t('tooltip') }}</app-type>
  <mp-ellipsis style="max-width: 50vmin" :tooltip="{ type: 'primary', autoFitPopupWidth: false }">
    {{ t('text') }}

    <template #tooltip-content>
      <m-icon-github />
    </template>
  </mp-ellipsis>
</template>
