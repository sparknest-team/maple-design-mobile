<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

const loading = ref(false)
const ready = ref(false)
const href = 'data:text/plain;charset=utf-8,' + encodeURIComponent('Example report: ready.')
let timer: ReturnType<typeof setTimeout> | undefined

function prepareDownload(event: MouseEvent) {
  if (ready.value) {
    return
  }
  event.preventDefault()
  loading.value = true
  // Simulate preparation, then let the ready link use the native download.
  timer = setTimeout(() => {
    ready.value = true
    loading.value = false
    timer = undefined
  }, 1000)
}
onBeforeUnmount(() => clearTimeout(timer))
</script>
<template>
  <mp-space size="sm">
    <mp-link :href="href" download="report.txt" loading>Loading</mp-link>
    <mp-link :href="href" download="report.txt" :loading="loading" @click="prepareDownload">
      {{ loading ? 'Preparing' : ready ? 'Download sample report' : 'Prepare report' }}
    </mp-link>
  </mp-space>
  <p>
    Click or press Enter to prepare the report, then activate the ready link to download it. Business code controls
    loading.
  </p>
</template>
