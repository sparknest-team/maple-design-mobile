# 面包屑

### 介绍

用于分级展示信息。

### 基本使用

```html
<template>
  <mp-breadcrumb>
    <mp-breadcrumb-item>首页</mp-breadcrumb-item>
    <mp-breadcrumb-item>一级</mp-breadcrumb-item>
    <mp-breadcrumb-item>二级</mp-breadcrumb-item>
  </mp-breadcrumb>
</template>
```

### 分隔符

```html
<template>
  <mp-breadcrumb separator="\">
    <mp-breadcrumb-item>首页</mp-breadcrumb-item>
    <mp-breadcrumb-item>二级</mp-breadcrumb-item>
    <mp-breadcrumb-item>三级</mp-breadcrumb-item>
  </mp-breadcrumb>
</template>
```

### 子级分隔符

```html
<template>
  <mp-breadcrumb>
    <mp-breadcrumb-item>首页</mp-breadcrumb-item>
    <mp-breadcrumb-item separator="~">一级</mp-breadcrumb-item>
    <mp-breadcrumb-item>二级</mp-breadcrumb-item>
  </mp-breadcrumb>
</template>
```

### 分隔符插槽

通过设置插槽可以使用自定义内容作为分隔符。

```html
<template>
  <mp-breadcrumb>
    <mp-breadcrumb-item>
      首页
      <template #separator>
        <mp-icon name="menu-right" style="margin: 1px 4px 0" />
      </template>
    </mp-breadcrumb-item>
    <mp-breadcrumb-item>
      一级
      <template #separator>
        <mp-icon name="menu-right" style="margin: 1px 4px 0" />
      </template>
    </mp-breadcrumb-item>
    <mp-breadcrumb-item>二级</mp-breadcrumb-item>
  </mp-breadcrumb>
</template>
```

### 点击事件

通过 `@click` 注册面包屑的点击事件，最后一个面包屑不会触发点击事件。

```html
<script setup>
import { Snackbar } from '@maplejs/maple-ui'
</script>

<template>
  <mp-breadcrumb>
    <mp-breadcrumb-item @click="Snackbar('首页')">首页</mp-breadcrumb-item>
    <mp-breadcrumb-item @click="Snackbar('一级')">一级</mp-breadcrumb-item>
    <mp-breadcrumb-item @click="Snackbar('二级')">二级</mp-breadcrumb-item>
  </mp-breadcrumb>
</template>
```

## API

### 属性

#### Breadcrumb Props

| 参数        | 说明   | 类型     | 默认值 |
| ----------- | ------ | -------- | ------ |
| `separator` | 分隔符 | _string_ | `/`    |

#### BreadcrumbItem Props

| 参数        | 说明                                       | 类型                          | 默认值 |
| ----------- | ------------------------------------------ | ----------------------------- |-----|
| `separator` | 分隔符                                     | _string_                      | `-` |

### 事件

#### BreadcrumbItem Events

| 事件名  | 说明                                   | 参数                                          |
| ------- |--------------------------------------| --------------------------------------------- |
| `click` | 点击面包屑时触发 | `event: Event` |

### 插槽

#### Breadcrumb Slots

| 参数      | 说明           | 参数 |
| --------- | -------------- | ---- |
| `default` | 自定义默认内容 | `-`  |

#### BreadcrumbItem Slots

| 参数        | 说明             | 参数 |
| ----------- | ---------------- | ---- |
| `default`   | 自定义默认内容   | `-`  |
| `separator` | 自定义分隔符内容 | `-`  |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

#### BreadcrumbItem Variables

| 变量名                              | 默认值                 |
| ----------------------------------- | ---------------------- |
| `--breadcrumb-item-active-color` | `var(--color-primary)` |
| `--breadcrumb-item-inactive-color` | `#888` |
| `--breadcrumb-item-separator-margin` | `0 10px` |
| `--breadcrumb-item-separator-font-size` | `14px` |