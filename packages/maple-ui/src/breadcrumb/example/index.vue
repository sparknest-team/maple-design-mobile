<script setup>
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { Snackbar } from '@maplejs/maple-ui'
import { t, use } from './locale'

onThemeChange()
watchLang(use)
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-breadcrumb>
    <mp-breadcrumb-item>{{ t('level1') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('level2') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('level3') }}</mp-breadcrumb-item>
  </mp-breadcrumb>

  <app-type>{{ t('separator') }}</app-type>
  <mp-breadcrumb separator="\">
    <mp-breadcrumb-item>{{ t('level1') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('level2') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('level3') }}</mp-breadcrumb-item>
  </mp-breadcrumb>

  <app-type>{{ t('childSeparator') }}</app-type>
  <mp-breadcrumb>
    <mp-breadcrumb-item>{{ t('level1') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item separator="~">{{ t('level2') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('level3') }}</mp-breadcrumb-item>
  </mp-breadcrumb>

  <app-type>{{ t('separatorSlot') }}</app-type>
  <mp-breadcrumb>
    <mp-breadcrumb-item>
      <template #separator>
        <mp-icon name="menu-right" style="margin: 1px 4px 0" />
      </template>
      {{ t('level1') }}
    </mp-breadcrumb-item>
    <mp-breadcrumb-item>
      <template #separator>
        <mp-icon name="menu-right" style="margin: 1px 4px 0" />
      </template>
      {{ t('level2') }}
    </mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('level3') }}</mp-breadcrumb-item>
  </mp-breadcrumb>

  <app-type>{{ t('clickEvent') }}</app-type>
  <mp-breadcrumb>
    <mp-breadcrumb-item @click="Snackbar(t('level1'))">{{ t('level1') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item @click="Snackbar(t('level2'))">{{ t('level2') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item @click="Snackbar(t('level3'))">{{ t('level3') }}</mp-breadcrumb-item>
  </mp-breadcrumb>
</template>
