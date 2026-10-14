<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange } from '@maplejs/maple-cli/client'
import { LoadingBar } from '@maplejs/maple-ui'

const hasCustomStyle = ref(false)

onThemeChange()

LoadingBar.setDefaultOptions({
  top: '54px',
})

function setStyle() {
  if (hasCustomStyle.value) {
    LoadingBar.resetDefaultOptions()
  } else {
    LoadingBar.setDefaultOptions({
      top: '54px',
      errorColor: '#ff8800',
      color: '#10afef',
      height: '5px',
    })
  }

  hasCustomStyle.value = !hasCustomStyle.value
}
</script>

<template>
  <app-type>基本使用</app-type>
  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button status="primary" block @click="LoadingBar.start()">开始</mp-button>
    <mp-button status="primary" block @click="LoadingBar.finish()">结束</mp-button>
    <mp-button status="primary" block @click="LoadingBar.error()">错误</mp-button>
    <mp-button status="primary" block @click="setStyle">{{ hasCustomStyle ? '清除样式' : '设置样式' }}</mp-button>
  </mp-space>
</template>
