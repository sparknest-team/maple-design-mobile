<script setup>
import { ref } from 'vue'
import { t } from '../locale'

const active = ref('home')
</script>
<template>
  <p>{{ t('customLabelHelp') }}</p>
  <mp-tab-bar v-model:active="active">
    <mp-tab-bar-item v-for="name in ['home', 'favorites', 'profile']" :key="name" :name="name">
      <template #default="{ active: selected }">
        <span :style="{ fontWeight: selected ? 700 : 400 }">{{ selected ? '● ' : '' }}{{ t(name) }}</span>
      </template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
