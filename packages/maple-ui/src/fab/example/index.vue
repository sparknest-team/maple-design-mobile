<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const status = ref('primary')
const trigger = ref('click')
const direction = ref('top')
const position = ref('right-bottom')
const open = ref(true)
const active = ref(false)
const drag = ref(false)
const disabled = ref(false)
const elevation = ref(2)

watchLang(use)
onThemeChange()

function toggleTrigger() {
  open.value = !open.value
}

function toggleActions() {
  active.value = !active.value
}
</script>

<template>
  <app-type :style="{ marginTop: position.includes('top') ? '20vmin' : undefined }">{{ t('type') }}</app-type>
  <mp-select v-model="status" :hint="false">
    <mp-option :label="t('default')" value="default" />
    <mp-option :label="t('primary')" value="primary" />
    <mp-option :label="t('info')" value="info" />
    <mp-option :label="t('success')" value="success" />
    <mp-option :label="t('warning')" value="warning" />
    <mp-option :label="t('danger')" value="danger" />
  </mp-select>

  <app-type>{{ t('position') }}</app-type>
  <mp-radio-group v-model="position">
    <mp-radio value="left-top">left-top</mp-radio>
    <mp-radio value="right-top">right-top</mp-radio>
    <mp-radio value="left-bottom">left-bottom</mp-radio>
    <mp-radio value="right-bottom">right-bottom</mp-radio>
  </mp-radio-group>

  <app-type>{{ t('trigger') }}</app-type>
  <mp-radio-group v-model="trigger">
    <mp-radio value="click">click</mp-radio>
    <mp-radio value="hover">hover</mp-radio>
  </mp-radio-group>

  <app-type>{{ t('direction') }}</app-type>
  <mp-radio-group v-model="direction">
    <mp-radio value="top">top</mp-radio>
    <mp-radio value="right">right</mp-radio>
    <mp-radio value="bottom">bottom</mp-radio>
    <mp-radio value="left">left</mp-radio>
  </mp-radio-group>

  <app-type>{{ t('drag') }}</app-type>
  <mp-switch v-model="drag" />

  <app-type>{{ t('disabled') }}</app-type>
  <mp-switch v-model="disabled" />

  <app-type>{{ t('elevation') }}</app-type>
  <mp-slider v-model="elevation" max="24"></mp-slider>

  <app-type>{{ t('triggerToggle') }}</app-type>
  <mp-button status="primary" @click.stop="toggleTrigger">{{ t('toggle') }}</mp-button>

  <app-type>{{ t('actionsToggle') }}</app-type>
  <mp-button status="primary" @click.stop="toggleActions">{{ t('toggle') }}</mp-button>

  <mp-fab
    v-model:active="active"
    :open="open"
    :status="status"
    :position="position"
    :direction="direction"
    :trigger="trigger"
    :drag="drag"
    :disabled="disabled"
    :elevation="elevation"
  >
    <mp-button status="info" icon-container :disabled="disabled">
      <m-icon-account-circle />
    </mp-button>
    <mp-button status="success" icon-container :disabled="disabled">
      <m-icon-checkbox-marked-circle />
    </mp-button>
    <mp-button status="warning" icon-container :disabled="disabled">
      <m-icon-bell />
    </mp-button>
    <mp-button status="danger" icon-container :disabled="disabled">
      <m-icon-delete />
    </mp-button>
  </mp-fab>
</template>
