<script setup>
import { onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const items = [
  { name: 'Alice', value: '138 0000 0001' },
  { name: 'Bob', value: '138 0000 0002' },
  { name: 'Carol', value: '138 0000 0003' },
]

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-list :data="items" bordered>
    <template #header>{{ t('contacts') }}</template>
    <template #item="{ item, index }">
      <mp-list-item>
        <template #prefix>{{ index + 1 }}</template>
        {{ item.name }}
        <template #suffix>{{ item.value }}</template>
      </mp-list-item>
    </template>
    <template #footer>{{ items.length }} {{ t('items') }}</template>
  </mp-list>

  <app-type>{{ t('manualUsage') }}</app-type>
  <mp-list size="lg">
    <mp-list-item v-for="item in items" :key="item.name">{{ item.name }}</mp-list-item>
  </mp-list>

  <app-type>{{ t('states') }}</app-type>
  <mp-list :data="[]" loading />
  <mp-list :data="[]" style="margin-top: 12px">
    <template #empty>{{ t('empty') }}</template>
  </mp-list>
</template>
