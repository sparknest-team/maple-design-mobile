<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const menuValue = ref([])
const menuValue2 = ref('')
const multipleValue = ref([])
const pickerValue = ref([])
const pickerMultipleValue = ref([])
const listValue = ref([])
const listMultipleValue = ref([])

const options = computed(() => [
  {
    label: t('zhejiang'),
    value: 'zhejiang',
    children: [
      {
        label: t('hangzhou'),
        value: 'hangzhou',
        children: [
          { label: t('xihu'), value: 'xihu' },
          { label: t('gongshu'), value: 'gongshu' },
        ],
      },
      {
        label: t('ningbo'),
        value: 'ningbo',
      },
    ],
  },
  {
    label: t('jiangsu'),
    value: 'jiangsu',
    children: [
      { label: t('nanjing'), value: 'nanjing' },
      { label: t('suzhou'), value: 'suzhou' },
    ],
  },
])

use()
watchLang(use)
onThemeChange()
</script>

<template>
  <mp-space direction="column" size="lg">
    <app-type>{{ t('placeholder') }}</app-type>
    <mp-cascader v-model="menuValue" :placeholder="t('placeholder')" :options="options" />
    <app-type>{{ t('placeholderPathMode') }}</app-type>
    <mp-cascader v-model="menuValue2" :placeholder="t('placeholderPathMode')" :options="options" :path-mode="false" />
    <app-type>{{ t('placeholderMultiple') }}</app-type>
    <mp-cascader v-model="multipleValue" :placeholder="t('placeholderMultiple')" :options="options" multiple tag />
    <app-type>{{ t('placeholderPicker') }}</app-type>
    <mp-cascader v-model="pickerValue" :placeholder="t('placeholderPicker')" presentation="picker" :options="options" />
    <app-type>{{ t('placeholderPickerMultiple') }}</app-type>
    <mp-cascader
      v-model="pickerMultipleValue"
      :placeholder="t('placeholderPickerMultiple')"
      presentation="picker"
      :options="options"
      multiple
      tag
    />
    <app-type>{{ t('placeholderList') }}</app-type>
    <mp-cascader v-model="listValue" :placeholder="t('placeholderList')" presentation="list" :options="options" />
    <app-type>{{ t('placeholderListMultiple') }}</app-type>
    <mp-cascader
      v-model="listMultipleValue"
      :placeholder="t('placeholderListMultiple')"
      presentation="list"
      :options="options"
      multiple
      tag
    />
  </mp-space>
</template>
