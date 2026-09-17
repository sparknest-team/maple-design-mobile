# Row

24 栏 Flex 栅格。Row 管理间距与对齐，Col 管理列宽、偏移、排序与响应式配置。需要 CSS Grid 折叠与后缀时使用 Grid。

> **布局怎么选**
>
> - Grid + GridItem：适合表单分栏、卡片网格，需要统一列宽、跨列、响应式列数或折叠行与后缀时使用。
> - Row + Col：适合 24 栏 Flex 布局，需要水平/垂直对齐、控制换行、固定宽度与自适应宽度组合，或响应式排序时使用。Row 控制整行，Col 控制列宽、偏移和排序。
> - Space：适合按钮、标签、文字等简单排列，只需要间距、方向和对齐时使用；更自由的宽度分配可使用原生 Flex。

## 案例

### 24 栏基础布局

```demo
../example/demos/basic.vue
```

### 双向间距与响应式间距

```demo
../example/demos/gutter.vue
```

### 水平与垂直对齐

```demo
../example/demos/alignment.vue
```

### 换行与普通容器模式

```demo
../example/demos/wrap.vue
```

### 嵌套与间距隔离



<!-- same-source-api:start -->

```demo
../example/demos/nested.vue
```

### Props

| 属性 | 说明 | Type | Default |
| --- | --- | --- | --- |
| gutter | 间距：数值、响应式对象或 [水平, 垂直] | `RowGutter` | `0` |
| justify | 水平对齐 | `start / center / end / space-around / space-between` | `start` |
| align | 垂直对齐 | `start / center / end / stretch` | `start` |
| wrap | 是否换行 | `boolean` | `true` |
| div | Row 与 Col 均作为普通容器，移除全部布局样式 | `boolean` | `false` |

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
