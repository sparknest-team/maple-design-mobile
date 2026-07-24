<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const current = ref(1)

watchLang(use)
onThemeChange()

function next() {
  current.value = current.value >= 4 ? 1 : current.value + 1
}
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-steps :current="current">
    <mp-step>{{ t('first') }}</mp-step>
    <mp-step>{{ t('second') }}</mp-step>
    <mp-step>{{ t('third') }}</mp-step>
    <mp-step>{{ t('fourth') }}</mp-step>
  </mp-steps>

  <app-type>{{ t('errorStatus') }}</app-type>
  <mp-steps :current="2" status="error">
    <mp-step>{{ t('first') }}</mp-step>
    <mp-step>{{ t('second') }}</mp-step>
    <mp-step>{{ t('third') }}</mp-step>
  </mp-steps>

  <app-type>{{ t('changeable') }}</app-type>
  <mp-steps v-model:current="current" changeable>
    <mp-step :description="t('description')">{{ t('first') }}</mp-step>
    <mp-step :description="t('description')">{{ t('second') }}</mp-step>
    <mp-step :description="t('description')">{{ t('third') }}</mp-step>
    <mp-step :description="t('description')">{{ t('fourth') }}</mp-step>
  </mp-steps>

  <app-type>{{ t('vertical') }}</app-type>
  <mp-steps direction="vertical" :current="current">
    <mp-step>{{ t('first') }}</mp-step>
    <mp-step>{{ t('second') }}</mp-step>
    <mp-step>{{ t('third') }}</mp-step>
    <mp-step>{{ t('fourth') }}</mp-step>
  </mp-steps>

  <mp-button type="primary" block @click="next">{{ t('next') }}</mp-button>
</template>
