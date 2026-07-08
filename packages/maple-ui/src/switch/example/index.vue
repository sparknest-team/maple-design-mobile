<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { z } from 'zod'
import { t, use } from './locale'

const value = ref(true)
const value1 = ref(true)
const value2 = ref(true)
const value3 = ref(true)
const value4 = ref(true)
const value5 = ref(true)
const value6 = ref(true)
const value7 = ref(true)

function handleBeforeChange(value, change) {
  setTimeout(() => {
    change(value)
  }, 500)
}

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-space :size="['3vmin', '9vmin']">
    <mp-switch v-model="value" />
  </mp-space>

  <app-type>{{ t('disabled') }}</app-type>
  <mp-switch v-model="value1" disabled />

  <app-type>{{ t('readonly') }}</app-type>
  <mp-switch v-model="value1" readonly />

  <app-type>{{ t('customColor') }}</app-type>
  <mp-switch v-model="value2" color="var(--mp-color-warning)" close-color="var(--mp-color-info)" />

  <app-type>{{ t('size') }}</app-type>
  <mp-space :size="['3vmin', '11vmin']" align="center">
    <mp-switch v-model="value3" size="4.266vmin" />
    <mp-switch v-model="value3" />
    <mp-switch v-model="value3" size="6.4vmin" />
  </mp-space>

  <app-type>{{ t('loading') }}</app-type>
  <mp-switch :model-value="true" loading />

  <app-type>{{ t('validateValue') }}</app-type>
  <mp-space :size="['3vmin', '9vmin']">
    <mp-switch v-model="value4" :rules="[(v) => v === true || t('state')]" />
  </mp-space>

  <app-type>{{ t('validateWithZod') }}</app-type>
  <mp-space :size="['3vmin', '9vmin']">
    <mp-switch v-model="value7" :rules="z.boolean().refine((v) => v === true, { message: t('state') })" />
  </mp-space>

  <app-type>{{ t('lazyChange') }}</app-type>
  <mp-space :size="['3vmin', '9vmin']">
    <mp-switch v-model="value5" lazy-change @before-change="handleBeforeChange" />
  </mp-space>

  <app-type>{{ t('variant') }}</app-type>
  <mp-switch v-model="value6" variant />
</template>
