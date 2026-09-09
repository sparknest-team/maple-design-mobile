<script setup>
import { ref, watch } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { Message } from '@maplejs/maple-ui'
import { t, use } from './locale'

const status = ref('primary')
const trigger = ref('click')
const direction = ref('top')
const position = ref('right-bottom')
const open = ref(true)
const active = ref(true)
const drag = ref(false)
const disabled = ref(false)
const elevation = ref(2)

watch(direction, (value) => {
  if (value === 'bottom') {
    position.value = position.value.replace('bottom', 'top')
  }
  if (value === 'top') {
    position.value = position.value.replace('top', 'bottom')
  }
  if (value === 'right') {
    position.value = position.value.replace('right', 'left')
  }
  if (value === 'left') {
    position.value = position.value.replace('left', 'right')
  }
  active.value = true
})
watch(position, (value) => {
  if (value.includes('top') && direction.value === 'top') {
    direction.value = 'bottom'
  }
  if (value.includes('bottom') && direction.value === 'bottom') {
    direction.value = 'top'
  }
  if (value.includes('left') && direction.value === 'left') {
    direction.value = 'right'
  }
  if (value.includes('right') && direction.value === 'right') {
    direction.value = 'left'
  }
})

function runAction(action) {
  Message.info(t(action))
  active.value = false
}

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
  <section class="fab-demo-preview" :aria-label="t('preview')">
    <strong>{{ t('preview') }}</strong>
    <p>{{ drag ? t('dragHint') : t('previewHint') }}</p>
    <span aria-live="polite">{{
      !open ? t('hiddenState') : disabled ? t('disabled') : active ? t('expandedState') : t('collapsedState')
    }}</span>
    <mp-fab
      v-model:active="active"
      :open="open"
      :fixed="drag"
      :popup-container="drag ? 'body' : false"
      :status="status"
      :position="position"
      :direction="direction"
      :trigger="trigger"
      :drag="drag"
      :disabled="disabled"
      :elevation="elevation"
    >
      <mp-button
        status="info"
        icon-container
        :disabled="disabled"
        :aria-label="t('profile')"
        @click="runAction('profile')"
      >
        <template #icon><m-icon-user-circle-fill /></template>
      </mp-button>
      <mp-button
        status="success"
        icon-container
        :disabled="disabled"
        :aria-label="t('complete')"
        @click="runAction('complete')"
      >
        <template #icon><m-icon-checkbox-marked-circle-fill /></template>
      </mp-button>
      <mp-button
        status="warning"
        icon-container
        :disabled="disabled"
        :aria-label="t('notify')"
        @click="runAction('notify')"
      >
        <template #icon><m-icon-bell-fill /></template>
      </mp-button>
    </mp-fab>
  </section>

  <app-type>{{ t('type') }}</app-type>
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
  <mp-slider v-model="elevation" :max="24"></mp-slider>

  <app-type>{{ t('triggerToggle') }}</app-type>
  <mp-button status="primary" @click.stop="toggleTrigger">{{ t('toggle') }}</mp-button>

  <app-type>{{ t('actionsToggle') }}</app-type>
  <mp-button status="primary" @click.stop="toggleActions">{{ t('toggle') }}</mp-button>
</template>

<style scoped>
.fab-demo-preview {
  position: relative;
  height: 340px;
  box-sizing: border-box;
  padding: 16px;
  border: 1px dashed var(--mp-color-primary);
  border-radius: 12px;
  background: var(--mp-color-bg-1);
  --mp-fab-top: 90px;
}
.fab-demo-preview p {
  margin: 8px 0;
  font-size: 13px;
  line-height: 1.5;
}
</style>
