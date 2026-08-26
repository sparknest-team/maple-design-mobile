<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { Message } from '@maplejs/maple-ui'
import { t, use } from './locale'

const basicUsage = ref(0)
const matchByName = ref('home')
const showBadge = ref(0)
const badgeProps = {
  type: 'primary',
  value: '66',
}
const customColor = ref(0)
const changeEvent = ref(0)
const clickEvent = ref(0)
const fab = ref(0)
const isEven = ref(true)
const variant = ref(0)

watchLang(use)
onThemeChange()

function handleChange(active) {
  Message.info(`changed to ${active}`)
}

function handleClick(active) {
  Message.success(`clicked ${active}`)
}
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-bottom-navigation v-model:active="basicUsage">
    <mp-bottom-navigation-item :label="t('label')" icon="home" />
    <mp-bottom-navigation-item :label="t('label')" icon="magnify" />
    <mp-bottom-navigation-item :label="t('label')" icon="heart" />
    <mp-bottom-navigation-item :label="t('label')" icon="account-circle" />
  </mp-bottom-navigation>

  <app-type>{{ t('matchByName') }}</app-type>
  <mp-bottom-navigation v-model:active="matchByName">
    <mp-bottom-navigation-item name="home" :label="t('label')" icon="home" />
    <mp-bottom-navigation-item name="search" :label="t('label')" icon="magnify" />
    <mp-bottom-navigation-item name="heart" :label="t('label')" icon="heart" />
    <mp-bottom-navigation-item name="user" :label="t('label')" icon="account-circle" />
  </mp-bottom-navigation>

  <app-type>{{ t('showBadge') }}</app-type>
  <mp-bottom-navigation v-model:active="showBadge">
    <mp-bottom-navigation-item :label="t('label')" icon="home" />
    <mp-bottom-navigation-item :label="t('label')" icon="magnify" badge />
    <mp-bottom-navigation-item :label="t('label')" icon="heart" :badge="badgeProps" />
    <mp-bottom-navigation-item :label="t('label')" icon="account-circle" />
  </mp-bottom-navigation>

  <app-type>{{ t('customColor') }}</app-type>
  <mp-bottom-navigation v-model:active="customColor" active-color="var(--mp-color-warning)">
    <mp-bottom-navigation-item :label="t('label')" icon="home" />
    <mp-bottom-navigation-item :label="t('label')" icon="magnify" />
    <mp-bottom-navigation-item :label="t('label')" icon="heart" />
    <mp-bottom-navigation-item :label="t('label')" icon="account-circle" />
  </mp-bottom-navigation>

  <app-type>{{ t('changeEvent') }}</app-type>
  <mp-bottom-navigation v-model:active="changeEvent" @change="handleChange">
    <mp-bottom-navigation-item :label="t('label')" icon="home" />
    <mp-bottom-navigation-item :label="t('label')" icon="magnify" />
    <mp-bottom-navigation-item :label="t('label')" icon="heart" />
    <mp-bottom-navigation-item :label="t('label')" icon="account-circle" />
  </mp-bottom-navigation>

  <app-type>{{ t('clickEvent') }}</app-type>
  <mp-bottom-navigation v-model:active="clickEvent">
    <mp-bottom-navigation-item :label="t('label')" icon="home" @click="handleClick" />
    <mp-bottom-navigation-item :label="t('label')" icon="magnify" @click="handleClick" />
    <mp-bottom-navigation-item :label="t('label')" icon="heart" @click="handleClick" />
    <mp-bottom-navigation-item :label="t('label')" icon="account-circle" @click="handleClick" />
  </mp-bottom-navigation>

  <app-type>{{ t('fab') }}</app-type>
  <mp-bottom-navigation v-model:active="fab" style="margin-top: 10px" @fab-click="isEven = !isEven">
    <template #fab>
      <m-icon-heart />
    </template>
    <mp-bottom-navigation-item :label="t('label')" icon="home" />
    <mp-bottom-navigation-item :label="t('label')" icon="magnify" />
    <mp-bottom-navigation-item :label="t('label')" icon="heart" />
    <mp-bottom-navigation-item :label="t('label')" icon="bell" />
    <mp-bottom-navigation-item v-if="!isEven" :label="t('label')" icon="account-circle" />
  </mp-bottom-navigation>

  <app-type>{{ t('variant') }}</app-type>
  <mp-bottom-navigation v-model:active="variant" variant>
    <mp-bottom-navigation-item :label="t('label')" icon="home" />
    <mp-bottom-navigation-item :label="t('label')" icon="magnify" />
    <mp-bottom-navigation-item :label="t('label')" icon="heart" />
    <mp-bottom-navigation-item :label="t('label')" icon="account-circle" />
  </mp-bottom-navigation>
</template>
