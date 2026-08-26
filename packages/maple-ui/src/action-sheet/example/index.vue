<script setup>
import { reactive, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { ActionSheet, Message } from '@maplejs/maple-ui'
import { t, use } from './locale'

const rawActions = [
  {
    name: 'Item 01',
    icon: 'account-circle',
  },
  {
    name: 'Item 02',
    icon: 'notebook',
  },
  {
    name: 'Item 03',
    icon: 'wifi',
  },
]
const rawDisabledActions = [
  {
    name: 'Item 01',
    icon: 'account-circle',
  },
  {
    name: 'Item 02',
    icon: 'notebook',
  },
  {
    name: 'Item 03',
    icon: 'wifi',
    disabled: true,
  },
]
const rawCustomStyleActions = [
  {
    name: 'Item 01',
    icon: 'account-circle',
    color: 'var(--mp-color-success)',
  },
  {
    name: 'Item 02',
    icon: 'notebook',
    color: 'var(--mp-color-warning)',
  },
  {
    name: 'Item 03',
    icon: 'wifi',
    color: 'var(--mp-color-info)',
  },
]
const actions = reactive(rawActions)
const disabledActions = reactive(rawDisabledActions)
const customStyleActions = reactive(rawCustomStyleActions)
const open = ref(false)
const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)

watchLang(use)
onThemeChange()

async function createBasic() {
  const action = await ActionSheet({ actions: rawActions })

  action !== 'close' && Message(`${t('yourSelected')}${action.name}`)
}

async function modifyTitle() {
  const action = await ActionSheet({
    actions: rawActions,
    title: t('customTitle'),
  })
  action !== 'close' && Message(`${t('yourSelected')}${action.name}`)
}

async function disableAction() {
  const action = await ActionSheet({
    actions: rawDisabledActions,
  })

  action !== 'close' && Message(`${t('yourSelected')}${action.name}`)
}

async function customActionStyles() {
  const action = await ActionSheet({
    actions: rawCustomStyleActions,
  })

  action !== 'close' && Message(`${t('yourSelected')}${action.name}`)
}

function disableCloseOnClickAction() {
  ActionSheet({
    actions: [
      {
        name: 'Item 01',
        icon: 'account-circle',
      },
      {
        name: 'Item 02',
        icon: 'notebook',
      },
      {
        name: 'Item 03',
        icon: 'wifi',
      },
    ],
    closeOnClickAction: false,
    onSelect: (action) => Message(`${t('yourSelected')}${action.name}`),
  })
}

function handleSelect(action) {
  Message(`${t('yourSelected')}${action.name}`)
}
</script>

<template>
  <app-type>{{ t('functionCall') }}</app-type>
  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button type="primary" block @click="createBasic">{{ t('basicUsage') }}</mp-button>
    <mp-button type="primary" block @click="modifyTitle">{{ t('modifyTitle') }}</mp-button>
    <mp-button type="primary" block @click="disableAction">{{ t('disabled') }}</mp-button>
    <mp-button type="primary" block @click="disableCloseOnClickAction">{{ t('disableCloseOnClickAction') }} </mp-button>
    <mp-button type="primary" block @click="customActionStyles">{{ t('customActionStyles') }}</mp-button>
  </mp-space>

  <app-type>{{ t('componentCall') }}</app-type>
  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button type="warning" block @click="open = true">{{ t('basicUsage') }}</mp-button>
    <mp-button type="warning" block @click="show1 = true">{{ t('modifyTitle') }}</mp-button>
    <mp-button type="warning" block @click="show2 = true">{{ t('disabled') }}</mp-button>
    <mp-button type="warning" block @click="show3 = true">{{ t('disableCloseOnClickAction') }}</mp-button>
    <mp-button type="warning" block @click="show4 = true">{{ t('customActionStyles') }}</mp-button>
  </mp-space>

  <mp-action-sheet v-model:open="open" :actions="actions" @select="handleSelect" />
  <mp-action-sheet v-model:open="show1" :title="t('customTitle')" :actions="actions" @select="handleSelect" />
  <mp-action-sheet v-model:open="show2" :actions="disabledActions" @select="handleSelect" />
  <mp-action-sheet v-model:open="show3" :close-on-click-action="false" :actions="actions" @select="handleSelect" />
  <mp-action-sheet v-model:open="show4" :actions="customStyleActions" @select="handleSelect" />
</template>
