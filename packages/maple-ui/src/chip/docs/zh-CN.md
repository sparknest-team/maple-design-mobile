# 纸片

### 介绍

纸片组件，用于显示一些条目，并且支持关闭条目。

> ⚠️ 推荐迁移到 [Tag 标签](#/zh-CN/tag)：Tag 与 Cedar Design Web (PC) 的 `CTag` API 保持一致，提供完整的 `status` / `size` / `checkable` / `loading` / `closable` / `bordered` 能力。Chip 仍可使用，但新场景请优先选择 Tag。

### 纸片类型

通过 `type` 属性设置纸片的类型。

```html
<template>
  <mp-space>
    <mp-chip>默认纸片</mp-chip>
    <mp-chip type="primary">主要纸片</mp-chip>
    <mp-chip type="success">成功纸片</mp-chip>
    <mp-chip type="danger">危险纸片</mp-chip>
    <mp-chip type="warning">警告纸片</mp-chip>
    <mp-chip type="info">信息纸片</mp-chip>
  </mp-space>
</template>
```

### 空心纸片

通过 `plain` 属性将纸片设置为空心纸片。

```html
<template>
  <mp-space>
    <mp-chip plain>默认纸片</mp-chip>
    <mp-chip plain type="primary">主要纸片</mp-chip>
    <mp-chip plain type="success">成功纸片</mp-chip>
    <mp-chip plain type="danger">危险纸片</mp-chip>
    <mp-chip plain type="warning">警告纸片</mp-chip>
    <mp-chip plain type="info">信息纸片</mp-chip>
  </mp-space>
</template>
```

### 非圆角纸片

通过把 `round` 属性设置为 `false` 来取消纸片的圆角样式。

```html
<template>
  <mp-chip :round="false" type="primary">非圆角纸片</mp-chip>
</template>
```

### 纸片尺寸

通过 `size` 属性设置纸片的尺寸。

```html
<template>
  <mp-space align="center">
    <mp-chip type="primary">常规纸片</mp-chip>
    <mp-chip type="success" size="small">小型纸片</mp-chip>
    <mp-chip type="warning" size="mini">迷你纸片</mp-chip>
    <mp-chip type="danger" size="large">大型纸片</mp-chip>
  </mp-space>
</template>
```

### 块级纸片

通过 `block` 属性将纸片设置为块级纸片。

```html
<template>
  <mp-chip type="primary" block>块级纸片</mp-chip>
</template>
```

### 可关闭纸片

通过 `closeable` 属性将纸片设置为可关闭纸片，使用 `icon-name` 属性设置纸片的关闭图标样式（必须在 `closeable` 为 `true` 的条件下才能使用）。

```html
<script setup>
import { ref } from 'vue'

const show = ref(true)
const show1= ref(true)
</script>

<template>
  <mp-chip closeable v-if="show" @close="show = false">可关闭纸片</mp-chip>
  <mp-chip
    closeable
    icon-name="delete"
    v-if="show1"
    @close="show1 = false"
  >
    自定义关闭图标
  </mp-chip>
</template>
```

### 自定义颜色

通过 `color` 和 `text-color` 属性设置纸片颜色。

```html
<template>
  <mp-space>
    <mp-chip color="#009688">纸片</mp-chip>
    <mp-chip color="#009688" plain>纸片</mp-chip>
    <mp-chip color="#faecd8" text-color="#e6a23c" plain>纸片</mp-chip>
    <mp-chip color="#faecd8" text-color="#e6a23c">纸片</mp-chip>
  </mp-space>
</template>
```

### 添加插槽

```html
<template>
  <mp-space>
    <mp-chip>
      左侧插槽
      <template #left>
        <mp-icon name="star" />
      </template>
    </mp-chip>
    <mp-chip>
      右侧插槽
      <template #right>
        <mp-icon name="fire" />
      </template>
    </mp-chip>
    <mp-chip>
      左右两侧插槽
      <template #left>
        <mp-icon name="account-circle" />
      </template>
      <template #right>
        <mp-icon name="cake-variant" />
      </template>
    </mp-chip>
  </mp-space>
</template>
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| `type` | 类型，可选值为 `default` `primary` `info` `success` `warning` `danger` | _string_ | `default` |
| `size` | 尺寸，可选值为 `normal` `mini` `small` `large` | _string_ | `normal` |
| `plain` | 是否为空心样式 | _boolean_ | `false` |
| `round` | 是否为圆角样式 | _boolean_ | `true` |
| `block` | 是否为块级样式 | _boolean_ | `false` |
| `elevation` ***3.3.0***  | 海拔高度，可选值为 `true`、`false` 和 `0-24` 的等级                                  | _string \| number \| boolean_ | `false`            |
| `closeable` | 是否为可关闭纸片 | _boolean_ | `false` |
| `icon-name` | 自定义可关闭纸片的图标，必须在 `closeable` 为 `true` 的条件下才能用 | _string_ | `-` |
| `namespace` | 自定义可关闭纸片的图标的命名空间 | _string_ | `mp-icon` |
| `color` | 纸片颜色 | _string_ | `_` |
| `text-color` | 文本颜色，优先级高于 `color` 属性 | _string_ | `-` |

### 插槽

| 名称 | 说明 | 参数 |
| ---- | ---- | ----|
| `default` | 纸片内容 | `-` |
| `left` | 插入至纸片左侧的内容 | `-` |
| `right` | 插入至纸片右侧的内容 | `-` |

### 事件

| 事件名 | 说明 | 回调参数 |
| ---- | ---- | ---- |
| `close` | 点击关闭按钮时触发，只有在显示关闭按钮的时候才能使用 | `event: Event`  |

### 样式变量
以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                         | 默认值 |
|-----------------------------| --- |
| `--chip-default-text-color` | `#555` |
| `--chip-primary-text-color` | `var(--color-on-primary-container)` |
| `--chip-danger-text-color` | `var(--color-on-danger-container)` |
| `--chip-success-text-color` | `var(--color-on-success-container)` |
| `--chip-warning-text-color` | `var(--color-on-warning-container)` |
| `--chip-info-text-color` | `var(--color-on-info-container)` |
| `--chip-default-color` | `#e0e0e0` |
| `--chip-primary-color` | `var(--color-primary-container)` |
| `--chip-danger-color` | `var(--color-danger-container)` |
| `--chip-success-color` | `var(--color-success-container)` |
| `--chip-warning-color` | `var(--color-warning-container)` |
| `--chip-info-color` | `var(--color-info-container)` |
| `--chip-primary-plain-color` | `var(--color-primary)` |
| `--chip-danger-plain-color` | `var(--color-danger)` |
| `--chip-success-plain-color` | `var(--color-success)` |
| `--chip-warning-plain-color` | `var(--color-warning)` |
| `--chip-info-plain-color` | `var(--color-info)` |
| `--chip-border-radius` | `2px` |
| `--chip-normal-height` | `32px` |
| `--chip-large-height` | `40px` |
| `--chip-small-height` | `24px` |
| `--chip-mini-height` | `16px` |
| `--chip-round-radius` | `100px` |
| `--chip-normal-padding` | `0 10px` |
| `--chip-large-padding` | `0 17px` |
| `--chip-small-padding` | `0 6px` |
| `--chip-mini-padding` | `0 4px` |
| `--chip-text-normal-margin` | `0 5px` |
| `--chip-text-large-margin` | `0 5px` |
| `--chip-text-small-margin` | `0 3px` |
| `--chip-text-mini-margin` | `0 2px` |
| `--chip-mini-font-size` | `var(--font-size-xs)` |
| `--chip-small-font-size` | `var(--font-size-sm)` |
| `--chip-normal-font-size` | `var(--font-size-md)` |
| `--chip-large-font-size` | `var(--font-size-lg)` |