<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const show = ref(true)
const show1 = ref(true)

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('chipType') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-chip>{{ t('defaultChip') }}</mp-chip>
    <mp-chip type="primary">{{ t('primaryChip') }}</mp-chip>
    <mp-chip type="success">{{ t('successChip') }}</mp-chip>
    <mp-chip type="danger">{{ t('dangerChip') }}</mp-chip>
    <mp-chip type="warning">{{ t('warningChip') }}</mp-chip>
    <mp-chip type="info">{{ t('infoChip') }}</mp-chip>
  </mp-space>

  <app-type>{{ t('plainChip') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-chip plain>{{ t('defaultChip') }}</mp-chip>
    <mp-chip plain type="primary">{{ t('primaryChip') }}</mp-chip>
    <mp-chip plain type="success">{{ t('successChip') }}</mp-chip>
    <mp-chip plain type="danger">{{ t('dangerChip') }}</mp-chip>
    <mp-chip plain type="warning">{{ t('warningChip') }}</mp-chip>
    <mp-chip plain type="info">{{ t('infoChip') }}</mp-chip>
  </mp-space>

  <app-type>{{ t('nonRoundChip') }}</app-type>
  <mp-chip :round="false" type="primary">{{ t('nonRoundChip') }}</mp-chip>

  <app-type>{{ t('chipSize') }}</app-type>
  <mp-space align="center" :size="['2.666vmin', '2.666vmin']">
    <mp-chip type="primary">{{ t('normalChip') }}</mp-chip>
    <mp-chip type="success" size="small">{{ t('smallChip') }}</mp-chip>
    <mp-chip type="warning" size="mini">{{ t('miniChip') }}</mp-chip>
    <mp-chip type="danger" size="large">{{ t('largeChip') }}</mp-chip>
  </mp-space>

  <app-type>{{ t('blockChip') }}</app-type>
  <mp-chip type="primary" block>{{ t('blockChip') }}</mp-chip>

  <app-type>{{ t('canCloseChip') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-chip v-if="show" closeable @close="show = false">{{ t('canCloseChip') }}</mp-chip>
    <mp-chip v-if="show1" closeable icon-name="delete" @close="show1 = false"> {{ t('customCloseIcon') }}</mp-chip>
  </mp-space>

  <app-type>{{ t('customColor') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-chip color="#009688" text-color="#fff">{{ t('chip') }}</mp-chip>
    <mp-chip color="#009688" plain>{{ t('chip') }}</mp-chip>
    <mp-chip color="#faecd8" text-color="#e6a23c" plain>{{ t('chip') }}</mp-chip>
    <mp-chip color="#faecd8" text-color="#e6a23c">{{ t('chip') }}</mp-chip>
  </mp-space>

  <app-type>{{ t('addSlot') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-chip>
      {{ t('leftSlot') }}

      <template #left>
        <mp-icon name="star"></mp-icon>
      </template>
    </mp-chip>
    <mp-chip>
      {{ t('rightSlot') }}

      <template #right>
        <mp-icon name="fire"></mp-icon>
      </template>
    </mp-chip>
    <mp-chip>
      {{ t('leftAndRightSlot') }}

      <template #left>
        <mp-icon name="account-circle"></mp-icon>
      </template>

      <template #right>
        <mp-icon name="cake-variant"></mp-icon>
      </template>
    </mp-chip>
  </mp-space>
</template>
