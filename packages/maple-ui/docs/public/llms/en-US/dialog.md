<!-- Source: src/dialog/docs/en-US.md; locale: en-US; page: /en-US/dialog -->

# Dialog

## Examples

### Description

Use `<mp-dialog>` for component usage and explicit `Dialog.*` methods for functional usage. Both forms share one configuration model. Callable `Dialog(...)` is not supported.


The sections below follow the same order as the controls in the mobile preview.

### Basic Usage

Component dialogs show the top-right close button by default.

Example source: src/dialog/example/demos/basic-usage.vue

```vue
<script setup>
import { reactive, ref } from 'vue'
import { Dialog, Message } from '@maple-design/ui'

const basicOpen = ref(false)
</script>

<template>
  <mp-button status="warning" block @click="basicOpen = true">组件调用</mp-button>
  <mp-dialog
    v-model:open="basicOpen"
    title="兰亭序"
    message="兰亭临帖 行书如行云流水"
    @confirm="Message.success('confirm')"
    @cancel="Message.error('cancel')"
    @closed="Message.info('closed')"
  />
</template>

<style lang="less" scoped>
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
```

### Function Calls

Example source: src/dialog/example/demos/function-call.vue

```vue
<script setup>
import { Dialog, Message } from '@maple-design/ui'

const actions = {
  confirm: () => Message.success('confirm'),
  cancel: () => Message.error('cancel'),
  close: () => Message.info('close'),
}
function createBasic() {
  Dialog.open('兰亭临帖 行书如行云流水')
}
async function createAction() {
  const action = await Dialog.open('兰亭临帖 行书如行云流水')
  action && actions[action]?.()
}
function createAndUpdate() {
  const instance = Dialog.open({
    title: '打开对话框',
    message: '兰亭临帖 行书如行云流水',
  })
  setTimeout(() => instance.update({ title: '修改标题' }), 600)
}
function hideButtons() {
  Dialog.open({
    message: '兰亭临帖 行书如行云流水',
    confirmButton: false,
    cancelButton: false,
  })
}
function createOpen() {
  Dialog.open({
    title: '兰亭序',
    message: '兰亭临帖 行书如行云流水',
    onConfirm: () => Message.success('confirm'),
  })
}
</script>

<template>
  <mp-button status="primary" block @click="createBasic">基本使用</mp-button>
  <mp-button status="primary" block @click="createOpen">打开对话框</mp-button>
  <mp-button status="primary" block @click="createAndUpdate">动态更新</mp-button>
  <mp-button status="primary" block @click="createAction">处理用户行为</mp-button>
  <mp-button status="primary" block @click="hideButtons">隐藏按钮</mp-button>
</template>

<style lang="less" scoped>
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
```

### Alert Dialog

Example source: src/dialog/example/demos/alert-dialog.vue

```vue
<script setup>
import { Dialog, Message } from '@maple-design/ui'

function createAlert() {
  Dialog.alert({
    title: '兰亭序',
    message: '兰亭临帖 行书如行云流水',
    type: 'info',
  })
}
</script>

<template>
  <mp-button status="primary" block @click="createAlert">Alert 对话框</mp-button>
</template>

<style lang="less" scoped>
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
```

### Confirm Box


The component version uses the same `type="warning"`.

Example source: src/dialog/example/demos/confirm-box.vue

