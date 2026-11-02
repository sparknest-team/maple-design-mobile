# 表格

### 介绍

一个极简的表格，当你需要以表格的形式展示一些数据的时候，可能会用的上它。

## 基础示例

### 基本使用

```demo
../example/demos/basic-usage.vue
```

## 滚动与粘性定位

### 固定表头

在表格自身滚动容器内滚动，thead 保持局部顶部；footer 分页不参与表体滚动。Maple Table 是轻量插槽容器，不提供 Cedar Table 的排序、行选择或远程数据 API，本地分页示例不代表这些功能已实现。

```demo
../example/demos/fixed-header.vue
```

## 内容与插槽

### 尾部插槽

分页示例用 v-model:current 与 v-model:page-size 分别维护当前页和页容量，并从本地合成数据计算当前行。change 只传页码，不再使用旧双参数处理；不能把 current 写死为1。页容量变化按 Pagination 的项目位置规则回写，两个表格实例互不影响。

可以在尾部插槽中插入一些东西，最常见的是插入分页组件。

```demo
../example/demos/slot.vue
```

## 业务组合

### 任务筛选与数据联动

查询任务或部门、按状态筛选、完成任务；统计和结果同步更新，支持空结果与恢复。

```demo
../example/demos/task-workbench.vue
```

## 加载与等待

### 受控加载

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `loading` | 业务显式控制的加载状态 | `boolean / Partial<LoadingProps>` | `false` |


通过 loading 显式展示等待；普通事件返回值不参与加载。before-* 守卫按其契约管理内部等待状态。

```demo
../example/demos/loading.vue
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
| `--mp-table-background` | `#fff` |
| `--mp-table-border-radius` | `2px` |
| `--mp-table-thead-border-bottom` | `thin solid var(--color-border-2)` |
| `--mp-table-thead-th-text-color` | `rgba(0, 0, 0, 0.6)` |
| `--mp-table-thead-th-text-align` | `start` |
| `--mp-table-thead-th-font-size` | `14px` |
| `--mp-table-thead-tr-border-bottom` | `thin solid var(--color-border-2)` |
| `--mp-table-tbody-tr-hover-background` | `#eee` |
| `--mp-table-tbody-tr-border-bottom` | `thin solid var(--color-border-2)` |
| `--mp-table-tbody-td-text-color` | `#555` |
| `--mp-table-tbody-td-font-size` | `16px` |
| `--mp-table-tbody-td-text-align` | `start`|
| `--mp-table-row-height` | `46px` |
| `--mp-table-row-padding` | `0 16px` |
| `--mp-table-footer-border-top` | `thin solid var(--color-border-2)` |


### 与 Cedar Table 类型配置的边界

Maple Table 保持原生表格插槽展示 API，不提供 data/columns。Cedar 的 `defineTableConfig<Row>` 用于其数据表格，不适用于本组件。本次 F08-A 不给 Maple 新增数据列、排序或筛选 API；原插槽和尺寸/滚动/海拔配置保持。


## 阅读方向与滚动

Table 继承原生阅读方向，默认表头与单元格按阅读起点对齐；自定义对齐 token 仍可指定物理 left/right。原生滚动视口可聚焦，左右键按屏幕方向滚动，Home/End 到达阅读起止位置。切换方向保留距阅读起点的滚动距离，并按新范围钳制。Maple 的 Table 是原生插槽表格，不扩展 Cedar 的数据列冻结、列宽调整或分组表头 API。

对象形式需显式设置 `{ loading: true, size: 24 }`；未提供 loading 的配置对象不会启用加载，与 Cedar Table 保持一致。
