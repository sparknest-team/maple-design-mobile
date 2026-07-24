<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const checked = ref(true)
const visible = ref(true)
const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])

watchLang(use)
onThemeChange()

function removeTag(tag) {
  dynamicTags.value = dynamicTags.value.filter((item) => item !== tag)
}
</script>

<template>
  <app-type>{{ t('themeColorTag') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-tag>{{ t('defaultTag') }}</mp-tag>
    <mp-tag status="primary">{{ t('primaryTag') }}</mp-tag>
    <mp-tag status="info">{{ t('infoTag') }}</mp-tag>
    <mp-tag status="success">{{ t('successTag') }}</mp-tag>
    <mp-tag status="warning">{{ t('warningTag') }}</mp-tag>
    <mp-tag status="danger">{{ t('dangerTag') }}</mp-tag>
    <mp-tag status="secondary">{{ t('secondaryTag') }}</mp-tag>
    <mp-tag status="contrast">{{ t('contrastTag') }}</mp-tag>
  </mp-space>

  <app-type>{{ t('outlineTag') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-tag variant="outline">{{ t('defaultTag') }}</mp-tag>
    <mp-tag variant="outline" status="primary">{{ t('primaryTag') }}</mp-tag>
    <mp-tag variant="outline" status="info">{{ t('infoTag') }}</mp-tag>
    <mp-tag variant="outline" status="success">{{ t('successTag') }}</mp-tag>
    <mp-tag variant="outline" status="warning">{{ t('warningTag') }}</mp-tag>
    <mp-tag variant="outline" status="danger">{{ t('dangerTag') }}</mp-tag>
  </mp-space>

  <app-type>{{ t('roundTag') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-tag round status="primary">{{ t('roundTag') }}</mp-tag>
    <mp-tag round variant="outline" status="success">{{ t('outlineRoundTag') }}</mp-tag>
    <mp-tag round status="danger" closable>{{ t('closableTag') }}</mp-tag>
  </mp-space>

  <app-type>{{ t('tagSize') }}</app-type>
  <mp-space align="center" :size="['2.666vmin', '2.666vmin']">
    <mp-tag size="xs" status="primary">xs</mp-tag>
    <mp-tag size="sm" status="primary">sm</mp-tag>
    <mp-tag size="md" status="primary">md</mp-tag>
    <mp-tag size="lg" status="primary">lg</mp-tag>
    <mp-tag size="xl" status="primary">xl</mp-tag>
  </mp-space>

  <app-type>{{ t('closableTag') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-tag v-model:visible="visible" closable status="primary">{{ t('tagText') }}</mp-tag>
    <mp-tag v-for="tag in dynamicTags" :key="tag" closable round status="info" @close="removeTag(tag)">
      {{ tag }}
    </mp-tag>
  </mp-space>

  <app-type>{{ t('loadingTag') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-tag loading status="primary">{{ t('loadingTag') }}</mp-tag>
    <mp-tag loading status="success">{{ t('loadingTag') }}</mp-tag>
  </mp-space>

  <app-type>{{ t('checkableTag') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-tag v-model:checked="checked" checkable status="primary">{{ t('checkableTag') }}</mp-tag>
    <mp-tag checkable :default-checked="false" status="success">{{ t('checkableTag') }}</mp-tag>
  </mp-space>

  <app-type>{{ t('iconTag') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-tag status="success">
      <template #icon><mp-icon name="check" /></template>
      {{ t('complete') }}
    </mp-tag>
    <mp-tag status="info">
      <template #icon><mp-icon name="information" /></template>
      {{ t('infoTag') }}
    </mp-tag>
  </mp-space>

  <app-type>{{ t('customColorTag') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-tag color="#66bb6a" text-color="#fff">{{ t('customColorTag') }}</mp-tag>
    <mp-tag variant="outline" color="#6750A4">{{ t('outlineCustomColor') }}</mp-tag>
    <mp-tag color="linear-gradient(to right bottom, #6750A4, #D0BCFF)" text-color="#fff">
      {{ t('customColorTag') }}
    </mp-tag>
  </mp-space>
</template>