```vue
<script setup>
import { reactive, ref } from 'vue'
import { Dialog, Message } from '@maple-design/ui'

const confirmOpen = ref(false)
const actions = {
  confirm: () => Message.success('confirm'),
  cancel: () => Message.error('cancel'),
  close: () => Message.info('close'),
}
async function createConfirm() {
  const action = await Dialog.confirm({
    title: '确认操作',
    message: '确定要执行此操作吗？',
  })
  action && actions[action]?.()
}
async function createDangerConfirm() {
  const action = await Dialog.confirm({
    title: '危险操作',
    message: '删除后无法恢复，确定继续吗？',
    confirmButtonText: '删除',
    confirmButtonProps: { variant: 'default', status: 'danger' },
  })
  action && actions[action]?.()
}
</script>

<template>
  <mp-button status="primary" block @click="createConfirm">确认对话框</mp-button>
  <mp-button status="danger" block @click="createDangerConfirm">危险操作确认</mp-button>
  <mp-button status="warning" block @click="confirmOpen = true">组件调用</mp-button>
  <mp-dialog v-model:open="confirmOpen" type="warning" title="确认操作" message="确定要执行此操作吗？" />
</template>

<style lang="less" scoped>
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
```

### Semantic Messages

Example source: src/dialog/example/demos/type-icon.vue

```vue
<script setup>
import { reactive, ref } from 'vue'
import { Dialog, Message } from '@maple-design/ui'

const demoText = {
  functionCall: '函数调用',
  basicUsage: '基本使用',
  modifyTitle: '修改标题',
  updateDialog: '动态更新',
  hideButton: '隐藏按钮',
  handleUserBehavior: '处理用户行为',
  asyncClose: '异步关闭',
  confirmDialog: '确认对话框',
  alertDialog: 'Alert 对话框',
  openDialog: '打开对话框',
  typeIcon: '消息提示',
  formDialog: '对话框表单',
  name: '姓名',
  email: '邮箱',
  namePlaceholder: '请输入姓名',
  emailPlaceholder: '请输入邮箱',
  requiredField: '该字段为必填项',
  formSubmitted: '表单提交成功',
  confirmBox: '确认框',
  dangerConfirm: '危险操作确认',
  delete: '删除',
  componentCall: '组件调用',
  customFooter: '自定义底部',
  close: '关闭',
  cancel: '取消',
  confirm: '确认',
  customButtonText: '定制按钮文字',
  continue: '继续',
  exit: '退出',
  buttonLoading: '按钮 Loading',
  advancedProps: '高级用法',
  customWidth: '自定义宽度',
  hideFooter: '隐藏 Footer',
  hideTitle: '隐藏标题',
  customBody: '自定义 body',
  unmountOnClose: '关闭后卸载',
  simpleDialog: '简洁对话框',
  draggableDialog: '可拖动对话框',
  fullscreenDialog: '全屏对话框',
  layout: '布局',
  longContent: '长内容',
  longContentMessage: '长内容保持可滚动，标题和操作按钮保持可见。',
  title: '兰亭序',
  message: '兰亭临帖 行书如行云流水',
  confirmTitle: '确认操作',
  confirmMessage: '确定要执行此操作吗？',
  dangerTitle: '危险操作',
  dangerMessage: '删除后无法恢复，确定继续吗？',
  customSlots: '自定义插槽',
  typeLabelInfo: 'Info',
  typeLabelSuccess: 'Success',
  typeLabelWarning: 'Warning',
  typeLabelError: 'Error',
  typeTitleInfo: '信息提示',
  typeTitleSuccess: '成功提示',
  typeTitleWarning: '警告提示',
  typeTitleError: '错误提示',
  typeMessageInfo: '这是一条普通的信息提示。',
  typeMessageSuccess: '操作已成功完成。',
  typeMessageWarning: '请确认后再继续操作。',
  typeMessageError: '发生错误，请稍后重试。',
}

const typeOpen = ref(false)
const dialogType = ref('info')
const dialogTypes = ['info', 'success', 'warning', 'error']
function typeText(prefix, type) {
  const key = `${prefix}${type.charAt(0).toUpperCase()}${type.slice(1)}`
  return demoText[key] ?? String(key)
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
</script>

<template>
  <mp-button v-for="type in dialogTypes" :key="type" status="primary" block @click="openType(type)">
    {{ typeText('typeLabel', type) }}
  </mp-button>
  <mp-button status="warning" block @click="openComponentType('warning')"> 组件调用 </mp-button>
  <mp-dialog
    v-model:open="typeOpen"
    :type="dialogType"
    :title="typeText('typeTitle', dialogType)"
    :message="typeText('typeMessage', dialogType)"
    @click-overlay="Message.info('click-overlay')"
  />
</template>

<style lang="less" scoped>
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
```

