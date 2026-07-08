<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import MpAlert from '..'
import { t, use } from './locale'

const options = ['info', 'success', 'warning', 'danger', 'default'].map((value) => ({ label: value, value }))
const show = ref(true)
const type = ref('info')

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('title') }}</app-type>
  <mp-alert :title="t('alertTitle')" />

  <app-type>{{ t('message') }}</app-type>
  <mp-alert :message="t('alertText')" />

  <app-type>{{ t('type') }}</app-type>
  <mp-space direction="column" size="large">
    <mp-alert :title="t('alertTitle')" :message="t('alertText')" />
    <mp-alert :title="t('alertTitle')" :message="t('alertText')" type="success" />
    <mp-alert :title="t('alertTitle')" :message="t('alertText')" type="warning" />
    <mp-alert :title="t('alertTitle')" :message="t('alertText')" type="danger" />
    <mp-alert :title="t('alertTitle')" :message="t('alertText')" type="default" />
  </mp-space>

  <app-type>{{ t('variant') }}</app-type>
  <mp-space direction="column" size="large">
    <mp-select v-model="type" variant="outlined" size="small" :options="options" />
    <mp-alert :title="t('alertTitle')" :message="t('alertText')" :type="type" />
    <mp-alert variant="tonal" :title="t('alertTitle')" :message="t('alertText')" :type="type" />
    <mp-alert variant="outlined" :title="t('alertTitle')" :message="t('alertText')" :type="type" />
  </mp-space>

  <app-type>{{ t('center') }}</app-type>
  <mp-alert :message="t('alertText')" center />

  <app-type>{{ t('banner') }}</app-type>
  <mp-alert :message="t('alertText')" banner />

  <app-type>{{ t('showIcon') }}</app-type>
  <mp-alert :title="t('alertTitle')" :message="t('alertText')" :show-icon="false" />

  <app-type>{{ t('customIcon') }}</app-type>
  <mp-alert :title="t('alertTitle')" :message="t('alertText')">
    <template #icon>
      <mp-icon name="heart" />
    </template>
  </mp-alert>

  <app-type>{{ t('allowToClose') }}</app-type>
  <mp-alert v-if="show" :title="t('alertTitle')" :message="t('alertText')" closable @close="show = false" />
</template>
