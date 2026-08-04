# 标签

### 介绍

标签用于标记、分类与筛选。API 与 Cedar Design Web (PC) 的 Tag 对齐，并吸收移动端常见能力（圆角、自定义文字色）。

### 主题色标签

通过 `status` 设置主题色，可选值与 Button 一致：`default` `primary` `info` `success` `warning` `danger` `secondary` `contrast`。

```html
<template>
  <mp-space>
    <mp-tag>默认</mp-tag>
    <mp-tag status="primary">主要</mp-tag>
    <mp-tag status="info">信息</mp-tag>
    <mp-tag status="success">成功</mp-tag>
    <mp-tag status="warning">警告</mp-tag>
    <mp-tag status="danger">危险</mp-tag>
    <mp-tag status="secondary">次要</mp-tag>
    <mp-tag status="contrast">对比</mp-tag>
  </mp-space>
</template>
```

### 描边标签

通过 `variant="outline"` 切换为描边风格。

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

### 圆角标签

通过 `round` 开启胶囊圆角。

```html
<template>
  <mp-space>
    <mp-tag round status="primary">圆角</mp-tag>
    <mp-tag round variant="outline" status="success">描边圆角</mp-tag>
  </mp-space>
</template>
```

### 标签尺寸

通过 `size` 设置尺寸，可选值 `xs` `sm` `md` `lg` `xl`。

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

通过 `closable` 显示关闭按钮，配合 `v-model:visible` 或自行维护列表。

```html
<script setup>
import { ref } from 'vue'

const visible = ref(true)
const tags = ref(['标签 1', '标签 2', '标签 3'])

function removeTag(tag) {
  tags.value = tags.value.filter((item) => item !== tag)
}
</script>

<template>
  <mp-space>
    <mp-tag v-model:visible="visible" closable status="primary">标签</mp-tag>
    <mp-tag v-for="tag in tags" :key="tag" closable round @close="removeTag(tag)">
      {{ tag }}
    </mp-tag>
  </mp-space>
</template>
```

### 加载中标签

通过 `loading` 显示加载状态。

```html
<template>
  <mp-tag loading status="primary">加载中</mp-tag>
</template>
```

### 可选中标签

通过 `checkable` 使标签可点击切换选中，配合 `v-model:checked`。

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

通过 `icon` 插槽自定义前缀，`close-icon` 自定义关闭图标。

```html
<template>
  <mp-tag status="success">
    <template #icon><mp-icon name="check" /></template>
    完成
  </mp-tag>
</template>
```

### 自定义颜色

通过 `color` 与 `text-color` 设置自定义颜色（覆盖 status）。`variant="outline"` 时 `color` 作为边框色。

```html
<template>
  <mp-space>
    <mp-tag color="#66bb6a" text-color="#fff">自定义</mp-tag>
    <mp-tag variant="outline" color="#6750A4">描边自定义</mp-tag>
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
| `variant` | 变体，可选 `default`（实心） / `outline`（描边） | _string_ | `default` |
| `size` | 尺寸，可选值 `xs` `sm` `md` `lg` `xl` | _string_ | `md` |
| `round` | 是否为圆角胶囊形 | _boolean_ | `false` |
| `visible` | 是否可见（v-model） | _boolean_ | `true` |
| `default-visible` | 默认是否可见 | _boolean_ | `true` |
| `loading` | 是否为加载中状态 | _boolean_ | `false` |
| `closable` | 是否可关闭 | _boolean_ | `false` |
| `checkable` | 是否可点击选中 | _boolean_ | `false` |
| `checked` | 选中状态（checkable 时有效，v-model） | _boolean_ | `true` |
| `default-checked` | 默认选中状态（checkable 时有效） | _boolean_ | `true` |
| `nowrap` | 内容是否不换行（超出省略） | _boolean_ | `false` |
| `color` | 自定义背景色（outline 时为边框色） | _string_ | `-` |
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
| `icon` | 前缀 |
| `close-icon` | 自定义关闭按钮图标 |

### 类型定义

```ts
type TagStatus = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary' | 'contrast' | 'default'
type TagSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type TagVariant = 'default' | 'outline'
```

### 样式变量

可通过 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名 | 默认值 |
| --- | --- |
| `--mp-tag-border-width` | `1px` |
| `--mp-tag-border-radius` | `4px` |
| `--mp-tag-round-radius` | `100px` |
| `--mp-tag-padding` | `0 10px` |
| `--mp-tag-icon-margin` | `6px` |
| `--mp-tag-font-weight` | `500` |
| `--mp-tag-size-xs-height` | `24px` |
| `--mp-tag-size-sm-height` | `28px` |
| `--mp-tag-size-md-height` | `32px` |
| `--mp-tag-size-lg-height` | `36px` |
| `--mp-tag-size-xl-height` | `40px` |
| `--mp-tag-size-{size}-font-size` | `12px` ~ `16px` |
| `--mp-tag-status-{status}-color` | 各状态背景色 |
| `--mp-tag-status-{status}-text-color` | 各状态文字色 |
| `--mp-tag-status-{status}-border-color` | 各状态边框色（outline 时生效） |
