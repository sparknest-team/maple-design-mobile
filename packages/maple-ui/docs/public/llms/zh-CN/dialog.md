<!-- Source: src/dialog/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/dialog -->

# 对话框

## 案例

### 介绍

弹出对话框承载确认、提示和自定义交互。组件式 `<mp-dialog>` 与函数式 `Dialog.*` 共享同一套配置；函数式调用统一使用显式方法，不支持 `Dialog(...)`。

### 基本使用

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

### long content

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


左侧示例章节与右侧手机预览按相同顺序排列。

### 基本用法

组件式 Dialog 默认显示右上角关闭按钮。

```html
<script setup>
  import { ref } from 'vue'

  const open = ref(false)
</script>

<template>
  <mp-button status="warning" block @click="open = true">组件调用</mp-button>
  <mp-dialog v-model:open="open" title="标题" message="对话框内容" />
</template>
```

### 异步关闭

`beforeClose(action, done, refs)` 只有调用 `done()` 才会关闭。函数式返回值同时是 Promise，并提供 `close()`、`update()`。

```ts
const instance = Dialog.open({
  message: '正在提交',
  // 函数式调用默认 simple: true、closable: false
  beforeClose(action, done, refs) {
    if (action !== 'confirm') return done()
    refs.confirmButtonLoading.value = true
    submit().then(done)
  },
})

instance.update({ message: '提交完成' })
const action = await instance // 'confirm' | 'cancel' | 'close'
```

组件式调用同样支持 `before-close` 和按钮 loading。

```html
<mp-dialog v-model:open="open" title="标题" message="对话框内容" :before-close="beforeClose" />
```

### 函数调用

```ts
Dialog.open('对话框内容')
const instance = Dialog.open({ title: '标题', message: '对话框内容' })
instance.update({ title: '更新后的标题' })

const action = await Dialog.open('对话框内容')
Dialog.open({ message: '对话框内容', confirmButton: false, cancelButton: false })
```

### Alert 对话框

```ts
Dialog.alert({ title: '提示', message: '对话框内容', type: 'info' })
```

### 确认框

```ts
await Dialog.confirm({ title: '确认操作', message: '确定要继续吗？' })
await Dialog.confirm({
  title: '危险操作',
  message: '删除后无法恢复，确定继续吗？',
  confirmButtonProps: { variant: 'default', status: 'danger' },
})
```

组件式确认框使用相同的 `type="warning"`。

### 消息提示

```ts
Dialog.info({ title: '信息提示', message: '普通信息' })
Dialog.success({ title: '成功提示', message: '操作成功' })
Dialog.warning({ title: '警告提示', message: '请确认后继续' })
Dialog.error({ title: '错误提示', message: '操作失败' })
```

### 对话框表单

复杂表单使用组件式 Dialog，并在 `before-close` 中完成校验。

```html
<mp-dialog v-model:open="open" title="对话框表单" :before-close="beforeClose">
  <mp-form ref="formRef" :model="formData">...</mp-form>
</mp-dialog>
```

### 自定义底部

```html
<mp-dialog v-model:open="open">
  <template #footer="{ close, cancel, confirm }">
    <mp-button variant="text" @click="close">关闭</mp-button>
    <mp-button variant="text" @click="cancel">取消</mp-button>
    <mp-button status="primary" @click="confirm">确认</mp-button>
  </template>
</mp-dialog>
```

### 定制按钮文字

确认与取消按钮默认使用 Button 的 `default` 状态和 `text` 变体；可通过 `confirmButtonProps` / `cancelButtonProps` 指定 `status`、`variant`。

```html
<mp-dialog v-model:open="open" confirm-button-text="继续" cancel-button-text="退出" />
```

### 布局

右侧依次展示自定义宽度、简洁模式、可拖动和全屏模式。

```html
<mp-dialog v-model:open="open" :width="320" />
<mp-dialog v-model:open="simpleOpen" simple />
<mp-dialog v-model:open="draggableOpen" draggable />
<mp-dialog v-model:open="fullscreenOpen" fullscreen />
```

### 高级属性

右侧依次展示隐藏 Footer、隐藏标题、自定义内容区和关闭后卸载。

```html
<mp-dialog v-model:open="open" :footer="false" />
<mp-dialog v-model:open="hideTitleOpen" hide-title aria-label="标题" />
<mp-dialog v-model:open="customBodyOpen" body-class="custom-body" :body-style="{ padding: 0 }" />
<mp-dialog v-model:open="unmountOpen" unmount-on-close />
```

### 长内容

```html
<mp-dialog v-model:open="open" :body-style="{ maxHeight: '50vh', overflowY: 'auto' }">
  <p v-for="item in 12" :key="item">{{ item }}. 可滚动的长内容</p>
</mp-dialog>
```

### function call

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

### alert dialog

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

### confirm box

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

### type icon

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

### form dialog

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

### custom footer

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

