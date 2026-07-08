<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const expand = ref(true)

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-switch v-model="expand" />
  <mp-divider />
  <mp-collapse-transition :expand="expand">
    {{ t('textContent') }}
  </mp-collapse-transition>
</template>
