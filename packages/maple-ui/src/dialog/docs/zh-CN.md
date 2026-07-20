# 对话框

### 介绍

弹出一个对话框展示内容并处理用户交互。`Dialog` 提供**组件式**和**函数式**两种用法，API 完全一致。

- 简单确认：传 `message` + 默认按钮
- 自定义内容：使用 `default` / `title` / `footer` 插槽
- 无需区分 Modal / Dialog，统一使用 `Dialog`

## 函数调用

### 基本使用

```html
<script setup>
import { Dialog } from '@maplejs/maple-ui'
</script>

<template>
  <mp-button type="primary" block @click="Dialog('兰亭临帖 行书如行云流水')">基本使用</mp-button>
</template>
```

### 确认 / Alert / Open

```html
<script setup>
import { Dialog } from '@maplejs/maple-ui'

async function handleConfirm() {
  const action = await Dialog.confirm({
    title: '提示',
    message: '确定删除吗？',
    type: 'warning',
  })
  console.log(action) // confirm | cancel | close
}

function handleAlert() {
  Dialog.alert({
    title: '提示',
    message: '操作成功',
    type: 'success',
  })
}

function handleOpen() {
  Dialog.open({
    title: '编辑',
    message: '自定义内容',
  })
}
</script>
```

### 处理用户行为

`Dialog()` 返回 `Promise<DialogAction> & { close, update }`，包含 `confirm`、`cancel`、`close` 三种结果。

```html
<script setup>
import { Dialog, Message } from '@maplejs/maple-ui'

async function createAction() {
  const action = await Dialog('兰亭临帖 行书如行云流水')
  if (action === 'confirm') Message.success('confirm')
  if (action === 'cancel') Message.error('cancel')
  if (action === 'close') Message.info('close')
}
</script>
```

### 异步关闭

通过 `onBeforeClose(action, done, refs)` 拦截关闭；`refs` 可控制按钮 loading / disabled。

```html
<script setup>
import { Dialog, Message } from '@maplejs/maple-ui'

function onBeforeClose(action, done, refs) {
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

function asyncClose() {
  Dialog({ message: '兰亭临帖 行书如行云流水', onBeforeClose })
}
</script>
```

### 类型图标

设置 `type` 为 `info` / `success` / `warning` / `error`，标题前会显示对应图标。

```html
<script setup>
import { ref } from 'vue'
import { Dialog } from '@maplejs/maple-ui'

const show = ref(false)
const type = ref('info')

function openType(nextType) {
  type.value = nextType
  show.value = true
}

function openInfo() {
  Dialog({
    type: 'info',
    title: '信息提示',
    message: '这是一条普通的信息提示。',
  })
}
</script>

<template>
  <mp-button type="primary" block @click="openInfo">函数调用</mp-button>
  <mp-button type="warning" block @click="openType('warning')">组件调用</mp-button>
  <mp-dialog
    v-model:show="show"
    :type="type"
    title="警告提示"
    message="请确认后再继续操作。"
  />
</template>
```

### 确认框

`Dialog.confirm()` 默认 `type: warning`，标题前显示警告图标。

```html
<script setup>
import { ref } from 'vue'
import { Dialog } from '@maplejs/maple-ui'

const show = ref(false)

async function handleConfirm() {
  const action = await Dialog.confirm({
    title: '确认操作',
    message: '确定要执行此操作吗？',
  })
  console.log(action)
}
</script>

<template>
  <mp-button type="primary" block @click="handleConfirm">函数调用</mp-button>
  <mp-button type="warning" block @click="show = true">组件调用</mp-button>
  <mp-dialog
    v-model:show="show"
    type="warning"
    title="确认操作"
    message="确定要执行此操作吗？"
  />
</template>
```

## 组件调用

### 基本使用

```html
<script setup>
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'

const show = ref(false)
</script>

<template>
  <mp-button type="warning" block @click="show = true">打开对话框</mp-button>
  <mp-dialog
    v-model:show="show"
    title="兰亭序"
    message="兰亭临帖 行书如行云流水"
    @confirm="Message.success('confirm')"
    @cancel="Message.error('cancel')"
  />
</template>
```

