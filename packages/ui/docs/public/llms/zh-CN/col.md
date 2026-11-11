<!-- Source: src/col/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/col -->

# Col

24 栏 Flex 栅格。Row 管理间距与对齐，Col 管理列宽、偏移、排序与响应式配置。需要 CSS Grid 折叠与后缀时使用 Grid。

> **布局怎么选**
>
> - Grid + GridItem：适合表单分栏、卡片网格，需要统一列宽、跨列、响应式列数或折叠行与后缀时使用。
> - Row + Col：适合 24 栏 Flex 布局，需要水平/垂直对齐、控制换行、固定宽度与自适应宽度组合，或响应式排序时使用。Row 控制整行，Col 控制列宽、偏移和排序。
> - Space：适合按钮、标签、文字等简单排列，只需要间距、方向和对齐时使用；更自由的宽度分配可使用原生 Flex。

## 基础示例

### 列宽与偏移

Example source: src/col/example/demos/basic.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const span = ref(8)
const offset = ref(4)
</script>
<template>
  <div>
    <div class="controls">
      Span<mp-radio-group v-model="span"
        ><mp-radio v-for="value in [4, 8, 12]" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group
      >
    </div>
    <div class="controls">
      Offset<mp-radio-group v-model="offset"
        ><mp-radio v-for="value in [0, 4, 8]" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group
      >
    </div>
    <mp-row :gutter="12"
      ><mp-col :span="span" :offset="offset"
        ><div class="cell">{{ span }} / +{{ offset }}</div></mp-col
      ><mp-col :span="4"><div class="cell soft">4</div></mp-col></mp-row
    >
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.cell {
  box-sizing: border-box;
  padding: 12px;
  min-width: 0;
  border-radius: 4px;
  background: var(--mp-color-primary);
  color: var(--mp-color-white);
  text-align: center;
  overflow-wrap: anywhere;
}
.soft {
  opacity: 0.7;
}
</style>
```

## 布局与排列

### 弹性比例与固定宽度

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `flex` | 弹性比例、固定长度或 CSS flex 值 | 弹性比例与固定宽度 |
| `xs` | 响应式栏数或包含 span、offset、order 的对象 | 响应式对象与隐藏恢复 |
| `sm` | 响应式栏数或包含 span、offset、order 的对象 | 响应式对象与隐藏恢复 |
| `md` | 响应式栏数或包含 span、offset、order 的对象 | 响应式对象与隐藏恢复 |
| `span` | 占用栏数；0 隐藏 | 响应式对象与隐藏恢复 |
<!-- demo-config-notes:end -->

Example source: src/col/example/demos/flex.vue

```vue
<template>
  <div>
    <mp-row :gutter="12"
      ><mp-col :flex="1"><div class="cell">1</div></mp-col
      ><mp-col :flex="2"><div class="cell soft">2</div></mp-col></mp-row
    >
    <mp-row :gutter="12" :wrap="false"
      ><mp-col flex="100px"><div class="cell">100px</div></mp-col
      ><mp-col flex="auto"><div class="cell soft">auto</div></mp-col></mp-row
    >
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.cell {
  box-sizing: border-box;
  padding: 12px;
  min-width: 0;
  border-radius: 4px;
  background: var(--mp-color-primary);
  color: var(--mp-color-white);
  text-align: center;
  overflow-wrap: anywhere;
}
.soft {
  opacity: 0.7;
}
</style>
```

### 响应式对象与隐藏恢复


Example source: src/col/example/demos/responsive.vue

```vue
<template>
  <div>
    <p>xs → sm (576px) → md (768px). Hidden columns return at larger breakpoints.</p>
    <mp-row :gutter="[12, 12]"
      ><mp-col :xs="24" :sm="12" :md="8"><div class="cell">24 / 12 / 8</div></mp-col
      ><mp-col :xs="0" :sm="12" :md="8"><div class="cell soft">Hidden / 12 / 8</div></mp-col
      ><mp-col :span="8" :xs="{ span: 20, offset: 4, order: 2 }" :md="{ span: 8, offset: 0, order: 0 }"
        ><div class="cell">Reset offset / order</div></mp-col
      ></mp-row
    >
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.cell {
  box-sizing: border-box;
  padding: 12px;
  min-width: 0;
  border-radius: 4px;
  background: var(--mp-color-primary);
  color: var(--mp-color-white);
  text-align: center;
  overflow-wrap: anywhere;
}
.soft {
  opacity: 0.7;
}
</style>
```

## 内容与展示

### 排序与零值恢复

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `span` | 占用栏数；0 隐藏 | 排序与零值恢复 |
| `order` | 排序，0 可恢复 | 排序与零值恢复 |
<!-- demo-config-notes:end -->

Example source: src/col/example/demos/order.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const reverse = ref(false)
</script>
<template>
  <div>
    <div class="controls"><mp-switch v-model="reverse" aria-label="Reverse order" />Reverse order</div>
    <mp-row :gutter="12"
      ><mp-col v-for="i in 3" :key="i" :span="8" :order="reverse ? 3 - i : 0"
        ><div class="cell">{{ i }}</div></mp-col
      ></mp-row
    >
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.cell {
  box-sizing: border-box;
  padding: 12px;
  min-width: 0;
  border-radius: 4px;
  background: var(--mp-color-primary);
  color: var(--mp-color-white);
  text-align: center;
  overflow-wrap: anywhere;
}
.soft {
  opacity: 0.7;
}
</style>
```