### custom button text

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

### layout

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

### 高级用法

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

### async close

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

| 参数                                                 | 说明                            | 类型                                          | 默认值            |
| ---------------------------------------------------- | ------------------------------- | --------------------------------------------- | ----------------- |
| `open` **(v-model)**                                 | 是否显示                        | `boolean`                                     | `-`               |
| `default-open`                                       | 非受控默认显示                  | `boolean`                                     | `false`           |
| `title`                                              | 标题                            | `string`                                      | `-`               |
| `message`                                            | 内容（也可用 default 插槽）     | `string`                                      | `-`               |
| `type`                                               | 类型图标                        | `'info' \| 'success' \| 'warning' \| 'error'` | `-`               |
| `simple`                                             | 简洁布局                        | `boolean`                                     | `false`           |
| `width`                                              | 宽度                            | `number \| string`                            | `-`               |
| `top`                                                | 顶部距离，`align-center` 时无效 | `number \| string`                            | `-`               |
| `title-align`                                        | 标题对齐                        | `'start' \| 'center'`                         | `'center'`        |
| `message-align`                                      | 内容对齐                        | `'left' \| 'center' \| 'right'`               | `'left'`          |
| `align-center`                                       | 垂直水平居中                    | `boolean`                                     | `true`            |
| `footer`                                             | 是否展示底部操作区              | `boolean`                                     | `true`            |
| `confirm-button` / `cancel-button`                   | 显示操作按钮                    | `boolean`                                     | `true`            |
| `closable`                                           | 显示右上角关闭按钮              | `boolean`                                     | `true`            |
| `confirm-button-text` / `cancel-button-text`         | 按钮文案                        | `string`                                      | 本地化文案        |
| `confirm-button-props` / `cancel-button-props`       | 按钮配置，颜色等也从这里传      | `ButtonProps`                                 | `-`               |
| `confirm-button-loading` / `cancel-button-loading`   | 按钮 loading                    | `boolean`                                     | `false`           |
| `confirm-button-disabled` / `cancel-button-disabled` | 禁用按钮                        | `boolean`                                     | `false`           |
| `overlay`                                            | 是否显示背景层                  | `boolean`                                     | `true`            |
| `overlay-class` / `dialog-class` / `body-class`      | 自定义 class                    | `string \| any[]`                             | `-`               |
| `overlay-style` / `dialog-style` / `body-style`      | 自定义 style                    | `StyleValue`                                  | `-`               |
| `overlay-closable`                                   | 点击背景层关闭                  | `boolean`                                     | `true`            |
| `esc-to-close`                                       | ESC 关闭                        | `boolean`                                     | `true`            |
| `lock-scroll`                                        | 打开时锁定背景滚动              | `boolean`                                     | `true`            |
| `close-on-route-change`                              | 浏览器历史或 hash 变化时关闭     | `boolean`                                     | `false`           |
| `popup-container`                                    | 挂载位置，`false` 禁用 teleport | `string \| HTMLElement \| false`              | `'body'`          |
| `hide-title`                                         | 隐藏标题区                      | `boolean`                                     | `false`           |
| `unmount-on-close`                                   | 关闭动画后卸载                  | `boolean`                                     | `false`           |
| `draggable`                                          | 允许拖动，`fullscreen` 时无效   | `boolean`                                     | `false`           |
| `fullscreen`                                         | 全屏显示                        | `boolean`                                     | `false`           |
| `overlay-animation-name`                             | 背景层动画名                    | `string`                                      | `'mp-fade'`       |
| `dialog-animation-name`                              | 对话框动画名                    | `string`                                      | `'mp-pop-center'` |
| `aria-label`                                         | 无可见标题时的无障碍名称        | `string`                                      | `-`               |
| `close-button-aria-label`                            | 关闭按钮无障碍名称              | `string`                                      | `'Close dialog'`  |
| `z-index`                                            | 层级                            | `number`                                      | 自动分配          |
| `before-close` | 返回 boolean/Promise 或调用 done；首次完成生效 | `DialogBeforeClose` | — |

### Events

| 事件名             | 说明                    | 参数            |
| ------------------ | ----------------------- | --------------- |
| `update:open`      | 显示状态变化            | `boolean`       |
| `open` / `opened`  | 开始打开 / 打开动画结束 | `-`             |
| `close` / `closed` | 开始关闭 / 关闭动画结束 | `-`             |
| `confirm`          | 确认关闭成功            | `Event`         |
| `cancel`           | 取消关闭成功            | `Event`         |
| `click-overlay`    | 点击背景层              | `MouseEvent`    |
| `key-escape`       | 按下 ESC                | `KeyboardEvent` |

关闭按钮、背景层、ESC 和 `close()` 的 action 都是 `close`，不会额外触发 `cancel`。

### Slots 与实例方法

