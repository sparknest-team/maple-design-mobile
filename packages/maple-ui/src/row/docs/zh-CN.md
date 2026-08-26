# Row / Col 栅格

### 介绍

24 栏 Flex 栅格布局。API 与 Cedar Design Web (PC) 对齐。

> 原「Layout 布局」菜单已废弃，请使用本页。CSS Grid 布局见 [Grid 栅格](#/zh-CN/grid)。

断点与 PC 端对齐：

| 断点 | 媒体查询 |
| --- | --- |
| `xs` | `< 576px` |
| `sm` | `≥ 576px` |
| `md` | `≥ 768px` |
| `lg` | `≥ 992px` |
| `xl` | `≥ 1200px` |
| `xxl` | `≥ 1600px` |

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
