<script setup>
import { reactive, ref } from 'vue'
import { ActionSheet, Message } from '@maple-design/ui'

const rawActions = [
  {
    name: 'Item 01',
    icon: 'user-circle-fill',
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
    icon: 'user-circle-fill',
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
    icon: 'user-circle-fill',
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
async function createBasic() {
  const action = await ActionSheet({ actions: rawActions })

  action !== 'close' && Message(`${'您选择的是:'}${action.name}`)
}
async function modifyTitle() {
  const action = await ActionSheet({
    actions: rawActions,
    title: '选择一个你喜欢的吧',
  })
  action !== 'close' && Message(`${'您选择的是:'}${action.name}`)
}
async function disableAction() {
  const action = await ActionSheet({
    actions: rawDisabledActions,
  })

  action !== 'close' && Message(`${'您选择的是:'}${action.name}`)
}
async function customActionStyles() {
  const action = await ActionSheet({
    actions: rawCustomStyleActions,
  })

  action !== 'close' && Message(`${'您选择的是:'}${action.name}`)
}
function disableCloseOnClickAction() {
  ActionSheet({
    actions: [
      {
        name: 'Item 01',
        icon: 'user-circle-fill',
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
    onSelect: (action) => Message(`${'您选择的是:'}${action.name}`),
  })
}
</script>

<template>
  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button status="primary" block @click="createBasic">基本使用</mp-button>
    <mp-button status="primary" block @click="modifyTitle">修改标题</mp-button>
    <mp-button status="primary" block @click="disableAction">禁用选项</mp-button>
    <mp-button status="primary" block @click="disableCloseOnClickAction">禁用点击选项时关闭动作面板 </mp-button>
    <mp-button status="primary" block @click="customActionStyles">自定义选项样式</mp-button>
  </mp-space>
</template>
