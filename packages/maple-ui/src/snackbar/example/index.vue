<script setup>
import { h, onBeforeUnmount, reactive, toRefs } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { Button, Icon, Snackbar } from '@maplejs/maple-ui'
import { t, use } from './locale'

const shows = reactive({
  show1: false,
  show2: false,
  show3: false,
  show4: false,
  show5: false,
  show9: false,
})

const MpSnackbar = Snackbar.Component

const { show1, show2, show3, show4, show5, show9 } = toRefs(shows)

onBeforeUnmount(() => {
  Snackbar.allowMultiple(false)
})

watchLang(use)
onThemeChange()

function changeValue(type) {
  shows[type] = !shows[type]
}

function create(type) {
  const text = type === 'loading' ? t('wait') : t('text')
  const snackbar = Snackbar[type](text)

  if (type === 'loading') {
    setTimeout(() => {
      snackbar.clear()
      Snackbar.success(t('loaded'))
    }, 2000)
  }
}

function createSnackbar(type) {
  if (type === 'time') {
    Snackbar({
      content: t('text'),
      duration: 1000,
    })
  }

  if (type === 'position') {
    Snackbar({
      content: t('text'),
      position: 'bottom',
    })
  }

  if (type === 'custom') {
    const customSnackbar = Snackbar({
      content: 'Hello, Maple',
      icon: () => h(Icon, { name: 'heart', style: { paddingRight: '12px' } }),
      action: () =>
        h(
          Button,
          { size: 'small', type: 'primary', onClick: () => customSnackbar.clear() },
          { default: () => t('close') },
        ),
    })
  }

  if (!type) {
    Snackbar(t('text'))
  }
}

function openMultiple() {
  Snackbar.allowMultiple(true)

  const snackbar1 = Snackbar('Snackbar 1')
  Snackbar.success('Snackbar 2')

  setTimeout(() => {
    snackbar1.clear()
  }, 1000)
}
</script>

<template>
  <app-type>{{ t('componentCall') }}</app-type>
  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button type="primary" block @click="changeValue('show1')">{{ t('basicUsage') }}</mp-button>
    <mp-button type="primary" block @click="changeValue('show3')">{{ t('multiLine') }}</mp-button>
    <mp-button type="primary" block @click="changeValue('show2')">{{ t('bottomDisplay') }}</mp-button>
    <mp-button type="primary" block @click="changeValue('show4')">{{ t('hiddenTime') }}</mp-button>
    <mp-button type="primary" block @click="changeValue('show5')">{{ t('customIcon') }}</mp-button>
    <mp-button type="primary" block @click="changeValue('show9')">{{ t('forbidClick') }}</mp-button>
  </mp-space>

  <app-type>{{ t('functionCall') }}</app-type>
  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button type="warning" block @click="createSnackbar()">{{ t('basicUsage') }}</mp-button>
    <mp-button type="warning" block @click="createSnackbar('time')">{{ t('hiddenTime') }}</mp-button>
    <mp-button type="warning" block @click="createSnackbar('position')">{{ t('bottomDisplay') }}</mp-button>
    <mp-button type="warning" block @click="createSnackbar('custom')">{{ t('custom') }}</mp-button>
  </mp-space>

  <app-type>{{ t('type') }}</app-type>
  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button type="success" block @click="create('success')">{{ t('success') }}</mp-button>
    <mp-button type="warning" block @click="create('warning')">{{ t('warning') }}</mp-button>
    <mp-button type="info" block @click="create('info')">{{ t('info') }}</mp-button>
    <mp-button type="danger" block @click="create('error')">{{ t('error') }}</mp-button>
    <mp-button type="primary" block @click="create('loading')">{{ t('loading') }}</mp-button>
  </mp-space>

  <app-type>{{ t('multiple') }}</app-type>
  <mp-button type="primary" block @click="openMultiple">{{ t('multiple') }}</mp-button>

  <div class="snackbar-demo">
    <mp-snackbar v-model:show="show1">
      {{ t('text') }}
    </mp-snackbar>

    <mp-snackbar v-model:show="show2" position="bottom">
      {{ t('text') }}
      <template #action>
        <mp-button type="primary" :elevation="false" size="small" @click="show2 = false">{{ t('close') }}</mp-button>
      </template>
    </mp-snackbar>

    <mp-snackbar v-model:show="show3" :vertical="true">
      {{ t('text') }}
      <template #action>
        <mp-button type="primary" :elevation="false" size="small" @click="show3 = false">{{ t('close') }}</mp-button>
      </template>
    </mp-snackbar>

    <mp-snackbar v-model:show="show4" :duration="100000" :elevation="5">
      {{ t('text') }}
    </mp-snackbar>

    <mp-snackbar v-model:show="show5">
      {{ t('text') }}
      <template #icon>
        <mp-icon name="heart-outline" />
      </template>
    </mp-snackbar>

    <mp-snackbar v-model:show="show9" :forbid-click="true">
      {{ t('text') }}
    </mp-snackbar>
  </div>
</template>
