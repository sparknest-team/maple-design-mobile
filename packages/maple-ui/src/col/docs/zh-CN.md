# Col

24 栏 Flex 栅格。Row 管理间距与对齐，Col 管理列宽、偏移、排序与响应式配置。需要 CSS Grid 折叠与后缀时使用 Grid。

> **布局怎么选**
>
> - Grid + GridItem：适合表单分栏、卡片网格，需要统一列宽、跨列、响应式列数或折叠行与后缀时使用。
> - Row + Col：适合 24 栏 Flex 布局，需要水平/垂直对齐、控制换行、固定宽度与自适应宽度组合，或响应式排序时使用。Row 控制整行，Col 控制列宽、偏移和排序。
> - Space：适合按钮、标签、文字等简单排列，只需要间距、方向和对齐时使用；更自由的宽度分配可使用原生 Flex。

## 案例

### 列宽与偏移

```html
<script setup lang="ts">
import { ref } from 'vue'
const span = ref(8)
const offset = ref(4)
</script>
<template><div>
  <div class="controls">Span<mp-radio-group v-model="span"><mp-radio v-for="value in [4, 8, 12]" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group></div>
  <div class="controls">Offset<mp-radio-group v-model="offset"><mp-radio v-for="value in [0, 4, 8]" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group></div>
  <mp-row :gutter="12"><mp-col :span="span" :offset="offset"><div class="cell">{{ span }} / +{{ offset }}</div></mp-col><mp-col :span="4"><div class="cell soft">4</div></mp-col></mp-row>
</div></template>

<style scoped>
.controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.cell { box-sizing: border-box; padding: 12px; min-width: 0; border-radius: 4px; background: var(--mp-color-primary); color: var(--mp-color-white); text-align: center; overflow-wrap: anywhere; }
.soft { opacity: .7; }
</style>
```

### 排序与零值恢复

```html
<script setup lang="ts">
import { ref } from 'vue'
const reverse = ref(false)
</script>
<template><div><div class="controls"><mp-switch v-model="reverse" aria-label="Reverse order" />Reverse order</div><mp-row :gutter="12"><mp-col v-for="i in 3" :key="i" :span="8" :order="reverse ? 3 - i : 0"><div class="cell">{{ i }}</div></mp-col></mp-row></div></template>

<style scoped>
.controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.cell { box-sizing: border-box; padding: 12px; min-width: 0; border-radius: 4px; background: var(--mp-color-primary); color: var(--mp-color-white); text-align: center; overflow-wrap: anywhere; }
.soft { opacity: .7; }
</style>
```

### 弹性比例与固定宽度

```html
<template><div>
  <mp-row :gutter="12"><mp-col :flex="1"><div class="cell">1</div></mp-col><mp-col :flex="2"><div class="cell soft">2</div></mp-col></mp-row>
  <mp-row :gutter="12" :wrap="false"><mp-col flex="100px"><div class="cell">100px</div></mp-col><mp-col flex="auto"><div class="cell soft">auto</div></mp-col></mp-row>
</div></template>

<style scoped>
.controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.cell { box-sizing: border-box; padding: 12px; min-width: 0; border-radius: 4px; background: var(--mp-color-primary); color: var(--mp-color-white); text-align: center; overflow-wrap: anywhere; }
.soft { opacity: .7; }
</style>
```

### 响应式对象与隐藏恢复

```html
<template><div>
  <p>xs → sm (576px) → md (768px). Hidden columns return at larger breakpoints.</p>
  <mp-row :gutter="[12, 12]"><mp-col :xs="24" :sm="12" :md="8"><div class="cell">24 / 12 / 8</div></mp-col><mp-col :xs="0" :sm="12" :md="8"><div class="cell soft">Hidden / 12 / 8</div></mp-col><mp-col :span="8" :xs="{ span: 20, offset: 4, order: 2 }" :md="{ span: 8, offset: 0, order: 0 }"><div class="cell">Reset offset / order</div></mp-col></mp-row>
</div></template>

<style scoped>
.controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.cell { box-sizing: border-box; padding: 12px; min-width: 0; border-radius: 4px; background: var(--mp-color-primary); color: var(--mp-color-white); text-align: center; overflow-wrap: anywhere; }
.soft { opacity: .7; }
</style>
```

<!-- same-source-api:start -->
### Props

| 属性 | 说明 | Type | Default |
| --- | --- | --- | --- |
| span | 占用栏数；0 隐藏 | `number` | `24` |
| offset | 左侧偏移，0 可恢复 | `number` | `undefined` |
| order | 排序，0 可恢复 | `number` | `undefined` |
| xs | 响应式栏数或包含 span、offset、order 的对象 | `number / ColSizeDescriptor` | `undefined` |
| sm | 响应式栏数或包含 span、offset、order 的对象 | `number / ColSizeDescriptor` | `undefined` |
| md | 响应式栏数或包含 span、offset、order 的对象 | `number / ColSizeDescriptor` | `undefined` |
| lg | 响应式栏数或包含 span、offset、order 的对象 | `number / ColSizeDescriptor` | `undefined` |
| xl | 响应式栏数或包含 span、offset、order 的对象 | `number / ColSizeDescriptor` | `undefined` |
| xxl | 响应式栏数或包含 span、offset、order 的对象 | `number / ColSizeDescriptor` | `undefined` |
| flex | 弹性比例、固定长度或 CSS flex 值 | `number / string` | `undefined` |

### Events

| Event | Description |
| --- | --- |
| click | 原生 MouseEvent，每次点击一次 |

### Slots

| Slot | Description |
| --- | --- |
| default | 布局内容 |

### Methods

| Method | Description |
| --- | --- |
<!-- same-source-api:end -->

## 响应式与可访问性

断点基于浏览器视口：xs 为基础值，sm ≥576、md ≥768、lg ≥992、xl ≥1200、xxl ≥1600px；从最大匹配断点向下取已配置值。SSR 首屏使用 xs，挂载后响应视口；Grid 折叠和动态排序在挂载后计算。组件为布局容器，不增加键盘快捷键；内容语义及可聚焦元素由调用者提供。没有公开方法和专用主题 Token。

## 导入

Grid 仅包含 Grid.Item；Row、Col 是独立组件，拥有独立源码、样式、菜单、文档和 Demo。已移除 Grid.Row/Grid.Col、Grid 入口的 Row/Col 转导出以及 GridRowInstance/GridColInstance。请从库根入口或独立 row/col 入口导入；安装 Grid 不再自动注册 Row/Col。
