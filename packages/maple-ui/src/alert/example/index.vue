<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const options = ['info', 'success', 'warning', 'danger', 'default'].map((value) => ({ label: value, value }))
const show = ref(true)
const showCloseIcon = ref(true)
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
  <mp-space direction="column" size="lg">
    <mp-alert :title="t('alertTitle')" :message="t('alertText')" />
    <mp-alert :title="t('alertTitle')" :message="t('alertText')" type="success" />
    <mp-alert :title="t('alertTitle')" :message="t('alertText')" type="warning" />
    <mp-alert :title="t('alertTitle')" :message="t('alertText')" type="danger" />
    <mp-alert :title="t('alertTitle')" :message="t('alertText')" type="default" />
  </mp-space>

  <app-type>{{ t('variant') }}</app-type>
  <mp-space direction="column" size="lg">
    <mp-select v-model="type" variant="outlined" size="sm" :options="options" />
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
      <m-icon-heart-fill />
    </template>
  </mp-alert>

  <app-type>{{ t('action') }}</app-type>
  <mp-alert :title="t('alertTitle')" :message="t('alertText')">
    <template #action>
      <mp-button size="xs" status="primary">{{ t('detail') }}</mp-button>
    </template>
  </mp-alert>

  <app-type>{{ t('allowToClose') }}</app-type>
  <mp-alert v-if="show" :title="t('alertTitle')" :message="t('alertText')" closable @close="show = false" />

  <app-type>{{ t('customCloseIcon') }}</app-type>
  <mp-alert
    v-if="showCloseIcon"
    :title="t('alertTitle')"
    :message="t('alertText')"
    closable
    @close="showCloseIcon = false"
  >
    <template #close-icon>
      <m-icon-close />
    </template>
  </mp-alert>
</template>
