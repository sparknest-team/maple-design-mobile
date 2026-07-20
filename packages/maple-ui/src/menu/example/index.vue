<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { Message } from '@maplejs/maple-ui'
import { t, use } from './locale/index'

const show = ref(false)
const trigger = ref('click')
const placementValue = ref('cover-top-start')
const placementOptions = ref([
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'right',
  'right-start',
  'right-end',
  'left',
  'left-start',
  'left-end',
  'cover-top',
  'cover-top-start',
  'cover-top-end',
  'cover-bottom',
  'cover-bottom-start',
  'cover-bottom-end',
  'cover-left',
  'cover-right',
])

watchLang(use)
onThemeChange()

function closeMenu() {
  show.value = false
}
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-menu>
    <mp-button type="primary">{{ t('basicUsage') }}</mp-button>
    <template #menu>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
    </template>
  </mp-menu>

  <app-type>{{ t('placement') }}</app-type>
  <mp-select v-model="placementValue" :hint="false">
    <mp-option v-for="(item, index) in placementOptions" :key="index" :label="item" />
  </mp-select>
  <div class="placement-container">
    <mp-menu :placement="placementValue">
      <mp-button type="primary">
        <mp-icon name="star" />
      </mp-button>
      <template #menu>
        <mp-cell>{{ t('menuOption') }}</mp-cell>
        <mp-cell>{{ t('menuOption') }}</mp-cell>
        <mp-cell>{{ t('menuOption') }}</mp-cell>
      </template>
    </mp-menu>
  </div>

  <app-type>{{ t('offset') }}</app-type>
  <mp-menu offset-x="36px" offset-y="18px">
    <mp-button type="primary">{{ t('offset') }}</mp-button>
    <template #menu>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
    </template>
  </mp-menu>

  <app-type>{{ t('sameWidth') }}</app-type>
  <mp-menu same-width>
    <mp-button type="primary">{{ t('sameWidth') }}</mp-button>

    <template #menu>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
    </template>
  </mp-menu>

  <app-type>{{ t('trigger') }}</app-type>
  <mp-select v-model="trigger" :hint="false">
    <mp-option label="click" />
    <mp-option label="hover" />
  </mp-select>
  <mp-menu style="margin-top: 15px" :trigger="trigger">
    <mp-button type="primary">{{ t('trigger') }}</mp-button>

    <template #menu>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
    </template>
  </mp-menu>

  <app-type>{{ t('events') }}</app-type>
  <mp-menu
    @open="Message.info('open')"
    @opened="Message.success('opened')"
    @close="Message.warning('close')"
    @closed="Message.error('closed')"
  >
    <mp-button type="primary">{{ t('events') }}</mp-button>

    <template #menu>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
    </template>
  </mp-menu>

  <app-type>{{ t('disabled') }}</app-type>
  <mp-menu disabled>
    <mp-button type="primary" disabled>{{ t('disabled') }}</mp-button>

    <template #menu>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
    </template>
  </mp-menu>

  <app-type>{{ t('twoWayBinding') }}</app-type>
  <mp-menu v-model:show="show">
    <mp-button type="primary">{{ t('twoWayBinding') }}</mp-button>

    <template #menu>
      <mp-cell @click="closeMenu">{{ t('menuOption') }}</mp-cell>
      <mp-cell @click="closeMenu">{{ t('menuOption') }}</mp-cell>
      <mp-cell @click="closeMenu">{{ t('menuOption') }}</mp-cell>
    </template>
  </mp-menu>

  <div style="margin-bottom: 100px"></div>
</template>

<style scoped lang="less">
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
