<script setup>
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('baseUse') }}</app-type>
  <mp-space>
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
    <mp-button>Button3</mp-button>
  </mp-space>

  <app-type>{{ t('vertical') }}</app-type>
  <mp-space direction="column" size="lg">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
    <mp-button>Button3</mp-button>
  </mp-space>

  <app-type>{{ t('space') }}</app-type>
  <mp-space wrap :size="[20, 20]">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
    <mp-button>Button3</mp-button>
    <mp-button>Button4</mp-button>
    <mp-button>Button5</mp-button>
    <mp-button>Button6</mp-button>
  </mp-space>

  <app-type>{{ t('rightAlign') }}</app-type>
  <mp-space justify="flex-end" :size="['2.666vmin', '2.666vmin']">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
  </mp-space>

  <app-type>{{ t('around') }}</app-type>
  <mp-space justify="space-around" :size="['2.666vmin', '2.666vmin']">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
  </mp-space>

  <app-type>{{ t('center') }}</app-type>
  <mp-space justify="center" :size="['2.666vmin', '2.666vmin']">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
  </mp-space>

  <app-type>{{ t('between') }}</app-type>
  <mp-space justify="space-between" :size="['2.666vmin', '2.666vmin']">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
  </mp-space>
  <app-type>xs / sm / md / lg / xl</app-type>
  <mp-space v-for="size in ['xs', 'sm', 'md', 'lg', 'xl']" :key="size" :size="size" wrap>
    <span>{{ size }}</span
    ><span>Item 1</span><span>Item 2</span>
  </mp-space>
</template>
