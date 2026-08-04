# 按钮

### 介绍

按钮组件，用于触发操作。本组件 API 与 Cedar Design Web (PC) 保持一致。

### ⚠️ 迁移提示（BREAKING）

本版本对齐 PC 端 API，移除了若干旧 prop。如从旧版本升级，请按下表迁移：

| 旧 API | 新 API |
| --- | --- |
| `<mp-button type="primary">` | `<mp-button status="primary">` |
| `<mp-button text>` | `<mp-button variant="text">` |
| `<mp-button outline>` | `<mp-button variant="outline">` |
| `<mp-button text outline>` | `<mp-button variant="outline">` |
| `<mp-button size="mini">` | `<mp-button size="xs">` |
| `<mp-button size="small">` | `<mp-button size="sm">` |
| `<mp-button size="normal">` | `<mp-button size="md">` |
| `<mp-button size="large">` | `<mp-button size="lg">` |
| `<mp-button native-type="submit">` | `<mp-button html-type="submit">` |
| `<mp-button-group type="primary">` | `<mp-button-group status="primary">` |
| `<mp-button-group mode="text">` | `<mp-button-group variant="text">` |
| `<mp-button-group mode="outline">` | `<mp-button-group variant="outline">` |
| `<mp-button-group mode="icon-container">` | 用 `<mp-button icon-container>` 子按钮代替 |

### 主题色按钮

```html
<template>
  <mp-space :size="[10, 10]">
    <mp-button>默认按钮</mp-button>
    <mp-button status="primary">主要按钮</mp-button>
    <mp-button status="info">信息按钮</mp-button>
    <mp-button status="success">成功按钮</mp-button>
    <mp-button status="warning">警告按钮</mp-button>
    <mp-button status="danger">危险按钮</mp-button>
  </mp-space>
</template>
```

### 文字按钮

```html
<template>
  <mp-space :size="[10, 10]">
    <mp-button variant="outline" status="primary">外边框按钮</mp-button>
    <mp-button variant="outline">外边框按钮</mp-button>
    <mp-button variant="text" status="primary">纯文字按钮</mp-button>
    <mp-button variant="text">纯文字按钮</mp-button>
    <mp-button variant="tonal" status="primary">纯文字按钮</mp-button>
    <mp-button variant="link" status="primary">纯文字按钮</mp-button>
  </mp-space>
</template>
```

### 禁用状态

```html
<template>
  <mp-space :size="[10, 10]">
    <mp-button disabled>禁用状态</mp-button>
    <mp-button disabled variant="outline">禁用状态</mp-button>
    <mp-button disabled variant="text">禁用状态</mp-button>
  </mp-space>
</template>
```

### 加载状态

```html
<template>
  <mp-space :size="[10, 10]">
    <mp-button loading status="primary">
      加载状态
    </mp-button>
    <mp-button loading status="info" loading-type="rect">
      加载状态
    </mp-button>
    <mp-button loading status="success" loading-type="disappear">
      加载状态
    </mp-button>
    <mp-button loading status="danger" loading-type="cube">
      加载状态
    </mp-button>
    <mp-button loading status="warning" loading-type="wave">
      加载状态
    </mp-button>
  </mp-space>
</template>
```

### 按钮尺寸

```html
<template>
  <mp-space align="center" :size="[10, 10]">
    <mp-button status="primary">常规按钮</mp-button>
    <mp-button status="success" size="sm">小型按钮</mp-button>
    <mp-button status="warning" size="xs">迷你按钮</mp-button>
    <mp-button status="danger" size="lg">大型按钮</mp-button>
  </mp-space>
</template>
```

### 块级按钮

```html
<template>
  <mp-button block status="primary">块级按钮</mp-button>
</template>
```

### 自定义颜色

```html
<template>
  <mp-space :size="[10, 10]">
    <mp-button color="#66bb6a" text-color="#fff">背景/文字</mp-button>
    <mp-button
      color="linear-gradient(to right bottom, #6750A4, #D0BCFF)"
      text-color="#fff"
    >
      使用渐变
    </mp-button>
  </mp-space>
</template>
```

