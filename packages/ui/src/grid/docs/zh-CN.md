# Grid

CSS Grid 布局：列数、跨列、间距、折叠与后缀。24 栏 Flex 布局使用 Row / Col。

> **布局怎么选**
>
> - Grid + GridItem：适合表单分栏、卡片网格，需要统一列宽、跨列、响应式列数或折叠行与后缀时使用。
> - Row + Col：适合 24 栏 Flex 布局，需要水平/垂直对齐、控制换行、固定宽度与自适应宽度组合，或响应式排序时使用。Row 控制整行，Col 控制列宽、偏移和排序。
> - Space：适合按钮、标签、文字等简单排列，只需要间距、方向和对齐时使用；更自由的宽度分配可使用原生 Flex。

## 基础示例

### 列数、跨列与偏移

```demo
../example/demos/basic.vue
```

## 布局与排列

### 响应式列数、间距与跨列

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `cols` | 每行列数，最少为 1 | 响应式列数、间距与跨列 |
| `col-gap` | 列间距（px） | 响应式列数、间距与跨列 |
| `row-gap` | 行间距（px） | 响应式列数、间距与跨列 |
<!-- demo-config-notes:end -->

```demo
../example/demos/responsive.vue
```

## 自定义与插槽

### 折叠行数与后缀插槽

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `cols` | 每行列数，最少为 1 | 折叠行数与后缀插槽 |
| `col-gap` | 列间距（px） | 折叠行数与后缀插槽 |
| `row-gap` | 行间距（px） | 折叠行数与后缀插槽 |
| `collapsed` | 折叠超出的行 | 折叠行数与后缀插槽 |
| `collapsed-rows` | 折叠时保留行数，最少为 1 | 折叠行数与后缀插槽 |
<!-- demo-config-notes:end -->

示例由父级保存 `collapsed` 和行数；More/Less 与开关修改同一状态。4列折叠1行时展示3项及后缀，2行时展示7项及后缀；展开后展示全部9项及后缀。后缀占一个网格位置，不是浮在内容之上的额外按钮。

```demo
../example/demos/collapse.vue
```

## 交互与控制

### 动态插入、删除与排序

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `cols` | 每行列数，最少为 1 | 动态插入、删除与排序 |
| `col-gap` | 列间距（px） | 动态插入、删除与排序 |
| `row-gap` | 行间距（px） | 动态插入、删除与排序 |
| `collapsed` | 折叠超出的行 | 动态插入、删除与排序 |
<!-- demo-config-notes:end -->

按钮只修改本例的数据数组；删除至空时禁用 Remove first，后缀显示 End。重新插入后恢复布局与删除能力。Grid 本身不提供新增/删除业务事件。


```demo
../example/demos/dynamic.vue
```

## API

<!-- same-source-api:start -->

### Grid Props

| 属性 | 说明 | Type | Default |
| --- | --- | --- | --- |
| cols | 每行列数，最少为 1 | `number / ResponsiveValue` | `24` |
| row-gap | 行间距（px） | `number / ResponsiveValue` | `0` |
| col-gap | 列间距（px） | `number / ResponsiveValue` | `0` |
| collapsed | 折叠超出的行 | `boolean` | `false` |
| collapsed-rows | 折叠时保留行数，最少为 1 | `number` | `1` |

### Grid Events

| Event | Description |
| --- | --- |

### Grid Slots

| Slot | Description |
| --- | --- |
| default | 布局内容 |

### Grid Methods

| Method | Description |
| --- | --- |
<!-- same-source-api:end -->

### GridItem Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| span | 跨越格数 | number / ResponsiveValue | 1 |
| offset | 逻辑行内起点留空格数 | number / ResponsiveValue | 0 |
| suffix | 行末后缀 | boolean | false |

默认插槽参数 `{ overflow: boolean }` 表示父 Grid 是否因折叠隐藏了普通项，所有 GridItem（含后缀）读取同一个整体状态，并非当前项自身溢出；展开时为 false。SSR 和挂载前先显示全部项，挂载后再计算折叠，首屏可能出现布局变化。offset 从逻辑行内起点留空，RTL 自动镜像；span 表示内容跨列数，offset 另计入轨道预算。没有自定义事件或公开方法。

## 响应式与可访问性

断点基于浏览器视口：xs 为基础值，sm ≥576、md ≥768、lg ≥992、xl ≥1200、xxl ≥1600px；从最大匹配断点向下取已配置值。SSR 首屏使用 xs，挂载后响应视口；Grid 折叠和动态排序在挂载后计算。组件为布局容器，不增加键盘快捷键；内容语义及可聚焦元素由调用者提供。没有公开方法和专用主题 Token。

## 导入

Grid 仅包含 Grid.Item。Row、Col 是独立组件，请从库根入口或对应的 row/col 子入口导入；安装 Grid 不会注册 Row 或 Col。旧 Grid.Row/Grid.Col 以及 GridRowInstance/GridColInstance 不再提供。

## 数值和折叠预算

数值输入必须有限；保留既有有限数值的取整和归零规则：cols 向下取整且至少 1，collapsed-rows 至少 1 行，负间距和负 offset 归零，span 非正数隐藏。非有限或畸形输入按各属性默认值回退：cols=24、collapsed-rows=1、span=1，间距及 offset=0。响应式对象仅接受六个断点，保留有效字段；undefined 视为省略。开发环境使用统一的 Vue 属性校验提示。

折叠预算按实际 DOM 顺序计算，后缀可位于开头、中间或末尾，不会为计算而移动内容节点。后缀仍定位在所在行的逻辑末端，因此其后的普通项可能换行。普通项保留能容纳的连续前缀；所有后缀始终保留。若后缀自身已超出行数预算，保留后缀优先于限制总行数。视觉布局不改变 DOM、键盘或辅助技术阅读顺序。
## CSS Variables

<!-- component-css-variables:start -->

本组件未声明独立的公共 CSS 变量。请使用本页公开的配置与布局入口。

内部自定义属性与测量中间值属于实现细节，不作为业务定制 API。

<!-- component-css-variables:end -->
