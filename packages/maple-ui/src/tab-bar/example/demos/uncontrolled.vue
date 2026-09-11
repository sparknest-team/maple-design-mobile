<script setup>
import { t } from '../locale'
</script>
<template>
  <p>{{ t('uncontrolledHelp') }}</p>
  <mp-tab-bar default-active="favorites">
    <mp-tab-bar-item name="home" :label="t('home')" />
    <mp-tab-bar-item name="favorites" :label="t('favorites')" />
    <mp-tab-bar-item name="profile" :label="t('profile')" />
  </mp-tab-bar>
</template>
