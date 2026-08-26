# Grid 栅格

### 介绍

基于 CSS Grid 的布局组件，支持折叠，并且可以设置后缀节点（后缀节点会显示在一行的结尾）。

> 24 栏 Flex 栅格见 [Row / Col 栅格](#/zh-CN/row)。

断点与 PC 端 Cedar 对齐：

| 断点 | 媒体查询 |
| --- | --- |
| `xs` | `max-width: 575px` |
| `sm` | `min-width: 576px` |
| `md` | `min-width: 768px` |
| `lg` | `min-width: 992px` |
| `xl` | `min-width: 1200px` |
| `xxl` | `min-width: 1600px` |

### 基础用法

支持折叠与后缀节点。后缀节点的默认插槽可拿到 `{ overflow }`，用于判断折叠后是否有溢出内容。

```html
<script setup>
import { ref } from 'vue'

const collapsed = ref(false)
</script>

<template>
  <mp-switch v-model="collapsed" />
  <mp-grid :cols="3" :col-gap="12" :row-gap="16" :collapsed="collapsed">
    <mp-grid-item>item</mp-grid-item>
    <mp-grid-item>item</mp-grid-item>
    <mp-grid-item>item</mp-grid-item>
    <mp-grid-item :offset="1">item | offset - 1</mp-grid-item>
    <mp-grid-item>item</mp-grid-item>
    <mp-grid-item :span="3">item | span - 3</mp-grid-item>
    <mp-grid-item>item</mp-grid-item>
    <mp-grid-item>item</mp-grid-item>
    <mp-grid-item suffix>
      <template #default="{ overflow }">suffix | overflow: {{ overflow }}</template>
    </mp-grid-item>
  </mp-grid>
</template>
```

### 响应式布局

`cols`、`row-gap`、`col-gap`、`span`、`offset` 均支持响应式对象写法：`{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }`。

```html
<template>
  <mp-grid :cols="{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }" :col-gap="12" :row-gap="16">
    <mp-grid-item>item</mp-grid-item>
    <mp-grid-item>item</mp-grid-item>
    <mp-grid-item>item</mp-grid-item>
    <mp-grid-item>item</mp-grid-item>
    <mp-grid-item>item</mp-grid-item>
    <mp-grid-item>item</mp-grid-item>
    <mp-grid-item :span="{ xl: 4, xxl: 6 }" suffix>suffix</mp-grid-item>
  </mp-grid>
</template>
```

## API

### Grid Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `cols` | 每一行展示的列数 | `number \| ResponsiveValue` | `24` |
| `row-gap` | 行与行之间的间距（px） | `number \| ResponsiveValue` | `0` |
| `col-gap` | 列与列之间的间距（px） | `number \| ResponsiveValue` | `0` |
| `collapsed` | 是否折叠 | `boolean` | `false` |
| `collapsed-rows` | 折叠时显示的行数 | `number` | `1` |

### GridItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `span` | 跨越的格数 | `number \| ResponsiveValue` | `1` |
| `offset` | 左侧的间隔格数 | `number \| ResponsiveValue` | `0` |
| `suffix` | 是否是后缀元素 | `boolean` | `false` |

### GridItem Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 格子内容 | `{ overflow: boolean }` |

## 类型定义

### ResponsiveValue

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `xxl` | >= 1600px 响应式配置 | `number` | `-` |
| `xl` | >= 1200px 响应式配置 | `number` | `-` |
| `lg` | >= 992px 响应式配置 | `number` | `-` |
| `md` | >= 768px 响应式配置 | `number` | `-` |
| `sm` | >= 576px 响应式配置 | `number` | `-` |
| `xs` | < 576px 响应式配置 | `number` | `-` |

```ts
import type { GridProps, GridItemProps, ResponsiveValue } from '@maplejs/maple-ui'
```