## API

<!-- same-source-api:start -->
### Col Props

| 属性 | 说明 | Type | Default |
| --- | --- | --- | --- |
| span | 占用栏数；0–24 整数，0 隐藏 | `number` | `24` |
| offset | 逻辑行内起点偏移；0–24 整数，0 可恢复 | `number` | `undefined` |
| order | 排序；有限整数，可为负数，0 可恢复 | `number` | `undefined` |
| xs | 响应式栏数或包含 span、offset、order 的对象 | `number / ColSizeDescriptor` | `undefined` |
| sm | 响应式栏数或包含 span、offset、order 的对象 | `number / ColSizeDescriptor` | `undefined` |
| md | 响应式栏数或包含 span、offset、order 的对象 | `number / ColSizeDescriptor` | `undefined` |
| lg | 响应式栏数或包含 span、offset、order 的对象 | `number / ColSizeDescriptor` | `undefined` |
| xl | 响应式栏数或包含 span、offset、order 的对象 | `number / ColSizeDescriptor` | `undefined` |
| xxl | 响应式栏数或包含 span、offset、order 的对象 | `number / ColSizeDescriptor` | `undefined` |
| flex | 弹性比例、固定长度或 CSS flex 值 | `number / string` | `undefined` |

### Col Events

| Event | Description |
| --- | --- |
| click | 原生 MouseEvent，每次点击一次 |

### Col Slots

| Slot | Description |
| --- | --- |
| default | 布局内容 |

### Col Methods

| Method | Description |
| --- | --- |
<!-- same-source-api:end -->

排序示例关闭倒序后，各列恢复 `order: 0`。响应式断点依据浏览器视口，而非 Demo 卡片宽度；仅加宽卡片不会触发断点。`span: 0` 隐藏列，匹配更大断点后可恢复。

## 响应式与可访问性

Row 的响应式 gutter 通过 JavaScript matchMedia 计算，SSR 使用 xs，挂载后同步视口。Col 的断点由 CSS 媒体查询实现，SSR 已输出所有配置类，不依赖挂载后测量。断点依据视口：xs 为基础，sm ≥576、md ≥768、lg ≥992、xl ≥1200、xxl ≥1600px；仅覆盖已配置字段。offset 从逻辑行内起点偏移，RTL 自动镜像。order 只改变视觉顺序，不改变 DOM、键盘或辅助技术阅读顺序。

span、offset 及断点中的对应字段接受 0–24 整数；span=0 隐藏，offset=24 偏移整行。order 接受有限整数，支持负数和大于 24 的排序值，最终按浏览器 CSS order 规则计算。gutter 接受有限非负数、六断点对象或恰好两个成员的 [水平, 垂直] 数组。开发环境诊断未知断点、无效数值及枚举；无效 span 回退 24，无效 offset/order 忽略，断点对象保留有效字段，无效 gutter 分量按 0 处理。

## 导入

Grid 仅包含 Grid.Item。Row、Col 是独立组件，请从库根入口或对应的 row/col 子入口导入；安装 Grid 不会注册 Row 或 Col。旧 Grid.Row/Grid.Col 以及 GridRowInstance/GridColInstance 不再提供。

`flex` 只覆盖列宽，不移除 `offset`、`order` 或响应式配置。`span: 0`（含断点配置）仍隐藏列；匹配的非零 span 恢复显示，宽度继续由 flex 决定。移除 flex 后恢复 span 栏宽。视觉排序不改变 DOM 和键盘访问顺序。
## CSS Variables

<!-- component-css-variables:start -->

本组件未声明独立的公共 CSS 变量。请使用本页公开的配置与布局入口。

内部自定义属性与测量中间值属于实现细节，不作为业务定制 API。

<!-- component-css-variables:end -->