### 圆形按钮

```html
<template>
  <mp-space :size="[10, 10]">
    <mp-button round icon-container>
      <mp-icon name="bookmark" />
    </mp-button>
    <mp-button status="primary" round icon-container>
      <mp-icon name="plus" />
    </mp-button>
    <mp-button status="info" round icon-container>
      <mp-icon name="information" />
    </mp-button>
    <mp-button status="success" round icon-container>
      <mp-icon name="check" />
    </mp-button>
    <mp-button status="warning" round icon-container>
      <mp-icon name="warning" />
    </mp-button>
    <mp-button status="danger" round icon-container>
      <mp-icon name="window-close" />
    </mp-button>
  </mp-space>
</template>
```

### 注册事件

```html
<script setup>
import { Message } from '@maplejs/maple-ui'

function handleClick() {
  Message.success('点击成功')
}

function handleTouchstart() {
  Message.success('触摸成功')
}

function handleAutoLoadingClick() {   
  return new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
}
</script>

<template>
  <mp-space :size="[10, 10]">
    <mp-button status="success" @click="handleClick">点击</mp-button>
    <mp-button status="success" @touchstart="handleTouchstart">触摸</mp-button>
    <mp-button
      status="success"
      auto-loading
      @click="handleAutoLoadingClick"
    >
      自动 loading
    </mp-button>
  </mp-space>
</template>
```

### 按钮组主题色

```html
<template>
  <mp-space :size="[10, 10]">
    <mp-button-group status="default" variant="outline">
      <mp-button>按钮</mp-button>
      <mp-button>按钮</mp-button>
      <mp-button>按钮</mp-button>
    </mp-button-group>

    <mp-button-group status="primary">
      <mp-button>按钮</mp-button>
      <mp-button>按钮</mp-button>
      <mp-button>按钮</mp-button>
    </mp-button-group>
  </mp-space>
</template>
```

### 按钮组尺寸

```html
<template>
  <mp-space :size="[10, 10]">
    <mp-button-group status="primary" size="md">
      <mp-button>按钮</mp-button>
      <mp-button>按钮</mp-button>
      <mp-button>按钮</mp-button>
    </mp-button-group>
  
    <mp-button-group status="primary" size="lg">
      <mp-button>按钮</mp-button>
      <mp-button>按钮</mp-button>
      <mp-button>按钮</mp-button>
    </mp-button-group>
  </mp-space>
</template>
```

### 按钮拆分

```html
<template>
  <mp-popover placement="bottom" same-width :offset-y="6">
    <mp-button-group status="primary">
      <mp-button @click.stop>按钮拆分</mp-button>
      <mp-button style="padding: 0 6px;">
        <mp-icon name="menu-down" :size="24" />
      </mp-button>
    </mp-button-group>

    <template #content>
      <mp-cell ripple>按钮拆分</mp-cell>
      <mp-cell ripple>按钮拆分</mp-cell>
      <mp-cell ripple>按钮拆分</mp-cell>
    </template>
  </mp-popover>
</template>
```

### 按钮组模式

```html
<template>
  <mp-space direction="column" :size="[14, 14]">
    <mp-button-group status="primary" variant="text">
      <mp-button>按钮</mp-button>
      <mp-button>按钮</mp-button>
      <mp-button>按钮</mp-button>
    </mp-button-group>

    <mp-button-group status="primary" variant="outline">
      <mp-button>按钮</mp-button>
      <mp-button>按钮</mp-button>
      <mp-button>按钮</mp-button>
    </mp-button-group>

    <mp-button-group>
      <mp-button status="warning" icon-container>
        <mp-icon name="warning" />
      </mp-button>
      <mp-button status="info" icon-container>
        <mp-icon name="information" />
      </mp-button>
      <mp-button status="success" icon-container>
        <mp-icon name="check" />
      </mp-button>
    </mp-button-group>

    <mp-button-group status="primary">
      <mp-button>按钮</mp-button>
      <mp-button>按钮</mp-button>
      <mp-button>按钮</mp-button>
    </mp-button-group>
  </mp-space>
</template>
```

