<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const sizes = ref(['xs', 'sm', 'md', 'lg', 'xl'])

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-empty :description="t('example')" />

  <app-type>{{ t('imageSize') }}</app-type>
  <mp-empty
    v-for="size in sizes"
    :key="size"
    :image-size="size"
    :description="`image-size: ${size}`"
  />

  <app-type>{{ t('extraSlot') }}</app-type>
  <mp-empty :description="t('example')">
    <template #extra>
      <mp-button type="primary" size="sm">{{ t('reload') }}</mp-button>
    </template>
  </mp-empty>
</template>
