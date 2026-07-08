<script setup>
import { reactive, toRefs } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { Snackbar } from '@maplejs/maple-ui'
import { t, use } from './locale'

const values = reactive({
  center: false,
  top: false,
  bottom: false,
  left: false,
  right: false,
  overlayClass: false,
  overlayStyle: false,
  event: false,
})

const { center, top, bottom, left, right, overlayClass, overlayStyle, event } = toRefs(values)

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('popupPosition') }}</app-type>
  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button type="primary" block @click="center = true">{{ t('centerPopup') }}</mp-button>
    <mp-button type="primary" block @click="bottom = true">{{ t('belowPopup') }}</mp-button>
    <mp-button type="primary" block @click="top = true">{{ t('abovePopup') }}</mp-button>
    <mp-button type="primary" block @click="left = true">{{ t('leftPopup') }}</mp-button>
    <mp-button type="primary" block @click="right = true">{{ t('rightPopup') }}</mp-button>
  </mp-space>

  <mp-popup v-model:show="center">
    <div class="block">{{ t('text') }}</div>
  </mp-popup>
  <mp-popup v-model:show="bottom" position="bottom">
    <div class="block">{{ t('text') }}</div>
  </mp-popup>
  <mp-popup v-model:show="top" position="top">
    <div class="block">{{ t('text') }}</div>
  </mp-popup>
  <mp-popup v-model:show="left" position="left">
    <div class="block">{{ t('text') }}</div>
  </mp-popup>
  <mp-popup v-model:show="right" position="right">
    <div class="block">{{ t('text') }}</div>
  </mp-popup>

  <app-type>{{ t('overlayStyle') }}</app-type>

  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button type="primary" block @click="overlayClass = true">{{ t('overlayClass') }}</mp-button>
    <mp-button type="primary" block @click="overlayStyle = true">{{ t('overlayStyles') }}</mp-button>
  </mp-space>

  <mp-popup v-model:show="overlayClass" overlay-class="custom-overlay">
    <div class="block">{{ t('text') }}</div>
  </mp-popup>
  <mp-popup
    v-model:show="overlayStyle"
    :overlay-style="{
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    }"
  >
    <div class="block">{{ t('text') }}</div>
  </mp-popup>

  <app-type>{{ t('event') }}</app-type>
  <mp-button type="primary" block @click="event = true">{{ t('event') }}</mp-button>
  <mp-popup
    v-model:show="event"
    @open="Snackbar.info('open')"
    @opened="Snackbar.success('opened')"
    @close="Snackbar.warning('close')"
    @closed="Snackbar.error('closed')"
  >
    <div class="block">{{ t('text') }}</div>
  </mp-popup>
</template>

<style>
.custom-overlay {
  background: rgba(0, 0, 0, 0.3);
}
</style>

<style scoped lang="less">
.block {
  padding: 24px;
  width: 280px;
}
</style>
