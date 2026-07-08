# 标签

### 介绍

标签组件用于标记和分类。本组件 API 与 Cedar Design Web (PC) 的 Tag 组件保持一致。

> 与 [Chip 纸片](#/zh-CN/chip) 的关系：Chip 是早期的标签组件实现（type/normal-mini-small-large/plain/elevation），Tag 是 PC 对齐后的新一代标签组件，提供更完整的 status/size/checkable/loading/closable/bordered 能力。**新场景推荐使用 Tag**，旧 Chip 暂保留以兼容存量代码。

### 主题色标签

通过 `status` 属性设置标签的主题色，可选值与 Button 一致：`default` `primary` `info` `success` `warning` `danger` `secondary` `contrast`。

```html
<template>
  <mp-space>
    <mp-tag>默认</mp-tag>
    <mp-tag status="primary">主要</mp-tag>
    <mp-tag status="info">信息</mp-tag>
    <mp-tag status="success">成功</mp-tag>
    <mp-tag status="warning">警告</mp-tag>
    <mp-tag status="danger">危险</mp-tag>
  </mp-space>
</template>
```

### 描边标签（variant=outline）

通过 `variant="outline"` 属性切换为描边风格。`bordered` 是其旧别名，已废弃。

```html
<template>
  <mp-space>
    <mp-tag variant="outline">默认</mp-tag>
    <mp-tag variant="outline" status="primary">主要</mp-tag>
    <mp-tag variant="outline" status="success">成功</mp-tag>
    <mp-tag variant="outline" status="danger">危险</mp-tag>
  </mp-space>
</template>
```

### 标签尺寸

通过 `size` 属性设置标签尺寸，可选值 `xs` `sm` `md` `lg` `xl`。

```html
<template>
  <mp-space align="center">
    <mp-tag size="xs" status="primary">xs</mp-tag>
    <mp-tag size="sm" status="primary">sm</mp-tag>
    <mp-tag size="md" status="primary">md</mp-tag>
    <mp-tag size="lg" status="primary">lg</mp-tag>
    <mp-tag size="xl" status="primary">xl</mp-tag>
  </mp-space>
</template>
```

### 可关闭标签

通过 `closable` 属性显示关闭按钮，配合 `v-model:visible` 控制显示。

```html
<script setup>
import { ref } from 'vue'

const visible = ref(true)
</script>

<template>
  <mp-tag v-model:visible="visible" closable status="primary">标签</mp-tag>
</template>
```

### 加载中标签

通过 `loading` 属性显示加载状态。

```html
<template>
  <mp-tag loading status="primary">加载中</mp-tag>
</template>
```

### 可选中标签

通过 `checkable` 属性使标签可点击切换选中状态，配合 `v-model:checked` 双向绑定。

```html
<script setup>
import { ref } from 'vue'

const checked = ref(true)
</script>

<template>
  <mp-tag v-model:checked="checked" checkable status="primary">可选中</mp-tag>
</template>
```

### 带图标

通过 `icon` 插槽自定义图标。

```html
<template>
  <mp-tag status="success">
    <template #icon><mp-icon name="check" /></template>
    完成
  </mp-tag>
</template>
```

### 自定义颜色

通过 `color` 与 `text-color` 设置自定义颜色（覆盖 status）。

```html
<template>
  <mp-space>
    <mp-tag color="#66bb6a" text-color="#fff">自定义</mp-tag>
    <mp-tag color="linear-gradient(to right bottom, #6750A4, #D0BCFF)" text-color="#fff">渐变</mp-tag>
  </mp-space>
</template>
```

## API

### 属性

#### Tag Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `status` | 主题色，可选值 `default` `primary` `info` `success` `warning` `danger` `secondary` `contrast` | _string_ | `default` |
| `variant` | 标签变体，可选 `default`（实心） / `outline`（描边） | _string_ | `default` |
| `size` | 尺寸，可选值 `xs` `sm` `md` `lg` `xl` | _string_ | `md` |
| `bordered` | _已废弃_，等价 `variant="outline"`，请改用 `variant` | _boolean_ | `false` |
| `visible` | 是否可见（v-model） | _boolean_ | `true` |
| `default-visible` | 默认是否可见 | _boolean_ | `true` |
| `loading` | 是否为加载中状态 | _boolean_ | `false` |
| `closable` | 是否可关闭（显示关闭按钮） | _boolean_ | `false` |
| `checkable` | 是否可点击选中 | _boolean_ | `false` |
| `checked` | 选中状态（checkable 时有效，v-model） | _boolean_ | `true` |
| `default-checked` | 默认选中状态（checkable 时有效） | _boolean_ | `true` |
| `nowrap` | 内容是否不换行（超出省略） | _boolean_ | `false` |
| `color` | 自定义背景色 | _string_ | `-` |
| `text-color` | 自定义文字色 | _string_ | `-` |

### 事件

#### Tag Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `update:visible` | 可见状态变化 | `(visible: boolean)` |
| `update:checked` | 选中状态变化（checkable 时） | `(checked: boolean)` |
| `close` | 点击关闭按钮 | `(event: MouseEvent)` |
| `check` | 点击切换选中状态（checkable 时） | `(checked: boolean, event: MouseEvent)` |

### 插槽

#### Tag Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 标签内容 |
| `icon` | 前置图标 |
| `close-icon` | 自定义关闭按钮图标 |

### 类型定义

```ts
type TagStatus = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary' | 'contrast' | 'default'
type TagSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
```

### 样式变量

可通过 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名 | 默认值 |
| --- | --- |
| `--mp-tag-border-width` | `1px` |
| `--mp-tag-border-radius` | `4px` |
| `--mp-tag-padding` | `0 8px` |
| `--mp-tag-icon-margin` | `4px` |
| `--mp-tag-font-weight` | `500` |
| `--mp-tag-size-xs-height` | `20px` |
| `--mp-tag-size-sm-height` | `22px` |
| `--mp-tag-size-md-height` | `24px` |
| `--mp-tag-size-lg-height` | `28px` |
| `--mp-tag-size-xl-height` | `32px` |
| `--mp-tag-size-{size}-font-size` | `12px` ~ `14px` |
| `--mp-tag-status-{status}-color` | 各状态背景色 |
| `--mp-tag-status-{status}-text-color` | 各状态文字色 |
| `--mp-tag-status-{status}-border-color` | 各状态边框色（bordered 时生效） |
