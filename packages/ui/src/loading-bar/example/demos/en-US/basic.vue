<script setup>
import { ref } from 'vue'
import { LoadingBar } from '@maple-design/ui-vue'

const hasCustomStyle = ref(false)

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
  <h3>Basic usage</h3>
  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button status="primary" block @click="LoadingBar.start()">Start</mp-button>
    <mp-button status="primary" block @click="LoadingBar.finish()">Finish</mp-button>
    <mp-button status="primary" block @click="LoadingBar.error()">Error</mp-button>
    <mp-button status="primary" block @click="setStyle">{{ hasCustomStyle ? 'Clear style' : 'Set style' }}</mp-button>
  </mp-space>
</template>
