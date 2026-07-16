<script setup>
import { reactive, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const disabled = ref(false)
const divider = ref(false)
const collapseRef = ref(null)
const expandIconPosition = ref('right')

const values = reactive({
  value: ['1'],
  value1: [],
  value2: [1],
  value3: ['1'],
  value4: ['2'],
  value5: [],
  value6: ['2', '4'],
  value7: ['1'],
  value8: ['1'],
  value9: ['1', '2'],
  nested: ['1.1'],
})

watchLang(use)
onThemeChange()

function handleChange(val) {
  console.log(val)
}

function toggleAll() {
  collapseRef.value.toggleAll({ expand: 'inverse' })
}

function toggleAllSkipDisabled() {
  collapseRef.value.toggleAll({ expand: 'inverse', skipDisabled: true })
}

function openAll() {
  collapseRef.value.toggleAll({ expand: true })
}

function openAllSkipDisabled() {
  collapseRef.value.toggleAll({ expand: true, skipDisabled: true })
}

function closeAll() {
  collapseRef.value.toggleAll({ expand: false })
}

function closeAllSkipDisabled() {
  collapseRef.value.toggleAll({ expand: false, skipDisabled: true })
}
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-collapse v-model:active-names="values.value" @change="handleChange">
    <mp-collapse-item :title="t('title')" name="1">{{ t('text') }}</mp-collapse-item>
    <mp-collapse-item :title="t('title')" name="2">{{ t('text') }}</mp-collapse-item>
  </mp-collapse>

  <app-type>{{ t('hideMargin') }}</app-type>
  <mp-collapse v-model:active-names="values.value4" :offset="false">
    <mp-collapse-item :title="t('title')" name="1">{{ t('text') }}</mp-collapse-item>
    <mp-collapse-item :title="t('title')" name="2">{{ t('text') }}</mp-collapse-item>
  </mp-collapse>

  <app-type>{{ t('controlledDivider') }}</app-type>
  <mp-button style="margin-bottom: 8px" @click="divider = !divider">{{
    divider ? t('hideDivider') : t('showDivider')
  }}</mp-button>
  <mp-collapse v-model:active-names="values.value5" :divider="divider">
    <mp-collapse-item :title="t('title')" name="1">{{ t('text') }}</mp-collapse-item>
    <mp-collapse-item :title="t('title')" name="2">{{ t('text') }}</mp-collapse-item>
    <mp-collapse-item :title="t('title')" name="3">{{ t('text') }}</mp-collapse-item>
  </mp-collapse>

  <app-type>{{ t('accordionMode') }}</app-type>
  <mp-collapse v-model:active-names="values.value1" accordion :offset="false">
    <mp-collapse-item :title="t('title')" name="1">{{ t('text') }}</mp-collapse-item>
    <mp-collapse-item :title="t('title')" name="2">{{ t('text') }}</mp-collapse-item>
  </mp-collapse>

  <app-type>{{ t('disabled') }}</app-type>
  <mp-space direction="column" :size="[8, 8]">
    <mp-button @click="disabled = !disabled">
      {{ disabled ? t('enable') : t('disabled') }}
    </mp-button>
    <mp-collapse v-model:active-names="values.value2">
      <mp-collapse-item :title="t('title')" :name="1" :disabled="disabled">{{ t('text') }}</mp-collapse-item>
      <mp-collapse-item :title="t('title')" :name="2" :disabled="disabled">{{ t('text') }}</mp-collapse-item>
    </mp-collapse>
  </mp-space>

  <app-type>{{ t('customContent') }}</app-type>
  <mp-collapse v-model:active-names="values.value3">
    <template #expand-icon="{ active }">
      <span>{{ active ? '▼' : '▶' }}</span>
    </template>
    <mp-collapse-item :title="t('slotTitle')" name="1">
      <template #extra>{{ t('extra') }}</template>
      {{ t('text') }}
    </mp-collapse-item>
    <mp-collapse-item name="2">
      <template #title>{{ t('slotTitle') }}</template>
      <template #expand-icon="{ active }">{{ active ? '^^' : 'vv' }}</template>
      {{ t('slotContent') }}
    </mp-collapse-item>
  </mp-collapse>

  <app-type>{{ t('iconPosition') }}</app-type>
  <mp-button style="margin-bottom: 8px" @click="expandIconPosition = expandIconPosition === 'right' ? 'left' : 'right'">
    {{ expandIconPosition === 'right' ? t('iconLeft') : t('iconRight') }}
  </mp-button>
  <mp-collapse v-model:active-names="values.value7" :expand-icon-position="expandIconPosition">
    <mp-collapse-item :title="t('title')" name="1">{{ t('text') }}</mp-collapse-item>
    <mp-collapse-item :title="t('title')" name="2">{{ t('text') }}</mp-collapse-item>
  </mp-collapse>

  <app-type>{{ t('nested') }}</app-type>
  <mp-collapse v-model:active-names="values.value8" destroy-on-hide>
    <mp-collapse-item :title="t('title')" name="1">
      <mp-collapse v-model:active-names="values.nested" destroy-on-hide :elevation="false" :offset="false">
        <mp-collapse-item :title="t('title')" name="1.1">{{ t('text') }}</mp-collapse-item>
        <mp-collapse-item :title="t('title')" name="1.2">{{ t('text') }}</mp-collapse-item>
      </mp-collapse>
    </mp-collapse-item>
    <mp-collapse-item :title="t('title')" name="2">{{ t('text') }}</mp-collapse-item>
    <mp-collapse-item :title="t('title')" name="3">{{ t('text') }}</mp-collapse-item>
  </mp-collapse>

  <app-type>{{ t('destroyOnHide') }}</app-type>
  <mp-collapse v-model:active-names="values.value9" destroy-on-hide>
    <mp-collapse-item :title="t('title')" name="1">{{ t('text') }}</mp-collapse-item>
    <mp-collapse-item :title="t('title')" name="2">{{ t('text') }}</mp-collapse-item>
    <mp-collapse-item :title="t('title')" name="3" :show-expand-icon="false">{{ t('text') }}</mp-collapse-item>
  </mp-collapse>

  <app-type>{{ t('toggleAll') }}</app-type>
  <mp-button style="margin: 8px" @click="toggleAll">{{ t('toggleAll') }}</mp-button>
  <mp-button style="margin: 8px" @click="toggleAllSkipDisabled">{{ t('toggleAllSkipDisabled') }}</mp-button>
  <mp-button style="margin: 8px" @click="openAll">{{ t('openAll') }}</mp-button>
  <mp-button style="margin: 8px" @click="openAllSkipDisabled">{{ t('openAllSkipDisabled') }}</mp-button>
  <mp-button style="margin: 8px" @click="closeAll">{{ t('closeAll') }}</mp-button>
  <mp-button style="margin: 8px 8px 16px 8px" @click="closeAllSkipDisabled">{{ t('closeAllSkipDisabled') }}</mp-button>
  <mp-collapse ref="collapseRef" v-model:active-names="values.value6" style="margin-bottom: 40px">
    <mp-collapse-item :title="t('slotTitle')" name="1">{{ t('text') }}</mp-collapse-item>
    <mp-collapse-item :title="t('slotTitle')" name="2"> {{ t('text') }}</mp-collapse-item>
    <mp-collapse-item :title="t('slotTitle')" disabled name="3"> {{ t('text') }}</mp-collapse-item>
    <mp-collapse-item :title="t('slotTitle')" disabled name="4"> {{ t('text') }}</mp-collapse-item>
  </mp-collapse>
</template>
