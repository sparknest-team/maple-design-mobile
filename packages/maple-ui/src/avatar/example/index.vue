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
    <mp-avatar src="cat.jpg" size="mini" />
    <mp-avatar src="cat.jpg" size="small" />
    <mp-avatar src="cat.jpg" />
    <mp-avatar src="cat.jpg" size="large" />
    <mp-avatar src="cat.jpg" size="21vmin" />
  </mp-space>

  <app-type>{{ t('avatarShape') }}</app-type>
  <mp-space>
    <mp-avatar src="cat.jpg" />
    <mp-avatar src="cat.jpg" :round="false" />
  </mp-space>

  <app-type>{{ t('fitMode') }}</app-type>
  <mp-space>
    <mp-space direction="column" align="center">
      <mp-avatar src="cat.jpg" />
      <span>cover</span>
    </mp-space>
    <mp-space direction="column" align="center">
      <mp-avatar src="cat.jpg" fit="fill" />
      <span>fill</span>
    </mp-space>
    <mp-space direction="column" align="center">
      <mp-avatar src="cat.jpg" fit="contain" />
      <span>contain</span>
    </mp-space>
    <mp-space direction="column" align="center">
      <mp-avatar src="cat.jpg" fit="none" />
      <span>none</span>
    </mp-space>
    <mp-space direction="column" align="center">
      <mp-avatar src="cat.jpg" fit="scale-down" />
      <span>scale-down</span>
    </mp-space>
  </mp-space>

  <app-type>{{ t('fontSize') }}</app-type>
  <mp-space direction="column">
    <mp-space>
      <mp-avatar>{{ text }}</mp-avatar>
      <mp-avatar :round="false">{{ text }}</mp-avatar>
    </mp-space>
    <mp-input v-model="text" />
  </mp-space>

  <app-type>{{ t('backgroundColor') }}</app-type>
  <mp-space>
    <mp-avatar color="var(--mp-color-warning)">
      <mp-icon name="fire" />
    </mp-avatar>
    <mp-avatar color="var(--mp-color-danger)">{{ text }}</mp-avatar>
  </mp-space>

  <app-type>{{ t('avatarHorizontalGroup') }}</app-type>
  <mp-avatar-group>
    <mp-avatar src="cat.jpg" bordered />
    <mp-avatar src="cat2.jpg" bordered />
    <mp-avatar src="cat3.jpg" bordered />
    <mp-avatar bordered>+2</mp-avatar>
  </mp-avatar-group>

  <app-type>{{ t('avatarVerticalGroup') }}</app-type>
  <mp-avatar-group vertical>
    <mp-avatar src="cat.jpg" bordered />
    <mp-avatar src="cat2.jpg" bordered />
    <mp-avatar src="cat3.jpg" bordered />
    <mp-avatar bordered>+2</mp-avatar>
  </mp-avatar-group>

  <app-type>{{ t('avatarHoverable') }}</app-type>
  <mp-avatar-group>
    <mp-avatar hoverable src="cat.jpg" bordered />
    <mp-avatar hoverable src="cat2.jpg" bordered />
    <mp-avatar hoverable src="cat3.jpg" bordered />
    <mp-avatar hoverable bordered>+2</mp-avatar>
  </mp-avatar-group>
</template>
