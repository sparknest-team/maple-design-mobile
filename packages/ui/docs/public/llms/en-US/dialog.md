<!-- Source: src/dialog/docs/en-US.md; locale: en-US; page: /en-US/dialog -->

# Dialog

With `draggable` enabled, title inputs, textareas, buttons, links with href and editable content retain native pointer behavior and do not start a drag. The ordinary title area remains draggable. In non-centered mode, numeric `top=0` is supported just like the string `0px`.

### Description

Use `<mp-dialog>` for component usage and explicit `Dialog.*` methods for functional usage. Both forms share one configuration model. Callable `Dialog(...)` is not supported.


The sections below follow the same order as the controls in the mobile preview.

## Basic examples

### Basic Usage

Component dialogs show the top-right close button by default.

Example source: src/dialog/example/demos/basic-usage.vue

```vue
<script setup>
import { reactive, ref } from 'vue'
import { Dialog, Message } from '@maple-design/ui-vue'

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

## Invocation and content

### Function Calls

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `title` | Title | confirm box、type icon、form dialog |
| `type` | Semantic icon | confirm box、type icon |
| `message` | Message content; the default slot is also supported | confirm box、type icon |
| `before-close` | Return a boolean/Promise or call done; the first completion wins | form dialog |
<!-- demo-config-notes:end -->


Example source: src/dialog/example/demos/function-call.vue

```vue
<script setup>
import { Dialog, Message } from '@maple-design/ui-vue'

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
import { Dialog, Message } from '@maple-design/ui-vue'

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
import { Dialog, Message } from '@maple-design/ui-vue'

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
import { Dialog, Message } from '@maple-design/ui-vue'

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
import { Dialog, Message } from '@maple-design/ui-vue'

