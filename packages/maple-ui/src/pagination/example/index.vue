<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const size = ref('md')

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-pagination :total="50" />

  <app-type>{{ t('morePages') }}</app-type>
  <mp-pagination :total="200" />

  <app-type>{{ t('showPageSize') }}</app-type>
  <mp-pagination :total="200" show-page-size />

  <app-type>{{ t('showJumper') }}</app-type>
  <mp-pagination :total="50" show-jumper />

  <app-type>{{ t('size') }}</app-type>
  <mp-space direction="column" :size="12">
    <mp-space :size="8">
      <mp-button v-for="item in ['xs', 'sm', 'md', 'lg', 'xl']" :key="item" @click="size = item">
        {{ item }}
      </mp-button>
    </mp-space>
    <mp-pagination :total="50" :size="size" show-total show-jumper show-page-size />
  </mp-space>

  <app-type>{{ t('simple') }}</app-type>
  <mp-pagination :total="200" simple />

  <app-type>{{ t('showTotal') }}</app-type>
  <mp-pagination :total="200" show-total />

  <app-type>{{ t('all') }}</app-type>
  <mp-pagination :total="50" show-total show-jumper show-page-size />

  <app-type>{{ t('customButton') }}</app-type>
  <mp-pagination :total="200">
    <template #page-item="{ page }"> - {{ page }} - </template>
    <template #page-item-step="{ type }">
      {{ type === 'previous' ? t('prev') : t('next') }}
    </template>
    <template #page-item-ellipsis> ✦ </template>
  </mp-pagination>
</template>
