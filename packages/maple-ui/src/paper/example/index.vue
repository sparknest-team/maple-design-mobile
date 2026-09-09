<script setup>
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-paper :elevation="2" width="25vmin" height="25vmin" />

  <app-type>{{ t('bordered') }}</app-type>
  <mp-space wrap>
    <mp-paper bordered width="25vmin" height="25vmin" />
    <mp-paper bordered :elevation="2" width="25vmin" height="25vmin" />
  </mp-space>

  <app-type>{{ t('ripple') }}</app-type>
  <mp-paper :elevation="2" ripple width="25vmin" height="25vmin" />

  <app-type>{{ t('round') }}</app-type>
  <mp-paper :elevation="2" width="25vmin" height="25vmin" round />

  <app-type>{{ t('radius') }}</app-type>
  <mp-paper :elevation="2" :radius="8" width="25vmin" height="25vmin" />

  <app-type>{{ t('slot') }}</app-type>
  <mp-paper :elevation="2">
    <mp-cell>{{ t('paper') }}</mp-cell>
    <mp-cell>{{ t('paper') }}</mp-cell>
    <mp-cell>{{ t('paper') }}</mp-cell>
  </mp-paper>
</template>
