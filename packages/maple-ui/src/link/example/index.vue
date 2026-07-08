<script setup>
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('themeColorLink') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-link>{{ t('defaultLink') }}</mp-link>
    <mp-link type="primary">{{ t('primaryLink') }}</mp-link>
    <mp-link type="info">{{ t('infoLink') }}</mp-link>
    <mp-link type="success">{{ t('successLink') }}</mp-link>
    <mp-link type="warning">{{ t('warningLink') }}</mp-link>
    <mp-link type="danger">{{ t('dangerLink') }}</mp-link>
  </mp-space>

  <app-type>{{ t('mode') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-link type="primary" :href="t('hrefLink')" target="_blank">{{ t('withHref') }}</mp-link>
    <mp-link type="primary" :to="t('toLink')">{{ t('withRouterLink') }}</mp-link>
  </mp-space>

  <app-type>{{ t('underline') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-link type="primary">{{ t('useUnderlineAlways') }}</mp-link>
    <mp-link type="primary" underline="hover">{{ t('useUnderlineHove') }}</mp-link>
    <mp-link type="primary" underline="none">{{ t('notUseUnderline') }}</mp-link>
  </mp-space>

  <app-type>{{ t('disabledStatus') }}</app-type>
  <mp-link disabled>{{ t('disabledStatus') }}</mp-link>

  <app-type>{{ t('customColor') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-link text-color="#009688">{{ t('linkText') }}</mp-link>
    <mp-link text-color="#ab47bc">{{ t('linkText') }}</mp-link>
  </mp-space>

  <app-type>{{ t('slots') }}</app-type>
  <mp-link :href="t('hrefLink')" target="_blank" underline="none">
    <mp-button type="primary">{{ t('buttonText') }}</mp-button>
  </mp-link>
</template>
