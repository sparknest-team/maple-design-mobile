<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { LoadingBar } from '@maplejs/maple-ui'
import { t, use } from './locale'

const hasCustomStyle = ref(false)

onThemeChange()
watchLang(use)

LoadingBar.setDefaultOptions({
  top: '54px',
})

function setStyle() {
  if (hasCustomStyle.value) {
    LoadingBar.resetDefaultOptions()
  } else {
    LoadingBar.setDefaultOptions({
      errorColor: '#ff8800',
      color: '#10afef',
      height: '5px',
    })
  }

  hasCustomStyle.value = !hasCustomStyle.value
}
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button type="primary" block @click="LoadingBar.start()">{{ t('start') }}</mp-button>
    <mp-button type="primary" block @click="LoadingBar.finish()">{{ t('finish') }}</mp-button>
    <mp-button type="primary" block @click="LoadingBar.error()">{{ t('error') }}</mp-button>
    <mp-button type="primary" block @click="setStyle">{{ hasCustomStyle ? t('clear') : t('custom') }}</mp-button>
  </mp-space>
</template>