### 自定义按钮组颜色

```html
<template>
  <mp-button-group status="primary" color="linear-gradient(to bottom right, #6750A4, #D0BCFF)">
    <mp-button>按钮</mp-button>
    <mp-button>按钮</mp-button>
    <mp-button>按钮</mp-button>
  </mp-button-group>
</template>
```

### 按钮组竖直排列

```html
<template>
  <mp-space :size="[20, 20]">
    <mp-button-group status="primary" variant="text" vertical>
      <mp-button>按钮</mp-button>
      <mp-button>按钮</mp-button>
      <mp-button>按钮</mp-button>
    </mp-button-group>

    <mp-button-group status="primary" variant="outline" vertical>
      <mp-button>按钮</mp-button>
      <mp-button>按钮</mp-button>
      <mp-button>按钮</mp-button>
    </mp-button-group>

    <mp-button-group vertical>
      <mp-button status="warning" icon-container>
        <mp-icon name="warning" />
      </mp-button>
      <mp-button status="info" icon-container>
        <mp-icon name="information" />
      </mp-button>
      <mp-button status="success" icon-container>
        <mp-icon name="check" />
      </mp-button>
    </mp-button-group>

    <mp-button-group status="primary" vertical>
      <mp-button>按钮</mp-button>
      <mp-button>按钮</mp-button>
      <mp-button>按钮</mp-button>
    </mp-button-group>
  </mp-space>
</template>
```

## API

### 属性

#### Button Props

| 参数               | 说明                                                              | 类型       | 默认值            |
|------------------|-----------------------------------------------------------------|----------|----------------|
| `status`         | 主题色，可选值 `default` `primary` `info` `success` `warning` `danger` `secondary` `contrast` | _string_ | `default`      |
| `variant`        | 变体，可选值 `default` `text` `outline` `link` `tonal`                  | _string_ | `default`      |
| `size`           | 尺寸，可选值 `xs` `sm` `md` `lg`                                | _string_ | `md`           |
| `html-type`      | 原生按钮类型，可选值 `button` `submit` `reset`                       | _string_ | `button`       |
| `component`      | 渲染的根标签，可选值 `button` `a`                                | _string_ | `button`       |
| `loading`        | 加载状态                                                            | _boolean_ | `false`        |
| `loading-radius` | loading 的半径                                                  | _string \| number_        | `-` |
| `loading-type`   | loading 的类型，可选值 `circle` `wave` `cube` `rect` `disappear`      | _string_ | `circle`       |
| `loading-size`   | loading 的尺寸                                                | _string_ | `-`       |
| `loading-color`  | loading 的颜色                                                     | _string_ | `currentColor` |
| `auto-loading`   | 自动 loading 模式，方便处理异步任务                                          | _boolean_ | `false`        |
| `round`          | 是否是圆形按钮                                                         | _boolean_ | `false`        |
| `block`          | 是否是块级元素                                                         | _boolean_ | `false`        |
| `icon-container` | 是否作为图标容器                                                        | _boolean_ | `false`        |
| `disabled`       | 禁用状态，未设置时由父 ButtonGroup 决定                                | _boolean \| undefined_ | `undefined`    |
| `stacked`        | 是否堆叠（图标在文字上方）                                              | _boolean \| undefined_ | `undefined`    |
| `ripple`         | 是否使用水波纹                                                         | _boolean_ | `true`         |
| `focusable`      | 是否可以被聚焦                                                         | _boolean_ | `true`         |
| `text-color`     | 文字颜色                                                            | _string_ | `-`            |
| `color`          | 背景颜色                                                            | _string_ | `-`            |
| `elevation`      | 海拔高度，可选值 `true`、`false` 和 `0-24` 的等级                | _string \| number \| boolean_ | `true`            |

#### ButtonGroup Props

