<script setup>
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl']

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-empty :description="t('example')" />

  <app-type>{{ t('customImage') }}</app-type>
  <mp-space direction="column" :size="24">
    <mp-empty>
      <template #image>
        <m-icon-alert-circle />
      </template>
      {{ t('customCopy') }}
    </mp-empty>
    <mp-empty image-url="cat.jpg" :alt="t('customImageAlt')" :description="t('customImage')" />
  </mp-space>

  <app-type>{{ t('imageSize') }}</app-type>
  <mp-space direction="column" :size="16">
    <mp-empty v-for="size in sizes" :key="size" :image-size="size" :description="`image-size: ${size}`" />
  </mp-space>

  <app-type>{{ t('extraSlot') }}</app-type>
  <mp-empty :description="t('reloadCopy')">
    <template #extra>
      <mp-button status="primary" size="sm">{{ t('reload') }}</mp-button>
    </template>
  </mp-empty>

  <app-type>{{ t('show') }}</app-type>
  <mp-space direction="column" :size="16">
    <mp-empty :description="t('hideIcon')" :show-icon="false" />
    <mp-empty :description="t('hideDescription')" :show-description="false" />
  </mp-space>
</template>
