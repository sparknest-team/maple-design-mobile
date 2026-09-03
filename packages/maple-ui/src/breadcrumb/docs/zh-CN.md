# 面包屑

### 介绍

用于识别页面在层次结构中的位置，并按需向上返回。API 对齐 Cedar Design Web 的核心能力（`routes` / `max-count` / 分隔符插槽），不包含 PC 向的 sticky。

### 基本使用

```html
<template>
  <mp-breadcrumb>
    <mp-breadcrumb-item>首页</mp-breadcrumb-item>
    <mp-breadcrumb-item>一级</mp-breadcrumb-item>
    <mp-breadcrumb-item>二级</mp-breadcrumb-item>
  </mp-breadcrumb>
</template>
```

### 分隔符

通过父级 `separator` 或子项 `separator` 自定义分隔符；也可使用父级 / 子项的 `#separator` 插槽。子项优先级更高。

```html
<template>
  <mp-breadcrumb separator="\">
    <mp-breadcrumb-item>首页</mp-breadcrumb-item>
    <mp-breadcrumb-item>二级</mp-breadcrumb-item>
    <mp-breadcrumb-item>三级</mp-breadcrumb-item>
  </mp-breadcrumb>

  <mp-breadcrumb>
    <mp-breadcrumb-item>首页</mp-breadcrumb-item>
    <mp-breadcrumb-item separator="~">一级</mp-breadcrumb-item>
    <mp-breadcrumb-item>二级</mp-breadcrumb-item>
  </mp-breadcrumb>

  <mp-breadcrumb>
    <template #separator>
      <m-icon-menu-right style="margin: 1px 4px 0" />
    </template>
    <mp-breadcrumb-item>首页</mp-breadcrumb-item>
    <mp-breadcrumb-item>一级</mp-breadcrumb-item>
    <mp-breadcrumb-item>二级</mp-breadcrumb-item>
  </mp-breadcrumb>
</template>
```

### 参数化配置

通过 `routes` 传递面包屑数据。默认将每一项的 `path` 作为 `a` 标签的 `href`；可用 `#item-render` 自定义渲染。

```html
<script setup>
const routes = [
  { path: '/', label: '首页' },
  { path: '/channel', label: '频道' },
  { path: '/news', label: '资讯' },
]
</script>

<template>
  <mp-breadcrumb :routes="routes" />

  <mp-breadcrumb :routes="routes">
    <template #item-render="{ route, paths }">
      <a :href="'#/' + paths.join('/')">{{ route.label }}</a>
    </template>
  </mp-breadcrumb>
</template>
```

### 显示省略

通过 `max-count` 限制展示数量，超出部分折叠为省略号；可用 `#more-icon` 自定义省略图标。

```html
<script setup>
const maxRoutes = [
  { path: '/', label: '首页' },
  { path: '/sub-home', label: '二级首页' },
  { path: '/all-channel', label: '全部频道' },
  { path: '/channel', label: '频道' },
  { path: '/news', label: '资讯' },
  { path: '/post', label: '详情' },
]
</script>

<template>
  <mp-breadcrumb :max-count="3">
    <mp-breadcrumb-item>首页</mp-breadcrumb-item>
    <mp-breadcrumb-item>二级首页</mp-breadcrumb-item>
    <mp-breadcrumb-item>全部频道</mp-breadcrumb-item>
    <mp-breadcrumb-item>频道</mp-breadcrumb-item>
    <mp-breadcrumb-item>资讯</mp-breadcrumb-item>
    <mp-breadcrumb-item>详情</mp-breadcrumb-item>
  </mp-breadcrumb>

  <mp-breadcrumb :routes="maxRoutes" :max-count="3">
    <template #more-icon="{ omittedItems }">
      <mp-tooltip :content="omittedItems.map((item) => item.label).join(' / ')">
        <m-icon-more />
      </mp-tooltip>
    </template>
  </mp-breadcrumb>
</template>
```

### 链接与点击

子项可通过 `href` 渲染为链接；`@click` 不会在省略项触发。

```html
<script setup>
import { Message } from '@maplejs/maple-ui'
</script>

<template>
  <mp-breadcrumb>
    <mp-breadcrumb-item href="#/home" @click="Message('首页')">首页</mp-breadcrumb-item>
    <mp-breadcrumb-item href="#/list" @click="Message('列表')">列表</mp-breadcrumb-item>
    <mp-breadcrumb-item>详情</mp-breadcrumb-item>
  </mp-breadcrumb>
</template>
```

## API

### 属性

#### Breadcrumb Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `separator` | 分隔符 | _string \| number_ | `/` |
| `max-count` | 最多展示的正常面包屑项数量，不包含 more；`0` 表示不限制 | _number_ | `0` |
| `routes` | 路径数据（无默认插槽时生效） | _BreadcrumbRoute[]_ | `-` |

#### BreadcrumbItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `separator` | 分隔符（覆盖父级） | _string \| number_ | `-` |
| `href` | 跳转链接 | _string_ | `-` |
| `droplist` | 下拉菜单内容 | _BreadcrumbRoute['children']_ | `-` |
| `dropdown-props` | 下拉菜单属性 | _MenuProps_ | `-` |

### 事件

#### BreadcrumbItem Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击时触发（省略项不触发） | `event: MouseEvent` |
| `select` | 选择内置下拉项时触发 | `route: BreadcrumbRoute` |

### 插槽

#### Breadcrumb Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 面包屑子项 | `-` |
| `separator` | 自定义分隔符 | `-` |
| `item-render` | `routes` 模式下自定义渲染 | `route` `routes` `paths` |
| `more-icon` | 自定义省略图标 | `omittedItems` `count` `start` `end` |

#### BreadcrumbItem Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 面包屑内容 | `-` |
| `separator` | 自定义分隔符（优先于父级） | `-` |
| `droplist` | 自定义下拉菜单 | `-` |

### 类型定义

```ts
interface BreadcrumbRoute {
  label: string
  path: string
  children?: BreadcrumbRoute[]
}
```

### 样式变量

以下为组件使用的 CSS 变量，可使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

#### BreadcrumbItem Variables

| 变量名 | 默认值 |
| --- | --- |
| `--mp-breadcrumb-item-active-color` | `var(--mp-color-primary)` |
| `--mp-breadcrumb-item-inactive-color` | `#888` |
| `--mp-breadcrumb-item-separator-margin` | `0 10px` |
| `--mp-breadcrumb-item-separator-font-size` | `14px` |

# BreadcrumbItem 文档

见 [Breadcrumb 面包屑](#/zh-CN/breadcrumb)。

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `separator` | 分隔符（覆盖父级） | _string \| number_ | `-` |
| `href` | 跳转链接 | _string_ | `-` |
| `droplist` | 下拉菜单内容 | _BreadcrumbRoute[]_ | `-` |
| `dropdown-props` | 下拉菜单属性 | _MenuProps_ | `-` |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击时触发（省略项不触发） | `event: MouseEvent` |
| `select` | 选择内置下拉项时触发 | `route: BreadcrumbRoute` |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | 面包屑内容 |
| `separator` | 自定义分隔符 |
| `droplist` | 自定义下拉菜单 |

