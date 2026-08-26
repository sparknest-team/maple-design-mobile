<script setup>
import { reactive, toRefs } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { Message } from '@maplejs/maple-ui'
import { t, use } from './locale'

const values = reactive({
  center: false,
  top: false,
  bottom: false,
  left: false,
  right: false,
  maskClass: false,
  maskStyle: false,
  event: false,
})

const { center, top, bottom, left, right, maskClass, maskStyle, event } = toRefs(values)

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

  <mp-popup v-model:open="center">
    <div class="block">{{ t('text') }}</div>
  </mp-popup>
  <mp-popup v-model:open="bottom" position="bottom">
    <div class="block">{{ t('text') }}</div>
  </mp-popup>
  <mp-popup v-model:open="top" position="top">
    <div class="block">{{ t('text') }}</div>
  </mp-popup>
  <mp-popup v-model:open="left" position="left">
    <div class="block">{{ t('text') }}</div>
  </mp-popup>
  <mp-popup v-model:open="right" position="right">
    <div class="block">{{ t('text') }}</div>
  </mp-popup>

  <app-type>{{ t('maskStyle') }}</app-type>

  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button type="primary" block @click="maskClass = true">{{ t('maskClass') }}</mp-button>
    <mp-button type="primary" block @click="maskStyle = true">{{ t('overlayStyles') }}</mp-button>
  </mp-space>

  <mp-popup v-model:open="maskClass" mask-class="custom-overlay">
    <div class="block">{{ t('text') }}</div>
  </mp-popup>
  <mp-popup
    v-model:open="maskStyle"
    :mask-style="{
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    }"
  >
    <div class="block">{{ t('text') }}</div>
  </mp-popup>

  <app-type>{{ t('event') }}</app-type>
  <mp-button type="primary" block @click="event = true">{{ t('event') }}</mp-button>
  <mp-popup
    v-model:open="event"
    @open="Message.info('open')"
    @opened="Message.success('opened')"
    @close="Message.warning('close')"
    @closed="Message.error('closed')"
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