| 插槽名    | 说明       | 参数                         |
| --------- | ---------- | ---------------------------- |
| `default` | 内容       | `-`                          |
| `title`   | 标题       | `-`                          |
| `footer`  | 底部操作区 | `confirm`, `cancel`, `close` |

组件实例暴露 `confirm()`、`cancel()`、`close()`。

### 函数式方法

所有打开方法都接受 `DialogConfig | string`，返回 `Promise<DialogAction | void> & DialogReturn`。
所有函数式 Dialog 默认使用简洁布局（`simple: true`）并隐藏右上角关闭按钮（`closable: false`），仍可通过传入参数或全局默认配置显式覆盖。

| 方法                                        | 默认行为                            |
| ------------------------------------------- | ----------------------------------- |
| `Dialog.open(config)`                       | 普通对话框                          |
| `Dialog.confirm(config)`                    | `type: 'warning'`、简洁布局         |
| `Dialog.alert(config)`                      | 无取消按钮，不允许背景层或 ESC 关闭 |
| `Dialog.info/success/warning/error(config)` | 对应类型、无取消按钮、简洁布局      |
| `Dialog.close()`                            | 关闭最近打开的函数式对话框          |
| `Dialog.setDefaultOptions(config)`          | 设置函数式默认配置                  |
| `Dialog.resetDefaultOptions()`              | 重置函数式默认配置                  |

`DialogConfig` 与组件 Props 一致（camelCase），并额外支持可渲染的 `content`、`title`、`message`、`footer`，以及 `onOpen`、`onOpened`、`onClose`、`onClosed`、`onConfirm`、`onCancel`、`onClickOverlay`、`onKeyEscape` 回调。

`DialogReturn.close()` 关闭当前对话框；`DialogReturn.update(config)` 更新可变配置。安装后也可通过 `this.$dialog` 调用相同 API。

```ts
type DialogAction = 'confirm' | 'cancel' | 'close'
type DialogType = 'info' | 'success' | 'warning' | 'error'
```

### 样式变量

变量均以 `--mp-` 开头，例如 `--mp-dialog-width`、`--mp-dialog-background`、`--mp-dialog-border-radius`、`--mp-dialog-simple-width`、`--mp-dialog-fullscreen-width` 和 `--mp-dialog-close-button-color`。

与 Cedar 一致的颜色语义：`--mp-dialog-background` 使用浮层背景（`surface-raised`），`--mp-dialog-overlay-background` 控制遮罩，标题与正文使用主要内容色，关闭按钮使用次要内容色；`--mp-dialog-status-{info|success|warning|danger}-color` 对应可读状态内容色（content-info/success/warning/danger），不是状态填充色。业务主题优先覆盖组件变量，跨组件主题覆盖对应 system 变量。移动端无边框、尺寸与布局差异保持独立。

#### 完整变量默认值

遮罩通过 Dialog 组件变量消费 `sys-color-scrim`；Maple 不再借用 Popup 的遮罩颜色。实例遮罩变量可放在 `overlay-style` 上；放在面板 `dialog-style` 上的变量不会继承给兄弟遮罩节点。显式 `overlay-style.backgroundColor` 优先。Teleport 场景需要在实际 DOM 祖先作用域设置变量。暗色主题继承同一套颜色语义；几何保留平台差异。状态图标改用可读的 content 状态色。

变量按用途分组：background／overlay-background 是面板与遮罩；border-* 是面板或分隔线边框；title-* 是标题排版；content-* 是正文排版；actions-* 是操作区；close-button-* 是关闭按钮；status-* 是语义图标；simple-*／fullscreen-* 是对应模式的尺寸；animation-* 是入退场动效。width／margin-top 控制常规面板布局。内部拖动与定位变量不构成公开定制入口。

| 变量 | 默认值 |
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


## before 钩子与 done 兼容

`beforeClose(action, done, refs)` 为统一入口，不新增另一套命名。

返回 true/false 或 `Promise<boolean>`；async 函数正常完成且返回 void 时放行。回调方式使用 done() 放行、done(false) 拒绝；同步返回 void 时等待 done，可异步调用。返回值和 done 同时使用时，第一次完成生效。等待中去重；异常保留弹层并恢复临时按钮状态。done 同时携带 signal/event，Dialog/Drawer 原第三参数 refs 保留。关闭、卸载或更换钩子会使旧结果失效。

只记录日志的同步钩子应显式 return true；同步 undefined 表示仍在等待回调。注意：以前返回 `Promise<void>` 却不调用 done 的异步钩子，现在会在 Promise 完成后放行。


Example source: src/dialog/example/demos/guard-protocol.vue

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


Promise 与 done 共用一次完成状态：`false` / `done(false)` 阻止，`true` / `done()` 允许；Promise&lt;void&gt; 正常完成允许。重复完成只生效一次，异常触发 guard-error，取消或卸载后迟到结果无效。此类关闭/确认回调同步返回 void 时保留原回调协议，等待 done。
