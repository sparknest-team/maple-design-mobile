# 链接

### 介绍

链接组件，用于页面跳转。

### 基础用法

```html
<template>
  <mp-link>默认链接</mp-link>
</template>
```

### 语义状态

```html
<template>
  <mp-space :size="[10, 10]">
    <mp-link>默认链接</mp-link>
    <mp-link status="primary">主要链接</mp-link>
    <mp-link status="secondary">次要链接</mp-link>
    <mp-link status="tertiary">三级链接</mp-link>
    <mp-link status="info">信息链接</mp-link>
    <mp-link status="success">成功链接</mp-link>
    <mp-link status="warning">警告链接</mp-link>
    <mp-link status="danger">危险链接</mp-link>
  </mp-space>
</template>
```

### 链接模式

```html
<template>
  <mp-space :size="[10, 10]">
    <mp-link
      status="primary"
      href="https://example.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      href 链接
    </mp-link>
  </mp-space>
</template>
```

### 下划线

```html
<template>
  <mp-space :size="[10, 10]">
    <mp-link status="primary" underline="always">始终显示</mp-link>
    <mp-link status="primary" underline="hover">悬停显示</mp-link>
    <mp-link status="primary" underline="none">不显示</mp-link>
  </mp-space>
</template>
```

### 禁用状态

```html
<template>
  <mp-link disabled>禁用状态</mp-link>
</template>
```

### 图标

```html
<template>
  <mp-space :size="[10, 10]">
    <mp-link icon>默认图标</mp-link>
    <mp-link>
      <template #icon><m-icon-github /></template>
      自定义图标
    </mp-link>
  </mp-space>
</template>
```

### 加载中

```html
<script setup>
import { ref } from 'vue'

const loading = ref(false)
const handleClick = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 3000)
}
</script>

<template>
  <mp-space :size="[10, 10]">
    <mp-link loading>加载中</mp-link>
    <mp-link :loading="loading" @click="handleClick">点击加载</mp-link>
  </mp-space>
</template>
```

### 悬浮态底色

两端均支持 hoverable（默认 false），开启后增加内边距与悬浮/按下底色；不影响 underline。键盘聚焦通过 :focus-visible 显示焦点轮廓，无需开启 hoverable。

```html
<mp-link hoverable href="#link">Hover / keyboard focus</mp-link>
```

主体、Props、主样式和测试为两份独立维护的同源复制，仅前缀、本地图标和主题 token 不同，不共享核心或实例。禁用/加载时移除 href/target/rel、阻止 click，并退出 Tab 顺序（包括显式 tabindex）。loading 优先于图标插槽，动态图标插槽实时更新。

## API

### 属性

| 参数           | 说明                                                              | 类型       | 默认值      |
|--------------|-----------------------------------------------------------------|----------|----------|
| `status`       | 语义状态，可选值为 `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | _string_ | `default` |
| `underline`  | 下划线状态，可选值为 `always` `hover` `none`                              | _string_ | `none` |
| `hoverable` | 是否显示带内边距的悬浮/按下底色 | _boolean_ | `false` |
| `disabled`   | 禁用状态                                                            | _boolean_ | `false`  |
| `loading`    | 加载状态，加载时禁止导航和点击                                        | _boolean_ | `false`  |
| `icon`       | 是否显示默认链接图标                                                  | _boolean_ | `false`  |
| `href`       | 原生 `href` 属性                                         | _string_ | `-`      |
| `rel`        | 原生 `rel` 属性                                            | _string_ | `-`      |
| `target`     | 原生 `target` 属性                                                  | _string_ | `-`      |

### 事件

| 事件名 | 说明                                              | 参数 |
| --- |-------------------------------------------------| --- |
| `click` | 点击链接时触发 | `event: MouseEvent` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 链接内容 | `-` |
| `icon` | 自定义链接图标 | `-` |

### 样式变量
以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名 | 默认值                          |
| --- |------------------------------|
| `--link-default-color` | `#555`                       |
| `--link-primary-color` | `var(--color-primary)`       |
| `--link-danger-color` | `var(--color-danger)`        |
| `--link-success-color` | `var(--color-success)`       |
| `--link-warning-color` | `var(--color-warning)`       |
| `--link-info-color` | `var(--color-info)`          |
| `--link-disabled-color` | `var(--color-text-disabled)` |
| `--link-font-size` | `var(--font-size-md)` |
| `--link-icon-size` | `1em` |
| `--link-focus-opacity` | `0.8` |

### 同源样式约定

内部类名统一为 `mp-link--status-*`、`mp-link--underline-*` 和 `mp-link__icon`；请使用 CSS 变量定制，迁移旧的 `mp-link--primary` 等选择器。原有颜色/icon/focus CSS 变量继续保留，并映射至同源主样式。

| 变量名 | 默认值 |
| --- | --- |
| `--link-bg-hover` | `var(--color-fill-2)` |
| `--link-bg-active` | `var(--color-fill-3)` |
| `--link-padding-horizontal` | `0.25em` |
| `--link-padding-vertical` | `1px` |
| `--link-focus-width` | `2px` |
| `--link-focus-offset` | `2px` |
| `--link-focus-color` | `currentColor` |
| `--link-spin-duration` | `1s` |

```ts
import type { LinkProps, LinkUnderline, LinkInstance } from '@maplejs/maple-ui'
```
