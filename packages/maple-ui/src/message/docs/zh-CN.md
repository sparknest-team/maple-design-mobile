# 全局提示

### 介绍

用于向用户显示轻量级全局反馈。`Message` 提供**组件式**和**函数式**两种用法。

与 Cedar 共享的函数式能力：基本使用、消息类型、自定义图标、位置、显示时长、可关闭、更新内容、Loading 常驻、多实例。下方「组件调用」与 Mobile 扩展仅为 Maple。

## 函数调用

### 基本使用

```html
<script setup>
import { Message } from '@maplejs/maple-ui'
</script>

<template>
  <mp-button status="primary" block @click="Message('这是一条消息提示')">基本使用</mp-button>
</template>
```

### 消息类型

`info` / `success` / `warning` / `error` / `loading` / `normal`。`loading` 默认 `duration: 0`（需手动 `close`）。`normal` 默认无图标。

```html
<script setup>
import { Message } from '@maplejs/maple-ui'

Message.info('信息提示')
Message.success('成功提示')
Message.warning('警告提示')
Message.error('错误提示')
Message.normal('普通提示')
</script>
```

### 自定义图标

```html
<script setup>
import { h } from 'vue'
import { Message, Icon } from '@maplejs/maple-ui'

Message.info({
  content: '这是一条消息提示',
  icon: () => h(Icon, { name: 'heart-fill', style: { paddingRight: '12px' } }),
})
</script>
```

### 位置

`top` / `center` / `bottom`（`center` 为 Mobile 扩展，Cedar 仅 `top` / `bottom`）。

```html
<script setup>
import { Message } from '@maplejs/maple-ui'

Message({ content: '顶部提示', position: 'top' })
Message({ content: '底部提示', position: 'bottom' })
</script>
```

### 显示时长

```html
<script setup>
import { Message } from '@maplejs/maple-ui'

Message({ content: '这是一条消息提示', duration: 1000 })
</script>
```

### 可关闭

```html
<script setup>
import { Message } from '@maplejs/maple-ui'

Message({ content: '这是一条消息提示', closable: true, duration: 0 })
</script>
```

### 更新内容

通过相同 `id` 更新已有消息。

```html
<script setup>
import { Message } from '@maplejs/maple-ui'

function update() {
  Message.info({ id: 'task', content: '更新中...', duration: 0 })
  setTimeout(() => {
    Message.success({ id: 'task', content: '更新完成', duration: 2000 })
  }, 1000)
}
</script>
```

### Loading 常驻

`Message.loading` 默认不自动关闭，调用返回句柄的 `close`。

```html
<script setup>
import { Message } from '@maplejs/maple-ui'

function openLoading() {
  const message = Message.loading('等待中...')
  setTimeout(() => {
    message.close()
    Message.success('加载成功')
  }, 2000)
}
</script>
```

### 多实例

默认支持同屏堆叠多个消息。`Message.clear()` 清空全部；也可 `Message.clear('top')` 按位置清空。

```html
<script setup>
import { Message } from '@maplejs/maple-ui'

function openMultiple() {
  const message1 = Message('Message 1')
  Message.success('Message 2')
  Message.warning('Message 3')
  setTimeout(() => message1.close(), 1000)
}
</script>
```

### 自定义操作（Mobile）

函数式可传入 `action`（Cedar 不支持）。

```html
<script setup>
import { h } from 'vue'
import { Message, Button } from '@maplejs/maple-ui'

const message = Message({
  content: 'Hello, Maple',
  action: () =>
    h(Button, { size: 'sm', type: 'primary', onClick: () => message.close() }, { default: () => '关闭' }),
})
</script>
```

## 组件调用

仅 Maple 支持声明式。

### 基本使用

```html
<script setup>
import { ref } from 'vue'

const show = ref(false)
</script>

<template>
  <mp-button status="primary" block @click="show = !show">基本使用</mp-button>
  <mp-message v-model:open="open">这是一条消息提示</mp-message>
</template>
```

### 垂直排列

```html
<script setup>
import { ref } from 'vue'

const show = ref(false)
</script>

<template>
  <mp-message v-model:open="open" :vertical="true">
    这是一条消息提示
    <template #action>
      <mp-button status="primary" :elevation="false" size="sm" @click="show = false">关闭</mp-button>
    </template>
  </mp-message>
</template>
```

### 底部显示

```html
<script setup>
import { ref } from 'vue'

const show = ref(false)
</script>

<template>
  <mp-message v-model:open="open" position="bottom">
    这是一条消息提示
    <template #action>
      <mp-button status="primary" :elevation="false" size="sm" @click="show = false">关闭</mp-button>
    </template>
  </mp-message>
</template>
```

