<script setup>
import { reactive, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { Dialog, Message } from '@maplejs/maple-ui'
import { t, use } from './locale'

const basicOpen = ref(false)
const loadingOpen = ref(false)
const confirmOpen = ref(false)
const typeOpen = ref(false)
const formOpen = ref(false)
const formRef = ref(null)
const slotsOpen = ref(false)
const customTextOpen = ref(false)
const widthOpen = ref(false)
const simpleOpen = ref(false)
const draggableOpen = ref(false)
const fullscreenOpen = ref(false)
const hideFooterOpen = ref(false)
const hideTitleOpen = ref(false)
const customBodyOpen = ref(false)
const unmountOpen = ref(false)
const longContentOpen = ref(false)
const dialogType = ref('info')
const formData = reactive({ name: '', email: '' })

const dialogTypes = ['info', 'success', 'warning', 'error']
const actions = {
  confirm: () => Message.success('confirm'),
  cancel: () => Message.error('cancel'),
  close: () => Message.info('close'),
}

watchLang(use)
onThemeChange()

function createBasic() {
  Dialog.open(t('message'))
}

async function createAction() {
  const action = await Dialog.open(t('message'))
  action && actions[action]?.()
}

function createAndUpdate() {
  const instance = Dialog.open({
    title: t('openDialog'),
    message: t('message'),
  })
  setTimeout(() => instance.update({ title: t('modifyTitle') }), 600)
}

function hideButtons() {
  Dialog.open({
    message: t('message'),
    confirmButton: false,
    cancelButton: false,
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

function createAsyncClose() {
  Dialog.open({
    message: t('message'),
    beforeClose: buttonLoadingClose,
  })
}

function typeText(prefix, type) {
  const key = `${prefix}${type.charAt(0).toUpperCase()}${type.slice(1)}`
  return t(key)
}

function openType(type) {
  Dialog[type]({
    title: typeText('typeTitle', type),
    message: typeText('typeMessage', type),
  })
}

function openComponentType(type) {
  dialogType.value = type
  typeOpen.value = true
}

async function formBeforeClose(action, done, refs) {
  if (action !== 'confirm') {
    done()
    return
  }

  refs.confirmButtonLoading.value = true
  const valid = await formRef.value?.validate()
  refs.confirmButtonLoading.value = false
  if (valid) {
    done()
    Message.success(t('formSubmitted'))
  }
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
    confirmButtonProps: { variant: 'default', status: 'danger' },
  })
  action && actions[action]?.()
}

function createAlert() {
  Dialog.alert({
    title: t('title'),
    message: t('message'),
    type: 'info',
  })
}
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-button status="warning" block @click="basicOpen = true">{{ t('componentCall') }}</mp-button>
  <mp-dialog
    v-model:open="basicOpen"
    :title="t('title')"
    :message="t('message')"
    @confirm="Message.success('confirm')"
    @cancel="Message.error('cancel')"
    @closed="Message.info('closed')"
  />

  <app-type>{{ t('asyncClose') }}</app-type>
  <mp-button status="primary" block @click="createAsyncClose">{{ t('asyncClose') }}</mp-button>
  <mp-button status="warning" block @click="loadingOpen = true">{{ t('buttonLoading') }}</mp-button>
  <mp-dialog
    v-model:open="loadingOpen"
    :title="t('title')"
    :message="t('message')"
    :before-close="buttonLoadingClose"
  />

  <app-type>{{ t('functionCall') }}</app-type>
  <mp-button status="primary" block @click="createBasic">{{ t('basicUsage') }}</mp-button>
  <mp-button status="primary" block @click="createOpen">{{ t('openDialog') }}</mp-button>
  <mp-button status="primary" block @click="createAndUpdate">{{ t('updateDialog') }}</mp-button>
  <mp-button status="primary" block @click="createAction">{{ t('handleUserBehavior') }}</mp-button>
  <mp-button status="primary" block @click="hideButtons">{{ t('hideButton') }}</mp-button>

  <app-type>{{ t('alertDialog') }}</app-type>
  <mp-button status="primary" block @click="createAlert">{{ t('alertDialog') }}</mp-button>

  <app-type>{{ t('confirmBox') }}</app-type>
  <mp-button status="primary" block @click="createConfirm">{{ t('confirmDialog') }}</mp-button>
  <mp-button status="danger" block @click="createDangerConfirm">{{ t('dangerConfirm') }}</mp-button>
  <mp-button status="warning" block @click="confirmOpen = true">{{ t('componentCall') }}</mp-button>
  <mp-dialog v-model:open="confirmOpen" type="warning" :title="t('confirmTitle')" :message="t('confirmMessage')" />

  <app-type>{{ t('typeIcon') }}</app-type>
  <mp-button v-for="type in dialogTypes" :key="type" status="primary" block @click="openType(type)">
    {{ typeText('typeLabel', type) }}
  </mp-button>
  <mp-button status="warning" block @click="openComponentType('warning')">
    {{ t('componentCall') }}
  </mp-button>
  <mp-dialog
    v-model:open="typeOpen"
    :type="dialogType"
    :title="typeText('typeTitle', dialogType)"
    :message="typeText('typeMessage', dialogType)"
    @click-overlay="Message.info('click-overlay')"
  />

  <app-type>{{ t('formDialog') }}</app-type>
  <mp-button status="warning" block @click="formOpen = true">{{ t('formDialog') }}</mp-button>
  <mp-dialog v-model:open="formOpen" :title="t('formDialog')" :before-close="formBeforeClose">
    <mp-form ref="formRef" :model="formData">
      <mp-form-item field="name" :label="t('name')" :rules="[(value) => !!value || t('requiredField')]">
        <mp-input v-model="formData.name" :placeholder="t('namePlaceholder')" />
      </mp-form-item>
      <mp-form-item field="email" :label="t('email')" :rules="[(value) => !!value || t('requiredField')]">
        <mp-input v-model="formData.email" type="email" :placeholder="t('emailPlaceholder')" />
      </mp-form-item>
    </mp-form>
  </mp-dialog>

  <app-type>{{ t('customFooter') }}</app-type>
  <mp-button status="warning" block @click="slotsOpen = true">{{ t('customSlots') }}</mp-button>
  <mp-dialog v-model:open="slotsOpen">
    <template #title>
      <m-icon-info-circle-fill color="var(--mp-color-primary)" />
    </template>
    <mp-cell>{{ t('message') }}</mp-cell>
    <mp-cell>{{ t('message') }}</mp-cell>
    <template #footer="{ confirm, cancel, close }">
      <div class="dialog-demo__footer">
        <mp-button variant="text" @click="close">{{ t('close') }}</mp-button>
        <mp-button variant="text" @click="cancel">{{ t('cancel') }}</mp-button>
        <mp-button status="primary" @click="confirm">{{ t('confirm') }}</mp-button>
      </div>
    </template>
  </mp-dialog>

  <app-type>{{ t('customButtonText') }}</app-type>
  <mp-button status="warning" block @click="customTextOpen = true">{{ t('customButtonText') }}</mp-button>
  <mp-dialog
    v-model:open="customTextOpen"
    :title="t('title')"
    :message="t('message')"
    :confirm-button-text="t('continue')"
    :cancel-button-text="t('exit')"
  />

  <app-type>{{ t('layout') }}</app-type>
  <mp-button status="warning" block @click="widthOpen = true">{{ t('customWidth') }}</mp-button>
  <mp-dialog v-model:open="widthOpen" :width="320" :title="t('title')" :message="t('message')" />
  <mp-button status="warning" block @click="simpleOpen = true">{{ t('simpleDialog') }}</mp-button>
  <mp-dialog v-model:open="simpleOpen" simple :title="t('title')" :message="t('message')" />
  <mp-button status="warning" block @click="draggableOpen = true">{{ t('draggableDialog') }}</mp-button>
  <mp-dialog v-model:open="draggableOpen" draggable :title="t('title')" :message="t('message')" />
  <mp-button status="warning" block @click="fullscreenOpen = true">{{ t('fullscreenDialog') }}</mp-button>
  <mp-dialog v-model:open="fullscreenOpen" fullscreen :title="t('title')" :message="t('message')" />

  <app-type>{{ t('advancedProps') }}</app-type>
  <mp-button status="warning" block @click="hideFooterOpen = true">{{ t('hideFooter') }}</mp-button>
  <mp-dialog v-model:open="hideFooterOpen" type="info" :footer="false" :title="t('title')" :message="t('message')" />
  <mp-button status="warning" block @click="hideTitleOpen = true">{{ t('hideTitle') }}</mp-button>
  <mp-dialog v-model:open="hideTitleOpen" type="warning" hide-title :aria-label="t('title')" :message="t('message')" />
  <mp-button status="warning" block @click="customBodyOpen = true">{{ t('customBody') }}</mp-button>
  <mp-dialog
    v-model:open="customBodyOpen"
    type="info"
    :title="t('title')"
    message-align="center"
    body-class="dialog-demo__body--custom"
    :body-style="{
      padding: 0,
      background: 'rgba(41, 121, 255, 0.08)',
      borderRadius: '8px',
    }"
  >
    <div class="dialog-demo__body-content">{{ t('message') }}</div>
  </mp-dialog>
  <mp-button status="warning" block @click="unmountOpen = true">{{ t('unmountOnClose') }}</mp-button>
  <mp-dialog v-model:open="unmountOpen" unmount-on-close :title="t('title')" :message="t('message')" />

  <app-type>{{ t('longContent') }}</app-type>
  <mp-button status="warning" block @click="longContentOpen = true">{{ t('longContent') }}</mp-button>
  <mp-dialog
    v-model:open="longContentOpen"
    :title="t('longContent')"
    :body-style="{ maxHeight: '50vh', overflowY: 'auto' }"
  >
    <p v-for="item in 12" :key="item">{{ item }}. {{ t('longContentMessage') }}</p>
  </mp-dialog>
</template>

<style scoped lang="less">
.mp-button {
  margin-bottom: 11px;
}

.dialog-demo__footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 0 12px 12px;
}

:deep(.dialog-demo__body--custom) {
  font-weight: 500;
}

.dialog-demo__body-content {
  padding: 16px 20px;
}
</style>