### 自定义插槽

```html
<script setup>
import { ref } from 'vue'

const show = ref(false)
</script>

<template>
  <mp-dialog v-model:show="show">
    <template #title>
      <mp-icon name="information" />
    </template>
    <mp-cell>兰亭临帖 行书如行云流水</mp-cell>
    <template #footer="{ confirm, cancel }">
      <mp-button text @click="cancel">取消</mp-button>
      <mp-button type="primary" @click="confirm">确认</mp-button>
    </template>
  </mp-dialog>
</template>
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model:show` | 是否显示对话框 | _boolean_ | `false` |
| `type` | 对话框类型，可选 `info` `success` `warning` `error`（标题前显示对应图标） | _string_ | `-` |
| `title` | 标题 | _string_ | `提示` |
| `width` | 宽度 | _string \| number_ | `-` |
| `message` | 内容（也可使用 default 插槽） | _string_ | `-` |
| `message-align` | 内容对齐，可选 `left` `center` `right` | _string_ | `left` |
| `footer` | 是否展示 footer 区域 | _boolean_ | `true` |
| `hide-title` | 隐藏标题 | _boolean_ | `false` |
| `body-class` | 内容区 class | _string_ | `-` |
| `body-style` | 内容区 style | _object_ | `-` |
| `unmount-on-close` | 关闭后卸载 | _boolean_ | `false` |
| `confirm-button` | 是否显示确认按钮 | _boolean_ | `true` |
| `cancel-button` | 是否显示取消按钮 | _boolean_ | `true` |
| `confirm-button-text` | 确认按钮文字 | _string_ | `确认` |
| `cancel-button-text` | 取消按钮文字 | _string_ | `取消` |
| `confirm-button-text-color` | 确认按钮文字颜色 | _string_ | `-` |
| `cancel-button-text-color` | 取消按钮文字颜色 | _string_ | `-` |
| `confirm-button-color` | 确认按钮颜色 | _string_ | `-` |
| `cancel-button-color` | 取消按钮颜色 | _string_ | `-` |
| `confirm-button-loading` | 确认按钮 loading | _boolean_ | `false` |
| `cancel-button-loading` | 取消按钮 loading | _boolean_ | `false` |
| `confirm-button-disabled` | 确认按钮 disabled | _boolean_ | `false` |
| `cancel-button-disabled` | 取消按钮 disabled | _boolean_ | `false` |
| `confirm-button-props` | 确认按钮 props | _ButtonProps_ | `-` |
| `cancel-button-props` | 取消按钮 props | _ButtonProps_ | `-` |
| `dialog-class` | 对话框 class | _string_ | `-` |
| `dialog-style` | 对话框 style | _object_ | `-` |
| `overlay` | 是否显示遮罩 | _boolean_ | `true` |
| `overlay-class` | 遮罩 class | _string_ | `-` |
| `overlay-style` | 遮罩 style | _object_ | `-` |
| `lock-scroll` | 是否锁定滚动 | _boolean_ | `true` |
| `close-on-click-overlay` | 点击遮罩关闭 | _boolean_ | `true` |
| `close-on-key-escape` | ESC 关闭 | _boolean_ | `true` |
| `teleport` | 挂载位置 | _TeleportProps['to'] \| false_ | `body` |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `open` | 打开时触发 | `-` |
| `opened` | 打开动画结束 | `-` |
| `close` | 关闭时触发 | `-` |
| `closed` | 关闭动画结束 | `-` |
| `before-close` | 关闭前拦截 | `action`, `done`, `refs` |
| `confirm` | 点击确认 | `-` |
| `cancel` | 点击取消 | `-` |
| `click-overlay` | 点击遮罩 | `-` |
| `key-escape` | 按下 ESC | `-` |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `Dialog` | 打开对话框 | _options \| string_ | `Promise<DialogAction> & DialogReturn` |
| `Dialog.open` | 打开对话框 | _options_ | `Promise<DialogAction> & DialogReturn` |
| `Dialog.confirm` | 打开确认框（默认 `type: warning`） | _options_ | `Promise<DialogAction> & DialogReturn` |
| `Dialog.alert` | 打开 alert（无取消按钮） | _options_ | `Promise<DialogAction> & DialogReturn` |
| `Dialog.close` | 关闭当前函数式对话框 | `-` | `-` |
| `Dialog.setDefaultOptions` | 设置默认配置 | _options_ | `-` |
| `Dialog.resetDefaultOptions` | 重置默认配置 | `-` | `-` |

