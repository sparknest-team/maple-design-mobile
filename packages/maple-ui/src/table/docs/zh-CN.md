# 表格

## 案例

### 介绍

一个极简的表格，当你需要以表格的形式展示一些数据的时候，可能会用的上它。

### 基本使用

```demo
../example/demos/basic-usage.vue
```

### 尾部插槽

分页示例用 v-model:current 与 v-model:page-size 分别维护当前页和页容量，并从本地合成数据计算当前行。change 只传页码，不再使用旧双参数处理；不能把 current 写死为1。页容量变化按 Pagination 的项目位置规则回写，两个表格实例互不影响。

可以在尾部插槽中插入一些东西，最常见的是插入分页组件。

```demo
../example/demos/slot.vue
```

### 固定表头

在表格自身滚动容器内滚动，thead 保持局部顶部；footer 分页不参与表体滚动。Maple Table 是轻量插槽容器，不提供 Cedar Table 的排序、行选择或远程数据 API，本地分页示例不代表这些功能已实现。

```demo
../example/demos/fixed-header.vue
```

<!-- api-review:start -->
### 功能调试

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

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
