<script setup>
import { onBeforeUnmount } from 'vue'
import { Message } from '@maple-design/ui'

function create(type) {
  const text = type === 'loading' ? '等待中...' : '这是一条消息提示'
  const message = Message[type](text)

  if (type === 'loading') {
    setTimeout(() => {
      message.close()
      Message.success('加载成功')
    }, 2000)
  }
}
onBeforeUnmount(() => {
  Message.clear()
})
</script>

<template>
  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button status="success" block @click="create('success')">成功</mp-button>
    <mp-button status="warning" block @click="create('warning')">警告</mp-button>
    <mp-button status="info" block @click="create('info')">信息</mp-button>
    <mp-button status="danger" block @click="create('error')">错误</mp-button>
    <mp-button status="primary" block @click="create('loading')">加载</mp-button>
    <mp-button status="default" block @click="Message('普通提示')">普通</mp-button>
  </mp-space>
</template>
