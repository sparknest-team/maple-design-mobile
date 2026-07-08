<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const loading = ref(false)

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('type') }}</app-type>
  <mp-space align="center" justify="space-between">
    <mp-loading />
    <mp-loading type="cube" />
    <mp-loading type="wave" />
    <mp-loading type="rect" />
    <mp-loading type="disappear" />
  </mp-space>

  <app-type>{{ t('color') }}</app-type>
  <mp-space align="center" justify="space-between">
    <mp-loading color="var(--mp-color-info)" />
    <mp-loading type="cube" color="var(--mp-color-success)" />
    <mp-loading type="wave" color="var(--mp-color-warning)" />
    <mp-loading type="rect" color="var(--mp-color-danger)" />
    <mp-loading type="disappear" color="var(--mp-color-text-disabled)" />
  </mp-space>

  <app-type>{{ t('size') }}</app-type>
  <mp-space align="center" justify="space-between">
    <mp-loading size="small" />
    <mp-loading type="cube" size="small" />
    <mp-loading type="wave" size="small" />
    <mp-loading type="rect" size="small" />
    <mp-loading type="disappear" size="small" />
  </mp-space>

  <app-type>{{ t('wrap') }}</app-type>
  <mp-button style="margin-bottom: 8px" @click="loading = !loading">
    {{ loading ? t('close') : t('open') }}
  </mp-button>
  <mp-loading description="LOADING" :loading="loading">
    <mp-card :title="t('cardTitle')" :description="t('cardDesc')" />
  </mp-loading>
</template>

<style>
.loading-demo .mp-space {
  padding: 8px 0;
}
</style>
