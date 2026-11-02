# Col

24 栏 Flex 栅格。Row 管理间距与对齐，Col 管理列宽、偏移、排序与响应式配置。需要 CSS Grid 折叠与后缀时使用 Grid。

> **布局怎么选**
>
> - Grid + GridItem：适合表单分栏、卡片网格，需要统一列宽、跨列、响应式列数或折叠行与后缀时使用。
> - Row + Col：适合 24 栏 Flex 布局，需要水平/垂直对齐、控制换行、固定宽度与自适应宽度组合，或响应式排序时使用。Row 控制整行，Col 控制列宽、偏移和排序。
> - Space：适合按钮、标签、文字等简单排列，只需要间距、方向和对齐时使用；更自由的宽度分配可使用原生 Flex。

## 基础示例

### 列宽与偏移

```demo
../example/demos/basic.vue
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

```demo
../example/demos/flex.vue
```

### 响应式对象与隐藏恢复


```demo
../example/demos/responsive.vue
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

```demo
../example/demos/order.vue
```

## API

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

排序示例关闭倒序后，各列恢复 `order: 0`。响应式断点依据浏览器视口，而非 Demo 卡片宽度；仅加宽卡片不会触发断点。`span: 0` 隐藏列，匹配更大断点后可恢复。

## 响应式与可访问性

断点基于浏览器视口：xs 为基础值，sm ≥576、md ≥768、lg ≥992、xl ≥1200、xxl ≥1600px；从最大匹配断点向下取已配置值。SSR 首屏使用 xs，挂载后响应视口；Grid 折叠和动态排序在挂载后计算。组件为布局容器，不增加键盘快捷键；内容语义及可聚焦元素由调用者提供。没有公开方法和专用主题 Token。

## 导入

Grid 仅包含 Grid.Item；Row、Col 是独立组件，拥有独立源码、样式、菜单、文档和 Demo。已移除 Grid.Row/Grid.Col、Grid 入口的 Row/Col 转导出以及 GridRowInstance/GridColInstance。请从库根入口或独立 row/col 入口导入；安装 Grid 不再自动注册 Row/Col。
