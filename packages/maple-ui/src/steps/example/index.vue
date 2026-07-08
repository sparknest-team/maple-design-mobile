<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const active = ref(0)

watchLang(use)
onThemeChange()

function next() {
  active.value = (active.value + 1) % 4
}
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-steps :active="active">
    <mp-step>{{ t('first') }}</mp-step>
    <mp-step>{{ t('second') }}</mp-step>
    <mp-step>{{ t('third') }}</mp-step>
    <mp-step>{{ t('fourth') }}</mp-step>
  </mp-steps>

  <app-type>{{ t('customStyle') }}</app-type>
  <mp-steps :active="active" active-color="var(--mp-color-danger)" inactive-color="var(--mp-color-warning)">
    <mp-step active-icon="heart" current-icon="fire" inactive-icon="heart-half-full">{{ t('first') }}</mp-step>
    <mp-step active-icon="heart" current-icon="fire" inactive-icon="heart-half-full">{{ t('second') }}</mp-step>
    <mp-step active-icon="heart" current-icon="fire" inactive-icon="heart-half-full">{{ t('third') }}</mp-step>
    <mp-step active-icon="heart" current-icon="fire" inactive-icon="heart-half-full">{{ t('fourth') }}</mp-step>
  </mp-steps>

  <app-type>{{ t('vertical') }}</app-type>
  <mp-steps direction="vertical" :active="active">
    <mp-step>{{ t('first') }}</mp-step>
    <mp-step>{{ t('second') }}</mp-step>
    <mp-step>{{ t('third') }}</mp-step>
    <mp-step>{{ t('fourth') }}</mp-step>
  </mp-steps>

  <mp-button type="primary" block @click="next">{{ t('next') }}</mp-button>
</template>