const formOpen = ref(false)
const formRef = ref(null)
const formData = reactive({ name: '', email: '' })
async function formBeforeClose({ action }, done) {
  if (action !== 'confirm') {
    done()
    return
  }

  const errors = await formRef.value?.validate()
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

### Programmatic dialog target

Example source: src/dialog/example/demos/service-container.vue

```vue
<script setup lang="ts">
import { getCurrentInstance, h, onBeforeUnmount, ref, shallowRef } from 'vue'
import { Dialog } from '@maple-design/ui-vue'
import ServiceContainerContent from './service-container-content.vue'

const first = ref<HTMLElement>()
const second = ref<HTMLElement>()
const active = shallowRef<ReturnType<typeof Dialog.open>>()
const context = getCurrentInstance()?.appContext
const result = ref('尚未打开 / Not opened')
function openSample() {
  if (!first.value) {
    return
  }
  active.value?.close()
  const owned: ReturnType<typeof Dialog.open> = Dialog.open(
    {
      title: '服务挂载区域 / Service target',
      popupContainer: first.value,
      content: () =>
        h(ServiceContainerContent, {
          onMove(to: 'A' | 'B') {
            const target = to === 'A' ? first.value : second.value
            if (target) {
              owned.update({ popupContainer: target })
            }
          },
        }),
    },
    context,
  )
  active.value = owned
  result.value = '已打开 / Opened'
  void owned.then((action) => {
    if (active.value === owned) {
      active.value = undefined
      result.value = String(action)
    }
  })
}
onBeforeUnmount(() => {
  active.value?.close()
  active.value = undefined
})
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-button @click="openSample">打开区域 A / Open in A</mp-button>
    <div ref="first" data-service-target="A" style="min-height: 64px; border: 1px dashed currentColor; padding: 12px">
      挂载区域 A / Target A
    </div>
    <div ref="second" data-service-target="B" style="min-height: 64px; border: 1px dashed currentColor; padding: 12px">
      挂载区域 B / Target B
    </div>
    <p role="status">{{ result }}</p>
  </mp-space>
</template>
```

## Sizing and layout

### Dialog sizing and long content

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `width` | Width | Dialog sizing and long content |
| `title` | Title | Dialog sizing and long content |
| `message` | Message content; the default slot is also supported | Dialog sizing and long content |
| `simple` | Compact layout | Dialog sizing and long content |
| `draggable` | Allow dragging; ineffective in `fullscreen` mode | Dialog sizing and long content |
| `fullscreen` | Fullscreen display | Dialog sizing and long content |
<!-- demo-config-notes:end -->


Open one dialog at a time to compare widths, fullscreen layouts and long-content boundaries.

<details>
<summary>Configuration details and limits</summary>

#### Layout

The preview demonstrates custom width, simple, draggable, and fullscreen dialogs in this order.

</details>

Example source: src/dialog/example/demos/size-comparison.vue

```vue
<script setup lang="ts">
import { proxyRefs as demoProxyRefs, reactive, ref } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
    const widthOpen = ref(false)

    const simpleOpen = ref(false)

    const draggableOpen = ref(false)

    const fullscreenOpen = ref(false)
    return { widthOpen, simpleOpen, draggableOpen, fullscreenOpen }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
    const longContentOpen = ref(false)
    return { longContentOpen }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="layout">
      <h4><span lang="zh-CN">layout</span><span lang="en-US">Layout</span></h4>
      <mp-button status="warning" block @click="scene1.widthOpen = true">自定义宽度</mp-button>
      <mp-dialog v-model:open="scene1.widthOpen" :width="320" title="兰亭序" message="兰亭临帖 行书如行云流水" />
      <mp-button status="warning" block @click="scene1.simpleOpen = true">简洁对话框</mp-button>
      <mp-dialog v-model:open="scene1.simpleOpen" simple title="兰亭序" message="兰亭临帖 行书如行云流水" />
      <mp-button status="warning" block @click="scene1.draggableOpen = true">可拖动对话框</mp-button>
      <mp-dialog v-model:open="scene1.draggableOpen" draggable title="兰亭序" message="兰亭临帖 行书如行云流水" />
      <mp-button status="warning" block @click="scene1.fullscreenOpen = true">全屏对话框</mp-button>
      <mp-dialog v-model:open="scene1.fullscreenOpen" fullscreen title="兰亭序" message="兰亭临帖 行书如行云流水" />
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="long-content">
      <h4><span lang="zh-CN">long content</span><span lang="en-US">Long Content</span></h4>
      <mp-button status="warning" block @click="scene2.longContentOpen = true">长内容</mp-button>
      <mp-dialog
        v-model:open="scene2.longContentOpen"
        title="长内容"
        :body-style="{
          maxHeight: '50vh',
          overflowY: 'auto',
        }"
      >
        <p v-for="item in 12" :key="item">{{ item }}. 长内容保持可滚动，标题和操作按钮保持可见。</p>
      </mp-dialog>
    </section>
  </div>
</template>

<style scoped lang="less">
.demo-comparison {
  display: grid;
  gap: 24px;
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case {
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case > h4 {
  margin: 0 0 12px;
  font-size: 14px;
}
html:not([lang='en-US']) .demo-comparison-case > h4 > [lang='en-US'],
html[lang='en-US'] .demo-comparison-case > h4 > [lang='zh-CN'] {
  display: none;
}
.demo-comparison-case--1 {
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
}
.demo-comparison-case--2 {
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
}
</style>
```

## Interaction and customization

### Dragging sessions

Example source: src/dialog/example/demos/draggable.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
const draggable = ref(true)
const fullscreen = ref(false)
function keyboard(event: KeyboardEvent) {
  if (event.key.toLowerCase() === 'd') {
    event.preventDefault()
    draggable.value = !draggable.value
  } else if (event.key.toLowerCase() === 'f') {
    event.preventDefault()
    fullscreen.value = !fullscreen.value
  }
}
</script>
<template>
  <mp-button @click="open = true">打开拖动示例 / Open drag example</mp-button>
  <mp-dialog
    v-model:open="open"
    :draggable="draggable"
    :fullscreen="fullscreen"
    title="拖动标题 / Drag title"
    @keydown="keyboard"
    @confirm="open = false"
    @cancel="open = false"
  >
    <p>
      拖动标题时按 D 开关拖动，按 F 开关全屏。关闭后可以重新打开。Drag the title, press D to disable dragging or F for
      fullscreen, and reopen after closing.
    </p>
    <mp-space wrap>
      <mp-button @click="draggable = !draggable">{{
        draggable ? '停用拖动 / Disable drag' : '启用拖动 / Enable drag'
      }}</mp-button>
      <mp-button @click="fullscreen = !fullscreen">{{
        fullscreen ? '退出全屏 / Exit fullscreen' : '进入全屏 / Fullscreen'
      }}</mp-button>
    </mp-space>
    <p role="status">{{ draggable ? '允许拖动 / Drag enabled' : '拖动已停止 / Drag stopped' }}</p>
  </mp-dialog>
</template>
```

### Custom Footer

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `title` | Title | Custom Button Text, Advanced Props |
| `message` | Message content; the default slot is also supported | Custom Button Text, Advanced Props |
| `type` | Semantic icon | Advanced Props |
| `footer` | Show footer | Advanced Props |
| `hide-title` | Hide the title area | Advanced Props |
| `aria-label` | Accessible name without a visible title | Advanced Props |
<!-- demo-config-notes:end -->


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

## Async actions and closing

### Async Close

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `before-close` | Return a boolean/Promise or call done; the first completion wins | Async close, before hooks and callback compatibility |
| `title` | Title | async close |
| `message` | Message content; the default slot is also supported | async close |
<!-- demo-config-notes:end -->


`beforeClose` supports boolean/Promise results and the existing done callback. Functional calls default to `simple: true` and `closable: false`.



Example source: src/dialog/example/demos/async-close.vue

```vue
<script setup>
import { reactive, ref } from 'vue'
import { Dialog, Message } from '@maple-design/ui-vue'

const loadingOpen = ref(false)
function buttonLoadingClose({ action }, done) {
  if (action !== 'confirm') {
    done()
    return
  }

  setTimeout(() => {
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

### Before hooks and callback compatibility

`beforeClose({ action }, done, context)` is the only hook entry. No new closeGuard/confirmGuard/cancelGuard prop is introduced.


A before hook that only logs synchronously must explicitly return true; synchronous undefined means callback completion is still pending. Old async callbacks that returned `Promise<void>` without calling done now complete on Promise resolution.


Example source: src/dialog/example/demos/en-US/guard-protocol.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { DialogBeforeClose } from '@maple-design/ui-vue'

const open = ref(false)
const mode = ref('promise')
const allowed = ref(false)
const status = ref('')
const check: DialogBeforeClose = (payload, done, { signal }) => {
  status.value = `Waiting: ${payload.action}`
  if (mode.value === 'done') {
    setTimeout(() => {
      status.value = allowed.value ? 'Allowed' : 'Rejected'
      done(!signal.aborted && allowed.value)
    }, 500)
    return
  }
  return new Promise<boolean>((resolve) =>
    setTimeout(() => {
      status.value = allowed.value ? 'Allowed' : 'Rejected'
      resolve(!signal.aborted && allowed.value)
    }, 500),
  )
}
</script>
<template>
  <mp-space direction="column" align="stretch">
    <mp-switch v-model="allowed" />
    <mp-form-item layout="vertical" size="sm" label="mode">
      <mp-radio-group
        v-model="mode"
        aria-label="mode"
        :options="[
          { value: 'promise', label: 'Promise' },
          { value: 'done', label: 'done callback' },
        ]"
        variant="button"
        size="sm"
      />
    </mp-form-item>
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


Cancellable hooks use `(payload, done, context)`: closure payloads contain `{ action }`, change/commit payloads contain `{ value, previousValue }`, and Popup uses `{ reason }`. Context provides `signal` and an optional original `event`. Return a boolean/Promise, or call done()/done(false). Synchronous void waits for done; Promise&lt;void&gt; allows the operation. First completion wins. Pending state controls loading/disabled automatically. Cancellation invalidates stale results. Button refs are not exposed.

## Reading direction

Inherits the nearest `dir="ltr|rtl"`, including runtime changes and local overrides. Content, titles and action spacing use logical start/end. External popovers inherit their source direction. Closing, confirmation, cancellation and uncommitted state are unchanged by direction switches.

## Usage notes

### Async operation feedback
Awaited before-* hooks show loading feedback and aria-busy. Rejection or failure restores interaction; repeated input does not start the same operation again. Ordinary event return Promises do not participate in loading.

Programmatic notification callbacks do not control task completion. Service selection/closing results settle independently of callback errors, and closing completion always releases the owned host. Exceptions still propagate through the caller or Vue error channel; returned Promises do not control loading or closing.

### Dragging and cancellation
Title dragging is controlled only by the initiating primary pointer. Disabling `draggable`, closing, entering fullscreen, losing pointer capture or owner-window focus, deactivation and unmount all end the gesture and release listeners and capture. Reenabling requires a new gesture; the previous pointer cannot resume it. Disabling preserves the current offset; fullscreen and the existing post-close reset restore defaults. Listeners belong to the title element's document.

### Programmatic dialog mount targets
Function calls honor `popupContainer` from explicit configuration or `setDefaultOptions`, using the component's selector/HTMLElement resolution and missing/invalid-selector fallback to body. The default targets body; `false` renders inline in the service's own body host. `handle.update({ popupContainer })` moves the same dialog and preserves content state and app context. Closing removes teleported content and its service host, independently of notification callback results. A custom container controls DOM attachment; layout still follows Dialog positioning and its containing block.

## API

### Dialog Props

| Prop | Description | Type | Default |
| ---------------------------------------------------- | ------------------------------- | --------------------------------------------- | ----------------- |
| dir | Reading direction; inherits the source scope when omitted. Physical left/right placements keep their meaning. | `ReadingDirection` (`ltr` / `rtl`) | — |
| `open` **(v-model)** | Visible state | `boolean` | `-` |
| `default-open` | Initial uncontrolled state | `boolean` | `false` |
| `title` | Title | `string` | `-` |
| `message` | Message content; the default slot is also supported | `string` | `-` |
| `type` | Semantic icon | `'info' \| 'success' \| 'warning' \| 'error'` | `-` |
| `simple` | Compact layout | `boolean` | `false` |
| `width` | Width | `number \| string` | `-` |
| `top` | Top offset; ineffective with `align-center` | `number \| string` | `-` |
| `title-align` | Title alignment | `'start' \| 'center'` | `'center'` |
| `message-align` | Message alignment | `'left' \| 'center' \| 'right'` | `'left'` |
| `align-center` | Center vertically and horizontally | `boolean` | `true` |
| `footer` | Show footer | `boolean` | `true` |
| `confirm-button` | Show the confirm button | `boolean` | `true` |
| `cancel-button` | Show the cancel button | `boolean` | `true` |
| `closable` | Show close button | `boolean` | `true` |
| `confirm-button-text` | Confirm button text | `string` | Localized text |
| `cancel-button-text` | Cancel button text | `string` | Localized text |
| `confirm-button-props` | Confirm button props | `ButtonProps` | `-` |
| `cancel-button-props` | Cancel button props | `ButtonProps` | `-` |
| `confirm-button-loading` | Confirm button loading state | `boolean` | `false` |
| `cancel-button-loading` | Cancel button loading state | `boolean` | `false` |
| `confirm-button-disabled` | Confirm button disabled state | `boolean` | `false` |
| `cancel-button-disabled` | Cancel button disabled state | `boolean` | `false` |
| `overlay` | Show overlay | `boolean` | `true` |
| `overlay-class` | Custom overlay classes | `string \| any[]` | `-` |
| `dialog-class` | Custom dialog panel classes | `string \| any[]` | `-` |
| `body-class` | Custom body classes | `string \| any[]` | `-` |
| `overlay-style` | Custom overlay styles | `StyleValue` | `-` |
| `dialog-style` | Custom dialog panel styles | `StyleValue` | `-` |
| `body-style` | Custom body styles | `StyleValue` | `-` |
| `overlay-closable` | Request closure on an overlay click | `boolean` | `true` |
| `esc-to-close` | Request closure on Escape | `boolean` | `true` |
| `lock-scroll` | Lock background scrolling while open | `boolean` | `true` |
| `close-on-route-change` | Close on browser history or hash changes | `boolean` | `false` |
| `popup-container` | Teleport target; `false` disables teleport | `string \| HTMLElement \| false` | `'body'` |
| `hide-title` | Hide the title area | `boolean` | `false` |
| `unmount-on-close` | Unmount after the close animation | `boolean` | `false` |
| `draggable` | Allow dragging; ineffective in `fullscreen` mode | `boolean` | `false` |
| `fullscreen` | Fullscreen display | `boolean` | `false` |
| `overlay-animation-name` | Overlay animation name | `string` | `'mp-fade'` |
| `dialog-animation-name` | Dialog animation name | `string` | `'mp-pop-center'` |
| `aria-label` | Accessible name without a visible title | `string` | `-` |
| `close-button-aria-label` | Close button label | `string` | `'Close dialog'` |
| `z-index` | Outer stacking level | `number` | Automatically distributed |
| `before-close` | Return a boolean/Promise or call done; the first completion wins | `DialogBeforeClose` | — |

### Dialog Events

| Event | Description | Arguments |
| ------------------ | ----------------------- | --------------- |
| `update:open` | Open state changed | `boolean` |
| `open` / `opened` | Opening starts / opening animation completes | `-` |
| `close` / `closed` | Closing starts / closing animation completes | `-` |
| `confirm` | Confirmation closing succeeds | `Event` |
| `cancel` | Cancellation closing succeeds | `Event` |
| `click-overlay` | `MouseEvent` | `MouseEvent` |
| `key-escape` | ESC pressed | `KeyboardEvent` |

The `close` button, overlay, ESC and `close()` all use action `close` without an additional `cancel` event.

Built-in buttons, overlay, Escape, footer methods and instance confirm()/cancel() request beforeClose. Instance close(), returned handle close(), Dialog.close() and parent open=false are direct commands that bypass guards; a controlled parent still decides whether to accept update:open(false). Direct closing retires pending guards so late results cannot close a reopened instance. close does not mean leave completion; observe closed/onClosed. Maple Popup close()/requestClose() instead return `Promise<boolean>` for guarded requests.

### Dialog Slots / Methods

| Slot | Description | Prop |
| --------- | ---------- | ---------------------------- |
| `default` | Content | `-` |
| `title` | Title | `-` |
| `footer` | Show footer | `confirm`, `cancel`, `close` |

Instances expose `confirm()`, `cancel()` and `close()`.

### Dialog Methods

All open methods accept `DialogConfig | string` and return `Promise<DialogAction | void> & DialogReturn`.
Function-based Dialog calls default to simple layout (`simple: true`) with the top-right close button hidden (`closable: false`). Explicit options or global defaults can override both.

| Method | Default behavior |
| ------------------------------------------- | ----------------------------------- |
| `Dialog.open(config)` | Ordinary dialog |
| `Dialog.confirm(config)` | `type: 'warning'`, simple layout |
| `Dialog.alert(config)` | No cancel button; overlay/ESC closing disabled |
| `Dialog.info/success/warning/error(config)` | Corresponding status, no cancel button, simple layout |
| `Dialog.close()` | Close the latest functional dialog |
| `Dialog.setDefaultOptions(config)` | Set default programmatic options |
| `Dialog.resetDefaultOptions()` | Reset default programmatic options |

`DialogConfig` matches camelCase component props and additionally supports renderable `content`/`title`/`message`/`footer` plus `onOpen`/`onOpened`/`onClose`/`onClosed`/`onConfirm`/`onCancel`/`onClickOverlay`/`onKeyEscape`.

`DialogReturn.close()` closes this dialog; `DialogReturn.update(config)` updates mutable configuration. After installation, `this.$dialog` exposes the same API.

```ts
type DialogAction = 'confirm' | 'cancel' | 'close'
type DialogType = 'info' | 'success' | 'warning' | 'error'
```

## CSS Variables

Variables use `--mp-`, e.g. `--mp-dialog-width`, `--mp-dialog-background`, `--mp-dialog-border-radius`, `--mp-dialog-simple-width`, `--mp-dialog-fullscreen-width` and `--mp-dialog-close-button-color`.

Color semantics match Cedar: `--mp-dialog-background` uses `surface-raised`; `--mp-dialog-overlay-background` controls scrim; titles/body use primary content and close controls secondary content. `--mp-dialog-status-{info|success|warning|danger}-color` uses readable content-info/success/warning/danger, not status fill. Business themes should override component variables; shared themes override system variables. Mobile borderless geometry/layout remain independent.

The backdrop consumes `sys-color-scrim` through the Dialog component variable. Dialog uses its own backdrop variables. Set a per-instance backdrop variable via `overlay-style`; a variable on the panel (`dialog-style`) does not inherit to its sibling backdrop. Explicit `overlay-style.backgroundColor` wins. Teleported content needs variables on its actual DOM ancestors. Dark themes inherit the same semantic colors; geometry remains platform-specific. Status icons use readable content colors.

Variables are grouped by purpose: background/overlay-background for panel/scrim; border-* for panel/divider borders; title-* for title typography; content-* for body typography; actions-* for actions; close-button-* for the close button; status-* for semantic icons; simple-*/fullscreen-* for mode dimensions; animation-* for enter/leave motion. width/margin-top control ordinary panel layout. Internal drag/position variables are not public customization points.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-dialog-actions-button-gap` | `var(--mp-sys-space-3)` | `margin-inline-start` |
| `--mp-dialog-actions-padding` | `0 12px 12px` | `padding` |
| `--mp-dialog-animation-duration` | `var(--mp-sys-motion-duration-slow)` | `transition` |
| `--mp-dialog-animation-easing` | `var(--mp-sys-motion-easing-standard)` | `transition` |
| `--mp-dialog-background` | `var(--mp-sys-color-surface-raised)` | `background` |
| `--mp-dialog-border-color` | `transparent` | `border` |
| `--mp-dialog-border-radius` | `3px` | `border-radius` |
| `--mp-dialog-border-width` | `0` | `border` |
| `--mp-dialog-close-button-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-dialog-close-button-font-size` | `20px` | `font-size` |
| `--mp-dialog-close-button-inset-inline-end` | `0` | `margin-inline-end` |
| `--mp-dialog-close-button-size` | `40px` | `height`, `width` |
| `--mp-dialog-content-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-dialog-content-line-height` | `24px` | `line-height` |
| `--mp-dialog-content-padding` | `12px 20px` | `padding` |
| `--mp-dialog-content-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-dialog-fullscreen-height` | `100vh` | `height` |
| `--mp-dialog-fullscreen-width` | `100vw` | `width` |
| `--mp-dialog-margin-top` | `0` | `margin-top` |
| `--mp-dialog-overlay-background` | `var(--mp-sys-color-scrim)` | `background-color` |
| `--mp-dialog-simple-actions-gap` | `0` | `margin-top` |
| `--mp-dialog-simple-border-radius` | `var(--mp-sys-radius-lg)` | `border-radius` |
| `--mp-dialog-simple-content-gap` | `0` | `margin-top` |
| `--mp-dialog-simple-padding` | `20px` | `padding` |
| `--mp-dialog-simple-width` | `280px` | `width` |
| `--mp-dialog-status-danger-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-dialog-status-icon-gap` | `var(--mp-sys-space-3)` | `margin-inline-end` |
| `--mp-dialog-status-icon-size` | `18px` | `font-size` |
| `--mp-dialog-status-info-color` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-dialog-status-success-color` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-dialog-status-warning-color` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-dialog-title-font-size` | `var(--mp-sys-font-size-lg)` | `font-size` |
| `--mp-dialog-title-font-weight` | `var(--mp-sys-font-weight-regular)` | `font-weight` |
| `--mp-dialog-title-justify` | `space-between` | `justify-content` |
| `--mp-dialog-title-min-height` | `0` | `min-height` |
| `--mp-dialog-title-padding` | `20px 20px 0` | `padding` |
| `--mp-dialog-title-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-dialog-width` | `280px` | `width` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-dialog-actions-button-gap: var(--mp-sys-space-3);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
