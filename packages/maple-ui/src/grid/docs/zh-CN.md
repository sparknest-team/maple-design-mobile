# Grid

CSS Grid 布局：列数、跨列、间距、折叠与后缀。24 栏 Flex 布局使用 Row / Col。

> **布局怎么选**
>
> - Grid + GridItem：适合表单分栏、卡片网格，需要统一列宽、跨列、响应式列数或折叠行与后缀时使用。
> - Row + Col：适合 24 栏 Flex 布局，需要水平/垂直对齐、控制换行、固定宽度与自适应宽度组合，或响应式排序时使用。Row 控制整行，Col 控制列宽、偏移和排序。
> - Space：适合按钮、标签、文字等简单排列，只需要间距、方向和对齐时使用；更自由的宽度分配可使用原生 Flex。

## 案例

### 列数、跨列与偏移

```demo
../example/demos/basic.vue
```

### 折叠行数与后缀插槽

```demo
../example/demos/collapse.vue
```

### 响应式列数、间距与跨列

```demo
../example/demos/responsive.vue
```

### 动态插入、删除与排序



<!-- same-source-api:start -->

```demo
../example/demos/dynamic.vue
```

### Props

| 属性 | 说明 | Type | Default |
| --- | --- | --- | --- |
| cols | 每行列数，最少为 1 | `number / ResponsiveValue` | `24` |
| row-gap | 行间距（px） | `number / ResponsiveValue` | `0` |
| col-gap | 列间距（px） | `number / ResponsiveValue` | `0` |
| collapsed | 折叠超出的行 | `boolean` | `false` |
| collapsed-rows | 折叠时保留行数，最少为 1 | `number` | `1` |

### Events

| Event | Description |
| --- | --- |

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

## GridItem

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| span | 跨越格数 | number / ResponsiveValue | 1 |
| offset | 左侧留空格数 | number / ResponsiveValue | 0 |
| suffix | 行末后缀 | boolean | false |

默认插槽参数 `{ overflow: boolean }` 表示折叠是否隐藏了内容；没有自定义事件或公开方法。

## 导入

Grid 仅包含 Grid.Item；Row、Col 是独立组件，拥有独立源码、样式、菜单、文档和 Demo。已移除 Grid.Row/Grid.Col、Grid 入口的 Row/Col 转导出以及 GridRowInstance/GridColInstance。请从库根入口或独立 row/col 入口导入；安装 Grid 不再自动注册 Row/Col。
