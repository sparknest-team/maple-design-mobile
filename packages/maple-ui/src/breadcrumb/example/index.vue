<script setup>
import { computed } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { Message } from '@maplejs/maple-ui'
import { t, use } from './locale'

watchLang(use)
onThemeChange()

const routes = computed(() => [
  { path: '/', label: t('level1') },
  { path: '/channel', label: t('channel') },
  { path: '/news', label: t('news') },
])
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-breadcrumb>
    <mp-breadcrumb-item>{{ t('level1') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('level2') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('level3') }}</mp-breadcrumb-item>
  </mp-breadcrumb>

  <app-type>{{ t('separator') }}</app-type>
  <mp-breadcrumb separator="\">
    <mp-breadcrumb-item>{{ t('level1') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('level2') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('level3') }}</mp-breadcrumb-item>
  </mp-breadcrumb>

  <app-type>{{ t('childSeparator') }}</app-type>
  <mp-breadcrumb>
    <mp-breadcrumb-item>{{ t('level1') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item separator="~">{{ t('level2') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('level3') }}</mp-breadcrumb-item>
  </mp-breadcrumb>

  <app-type>{{ t('separatorSlot') }}</app-type>
  <mp-breadcrumb>
    <template #separator>
      <mp-icon name="menu-right" style="margin: 1px 4px 0" />
    </template>
    <mp-breadcrumb-item>{{ t('level1') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('level2') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('level3') }}</mp-breadcrumb-item>
  </mp-breadcrumb>

  <app-type>{{ t('routesMode') }}</app-type>
  <mp-space direction="column" :size="['2.666vmin', '2.666vmin']">
    <mp-breadcrumb :routes="routes" />
    <mp-breadcrumb :routes="routes">
      <template #item-render="{ route, paths }">
        <a :href="'#/' + paths.join('/')">{{ route.label }}</a>
      </template>
    </mp-breadcrumb>
  </mp-space>

  <app-type>{{ t('maxCount') }}</app-type>
  <mp-breadcrumb :max-count="3">
    <mp-breadcrumb-item>{{ t('level1') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('subHome') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('allChannel') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('channel') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('news') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('post') }}</mp-breadcrumb-item>
  </mp-breadcrumb>

  <app-type>{{ t('clickEvent') }}</app-type>
  <mp-breadcrumb>
    <mp-breadcrumb-item href="#/home" @click="Message(t('level1'))">
      {{ t('level1') }}
    </mp-breadcrumb-item>
    <mp-breadcrumb-item href="#/list" @click="Message(t('level2'))">
      {{ t('level2') }}
    </mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('level3') }}</mp-breadcrumb-item>
  </mp-breadcrumb>
</template>