### Dialog Form

Use a component dialog for complex forms and validate from `before-close`.

Example source: src/dialog/example/demos/form-dialog.vue

```vue
<script setup>
import { reactive, ref } from 'vue'
import { Dialog, Message } from '@maple-design/ui'

const formOpen = ref(false)
const formRef = ref(null)
const formData = reactive({ name: '', email: '' })
async function formBeforeClose(action, done, refs) {
  if (action !== 'confirm') {
    done()
    return
  }

  refs.confirmButtonLoading.value = true
  const errors = await formRef.value?.validate()
  refs.confirmButtonLoading.value = false
  if (!errors) {
    done()
    Message.success('表单提交成功')
  }
}
</script>

<template>
  <mp-button status="warning" block @click="formOpen = true">对话框表单</mp-button>
  <mp-dialog v-model:open="formOpen" title="对话框表单" :before-close="formBeforeClose">
    <mp-form ref="formRef" :model="formData">
      <mp-form-item field="name" label="姓名" :rules="[(value) => !!value || '该字段为必填项']">
        <mp-input v-model="formData.name" placeholder="请输入姓名" />
      </mp-form-item>
      <mp-form-item field="email" label="邮箱" :rules="[(value) => !!value || '该字段为必填项']">
        <mp-input v-model="formData.email" type="email" placeholder="请输入邮箱" />
      </mp-form-item>
    </mp-form>
  </mp-dialog>
</template>

<style lang="less" scoped>
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
```

### Custom Footer

Example source: src/dialog/example/demos/custom-footer.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const slotsOpen = ref(false)
</script>

<template>
  <mp-button status="warning" block @click="slotsOpen = true">自定义插槽</mp-button>
  <mp-dialog v-model:open="slotsOpen">
    <template #title>
      <m-icon-info-circle-fill color="var(--mp-color-primary)" />
    </template>
    <mp-cell>兰亭临帖 行书如行云流水</mp-cell>
    <mp-cell>兰亭临帖 行书如行云流水</mp-cell>
    <template #footer="{ confirm, cancel, close }">
      <div class="dialog-demo__footer">
        <mp-button variant="text" @click="close">关闭</mp-button>
        <mp-button variant="text" @click="cancel">取消</mp-button>
        <mp-button status="primary" @click="confirm">确认</mp-button>
      </div>
    </template>
  </mp-dialog>
</template>

<style lang="less" scoped>
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
```

### Custom Button Text

Confirm and cancel buttons use Button's `default` status and `text` variant unless `confirmButtonProps` or `cancelButtonProps` overrides them.

Example source: src/dialog/example/demos/custom-button-text.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const customTextOpen = ref(false)
</script>

<template>
  <mp-button status="warning" block @click="customTextOpen = true">定制按钮文字</mp-button>
  <mp-dialog
    v-model:open="customTextOpen"
    title="兰亭序"
    message="兰亭临帖 行书如行云流水"
    confirm-button-text="继续"
    cancel-button-text="退出"
  />
</template>

<style lang="less" scoped>
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
```

### Layout

The preview demonstrates custom width, simple, draggable, and fullscreen dialogs in this order.

Example source: src/dialog/example/demos/layout.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const widthOpen = ref(false)
const simpleOpen = ref(false)
const draggableOpen = ref(false)
const fullscreenOpen = ref(false)
</script>

