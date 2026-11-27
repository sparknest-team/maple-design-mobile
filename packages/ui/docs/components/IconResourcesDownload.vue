<script setup>
import { useRoute } from 'vue-router'
import MpButton from '../../src/button'
import MpIcon from '../../src/icon'

const route = useRoute()

function download() {
  window.location.href = 'https://raw.githubusercontent.com/sparknest-team/maple-design-resources/main/icons.sketch'
}
</script>

<template>
  <mp-button status="primary" @click="download">
    {{ route.path.startsWith('/en-US/') ? 'Download Resources' : '下载资源' }}
    <mp-icon name="download" style="margin: 2px 0 0 6px" />
  </mp-button>
</template>
