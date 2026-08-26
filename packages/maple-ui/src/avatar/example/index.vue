<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const text = ref('MAPLE')

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('avatarSize') }}</app-type>
  <mp-space align="center">
    <mp-avatar image-url="cat.jpg" size="mini" />
    <mp-avatar image-url="cat.jpg" size="small" />
    <mp-avatar image-url="cat.jpg" />
    <mp-avatar image-url="cat.jpg" size="large" />
    <mp-avatar image-url="cat.jpg" size="21vmin" />
  </mp-space>

  <app-type>{{ t('avatarShape') }}</app-type>
  <mp-space>
    <mp-avatar image-url="cat.jpg" />
    <mp-avatar image-url="cat.jpg" shape="square" />
  </mp-space>

  <app-type>{{ t('fitMode') }}</app-type>
  <mp-space>
    <mp-space direction="column" align="center">
      <mp-avatar image-url="cat.jpg" />
      <span>cover</span>
    </mp-space>
    <mp-space direction="column" align="center">
      <mp-avatar image-url="cat.jpg" object-fit="fill" />
      <span>fill</span>
    </mp-space>
    <mp-space direction="column" align="center">
      <mp-avatar image-url="cat.jpg" object-fit="contain" />
      <span>contain</span>
    </mp-space>
    <mp-space direction="column" align="center">
      <mp-avatar image-url="cat.jpg" object-fit="none" />
      <span>none</span>
    </mp-space>
    <mp-space direction="column" align="center">
      <mp-avatar image-url="cat.jpg" object-fit="scale-down" />
      <span>scale-down</span>
    </mp-space>
  </mp-space>

  <app-type>{{ t('fontSize') }}</app-type>
  <mp-space direction="column">
    <mp-space>
      <mp-avatar>{{ text }}</mp-avatar>
      <mp-avatar shape="square">{{ text }}</mp-avatar>
    </mp-space>
    <mp-input v-model="text" />
  </mp-space>

  <app-type>{{ t('backgroundColor') }}</app-type>
  <mp-space>
    <mp-avatar color="var(--mp-color-warning)">
      <m-icon-fire />
    </mp-avatar>
    <mp-avatar color="var(--mp-color-danger)">{{ text }}</mp-avatar>
  </mp-space>

  <app-type>{{ t('avatarHorizontalGroup') }}</app-type>
  <mp-avatar-group>
    <mp-avatar image-url="cat.jpg" bordered />
    <mp-avatar image-url="cat2.jpg" bordered />
    <mp-avatar image-url="cat3.jpg" bordered />
    <mp-avatar bordered>+2</mp-avatar>
  </mp-avatar-group>

  <app-type>{{ t('avatarVerticalGroup') }}</app-type>
  <mp-avatar-group vertical>
    <mp-avatar image-url="cat.jpg" bordered />
    <mp-avatar image-url="cat2.jpg" bordered />
    <mp-avatar image-url="cat3.jpg" bordered />
    <mp-avatar bordered>+2</mp-avatar>
  </mp-avatar-group>

  <app-type>{{ t('avatarHoverable') }}</app-type>
  <mp-avatar-group>
    <mp-avatar hoverable image-url="cat.jpg" bordered />
    <mp-avatar hoverable image-url="cat2.jpg" bordered />
    <mp-avatar hoverable image-url="cat3.jpg" bordered />
    <mp-avatar hoverable bordered>+2</mp-avatar>
  </mp-avatar-group>
</template>
