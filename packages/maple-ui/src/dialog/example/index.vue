<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { Dialog, Snackbar } from '@maplejs/maple-ui'
import { t, use } from './locale'

const show = ref(false)
const show1 = ref(false)
const show2 = ref(false)

const actions = {
  confirm: () => Snackbar.success('confirm'),
  cancel: () => Snackbar.error('cancel'),
  close: () => Snackbar.info('close'),
}

watchLang(use)
onThemeChange()

function createBasic() {
  Dialog(t('message'))
}

async function createAction() {
  actions[await Dialog(t('message'))]()
}

function modifyTitle() {
  Dialog({
    title: t('title'),
    message: t('message'),
  })
}

function hideButton() {
  Dialog({
    message: t('message'),
    confirmButton: false,
    cancelButton: false,
  })
}

function onBeforeClose(action, done) {
  Snackbar.loading(t('asyncCloseProgress'))

  setTimeout(() => {
    actions[action]()
    done()
  }, 1000)
}

function asyncClose() {
  Dialog({
    message: t('message'),
    onBeforeClose,
  })
}
</script>

<template>
  <app-type>{{ t('functionCall') }}</app-type>
  <mp-button type="primary" block @click="createBasic">{{ t('basicUsage') }}</mp-button>
  <mp-button type="primary" block @click="modifyTitle">{{ t('modifyTitle') }}</mp-button>
  <mp-button type="primary" block @click="hideButton">{{ t('hideButton') }}</mp-button>
  <mp-button type="primary" block @click="createAction">{{ t('handleUserBehavior') }}</mp-button>
  <mp-button type="primary" block @click="asyncClose">{{ t('asyncClose') }}</mp-button>

  <app-type>{{ t('componentCall') }}</app-type>
  <mp-button type="warning" block @click="show = true">{{ t('basicUsage') }}</mp-button>
  <mp-dialog
    v-model:show="show"
    :title="t('title')"
    :message="t('message')"
    @confirm="Snackbar.success('confirm')"
    @cancel="Snackbar.error('cancel')"
    @closed="Snackbar.info('closed')"
  />

  <mp-button type="warning" block @click="show1 = true">{{ t('asyncClose') }}</mp-button>
  <mp-dialog v-model:show="show1" :title="t('title')" :message="t('message')" @before-close="onBeforeClose" />

  <mp-button type="warning" block @click="show2 = true">{{ t('customSlots') }}</mp-button>
  <mp-dialog v-model:show="show2">
    <template #title>
      <mp-icon name="information" color="var(--mp-color-primary)" />
    </template>

    <mp-cell>{{ t('message') }}</mp-cell>
    <mp-cell>{{ t('message') }}</mp-cell>
    <mp-cell>{{ t('message') }}</mp-cell>
  </mp-dialog>
</template>

<style scoped lang="less">
.mp-button {
  margin-bottom: 11px;
}
</style>
