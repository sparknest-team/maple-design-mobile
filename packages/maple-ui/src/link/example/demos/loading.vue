<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

const loading = ref(false)
const ready = ref(false)
const href = 'data:text/plain;charset=utf-8,' + encodeURIComponent('示例报告：准备完成。')
let timer: ReturnType<typeof setTimeout> | undefined

function prepareDownload(event: MouseEvent) {
  if (ready.value) {
    return
  }
  event.preventDefault()
  loading.value = true
  // 模拟业务准备；完成后再次激活链接，交给浏览器原生下载。
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
    <mp-link :href="href" download="report.txt" loading>加载中</mp-link>
    <mp-link :href="href" download="report.txt" :loading="loading" @click="prepareDownload">
      {{ loading ? '准备中' : ready ? '下载示例报告' : '准备下载报告' }}
    </mp-link>
  </mp-space>
  <p>首次点击或按 Enter 准备报告；完成后再次激活链接，浏览器下载文本文件。loading 由业务手动控制。</p>
</template>
