<script setup>
import { onThemeChange } from '@maple-design/cli-vue/client'
import MpButton from '../../src/button'
import MpIcon from '../../src/icon'
import { t } from './locale'

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
