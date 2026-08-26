<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const items = ref([
  {
    name: 'Vue2',
    icon: 'star',
    enabled: false,
  },
  {
    name: 'Vue3',
    icon: 'heart',
    enabled: false,
  },
  {
    name: 'React',
    icon: 'close-circle',
    enabled: false,
  },
])

const handleClick = (item) => {
  item.enabled = !item.enabled
}

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-cell> {{ t('content') }} </mp-cell>
  <mp-cell> {{ t('content') }} </mp-cell>

  <app-type>{{ t('showIcon') }}</app-type>
  <mp-cell icon="fire" :title="t('content')">
    <template #extra>
      <m-icon-information />
    </template>
  </mp-cell>
  <mp-cell icon="fire" :title="t('content')">
    <template #extra>
      <m-icon-information />
    </template>
  </mp-cell>

  <app-type>{{ t('showDesc') }}</app-type>
  <mp-cell icon="fire" :title="t('content')" :description="t('description')">
    <template #extra>
      <m-icon-information />
    </template>
  </mp-cell>
  <mp-cell :title="t('content')" :description="t('description')" />

  <app-type>{{ t('showBorder') }}</app-type>
  <mp-cell border> {{ t('content') }} </mp-cell>
  <mp-cell border> {{ t('content') }} </mp-cell>

  <app-type>{{ t('list') }}</app-type>
  <mp-paper :elevation="2">
    <mp-cell
      v-for="(item, index) in items"
      :key="item.name"
      ripple
      :icon="item.icon"
      :border="index !== items.length - 1"
      :border-offset="0"
      @click="handleClick(item)"
    >
      {{ item.name }}

      <template #extra>
        <mp-switch v-model="item.enabled" @click.stop />
      </template>
    </mp-cell>
  </mp-paper>
</template>
