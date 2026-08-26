# 分页

### 介绍

当你需要处理大量数据的时候，可能需要用到它。

API 与 Cedar Pagination 对齐；Maple 额外支持 `elevation`。

## 案例

### 基础用法

```html
<template>
  <mp-pagination :total="50" />
</template>
```

### 更多页码

当页码较大时，会使用省略号分页样式。

```html
<template>
  <mp-pagination :total="200" />
</template>
```

### 每页条数

通过设置 `show-page-size`，展示每页条数选择器。

```html
<template>
  <mp-pagination :total="200" show-page-size />
</template>
```

### 页码跳转

通过设置 `show-jumper`，展示页码跳转输入框。

```html
<template>
  <mp-pagination :total="50" show-jumper />
</template>
```

### 分页尺寸

支持 `xs`、`sm`、`md`、`lg`、`xl` 五种尺寸。

```html
<template>
  <mp-pagination :total="50" size="sm" />
</template>
```

### 简洁模式

通过设置 `simple` 开启简洁模式。

```html
<template>
  <mp-pagination :total="200" simple />
</template>
```

### 展示总数

通过设置 `show-total`，展示总数。可用 `#total` 插槽自定义文案。

```html
<template>
  <mp-pagination :total="200" show-total />

  <mp-pagination :total="200" show-total>
    <template #total="{ total }">共 {{ total }} 条</template>
  </mp-pagination>
</template>
```

### 全部展示

```html
<template>
  <mp-pagination :total="50" show-total show-jumper show-page-size />
</template>
```

### 自定义分页按钮

可以通过插槽自定义分页按钮内容。

```html
<template>
  <mp-pagination :total="200">
    <template #page-item="{ page }">{{ page }}</template>
    <template #page-item-step="{ type }"> {{ type === 'previous' ? '上一页' : '下一页' }} </template>
    <template #page-item-ellipsis>···</template>
  </mp-pagination>
</template>
```

## API

### 属性

| 参数                     | 说明                                                                 | 类型                          | 默认值                 |
| ------------------------ | -------------------------------------------------------------------- | ----------------------------- | ---------------------- |
| `total`                  | 数据总数（必填）                                                     | _number_                      | `-`                    |
| `v-model:current`        | 当前页数                                                             | _number_                      | `-`                    |
| `default-current`        | 默认当前页数                                                         | _number_                      | `1`                    |
| `v-model:page-size`      | 每页条数                                                             | _number_                      | `-`                    |
| `default-page-size`      | 默认每页条数（非受控）                                               | _number_                      | `10`                   |
| `disabled`               | 禁用分页                                                             | _boolean_                     | `false`                |
| `hide-on-single-page`    | 只有一页时是否隐藏分页                                               | _boolean_                     | `false`                |
| `simple`                 | 是否使用简洁模式                                                     | _boolean_                     | `false`                |
| `show-total`             | 是否展示总数                                                         | _boolean_                     | `false`                |
| `show-more`              | 是否展示更多按钮                                                     | _boolean_                     | `false`                |
| `show-jumper`            | 是否展示跳转输入框                                                   | _boolean_                     | `false`                |
| `show-page-size`         | 是否展示每页条数选择器                                               | _boolean_                     | `false`                |
| `page-size-options`      | 每页条数选择器选项                                                   | _number[]_                    | `[10, 20, 30, 40, 50]` |
| `page-size-props`        | 透传给条数选择器的属性                                               | _object_                      | `-`                    |
| `size`                   | 尺寸                                                                 | _ComponentSize_               | `md`                   |
| `page-item-style`        | 分页按钮样式                                                         | _CSSProperties_               | `-`                    |
| `active-page-item-style` | 当前分页按钮样式                                                     | _CSSProperties_               | `-`                    |
| `base-size`              | 计算显示省略的基础个数，显示省略的个数为 `baseSize + 2 * bufferSize` | _number_                      | `6`                    |
| `buffer-size`            | 显示省略号时，当前页码左右显示的页码个数                             | _number_                      | `2`                    |
| `auto-adjust`            | 是否在改变数据条数时自动调整页码                                     | _boolean_                     | `true`                 |
| `elevation`              | 海拔高度，可选值为 `true` `false` 和 `0-24` 的等级                   | _boolean \| string \| number_ | `true`                 |

### 事件

| 事件名             | 说明               | 回调参数           |
| ------------------ | ------------------ | ------------------ |
| `change`           | 页码改变时触发     | `current: number`  |
| `page-size-change` | 每页条数改变时触发 | `pageSize: number` |

### 插槽

| 插槽名               | 说明             | 参数                         |
| -------------------- | ---------------- | ---------------------------- |
| `total`              | 总数             | `total: number`              |
| `page-item`          | 分页按钮         | `page: number`               |
| `page-item-step`     | 分页按钮（步）   | `type: 'previous' \| 'next'` |
| `page-item-ellipsis` | 分页按钮（省略） | `-`                          |
| `jumper-prepend`     | 跳转前缀         | `-`                          |
| `jumper-append`      | 跳转后缀         | `-`                          |

### 样式变量

| 变量名                                   | 默认值                       |
| ---------------------------------------- | ---------------------------- |
| `--pagination-text-color`                | `#555`                       |
| `--pagination-font-size`                 | `var(--font-size-md)`        |
| `--pagination-active-color`              | `var(--color-white)`         |
| `--pagination-active-bg-color`           | `var(--color-primary)`       |
| `--pagination-hover-bg-color`            | `rgba(85, 85, 85, 0.15)`     |
| `--pagination-total-margin`              | `0 10px`                     |
| `--pagination-total-line-height`         | `24px`                       |
| `--pagination-item-width`                | `32px`                       |
| `--pagination-item-height`               | `32px`                       |
| `--pagination-item-margin`               | `0 6px`                      |
| `--pagination-item-border-radius`        | `4px`                        |
| `--pagination-item-background`           | `#fff`                       |
| `--pagination-item-simple-border-radius` | `50%`                        |
| `--pagination-input-width`               | `32px`                       |
| `--pagination-disabled-color`            | `var(--color-text-disabled)` |
| `--pagination-bg-disabled-color`         | `var(--color-disabled)`      |
| `--pagination-size-line-height`          | `24px`                       |
| `--pagination-size-padding`              | `0 4px`                      |
| `--pagination-quick-jumper-margin`       | `0 10px`                     |
