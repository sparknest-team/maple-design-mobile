<script setup>
import { h, onBeforeUnmount, reactive, toRefs } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { Button, Icon, Message } from '@maplejs/maple-ui'
import { t, use } from './locale'

const shows = reactive({
  show1: false,
  show2: false,
  show3: false,
  show4: false,
  show5: false,
  show9: false,
  showClosable: false,
})

const { show1, show2, show3, show4, show5, show9, showClosable } = toRefs(shows)

onBeforeUnmount(() => {
  Message.clear()
})

watchLang(use)
onThemeChange()

function changeValue(type) {
  shows[type] = !shows[type]
}

function create(type) {
  const text = type === 'loading' ? t('wait') : t('text')
  const message = Message[type](text)

  if (type === 'loading') {
    setTimeout(() => {
      message.close()
      Message.success(t('loaded'))
    }, 2000)
  }
}

function createMessage(type) {
  if (type === 'time') {
    Message({
      content: t('text'),
      duration: 1000,
    })
  }

  if (type === 'position') {
    Message({
      content: t('text'),
      position: 'bottom',
    })
  }

  if (type === 'icon') {
    Message.info({
      content: t('text'),
      icon: () => h(Icon, { name: 'heart', style: { paddingRight: '12px' } }),
    })
  }

  if (type === 'action') {
    const customMessage = Message({
      content: 'Hello, Maple',
      action: () =>
        h(
          Button,
          { size: 'small', type: 'primary', onClick: () => customMessage.close() },
          { default: () => t('close') },
        ),
    })
  }

  if (type === 'closable') {
    Message({
      content: t('text'),
      closable: true,
      duration: 0,
    })
  }

  if (type === 'update') {
    Message.info({
      id: 'demo-update',
      content: t('updating'),
      duration: 0,
    })

    setTimeout(() => {
      Message.success({
        id: 'demo-update',
        content: t('updated'),
        duration: 2000,
      })
    }, 1000)
  }

  if (type === 'loading') {
    const message = Message.loading(t('wait'))
    setTimeout(() => {
      message.close()
      Message.success(t('loaded'))
    }, 2000)
  }

  if (!type) {
    Message(t('text'))
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
</script>

<template>
  <app-type>{{ t('functionCall') }}</app-type>
  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button type="warning" block @click="createMessage()">{{ t('basicUsage') }}</mp-button>
    <mp-button type="warning" block @click="createMessage('icon')">{{ t('customIcon') }}</mp-button>
    <mp-button type="warning" block @click="createMessage('position')">{{ t('position') }}</mp-button>
    <mp-button type="warning" block @click="createMessage('time')">{{ t('hiddenTime') }}</mp-button>
    <mp-button type="warning" block @click="createMessage('closable')">{{ t('closable') }}</mp-button>
    <mp-button type="warning" block @click="createMessage('update')">{{ t('updateContent') }}</mp-button>
    <mp-button type="warning" block @click="createMessage('loading')">{{ t('loadingPersist') }}</mp-button>
    <mp-button type="warning" block @click="openMultiple">{{ t('multiple') }}</mp-button>
    <mp-button type="warning" block @click="createMessage('action')">{{ t('customAction') }}</mp-button>
  </mp-space>

  <app-type>{{ t('type') }}</app-type>
  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button type="success" block @click="create('success')">{{ t('success') }}</mp-button>
    <mp-button type="warning" block @click="create('warning')">{{ t('warning') }}</mp-button>
    <mp-button type="info" block @click="create('info')">{{ t('info') }}</mp-button>
    <mp-button type="danger" block @click="create('error')">{{ t('error') }}</mp-button>
    <mp-button type="primary" block @click="create('loading')">{{ t('loading') }}</mp-button>
    <mp-button type="default" block @click="create('normal')">{{ t('normal') }}</mp-button>
  </mp-space>

  <app-type>{{ t('componentCall') }}</app-type>
  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button type="primary" block @click="changeValue('show1')">{{ t('basicUsage') }}</mp-button>
    <mp-button type="primary" block @click="changeValue('show3')">{{ t('multiLine') }}</mp-button>
    <mp-button type="primary" block @click="changeValue('show2')">{{ t('bottomDisplay') }}</mp-button>
    <mp-button type="primary" block @click="changeValue('show4')">{{ t('hiddenTime') }}</mp-button>
    <mp-button type="primary" block @click="changeValue('show5')">{{ t('customIcon') }}</mp-button>
    <mp-button type="primary" block @click="changeValue('show9')">{{ t('forbidClick') }}</mp-button>
    <mp-button type="primary" block @click="changeValue('showClosable')">{{ t('closable') }}</mp-button>
  </mp-space>

  <div class="message-demo">
    <mp-message v-model:open="show1">
      {{ t('text') }}
    </mp-message>

    <mp-message v-model:open="show2" position="bottom">
      {{ t('text') }}
      <template #action>
        <mp-button type="primary" :elevation="false" size="sm" @click="show2 = false">{{ t('close') }}</mp-button>
      </template>
    </mp-message>

    <mp-message v-model:open="show3" :vertical="true">
      {{ t('text') }}
      <template #action>
        <mp-button type="primary" :elevation="false" size="sm" @click="show3 = false">{{ t('close') }}</mp-button>
      </template>
    </mp-message>

    <mp-message v-model:open="show4" :duration="100000" :elevation="5">
      {{ t('text') }}
    </mp-message>

    <mp-message v-model:open="show5">
      {{ t('text') }}
      <template #icon>
        <m-icon-heart-outline />
      </template>
    </mp-message>

    <mp-message v-model:open="show9" :forbid-click="true">
      {{ t('text') }}
    </mp-message>

    <mp-message v-model:open="showClosable" closable :duration="0" type="info">
      {{ t('text') }}
    </mp-message>
  </div>
</template>