### 自定义图标

```html
<script setup>
import { ref } from 'vue'

const show = ref(false)
</script>

<template>
  <mp-message v-model:open="open">
    这是一条消息提示
    <template #icon>
      <m-icon-heart />
    </template>
  </mp-message>
</template>
```

### 禁止穿透点击

```html
<script setup>
import { ref } from 'vue'

const show = ref(false)
</script>

<template>
  <mp-message v-model:open="open" :forbid-click="true">这是一条消息提示</mp-message>
</template>
```

### 可关闭

```html
<script setup>
import { ref } from 'vue'

const show = ref(false)
</script>

<template>
  <mp-message v-model:open="open" closable :duration="0" type="info">这是一条消息提示</mp-message>
</template>
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model:open` | 是否显示 | _boolean_ | `false` |
| `type` | 类型：`success` `warning` `info` `error` `loading` `normal` | _string_ | `-` |
| `position` | 位置：`top` `center` `bottom` | _string_ | `top` |
| `content` | 内容 | _string_ | `-` |
| `content-class` | 内容 class | _string_ | `-` |
| `duration` | 显示时长（ms），`0` 不自动关闭 | _number_ | `3000` |
| `elevation` | 海拔 | _boolean \| string \| number_ | `true` |
| `vertical` | 垂直布局 | _boolean_ | `false` |
| `show-icon` | 是否显示图标 | _boolean_ | `true` |
| `closable` | 是否显示关闭按钮 | _boolean_ | `false` |
| `forbid-click` | 禁止穿透点击 | _boolean_ | `false` |
| `lock-scroll` | 锁定滚动 | _boolean_ | `false` |
| `popup-container` | 挂载位置 | _TeleportProps['to'] \| false_ | `body` |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `open` | 打开时触发 | `-` |
| `opened` | 打开动画结束 | `-` |
| `close` | 关闭时触发 | `-` |
| `closed` | 关闭动画结束 | `-` |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `Message` | 打开消息 | _options \| string_ | `MessageReturn` |
| `Message.info/success/warning/error/loading/normal` | 按类型打开 | _options \| string_ | `MessageReturn` |
| `Message.clear` | 清空消息 | _position?_ | `-` |
| `Message.setDefaultOptions` | 设置默认配置 | _options_ | `-` |
| `Message.resetDefaultOptions` | 重置默认配置 | `-` | `-` |

### Message Options

与 Cedar `MessageConfig` **共享核心字段**：`content`、`id`、`type`、`icon`、`position`、`showIcon`、`closable`、`duration`、`onClose`。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `id` | 唯一 id，相同则更新 | _string \| number_ | 自动生成 |
| `content` | 内容 | _string \| VNode \| () => VNode_ | `-` |
| `type` | 类型 | _MessageType_ | `-` |
| `position` | 位置（Mobile 含 `center`） | _MessagePosition_ | `top` |
| `duration` | 时长，`loading` 默认 `0` | _number_ | `3000` |
| `showIcon` | 是否显示图标 | _boolean_ | `true` |
| `closable` | 关闭按钮 | _boolean_ | `false` |
| `icon` / `action` | 自定义图标 / 操作区（`action` 为 Mobile 扩展） | _SlotType_ | `-` |
| `forbidClick` / `lockScroll` / `vertical` / `elevation` | Mobile 扩展 | - | 见 props |
| `onOpen` / `onOpened` / `onClose` / `onClosed` | 生命周期 | _Function_ | `-` |

### MessageReturn

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| `close` | 关闭当前消息 | `() => void` |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | 内容 |
| `icon` | 图标 |
| `action` | 右侧操作区 |

### 样式变量

| 变量名 | 默认值 |
| --- | --- |
| `--message-width` | `256px` |
| `--message-color` | `rgba(255, 255, 255, 0.87)` |
| `--message-border-radius` | `4px` |
| `--message-background` | `#333` |
| `--message-font-size` | `var(--font-size-md)` |
| `--message-margin` | `6px 24px` |
| `--message-success-background` | `var(--color-success)` |
| `--message-info-background` | `var(--color-info)` |
| `--message-error-background` | `var(--color-danger)` |
| `--message-warning-background` | `var(--color-warning)` |
| `--message-content-padding` | `14px 16px` |
| `--message-action-margin` | `0 8px` |
| `--message-icon-margin` | `0 8px` |
| `--message-vertical-action-margin` | `0 8px 8px 0` |
