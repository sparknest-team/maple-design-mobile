<script setup>
import { onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import MpButton from '../../src/button'
import MpIcon from '../../src/icon'
import { t, use } from './locale'

watchLang(use, 'pc')
onThemeChange()

function download() {
  window.location.href = 'https://raw.githubusercontent.com/loca-spirit/maple-design-resources/main/components.sketch'
}
</script>

<template>
  <mp-button status="primary" @click="download">
    {{ t('downloadResources') }}
    <mp-icon name="download" style="margin: 2px 0 0 6px" />
  </mp-button>
</template>
