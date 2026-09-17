# 对话框

### 介绍

弹出对话框承载确认、提示和自定义交互。组件式 `<mp-dialog>` 与函数式 `Dialog.*` 共享同一套配置；函数式调用统一使用显式方法，不支持 `Dialog(...)`。



### 基本使用

```demo
../example/demos/basic-usage.vue
```

### async close

```demo
../example/demos/async-close.vue
```

### function call

```demo
../example/demos/function-call.vue
```

### alert dialog

```demo
../example/demos/alert-dialog.vue
```

### confirm box

```demo
../example/demos/confirm-box.vue
```

### type icon

```demo
../example/demos/type-icon.vue
```

### form dialog

```demo
../example/demos/form-dialog.vue
```

### custom footer

```demo
../example/demos/custom-footer.vue
```

### custom button text

```demo
../example/demos/custom-button-text.vue
```

### layout

```demo
../example/demos/layout.vue
```

### 高级用法

```demo
../example/demos/advanced-props.vue
```

### long content

```demo
../example/demos/long-content.vue
```
## 示例

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
| `before-close`                                       | 关闭前拦截                      | `(action, done, refs) => void`                | `-`               |

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
