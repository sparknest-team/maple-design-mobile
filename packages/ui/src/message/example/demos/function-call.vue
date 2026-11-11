<script setup>
import { h, onBeforeUnmount, resolveComponent } from 'vue'
import { Message } from '@maple-design/ui-vue'

function createMessage(type) {
  if (type === 'time') {
    Message({
      content: '这是一条消息提示',
      duration: 1000,
    })
  }

  if (type === 'position') {
    Message({
      content: '这是一条消息提示',
      position: 'bottom',
    })
  }

  if (type === 'icon') {
    Message.info({
      content: '这是一条消息提示',
      icon: () => h(resolveComponent('MIconHeart'), { style: { paddingRight: '12px' } }),
    })
  }

  if (type === 'action') {
    const customMessage = Message({
      content: 'Hello, Maple',
      action: () =>
        h(
          resolveComponent('MpButton'),
          { size: 'sm', status: 'primary', onClick: () => customMessage.close() },
          { default: () => '关闭' },
        ),
    })
  }

  if (type === 'closable') {
    Message({
      content: '这是一条消息提示',
      closable: true,
      duration: 0,
    })
  }

  if (type === 'update') {
    Message.info({
      id: 'demo-update',
      content: '更新中...',
      duration: 0,
      resetOnUpdate: true,
    })

    setTimeout(() => {
      Message.success({
        id: 'demo-update',
        content: '更新完成',
        duration: 2000,
        resetOnUpdate: true,
      })
    }, 1000)
  }

  if (type === 'loading') {
    const message = Message.loading('等待中...')
    setTimeout(() => {
      message.close()
      Message.success('加载成功')
    }, 2000)
  }

  if (!type) {
    Message('这是一条消息提示')
  }
}
function openMultiple() {
  const message1 = Message('Message 1')
  Message.success('Message 2')
  Message.warning('Message 3')

  setTimeout(() => {
    message1.close()
  }, 1000)
}
onBeforeUnmount(() => {
  Message.clear()
})
</script>

<template>
  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button status="warning" block @click="createMessage()">基本使用</mp-button>
    <mp-button status="warning" block @click="createMessage('icon')">自定义图标</mp-button>
    <mp-button status="warning" block @click="createMessage('position')">位置</mp-button>
    <mp-button status="warning" block @click="createMessage('time')">显示时长</mp-button>
    <mp-button status="warning" block @click="createMessage('closable')">可关闭</mp-button>
    <mp-button status="warning" block @click="createMessage('update')">更新内容</mp-button>
    <mp-button status="warning" block @click="createMessage('loading')">Loading 常驻</mp-button>
    <mp-button status="warning" block @click="openMultiple">多实例</mp-button>
    <mp-button status="warning" block @click="createMessage('action')">自定义操作</mp-button>
  </mp-space>
</template>
