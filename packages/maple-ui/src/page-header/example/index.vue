<script setup>
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { Message } from '@maplejs/maple-ui'
import { t, use } from './locale'

watchLang(use)
onThemeChange()

const handleBack = () => Message.info(t('back'))
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-page-header show-back :title="t('title')" :subtitle="t('details')" @back="handleBack" />

  <app-type>{{ t('complete') }}</app-type>
  <mp-page-header show-back @back="handleBack">
    <template #header>
      <mp-breadcrumb>
        <mp-breadcrumb-item>{{ t('home-fill') }}</mp-breadcrumb-item>
        <mp-breadcrumb-item>{{ t('details') }}</mp-breadcrumb-item>
      </mp-breadcrumb>
    </template>
    <template #avatar><mp-avatar>M</mp-avatar></template>
    <template #title>{{ t('title') }}</template>
    <template #subtitle>{{ t('details') }}</template>
    <template #extra
      ><mp-button variant="text">{{ t('action') }}</mp-button></template
    >
    {{ t('content') }}
    <template #footer>{{ t('footer') }}</template>
  </mp-page-header>
</template>
