<script setup>
import { ref } from 'vue'
import { TabBar as MpTabBar, TabBarItem as MpTabBarItem } from '../..'
import MpButton from '../../../button'
import { t } from '../locale'

const active = ref(0)
const reversed = ref(false)
</script>
<template>
  <p>{{ t('numericHelp') }}</p>
  <mp-button @click="reversed = !reversed">{{ t('reorder') }}</mp-button>
  <mp-tab-bar v-model:active="active">
    <mp-tab-bar-item v-for="id in reversed ? [20, 10, 0] : [0, 10, 20]" :key="id" :name="id" :label="String(id)" />
  </mp-tab-bar>
  <p aria-live="polite">{{ t('current') }}: {{ active }}</p>
</template>
