<script setup>
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-pagination :current="1" :total="50" />

  <app-type>{{ t('morePages') }}</app-type>
  <mp-pagination :simple="false" :current="5" :total="200" />

  <app-type>{{ t('showPageSize') }}</app-type>
  <mp-pagination :simple="false" :current="1" :total="50" show-page-size />

  <app-type>{{ t('showJumper') }}</app-type>
  <mp-pagination :simple="false" :current="1" :total="50" show-jumper />

  <app-type>{{ t('simple') }}</app-type>
  <mp-pagination :current="1" :total="50" />

  <app-type>{{ t('showTotal') }}</app-type>
  <mp-pagination :current="1" :total="50" show-total>
    <template #total="{ total }">{{ t('total') }} {{ total }} {{ t('item') }}</template>
  </mp-pagination>

  <app-type>{{ t('disabled') }}</app-type>
  <mp-pagination :current="1" :total="50" disabled />

  <app-type>{{ t('all') }}</app-type>
  <mp-pagination :simple="false" :current="1" :total="50" show-total show-jumper show-page-size />

  <app-type>{{ t('customButton') }}</app-type>
  <mp-pagination :simple="false" :current="1" :total="50">
    <template #page-item-step="{ type }">
      {{ type === 'previous' ? t('prev') : t('next') }}
    </template>
  </mp-pagination>
</template>
