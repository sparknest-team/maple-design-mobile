<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const loading = ref(false)
const handleClick = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 3000)
}

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basic') }}</app-type>
  <mp-link>{{ t('defaultLink') }}</mp-link>

  <app-type>{{ t('semanticStatus') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-link>{{ t('defaultLink') }}</mp-link>
    <mp-link status="primary">{{ t('primaryLink') }}</mp-link>
    <mp-link status="secondary">{{ t('secondaryLink') }}</mp-link>
    <mp-link status="tertiary">{{ t('tertiaryLink') }}</mp-link>
    <mp-link status="info">{{ t('infoLink') }}</mp-link>
    <mp-link status="success">{{ t('successLink') }}</mp-link>
    <mp-link status="warning">{{ t('warningLink') }}</mp-link>
    <mp-link status="danger">{{ t('dangerLink') }}</mp-link>
  </mp-space>

  <app-type>{{ t('mode') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-link status="primary" :href="t('hrefLink')" target="_blank" rel="noopener noreferrer">
      {{ t('withHref') }}
    </mp-link>
  </mp-space>

  <app-type>{{ t('underline') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-link status="primary" underline="always">{{ t('useUnderlineAlways') }}</mp-link>
    <mp-link status="primary" underline="hover">{{ t('useUnderlineHove') }}</mp-link>
    <mp-link status="primary" underline="none">{{ t('notUseUnderline') }}</mp-link>
  </mp-space>

  <app-type>{{ t('hoverable') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-link hoverable href="#link">{{ t('hoverable') }}</mp-link>
    <mp-link href="#link">{{ t('keyboardFocus') }}</mp-link>
  </mp-space>

  <app-type>{{ t('disabledStatus') }}</app-type>
  <mp-link disabled>{{ t('disabledStatus') }}</mp-link>

  <app-type>{{ t('icon') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-link icon>{{ t('defaultIcon') }}</mp-link>
    <mp-link>
      <template #icon><m-icon-github /></template>
      {{ t('customIcon') }}
    </mp-link>
  </mp-space>

  <app-type>{{ t('loading') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-link loading>{{ t('loading') }}</mp-link>
    <mp-link :loading="loading" @click="handleClick">{{ t('clickToLoad') }}</mp-link>
  </mp-space>
</template>