<template>
  <mp-button status="warning" block @click="widthOpen = true">自定义宽度</mp-button>
  <mp-dialog v-model:open="widthOpen" :width="320" title="兰亭序" message="兰亭临帖 行书如行云流水" />
  <mp-button status="warning" block @click="simpleOpen = true">简洁对话框</mp-button>
  <mp-dialog v-model:open="simpleOpen" simple title="兰亭序" message="兰亭临帖 行书如行云流水" />
  <mp-button status="warning" block @click="draggableOpen = true">可拖动对话框</mp-button>
  <mp-dialog v-model:open="draggableOpen" draggable title="兰亭序" message="兰亭临帖 行书如行云流水" />
  <mp-button status="warning" block @click="fullscreenOpen = true">全屏对话框</mp-button>
  <mp-dialog v-model:open="fullscreenOpen" fullscreen title="兰亭序" message="兰亭临帖 行书如行云流水" />
</template>

<style lang="less" scoped>
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
```

### Advanced Props

The preview demonstrates hidden footer, hidden title, custom body, and unmount-on-close behavior.

Example source: src/dialog/example/demos/advanced-props.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const hideFooterOpen = ref(false)
const hideTitleOpen = ref(false)
const customBodyOpen = ref(false)
const unmountOpen = ref(false)
</script>

<template>
  <mp-button status="warning" block @click="hideFooterOpen = true">隐藏 Footer</mp-button>
  <mp-dialog
    v-model:open="hideFooterOpen"
    type="info"
    :footer="false"
    title="兰亭序"
    message="兰亭临帖 行书如行云流水"
  />
  <mp-button status="warning" block @click="hideTitleOpen = true">隐藏标题</mp-button>
  <mp-dialog
    v-model:open="hideTitleOpen"
    type="warning"
    hide-title
    aria-label="兰亭序"
    message="兰亭临帖 行书如行云流水"
  />
  <mp-button status="warning" block @click="customBodyOpen = true">自定义 body</mp-button>
  <mp-dialog
    v-model:open="customBodyOpen"
    type="info"
    title="兰亭序"
    message-align="center"
    body-class="dialog-demo__body--custom"
    :body-style="{
      padding: 0,
      background: 'rgba(41, 121, 255, 0.08)',
      borderRadius: '8px',
    }"
  >
    <div class="dialog-demo__body-content">兰亭临帖 行书如行云流水</div>
  </mp-dialog>
  <mp-button status="warning" block @click="unmountOpen = true">关闭后卸载</mp-button>
  <mp-dialog v-model:open="unmountOpen" unmount-on-close title="兰亭序" message="兰亭临帖 行书如行云流水" />
</template>

<style lang="less" scoped>
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
```

### Long Content

Example source: src/dialog/example/demos/long-content.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const longContentOpen = ref(false)
</script>

<template>
  <mp-button status="warning" block @click="longContentOpen = true">长内容</mp-button>
  <mp-dialog v-model:open="longContentOpen" title="长内容" :body-style="{ maxHeight: '50vh', overflowY: 'auto' }">
    <p v-for="item in 12" :key="item">{{ item }}. 长内容保持可滚动，标题和操作按钮保持可见。</p>
  </mp-dialog>
</template>

<style lang="less" scoped>
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
```

### Async Close

`beforeClose` supports boolean/Promise results and the existing done callback. Functional calls default to `simple: true` and `closable: false`.


Component dialogs support the same interception and loading refs through `before-close`.

Example source: src/dialog/example/demos/async-close.vue

```vue
<script setup>
import { reactive, ref } from 'vue'
import { Dialog, Message } from '@maple-design/ui'

const loadingOpen = ref(false)
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
    message: '兰亭临帖 行书如行云流水',
    beforeClose: buttonLoadingClose,
  })
}
</script>

<template>
  <mp-button status="primary" block @click="createAsyncClose">异步关闭</mp-button>
  <mp-button status="warning" block @click="loadingOpen = true">按钮 Loading</mp-button>
  <mp-dialog
    v-model:open="loadingOpen"
    title="兰亭序"
    message="兰亭临帖 行书如行云流水"
    :before-close="buttonLoadingClose"
  />
