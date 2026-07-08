<script setup>
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const lists = [...Array(100).keys()]

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <div>
    <mp-cell v-for="list in lists" :key="list">Scroll to bottom {{ list }}</mp-cell>
    <mp-back-top :duration="300" />
  </div>
</template>
