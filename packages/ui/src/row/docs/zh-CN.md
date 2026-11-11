# Row

24 栏 Flex 栅格。Row 管理间距与对齐，Col 管理列宽、偏移、排序与响应式配置。需要 CSS Grid 折叠与后缀时使用 Grid。

> **布局怎么选**
>
> - Grid + GridItem：适合表单分栏、卡片网格，需要统一列宽、跨列、响应式列数或折叠行与后缀时使用。
> - Row + Col：适合 24 栏 Flex 布局，需要水平/垂直对齐、控制换行、固定宽度与自适应宽度组合，或响应式排序时使用。Row 控制整行，Col 控制列宽、偏移和排序。
> - Space：适合按钮、标签、文字等简单排列，只需要间距、方向和对齐时使用；更自由的宽度分配可使用原生 Flex。

默认水平与垂直间距均为 16px（`gutter=[16, 16]`）。显式传入数值或响应式对象仅设置水平间距；需要双向间距时使用二元数组，`gutter=0` 可关闭间距。

## 基础示例

### 24 栏基础布局

```demo
../example/demos/basic.vue
```

## 布局与排列

### 双向间距与响应式间距

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `gutter` | 间距：数值、响应式对象或 [水平, 垂直] | 双向间距与响应式间距、水平与垂直对齐、换行与普通容器模式 |
| `justify` | 水平对齐 | 水平与垂直对齐、布局与对齐 |
| `align` | 垂直对齐 | 水平与垂直对齐、布局与对齐 |
| `wrap` | 是否换行 | 换行与普通容器模式 |
| `div` | Row 与 Col 均作为普通容器，移除全部布局样式 | 换行与普通容器模式 |
<!-- demo-config-notes:end -->

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


```demo
../example/demos/nested.vue
```

### 布局与对齐

适用于row。调整交叉轴对齐、主轴分配，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

```demo
../example/demos/layout-lab.vue
```

## API

<!-- same-source-api:start -->
### Row Props

| 属性 | 说明 | Type | Default |
| --- | --- | --- | --- |
| gutter | 间距：数值、响应式对象或 [水平, 垂直] | `RowGutter` | `[16, 16]` |
| justify | 水平对齐 | `start / center / end / space-around / space-between` | `start` |
| align | 垂直对齐 | `start / center / end / stretch` | `start` |
| wrap | 是否换行 | `boolean` | `true` |
| div | Row 与 Col 均作为普通容器，移除全部布局样式 | `boolean` | `false` |

### Row Events

| Event | Description |
| --- | --- |
| click | 原生 MouseEvent，每次点击一次 |

### Row Slots

| Slot | Description |
| --- | --- |
| default | 布局内容 |

### Row Methods

| Method | Description |
| --- | --- |
<!-- same-source-api:end -->

换行示例分别切换换行与普通 `div` 模式。普通模式移除 Row 布局样式及子 Col 间距；间距示例区分水平与垂直间距。Row 使用 Flex，不依赖 CSS Grid。

## 响应式与可访问性

Row 的响应式 gutter 通过 JavaScript matchMedia 计算，SSR 使用 xs，挂载后同步视口。Col 的断点由 CSS 媒体查询实现，SSR 已输出所有配置类，不依赖挂载后测量。断点依据视口：xs 为基础，sm ≥576、md ≥768、lg ≥992、xl ≥1200、xxl ≥1600px；仅覆盖已配置字段。offset 从逻辑行内起点偏移，RTL 自动镜像。order 只改变视觉顺序，不改变 DOM、键盘或辅助技术阅读顺序。

span、offset 及断点中的对应字段接受 0–24 整数；span=0 隐藏，offset=24 偏移整行。order 接受有限整数，支持负数和大于 24 的排序值，最终按浏览器 CSS order 规则计算。gutter 接受有限非负数、六断点对象或恰好两个成员的 [水平, 垂直] 数组。开发环境诊断未知断点、无效数值及枚举；无效 span 回退 24，无效 offset/order 忽略，断点对象保留有效字段，无效 gutter 分量按 0 处理。

## 导入

Grid 仅包含 Grid.Item。Row、Col 是独立组件，请从库根入口或对应的 row/col 子入口导入；安装 Grid 不会注册 Row 或 Col。旧 Grid.Row/Grid.Col 以及 GridRowInstance/GridColInstance 不再提供。

## CSS Variables

<!-- component-css-variables:start -->

本组件未声明独立的公共 CSS 变量。请使用本页公开的配置与布局入口。

内部自定义属性与测量中间值属于实现细节，不作为业务定制 API。

<!-- component-css-variables:end -->
