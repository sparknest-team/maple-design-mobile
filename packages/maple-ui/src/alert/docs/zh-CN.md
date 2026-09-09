# 警告信息

### 介绍

警告信息组件会向用户显示简短的消息，但不会中断他们的使用。

### 标题

```html
<template>
  <mp-alert title="傲慢与偏见" />
</template>
```

### 信息

```html
<template>
  <mp-alert message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。" />
</template>
```

### 类型

`type` 可选值：`info` / `success` / `warning` / `danger` / `default`。`default` 不显示内置图标。

```html
<template>
  <mp-space direction="column" size="lg">
    <mp-alert title="傲慢与偏见" message="…" />
    <mp-alert status="success" title="…" message="…" />
    <mp-alert status="warning" title="…" message="…" />
    <mp-alert status="danger" title="…" message="…" />
    <mp-alert status="default" title="…" message="…" />
  </mp-space>
</template>
```

### 变体

`variant` 可选值：`standard` / `tonal` / `outline`。

```html
<template>
  <mp-space direction="column" size="lg">
    <mp-alert variant="standard" title="…" message="…" />
    <mp-alert variant="tonal" title="…" message="…" />
    <mp-alert variant="outline" title="…" message="…" />
  </mp-space>
</template>
```

### 居中

```html
<template>
  <mp-alert message="提示信息" center />
</template>
```

### 通栏（Banner）

```html
<template>
  <mp-alert message="提示信息" banner />
</template>
```

### 隐藏图标

```html
<template>
  <mp-alert title="…" message="…" :show-icon="false" />
</template>
```

### 自定义图标

```html
<template>
  <mp-alert title="…" message="…">
    <template #icon>
      <m-icon-heart-fill />
    </template>
  </mp-alert>
</template>
```

### 操作区

```html
<template>
  <mp-alert title="…" message="…">
    <template #action>
      <mp-button size="xs" status="primary">详情</mp-button>
    </template>
  </mp-alert>
</template>
```

### 允许关闭

```html
<template>
  <mp-alert title="…" message="…" closable @close="onClose" @closed="onClosed" />
</template>
```

### 自定义关闭图标

```html
<template>
  <mp-alert title="…" message="…" closable>
    <template #close-icon>
      <m-icon-close />
    </template>
  </mp-alert>
</template>
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| status | 类型，可选值为 `info` / `success` / `warning` / `danger` / `default` | _AlertStatus_ | `info` |
| `variant` | 变体，可选值为 `standard` / `outline` / `tonal` | _AlertVariant_ | `standard` |
| `color` | 自定义背景色 | _string_ | `-` |
| `title` | 标题 | _string_ | `-` |
| `message` | 内容 | _string_ | `-` |
| `show-icon` | 是否显示左侧图标 | _boolean_ | `true` |
| `closable` | 是否显示关闭按钮（注意：不再使用 `closeable`） | _boolean_ | `false` |
| `banner` | 通栏模式（去除圆角） | _boolean_ | `false` |
| `center` | 内容是否居中 | _boolean_ | `false` |
| `elevation` | 海拔高度，可选值为 `true` / `false` 和 `0-24` | _number \| boolean_ | `false` |

### 插槽

| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |
| `title` | 标题 |
| `icon` | 前缀 |
| `action` | 右侧操作区 |
| `close-icon` | 关闭图标 |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `close` | 点击关闭按钮时触发 | `event: Event` |
| `closed` | 关闭过渡结束后触发 | `-` |

### 类型定义

```ts
import type { AlertProps, AlertStatus, AlertVariant, AlertInstance } from 'maple-ui'
```

### 样式变量

参见 `alert.less` 中 `:root` 下的 `--mp-alert-*` 变量。所有变量统一以 `--mp-alert-` 前缀，可通过 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

## 升级提示（Breaking）

- `closeable` → `closable`
- 新增 `default` 类型与 `show-icon` / `banner` / `center` / `closed` API
- 移除 `content` 插槽（结构调整为 `body`）

## 同源实现与平台边界

两端各自保存完整源码，不引用公共核心，不共享组件实例或响应式状态；修改时同步维护两份实现。主体、Props、关键样式及配对测试纳入只读源码一致性检查，主题 token 和安装入口各自维护。

关闭按钮支持键盘操作，close 只触发一次，closed 在离场动画完成后触发。Maple 内部关闭类由 __close-icon 调整为 __close-btn；默认图标资源由各库本地适配。