### Dialog Options

函数式调用选项与组件 props 一致，使用 camelCase：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `show` | 是否显示 | _boolean_ | `true` |
| `type` | 类型 | _DialogType_ | `-` |
| `title` | 标题 | _string_ | `提示` |
| `message` | 内容 | _string_ | `-` |
| `messageAlign` | 内容对齐 | _string_ | `left` |
| `footer` | 是否展示 footer | _boolean_ | `true` |
| `hideTitle` | 隐藏标题 | _boolean_ | `false` |
| `bodyClass` / `bodyStyle` | 内容区样式 | - | `-` |
| `unmountOnClose` | 关闭后卸载 | _boolean_ | `false` |
| `confirmButton` / `cancelButton` | 按钮显隐 | _boolean_ | `true` |
| `confirmButtonText` / `cancelButtonText` | 按钮文案 | _string_ | `-` |
| `confirmButtonLoading` / `cancelButtonLoading` | 按钮 loading | _boolean_ | `false` |
| `confirmButtonDisabled` / `cancelButtonDisabled` | 按钮 disabled | _boolean_ | `false` |
| `confirmButtonProps` / `cancelButtonProps` | 按钮 props | _ButtonProps_ | `-` |
| `overlay` / `overlayClass` / `overlayStyle` | 遮罩 | - | - |
| `lockScroll` / `closeOnClickOverlay` / `closeOnKeyEscape` | 交互 | _boolean_ | 见 props |
| `teleport` | 挂载位置 | _TeleportProps['to'] \| false_ | `body` |
| `onOpen` / `onOpened` / `onClose` / `onClosed` | 生命周期 | _Function_ | `-` |
| `onConfirm` / `onCancel` | 按钮回调 | _Function_ | `-` |
| `onBeforeClose` | 关闭前拦截 | _(action, done, refs) => void_ | `-` |
| `onClickOverlay` / `onKeyEscape` | 交互回调 | _Function_ | `-` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 内容 | `-` |
| `title` | 标题 | `-` |
| `footer` | 底部操作区 | `slotClass`, `cancel`, `confirm` |

### 类型

```ts
type DialogAction = 'confirm' | 'cancel' | 'close'
type DialogType = 'info' | 'success' | 'warning' | 'error'

interface DialogBeforeCloseRefs {
  confirmButtonLoading: Ref<boolean>
  cancelButtonLoading: Ref<boolean>
  confirmButtonDisabled: Ref<boolean>
  cancelButtonDisabled: Ref<boolean>
}

interface DialogReturn {
  close: () => void
  update: (options: DialogUpdateOptions) => void
}
```

### 样式变量

| 变量名 | 默认值 |
| --- | --- |
| `--dialog-width` | `280px` |
| `--dialog-background` | `var(--color-surface-container-low)` |
| `--dialog-border-radius` | `3px` |
| `--dialog-title-padding` | `20px 20px 0` |
| `--dialog-title-font-size` | `var(--font-size-lg)` |
| `--dialog-message-color` | `#888` |
| `--dialog-message-padding` | `12px 20px` |
| `--dialog-message-line-height` | `24px` |
| `--dialog-message-font-size` | `var(--font-size-md)` |
| `--dialog-actions-padding` | `0 12px 12px` |
| `--dialog-button-margin-left` | `6px` |
| `--dialog-title-color` | `#555` |
| `--dialog-confirm-button-color` | `var(--color-primary)` |
| `--dialog-cancel-button-color` | `var(--color-primary)` |
