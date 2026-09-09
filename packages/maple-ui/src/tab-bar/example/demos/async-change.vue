<script setup>
import { ref } from 'vue'
import { TabBar as MpTabBar, TabBarItem as MpTabBarItem } from '../..'
import { t } from '../locale'

const active = ref(0)
async function beforeChange(value) {
  if (value === 3) {
    return false
  }
  if (value === 4) {
    throw new Error('Demo: rejected selection')
  }
  await new Promise((resolve) => setTimeout(resolve, value === 1 ? 1200 : 250))
  return true
}
</script>
<template>
  <p>{{ t('asyncHelp') }}</p>
  <mp-tab-bar v-model:active="active" :before-change="beforeChange">
    <mp-tab-bar-item :label="t('home')" />
    <mp-tab-bar-item :label="t('slow')" />
    <mp-tab-bar-item :label="t('fast')" />
    <mp-tab-bar-item :label="t('denied')" />
    <mp-tab-bar-item :label="t('rejected')" />
  </mp-tab-bar>
  <p aria-live="polite">{{ t('current') }}: {{ active }}</p>
</template>
