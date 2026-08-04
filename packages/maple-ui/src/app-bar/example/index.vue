<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const active = ref(0)

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-app-bar :title="t('title')" />

  <app-type>{{ t('round') }}</app-type>
  <mp-app-bar :title="t('round')" title-position="center" round />

  <app-type>{{ t('customStyle') }}</app-type>
  <mp-app-bar
    :title="t('title')"
    title-position="center"
    color="linear-gradient(90deg, rgba(72,176,221,1) 0%, rgba(0,208,161,1) 100%)"
  />

  <app-type>{{ t('addTitleSlot') }}</app-type>
  <mp-app-bar>{{ t('addTitleSlot') }}</mp-app-bar>

  <app-type>{{ t('addLeftAndRightSlot') }}</app-type>
  <mp-app-bar :title="t('title')">
    <template #left>
      <mp-button round text color="transparent" text-color="#ffffff">
        <mp-icon name="chevron-left" :size="24" />
      </mp-button>
    </template>

    <template #right>
      <mp-popover>
        <mp-button round text color="transparent" text-color="#ffffff">
          <mp-icon name="menu" :size="24" />
        </mp-button>

        <template #content>
          <mp-cell ripple>{{ t('option') }}</mp-cell>
          <mp-cell ripple>{{ t('option') }}</mp-cell>
          <mp-cell ripple>{{ t('option') }}</mp-cell>
        </template>
      </mp-popover>
    </template>
  </mp-app-bar>

  <app-type>{{ t('border') }}</app-type>
  <mp-app-bar :title="t('border')" :elevation="false" border />

  <app-type>{{ t('elevation') }}</app-type>
  <mp-app-bar :title="t('elevation')" :elevation="false" />

  <app-type>{{ t('custom') }}</app-type>
  <mp-app-bar
    round
    image="tree.jpeg"
    image-linear-gradient="to right top, rgba(29, 68, 147, 0.5) 0%, rgba(74, 198, 170, 0.9) 100%"
  >
    {{ t('title') }}
    <template #left>
      <mp-button round text color="transparent" text-color="#fff">
        <mp-icon name="menu" :size="24" />
      </mp-button>
    </template>

    <template #right>
      <mp-button round text color="transparent" text-color="#fff">
        <mp-icon name="map-marker-radius" :size="24" />
      </mp-button>
      <mp-button round text color="transparent" text-color="#fff">
        <mp-icon name="star" :size="24" />
      </mp-button>
      <mp-button round text color="transparent" text-color="#fff">
        <mp-icon name="heart" :size="24" />
      </mp-button>
    </template>

    <template #content>
      <mp-tabs
        v-model:active="active"
        style="margin-top: 20vmin"
        color="transparent"
        active-color="#fff"
        inactive-color="#ddd"
      >
        <mp-tab>{{ t('option') }}</mp-tab>
        <mp-tab>{{ t('option') }}</mp-tab>
        <mp-tab>{{ t('option') }}</mp-tab>
      </mp-tabs>
    </template>
  </mp-app-bar>
</template>
