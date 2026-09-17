# 表格

### 介绍

一个极简的表格，当你需要以表格的形式展示一些数据的时候，可能会用的上它。

### 基本使用

```demo
../example/demos/basic-usage.vue
```

### 尾部插槽

可以在尾部插槽中插入一些东西，最常见的是插入分页组件。

```demo
../example/demos/slot.vue
```

### 固定表头

```demo
../example/demos/fixed-header.vue
```

## API

### 属性

| 参数           | 说明 | 类型 | 默认值 |
|--------------| -------------- | -------- | ---------- |
| `full-width` | `table` 的宽度(包含可滚动部分) | _string \| number_ | `100%` |
| `elevation` | 海拔高度，可选值为 `true` `false` 和 `0-24` 的等级 | _number \| boolean_|   `true`    |
| `scroller-height` ***3.2.0*** | 滚动容器高度，可用于实现纵向局部滚动，固定表头等功能 | _string \| number_ | `-` |

### 插槽

| 名称 | 说明 | 参数 |
| ----- | -------------- | -------- |
| `default` | Table 的内容 | `-` |
| `footer` | Table 尾部内容 | `-` |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名 | 默认值 |
| --- | --- |
| `--table-background` | `#fff` |
| `--table-border-radius` | `2px` |
| `--table-thead-border-bottom` | `thin solid var(--color-border-2)` |
| `--table-thead-th-text-color` | `rgba(0, 0, 0, 0.6)` |
| `--table-thead-th-text-align` | `left` |
| `--table-thead-th-font-size` | `14px` |
| `--table-thead-tr-border-bottom` | `thin solid var(--color-border-2)` |
| `--table-tbody-tr-hover-background` | `#eee` |
| `--table-tbody-tr-border-bottom` | `thin solid var(--color-border-2)` |
| `--table-tbody-td-text-color` | `#555` |
| `--table-tbody-td-font-size` | `16px` |
| `--table-tbody-td-text-align` | `left`|
| `--table-row-height` | `46px` |
| `--table-row-padding` | `0 16px` |
| `--table-footer-border-top` | `thin solid var(--color-border-2)` |
