<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const loading = ref(true)
const fullscreenLoading = ref(false)

watchLang(use)
onThemeChange()

function fullscreen() {
  fullscreenLoading.value = true

  setTimeout(() => {
    fullscreenLoading.value = false
  }, 2000)
}
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-skeleton :loading="loading">{{ t('loadingData') }}</mp-skeleton>

  <app-type>{{ t('displayTitle') }}</app-type>
  <mp-skeleton title :loading="loading">{{ t('loadingData') }}</mp-skeleton>

  <app-type>{{ t('customRowsWidth') }}</app-type>
  <mp-skeleton title :rows="3" :loading="loading" :rows-width="['200px', '100px', '50px']">
    {{ t('loadingData') }}
  </mp-skeleton>

  <app-type>{{ t('displayAvatar') }}</app-type>
  <mp-skeleton title avatar :rows="3" :loading="loading">
    {{ t('loadingData') }}
  </mp-skeleton>

  <app-type>{{ t('displayCard') }}</app-type>
  <mp-skeleton title avatar card :rows="3" :loading="loading">
    {{ t('loadingData') }}
  </mp-skeleton>

  <app-type>{{ t('fullscreenMode') }}</app-type>
  <mp-button status="danger" class="button" @click="fullscreen">
    {{ t('toggleFullscreenMode') }}
  </mp-button>
  <mp-skeleton fullscreen :loading="fullscreenLoading" />
</template>