| 参数          | 说明                                                               | 类型       | 默认值       |
|-------------|------------------------------------------------------------------|----------|-----------|
| `status`    | 按钮组主题色，作为子按钮 `status` 的默认值                              | _string_ | `default` |
| `size`      | 按钮组尺寸，可选值 `xs` `sm` `md` `lg`                            | _string_ | `md`      |
| `variant`   | 按钮组变体，可选值 `default` `text` `outline` `link` `tonal`            | _string_ | `default` |
| `disabled`  | 是否禁用，作为子按钮 `disabled` 的默认值                                    | _boolean_ | `false`   |
| `stacked`   | 是否堆叠，作为子按钮 `stacked` 的默认值                                    | _boolean_ | `false`   |
| `vertical`  | 是否竖直排列                                                        | _boolean_ | `false`   |
| `elevation` | 按钮组海拔高度，可选值 `true`、`false` 和 `0-24` 的等级              | _string \| number \| boolean_ | `true`            |
| `color`     | 按钮组背景颜色                                                          | _string_ | `-`       |
| `text-color` | 按钮组文字颜色                                                          | _string_ | `-`       |

### 事件

#### Button Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发，在 `loading` 或 `disabled` 状态为 `true` 时不触发 | `event: Event` |
| `touchstart` | 触摸手指压下按钮时触发，在 `loading` 或 `disabled` 状态为 `true` 时不触发 | `event: Event` |

### 插槽

#### Button Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 按钮内容 | `-` |

#### ButtonGroup Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 按钮组内容 | `-` |

### 样式变量
以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

#### Button Variables

| 变量名 | 默认值 |
| --- | --- |
| `--button-default-text-color` | `#555` |
| `--button-primary-text-color` | `var(--color-on-primary)` |
| `--button-danger-text-color` | `var(--color-on-danger)` |
| `--button-success-text-color` | `var(--color-on-success)` |
| `--button-warning-text-color` | `var(--color-on-warning)` |
| `--button-info-text-color` | `var(--color-on-info)` |
| `--button-default-color` | `#f5f5f5` |
| `--button-primary-color` | `var(--color-primary)`|
| `--button-danger-color` |  `var(--color-danger)`|
| `--button-success-color` | `var(--color-success)`|
| `--button-warning-color` |  `var(--color-warning)`|
| `--button-info-color` | `var(--color-info)`|
| `--button-default-icon-color` | `#555` |
| `--button-primary-icon-color` | `var(--color-on-primary-container)` |
| `--button-danger-icon-color` | `var(--color-on-danger-container)` |
| `--button-success-icon-color` | `var(--color-on-success-container)` |
| `--button-warning-icon-color` | `var(--color-on-warning-container)` |
| `--button-info-icon-color` | `var(--color-on-info-container)` |
| `--button-default-icon-container-color` | `#f5f5f5` |
| `--button-primary-icon-container-color` | `var(--color-primary-container)` |
| `--button-danger-icon-container-color` | `var(--color-danger-container)` |
| `--button-success-icon-container-color` | `var(--color-success-container)` |
| `--button-warning-icon-container-color` | `var(--color-warning-container)` |
| `--button-info-icon-container-color` | `var(--color-info-container)` |
| `--button-disabled-color` | `var(--color-disabled)`|
| `--button-disabled-text-color` | `var(--color-text-disabled)` |
| `--button-border-radius` | `4px` |
| `--button-mini-padding` | `0 9px` |
| `--button-small-padding` | `0 11px` |
| `--button-normal-padding` | `0 15px` |
| `--button-large-padding` | `0 22px` |
| `--button-round-padding` | `6px` |
| `--button-mini-height` | `20px` |
| `--button-small-height` | `28px` |
| `--button-normal-height` | `36px` |
| `--button-large-height` | `44px` |
| `--button-mini-font-size` | `var(--font-size-xs)` |
| `--button-small-font-size` | `var(--font-size-sm)` |
| `--button-normal-font-size` | `var(--font-size-md)` |
| `--button-large-font-size` | `var(--font-size-lg)` |
