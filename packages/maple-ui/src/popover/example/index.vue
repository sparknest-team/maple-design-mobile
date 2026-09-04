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
  <mp-popover>
    <mp-button status="primary">{{ t('basicUsage') }}</mp-button>
    <template #content>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
    </template>
  </mp-popover>

  <app-type>{{ t('placement') }}</app-type>
  <mp-select v-model="placementValue" :hint="false">
    <mp-option v-for="(item, index) in placementOptions" :key="index" :label="item" />
  </mp-select>
  <div class="placement-container">
    <mp-popover :placement="placementValue">
      <mp-button status="primary">
        <m-icon-star />
      </mp-button>
      <template #content>
        <mp-cell>{{ t('menuOption') }}</mp-cell>
        <mp-cell>{{ t('menuOption') }}</mp-cell>
        <mp-cell>{{ t('menuOption') }}</mp-cell>
      </template>
    </mp-popover>
  </div>

  <app-type>{{ t('offset') }}</app-type>
  <mp-popover offset-x="36px" offset-y="18px">
    <mp-button status="primary">{{ t('offset') }}</mp-button>
    <template #content>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
    </template>
  </mp-popover>

  <app-type>{{ t('sameWidth') }}</app-type>
  <mp-popover same-width>
    <mp-button status="primary">{{ t('sameWidth') }}</mp-button>

    <template #content>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
    </template>
  </mp-popover>

  <app-type>{{ t('trigger') }}</app-type>
  <mp-select v-model="trigger" :hint="false">
    <mp-option label="click" />
    <mp-option label="hover" />
    <mp-option label="contextMenu" />
  </mp-select>
  <mp-popover style="margin-top: 15px" :trigger="trigger">
    <mp-button status="primary">{{ t('trigger') }}</mp-button>

    <template #content>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
    </template>
  </mp-popover>

  <app-type>{{ t('events') }}</app-type>
  <mp-popover
    @open="Message.info('open')"
    @opened="Message.success('opened')"
    @close="Message.warning('close')"
    @closed="Message.error('closed')"
  >
    <mp-button status="primary">{{ t('events') }}</mp-button>

    <template #content>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
    </template>
  </mp-popover>

  <app-type>{{ t('disabled') }}</app-type>
  <mp-popover disabled>
    <mp-button status="primary" disabled>{{ t('disabled') }}</mp-button>

    <template #content>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
      <mp-cell>{{ t('menuOption') }}</mp-cell>
    </template>
  </mp-popover>

  <app-type>{{ t('twoWayBinding') }}</app-type>
  <mp-popover v-model:open="open">
    <mp-button status="primary">{{ t('twoWayBinding') }}</mp-button>

    <template #content>
      <mp-cell @click="closeMenu">{{ t('menuOption') }}</mp-cell>
      <mp-cell @click="closeMenu">{{ t('menuOption') }}</mp-cell>
      <mp-cell @click="closeMenu">{{ t('menuOption') }}</mp-cell>
    </template>
  </mp-popover>

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
