# 表格

### 介绍

一个极简的表格，当你需要以表格的形式展示一些数据的时候，可能会用的上它。

可滚动区域的名称随语言变化，并支持通过 LocaleProvider 的 `table.scrollable` 词条在局部覆盖。

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

## 使用说明

### 表格数据与插槽

通过表格插槽编排表头、表体和单元格。Table 不提供 `data`、`columns`、排序或筛选配置。

## API

### Table Props

| 参数           | 说明 | 类型 | 默认值 |
|--------------| -------------- | -------- | ---------- |
| `loading` | 显式控制加载状态；对象形式需要 `loading: true` | _boolean \| `Partial<LoadingProps>`_ | `false` |
| `full-width` | `table` 的宽度(包含可滚动部分) | _string \| number_ | `100%` |
| `elevation` | 海拔高度，可选值为 `true` `false` 和 `0-24` 的等级 | _number \| boolean_|   `true`    |
| `scroller-height` ***3.2.0*** | 滚动容器高度，可用于实现纵向局部滚动，固定表头等功能 | _string \| number_ | `-` |

### Table Slots

| 名称 | 说明 | 参数 |
| ----- | -------------- | -------- |
| `default` | Table 的内容 | `-` |
| `footer` | Table 尾部内容 | `-` |

## 阅读方向与滚动

Table 继承原生阅读方向，默认表头与单元格按阅读起点对齐；自定义对齐 token 仍可指定物理 left/right。原生滚动视口可聚焦，左右键按屏幕方向滚动，Home/End 到达阅读起止位置。切换方向保留距阅读起点的滚动距离，并按新范围钳制。Maple 的 Table 是原生插槽表格，不扩展 Cedar 的数据列冻结、列宽调整或分组表头 API。

对象形式需显式设置 `{ loading: true, size: 24 }`；未提供 loading 的配置对象不会启用加载，与 Cedar Table 保持一致。

## CSS Variables

以下为组件使用的 css 变量，可以使用 [ThemeProvider 组件](#/zh-CN/theme-provider) 进行样式定制。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-table-background` | `#fff` | `background` |
| `--mp-table-border-radius` | `2px` | `border-radius` |
| `--mp-table-footer-border-top` | `thin solid var(--mp-color-border-2)` | `border-top` |
| `--mp-table-row-height` | `46px` | `height`, `min-height` |
| `--mp-table-row-padding` | `0 16px` | `padding` |
| `--mp-table-tbody-td-font-size` | `16px` | `font-size` |
| `--mp-table-tbody-td-text-align` | `start` | `text-align` |
| `--mp-table-tbody-td-text-color` | `#555` | `color` |
| `--mp-table-tbody-tr-border-bottom` | `thin solid var(--mp-color-border-2)` | `border-bottom` |
| `--mp-table-tbody-tr-hover-background` | `#eee` | `background` |
| `--mp-table-thead-border-bottom` | `thin solid var(--mp-color-border-2)` | `border-bottom` |
| `--mp-table-thead-th-font-size` | `14px` | `font-size` |
| `--mp-table-thead-th-text-align` | `start` | `text-align` |
| `--mp-table-thead-th-text-color` | `rgba(0, 0, 0, 0.6)` | `color` |
| `--mp-table-thead-tr-border-bottom` | `thin solid var(--mp-color-border-2)` | `border-bottom` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-table-background: #fff;
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
