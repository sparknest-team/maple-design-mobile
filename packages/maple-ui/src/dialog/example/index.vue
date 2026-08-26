<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { Dialog, Message } from '@maplejs/maple-ui'
import { t, use } from './locale'

const show = ref(false)
const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const show5 = ref(false)
const show6 = ref(false)
const show7 = ref(false)
const show8 = ref(false)
const showType = ref(false)
const showConfirm = ref(false)
const dialogType = ref('info')

const dialogTypes = ['info', 'success', 'warning', 'error']

const actions = {
  confirm: () => Message.success('confirm'),
  cancel: () => Message.error('cancel'),
  close: () => Message.info('close'),
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

function beforeClose(action, done, refs) {
  Message.loading(t('asyncCloseProgress'))

  setTimeout(() => {
    actions[action]()
    done()
  }, 1000)
}

function asyncClose() {
  Dialog({
    message: t('message'),
    beforeClose,
  })
}

function typeText(prefix, type) {
  const key = `${prefix}${type.charAt(0).toUpperCase()}${type.slice(1)}`
  return t(key)
}

function openType(type) {
  Dialog({
    title: typeText('typeTitle', type),
    message: typeText('typeMessage', type),
    type,
  })
}

async function createConfirm() {
  const action = await Dialog.confirm({
    title: t('confirmTitle'),
    message: t('confirmMessage'),
  })
  action && actions[action]?.()
}

async function createDangerConfirm() {
  const action = await Dialog.confirm({
    title: t('dangerTitle'),
    message: t('dangerMessage'),
    confirmButtonText: t('delete'),
    confirmButtonProps: {
      color: 'var(--mp-color-danger)',
    },
  })
  action && actions[action]?.()
}

async function createAlert() {
  await Dialog.alert({
    title: t('title'),
    message: t('message'),
    type: 'info',
  })
}

function createOpen() {
  Dialog.open({
    title: t('title'),
    message: t('message'),
    onConfirm: () => Message.success('confirm'),
  })
}

function buttonLoadingClose(action, done, refs) {
  if (action !== 'confirm') {
    done()
    return
  }

  refs.confirmButtonLoading.value = true
  setTimeout(() => {
    refs.confirmButtonLoading.value = false
    done()
    Message.success('confirm')
  }, 1000)
}

function openComponentType(type) {
  dialogType.value = type
  showType.value = true
}
</script>

<template>
  <app-type>{{ t('functionCall') }}</app-type>
  <mp-button type="primary" block @click="createBasic">{{ t('basicUsage') }}</mp-button>
  <mp-button type="primary" block @click="modifyTitle">{{ t('modifyTitle') }}</mp-button>
  <mp-button type="primary" block @click="hideButton">{{ t('hideButton') }}</mp-button>
  <mp-button type="primary" block @click="createAction">{{ t('handleUserBehavior') }}</mp-button>
  <mp-button type="primary" block @click="asyncClose">{{ t('asyncClose') }}</mp-button>
  <mp-button type="primary" block @click="createAlert">{{ t('alertDialog') }}</mp-button>
  <mp-button type="primary" block @click="createOpen">{{ t('openDialog') }}</mp-button>

  <app-type>{{ t('typeIcon') }}</app-type>
  <mp-button v-for="type in dialogTypes" :key="type" type="primary" block @click="openType(type)">
    {{ typeText('typeLabel', type) }}
  </mp-button>

  <app-type>{{ t('confirmBox') }}</app-type>
  <mp-button type="primary" block @click="createConfirm">{{ t('confirmDialog') }}</mp-button>
  <mp-button type="danger" block @click="createDangerConfirm">{{ t('dangerConfirm') }}</mp-button>

  <app-type>{{ t('componentCall') }}</app-type>
  <mp-button type="warning" block @click="show = true">{{ t('basicUsage') }}</mp-button>
  <mp-dialog
    v-model:open="open"
    :title="t('title')"
    :message="t('message')"
    @confirm="Message.success('confirm')"
    @cancel="Message.error('cancel')"
    @closed="Message.info('closed')"
  />

  <app-type>{{ t('typeIcon') }}</app-type>
  <mp-button
    v-for="type in dialogTypes"
    :key="`component-${type}`"
    type="warning"
    block
    @click="openComponentType(type)"
  >
    {{ typeText('typeLabel', type) }}
  </mp-button>
  <mp-dialog
    v-model:open="showType"
    :type="dialogType"
    :title="typeText('typeTitle', dialogType)"
    :message="typeText('typeMessage', dialogType)"
    @confirm="Message.success('confirm')"
    @cancel="Message.error('cancel')"
  />

  <app-type>{{ t('confirmBox') }}</app-type>
  <mp-button type="warning" block @click="showConfirm = true">{{ t('confirmDialog') }}</mp-button>
  <mp-dialog
    v-model:open="showConfirm"
    type="warning"
    :title="t('confirmTitle')"
    :message="t('confirmMessage')"
    @confirm="Message.success('confirm')"
    @cancel="Message.error('cancel')"
  />

  <mp-button type="warning" block @click="show1 = true">{{ t('asyncClose') }}</mp-button>
  <mp-dialog v-model:open="show1" :title="t('title')" :message="t('message')" :before-close="beforeClose" />

  <mp-button type="warning" block @click="show2 = true">{{ t('buttonLoading') }}</mp-button>
  <mp-dialog v-model:open="show2" :title="t('title')" :message="t('message')" :before-close="buttonLoadingClose" />

  <mp-button type="warning" block @click="show3 = true">{{ t('customSlots') }}</mp-button>
  <mp-dialog v-model:open="show3">
    <template #title>
      <m-icon-information color="var(--mp-color-primary)" />
    </template>

    <mp-cell>{{ t('message') }}</mp-cell>
    <mp-cell>{{ t('message') }}</mp-cell>
    <mp-cell>{{ t('message') }}</mp-cell>

    <template #footer="{ confirm, cancel }">
      <div style="display: flex; justify-content: flex-end; gap: 8px; padding: 0 12px 12px">
        <mp-button text @click="cancel">取消</mp-button>
        <mp-button type="primary" @click="confirm">确认</mp-button>
      </div>
    </template>
  </mp-dialog>

  <app-type>{{ t('advancedProps') }}</app-type>
  <mp-button type="warning" block @click="show4 = true">{{ t('customWidth') }}</mp-button>
  <mp-dialog
    v-model:open="show4"
    type="success"
    width="320"
    :title="t('title')"
    :message="t('message')"
    @confirm="Message.success('confirm')"
    @cancel="Message.error('cancel')"
  />

  <mp-button type="warning" block @click="show5 = true">{{ t('hideFooter') }}</mp-button>
  <mp-dialog v-model:open="show5" type="info" :footer="false" :title="t('title')" :message="t('message')" />

  <mp-button type="warning" block @click="show6 = true">{{ t('hideTitle') }}</mp-button>
  <mp-dialog
    v-model:open="show6"
    type="warning"
    :hideTitle="true"
    :title="t('title')"
    :message="t('message')"
    @confirm="Message.success('confirm')"
    @cancel="Message.error('cancel')"
  />

  <mp-button type="warning" block @click="show7 = true">{{ t('customBody') }}</mp-button>
  <mp-dialog
    v-model:open="show7"
    type="info"
    :title="t('title')"
    :message="t('message')"
    message-align="center"
    body-class="dialog-demo__body--custom"
    :body-style="{
      padding: '16px 20px',
      background: 'rgba(41, 121, 255, 0.08)',
      borderRadius: '8px',
    }"
    @confirm="Message.success('confirm')"
    @cancel="Message.error('cancel')"
  />

  <mp-button type="warning" block @click="show8 = true">{{ t('unmountOnClose') }}</mp-button>
  <mp-dialog
    v-model:open="show8"
    :unmountOnClose="true"
    :title="t('title')"
    :message="t('message')"
    @confirm="Message.success('confirm')"
    @cancel="Message.error('cancel')"
  />
</template>

<style scoped lang="less">
.mp-button {
  margin-bottom: 11px;
}

.dialog-demo__body--custom {
  font-weight: 500;
}
</style>