</template>

<style lang="less" scoped>
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
```

## API

### Props

| Prop                                                 | Description                                | Type                                          | Default          |
| ---------------------------------------------------- | ------------------------------------------ | --------------------------------------------- | ---------------- |
| `open` **(v-model)**                                 | Visible state                              | `boolean`                                     | `-`              |
| `default-open`                                       | Initial uncontrolled state                 | `boolean`                                     | `false`          |
| `title` / `message`                                  | Title and message                          | `string`                                      | `-`              |
| `type`                                               | Semantic icon                              | `'info' \| 'success' \| 'warning' \| 'error'` | `-`              |
| `simple`                                             | Compact layout                             | `boolean`                                     | `false`          |
| `width` / `top`                                      | Width and top offset                       | `number \| string`                            | `-`              |
| `title-align`                                        | Title alignment                            | `'start' \| 'center'`                         | `'center'`       |
| `message-align`                                      | Message alignment                          | `'left' \| 'center' \| 'right'`               | `'left'`         |
| `align-center`                                       | Center vertically and horizontally         | `boolean`                                     | `true`           |
| `footer`                                             | Show footer                                | `boolean`                                     | `true`           |
| `confirm-button` / `cancel-button`                   | Show action buttons                        | `boolean`                                     | `true`           |
| `closable`                                           | Show close button                          | `boolean`                                     | `true`           |
| `confirm-button-text` / `cancel-button-text`         | Button labels                              | `string`                                      | localized        |
| `confirm-button-props` / `cancel-button-props`       | Button props, including colors             | `ButtonProps`                                 | `-`              |
| `confirm-button-loading` / `cancel-button-loading`   | Loading state                              | `boolean`                                     | `false`          |
| `confirm-button-disabled` / `cancel-button-disabled` | Disabled state                             | `boolean`                                     | `false`          |
| `overlay`                                            | Show overlay                               | `boolean`                                     | `true`           |
| `overlay-class` / `dialog-class` / `body-class`      | Custom classes                             | `string \| any[]`                             | `-`              |
| `overlay-style` / `dialog-style` / `body-style`      | Custom styles                              | `StyleValue`                                  | `-`              |
| `overlay-closable` / `esc-to-close` / `lock-scroll`  | Close/scroll behavior                      | `boolean`                                     | `true`           |
| `close-on-route-change`                              | Close on browser history or hash changes   | `boolean`                                     | `false`          |
| `popup-container`                                    | Teleport target; `false` disables teleport | `string \| HTMLElement \| false`              | `'body'`         |
| `hide-title` / `unmount-on-close`                    | Rendering behavior                         | `boolean`                                     | `false`          |
| `draggable` / `fullscreen`                           | Layout modes                               | `boolean`                                     | `false`          |
| `overlay-animation-name` / `dialog-animation-name`   | Transition names                           | `string`                                      | library defaults |
| `aria-label`                                         | Accessible name without a visible title    | `string`                                      | `-`              |
| `close-button-aria-label`                            | Close button label                         | `string`                                      | `'Close dialog'` |
| `z-index`                                            | Stack level                                | `number`                                      | automatic        |
| `before-close` | Boolean/Promise or done callback; first completion wins | `DialogBeforeClose` | — |

### Events and slots

| Event                                  | Arguments       |
| -------------------------------------- | --------------- |
| `update:open`                          | `boolean`       |
| `open` / `opened` / `close` / `closed` | `-`             |
| `confirm` / `cancel`                   | `Event`         |
| `click-overlay`                        | `MouseEvent`    |
| `key-escape`                           | `KeyboardEvent` |

| Slot                | Slot props                   |
| ------------------- | ---------------------------- |
| `default` / `title` | `-`                          |
| `footer`            | `confirm`, `cancel`, `close` |

The component exposes `confirm()`, `cancel()`, and `close()`. Close button, overlay, Escape, and programmatic close use `close` semantics and do not emit `cancel`.

### Functional API

Opening methods accept `DialogConfig | string` and return `Promise<DialogAction | void> & DialogReturn`.
All functional dialogs use the compact layout (`simple: true`) and hide the top-right close button (`closable: false`) by default. Call options or global defaults can explicitly override either value.

| Method                                                       | Behavior                                        |
| ------------------------------------------------------------ | ----------------------------------------------- |
| `Dialog.open(config)`                                        | General dialog                                  |
| `Dialog.confirm(config)`                                     | Warning type and simple layout                  |
| `Dialog.alert(config)`                                       | No cancel button; overlay/Escape close disabled |
| `Dialog.info/success/warning/error(config)`                  | Semantic one-button dialog                      |
| `Dialog.close()`                                             | Close the latest functional dialog              |
| `Dialog.setDefaultOptions(config)` / `resetDefaultOptions()` | Manage functional defaults                      |

`DialogConfig` uses camelCase component props and also supports renderable `content`, `title`, `message`, and `footer`, plus lifecycle and interaction callbacks including `onClickOverlay`. `DialogReturn` exposes `close()` and `update(config)`. The same service is available as `this.$dialog` after installation.

```ts
type DialogAction = 'confirm' | 'cancel' | 'close'
type DialogType = 'info' | 'success' | 'warning' | 'error'
```

### Style Variables

Dialog color roles match Cedar: `--mp-dialog-background` uses the raised surface, `--mp-dialog-overlay-background` controls the backdrop, title and content use the primary content color, the close button uses the secondary content color, and `--mp-dialog-status-{info|success|warning|danger}-color` maps to readable status content roles (content-info/success/warning/danger), not status fills. Override component variables for local themes and system variables for cross-component themes. Mobile borders, sizing, and layout remain platform-specific.

#### Complete token defaults

Token groups: background/overlay-background define panel and scrim; border-* controls panel/separator borders; title-* and content-* control title/body typography and spacing; actions-* controls the footer; close-button-* controls the close action; status-* defines semantic icons; simple-*/fullscreen-* controls those modes; animation-* controls transitions. Width and margin-top define ordinary panel layout. Private drag and positioning variables are not public customization APIs.

The backdrop consumes `sys-color-scrim` through the Dialog component variable. Maple no longer uses Popup colors for Dialog. Set a per-instance backdrop variable via `overlay-style`; a variable on the panel (`dialog-style`) does not inherit to its sibling backdrop. Explicit `overlay-style.backgroundColor` wins. Teleported content needs variables on its actual DOM ancestors. Dark themes inherit the same semantic colors; geometry remains platform-specific. Status icons use readable content colors.

| Variable | Default |
| --- | --- |
| `--mp-dialog-background` | `var(--mp-sys-color-surface-raised)` |
| `--mp-dialog-overlay-background` | `var(--mp-sys-color-scrim)` |
| `--mp-dialog-border-color` | `transparent` |
| `--mp-dialog-border-width` | `0` |
| `--mp-dialog-border-radius` | `3px` |
| `--mp-dialog-width` | `280px` |
| `--mp-dialog-margin-top` | `0` |
| `--mp-dialog-title-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-dialog-title-font-size` | `var(--mp-sys-font-size-lg)` |
| `--mp-dialog-title-font-weight` | `var(--mp-sys-font-weight-regular)` |
| `--mp-dialog-title-padding` | `20px 20px 0` |
| `--mp-dialog-title-min-height` | `0` |
| `--mp-dialog-title-justify` | `space-between` |
| `--mp-dialog-content-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-dialog-content-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-dialog-content-line-height` | `24px` |
| `--mp-dialog-content-padding` | `12px 20px` |
| `--mp-dialog-actions-padding` | `0 12px 12px` |
| `--mp-dialog-actions-button-gap` | `var(--mp-sys-space-3)` |
| `--mp-dialog-close-button-size` | `40px` |
| `--mp-dialog-close-button-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-dialog-close-button-font-size` | `20px` |
| `--mp-dialog-close-button-inset-inline-end` | `0` |
| `--mp-dialog-status-icon-size` | `18px` |
| `--mp-dialog-status-icon-gap` | `var(--mp-sys-space-3)` |
| `--mp-dialog-status-info-color` | `var(--mp-sys-color-content-info)` |
| `--mp-dialog-status-success-color` | `var(--mp-sys-color-content-success)` |
| `--mp-dialog-status-warning-color` | `var(--mp-sys-color-content-warning)` |
| `--mp-dialog-status-danger-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-dialog-simple-width` | `280px` |
| `--mp-dialog-simple-border-radius` | `var(--mp-sys-radius-lg)` |
| `--mp-dialog-simple-padding` | `20px` |
| `--mp-dialog-simple-content-gap` | `0` |
| `--mp-dialog-simple-actions-gap` | `0` |
| `--mp-dialog-fullscreen-width` | `100vw` |
| `--mp-dialog-fullscreen-height` | `100vh` |
| `--mp-dialog-animation-duration` | `var(--mp-sys-motion-duration-slow)` |
| `--mp-dialog-animation-easing` | `var(--mp-sys-motion-easing-standard)` |


## Before hooks and callback compatibility

`beforeClose(action, done, refs)` is the only hook entry. No new closeGuard/confirmGuard/cancelGuard prop is introduced.

Return true/false or `Promise<boolean>`; an async function resolving void allows completion. For callbacks, call done() to allow or done(false) to reject. A synchronous void return waits for done(), so a callback may finish later. First completion wins if callbacks and returned values compete. Pending operations are deduplicated. Throws/rejections preserve the surface and restore temporary button state. The callable done also exposes signal/event for cancellation-aware tasks; Dialog/Drawer retain the original third refs argument. A cancelled or replaced hook cannot commit a late result.

A before hook that only logs synchronously must explicitly return true; synchronous undefined means callback completion is still pending. Old async callbacks that returned `Promise<void>` without calling done now complete on Promise resolution.


Example source: src/dialog/example/demos/en-US/guard-protocol.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { DialogBeforeClose } from '@maple-design/ui'

const open = ref(false)
const mode = ref('promise')
const allowed = ref(false)
const status = ref('')
const check: DialogBeforeClose = (action, done) => {
  status.value = 'Waiting'
  if (mode.value === 'done') {
    setTimeout(() => {
      status.value = allowed.value ? 'Allowed' : 'Rejected'
      done(allowed.value)
    }, 500)
    return
  }
  return new Promise<boolean>((resolve) =>
    setTimeout(() => {
      status.value = allowed.value ? 'Allowed' : 'Rejected'
      resolve(allowed.value)
    }, 500),
  )
}
</script>
<template>
  <mp-space direction="column">
    <mp-switch v-model="allowed" />
    <mp-select
      v-model="mode"
      :options="[
        { value: 'promise', label: 'Promise' },
        { value: 'done', label: 'done callback' },
      ]"
    />
    <mp-button @click="open = true">Open</mp-button>
    <mp-dialog v-model:open="open" :before-close="check" @guard-error="status = 'Error'">
      <template #default
        ><mp-button v-if="false" @click="open = true">Confirm action</mp-button
        ><span v-else>Close with beforeClose</span></template
      >
    </mp-dialog>
    <p role="status">{{ status }}</p>
  </mp-space>
</template>
```


Promise and done share a single completion state: false/done(false) rejects; true/done() allows; a resolved Promise&lt;void&gt; allows. The first completion wins. Errors emit guard-error; cancellation/unmount invalidates late completion. Synchronous void retains the callback protocol and waits for done on these close/confirm guards.
