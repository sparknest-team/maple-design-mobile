# Grid 栅格

### 介绍

基于 CSS Grid 的布局组件，支持折叠，并且可以设置后缀节点（后缀节点会显示在一行的结尾）。

> `Grid.Row` / `Grid.Col`（模板标签 `mp-row` / `mp-col`）为 24 栏 Flex 栅格，见本页后文。

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

## Row / Col 24 栏栅格

### 基础用法

`<mp-row/>` 将一行划分为 24 栏，`<mp-col/>` 通过 `span` 设置占位，`gutter` 设置间距。

```html
<template>
  <mp-row :gutter="[10, 10]">
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
  </mp-row>
</template>
```

### 栅格偏移

```html
<template>
  <mp-row :gutter="[10, 10]">
    <mp-col :span="16" :offset="8"><div class="item">offset: 8 span: 16</div></mp-col>
  </mp-row>
</template>
```

### 水平布局

通过 `justify` 设置水平对齐：`start` `center` `end` `space-around` `space-between`。

```html
<template>
  <mp-row justify="center" :gutter="[20, 10]">
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
  </mp-row>
</template>
```

### 垂直布局

通过 `align` 设置垂直对齐：`start` `center` `end` `stretch`。

```html
<template>
  <mp-row align="center" :gutter="10">
    <mp-col :span="6"><div class="item" style="height: 48px">48</div></mp-col>
    <mp-col :span="6"><div class="item" style="height: 72px">72</div></mp-col>
  </mp-row>
</template>
```

### 排序

通过 `order` 调整列顺序。

```html
<template>
  <mp-row>
    <mp-col :span="6" :order="4"><div class="item">1 order-4</div></mp-col>
    <mp-col :span="6" :order="3"><div class="item">2 order-3</div></mp-col>
    <mp-col :span="6" :order="2"><div class="item">3 order-2</div></mp-col>
    <mp-col :span="6" :order="1"><div class="item">4 order-1</div></mp-col>
  </mp-row>
</template>
```

### 响应式布局

```html
<template>
  <mp-row :gutter="10">
    <mp-col :xs="8" :sm="6" :md="4" :lg="3" :xl="2" :xxl="1">
      <div class="item">1</div>
    </mp-col>
    <mp-col :xs="4" :sm="6" :md="8" :lg="9" :xl="10" :xxl="11">
      <div class="item">2</div>
    </mp-col>
  </mp-row>
</template>
```

### 属性内嵌响应式

`span`、`offset`、`order` 可写在断点对象中。

```html
<template>
  <mp-row :gutter="10">
    <mp-col
      :xs="{ span: 12, offset: 6 }"
      :sm="{ span: 6 }"
      :md="{ span: 4, offset: 4 }"
      :lg="{ span: 3, offset: 3 }"
      :xl="{ span: 2, offset: 2 }"
      :xxl="{ span: 1, offset: 1 }"
    >
      <div class="item">1</div>
    </mp-col>
  </mp-row>
</template>
```

### Flex 用法

```html
<template>
  <mp-row>
    <mp-col flex="100px"><div class="item">100px</div></mp-col>
    <mp-col flex="auto"><div class="item">auto</div></mp-col>
  </mp-row>
  <mp-row>
    <mp-col :flex="3"><div class="item">3 / 12</div></mp-col>
    <mp-col :flex="4"><div class="item">4 / 12</div></mp-col>
    <mp-col :flex="5"><div class="item">5 / 12</div></mp-col>
  </mp-row>
</template>
```

## API

### Row Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `gutter` | 栅格间隔（px）。支持响应式对象，或 `[水平, 垂直]` | `number \| ResponsiveValue \| [number \| ResponsiveValue, number \| ResponsiveValue]` | `0` |
| `justify` | 水平对齐 | `'start' \| 'center' \| 'end' \| 'space-around' \| 'space-between'` | `'start'` |
| `align` | 竖直对齐 | `'start' \| 'center' \| 'end' \| 'stretch'` | `'start'` |
| `wrap` | Col 是否换行 | `boolean` | `true` |
| `div` | 仅作为普通 div，不附带栅格样式 | `boolean` | `false` |

### Col Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `span` | 栅格占位格数 | `number` | `24` |
| `offset` | 左侧间隔格数 | `number` | `-` |
| `order` | 排序 | `number` | `-` |
| `xs` | `< 576px` | `number \| { span?, offset?, order? }` | `-` |
| `sm` | `≥ 576px` | 同上 | `-` |
| `md` | `≥ 768px` | 同上 | `-` |
| `lg` | `≥ 992px` | 同上 | `-` |
| `xl` | `≥ 1200px` | 同上 | `-` |
| `xxl` | `≥ 1600px` | 同上 | `-` |
| `flex` | flex 布局属性 | `number \| string \| 'initial' \| 'auto' \| 'none'` | `-` |

### Row Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击时触发 | `event: Event` |

### Col Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击时触发 | `event: Event` |

### ResponsiveValue

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `xxl` | ≥ 1600px | `number` |
| `xl` | ≥ 1200px | `number` |
| `lg` | ≥ 992px | `number` |
| `md` | ≥ 768px | `number` |
| `sm` | ≥ 576px | `number` |
| `xs` | < 576px | `number` |
