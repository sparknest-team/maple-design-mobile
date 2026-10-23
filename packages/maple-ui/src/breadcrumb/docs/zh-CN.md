# 面包屑

当前位置（最后一级）默认使用主文字色，不额外加粗，并标记 `aria-current="page"`。纯文本无点击反馈；配置 `href` 的链接、绑定 `@click` 的操作和下拉入口显示品牌色、手型及悬停 / 按下反馈，键盘聚焦时显示焦点轮廓。`@click` 操作支持 Enter 和空格。最后一级通常保持纯文本；显式提供链接或操作时仍可交互。

触屏设备上，可点击项的触摸区域至少为 44 × 44px；按下显示底色和下划线，松手后恢复，不保留鼠标悬停效果。省略图标支持点击查看隐藏路径。

## 案例

### 介绍

用于识别页面在层次结构中的位置，并按需向上返回。API 对齐 Cedar Design Web 的核心能力（`routes` / `max-count` / 分隔符插槽），不包含 PC 向的 sticky。

### 基本使用

```demo
../example/demos/basic-usage.vue
```

### 自定义分隔符

通过 `separator` 属性或插槽自定义分隔符；子项配置优先于父级。同一示例对比分隔符插槽、父级属性和子项覆盖。

```demo
../example/demos/separator.vue
```

### 自定义图标

```demo
../example/demos/custom-icon.vue
```

### 参数化配置

通过 `routes` 传递面包屑数据。默认仅为前面的层级渲染链接，最后一级保持文本；可用 `#item-render` 自定义渲染。

```demo
../example/demos/routes-mode.vue
```

### 下拉菜单

```demo
../example/demos/dropdown.vue
```

### 显示省略

通过 `max-count` 限制展示数量，超出部分折叠为省略号；可用 `#more-icon` 自定义省略图标。

Tooltip 支持 SVG 图标直接作为触发节点；触屏点击显示可设置 `trigger="click"`。

```demo
../example/demos/max-count.vue
```

### 链接与点击

对比纯文本、`href` 链接和 `@click` 操作。点击后下方显示选择结果；最后一级默认保持纯文本。省略项不会触发 `click`。

```demo
../example/demos/click-event.vue
```

<!-- api-review:start -->
### 功能调试

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### 属性

#### Breadcrumb Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `separator` | 分隔符 | _string \| number_ | `/` |
| `max-count` | 最多展示的正常面包屑项数量，不包含 more；`0` 表示不限制 | _number_ | `0` |
| `routes` | 路径数据（非空时优先；为空时使用默认插槽） | _BreadcrumbRoute[]_ | `-` |

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
| `select` | 选择内置下拉项时触发 | `route: BreadcrumbRoute, event?: Event` |

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
| `--mp-breadcrumb-item-active-color` | `rgb(var(--mp-primary-8))` |
| `--mp-breadcrumb-item-inactive-color` | `var(--mp-color-text-2)` |
| `--mp-breadcrumb-item-separator-margin` | `0 10px` |
| `--mp-breadcrumb-item-separator-font-size` | `14px` |
| `--mp-breadcrumb-touch-target-size` | `44px` |

## BreadcrumbItem

见 [Breadcrumb 面包屑](#/zh-CN/breadcrumb)。

### API

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
| `select` | 选择内置下拉项时触发 | `route: BreadcrumbRoute, event?: Event` |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | 面包屑内容 |
| `separator` | 自定义分隔符 |
| `droplist` | 自定义下拉菜单 |


## 同源实现与平台边界

Breadcrumb 与 BreadcrumbItem 在 Cedar / Maple 中独立复制维护，主体、Props、上下文、类型、关键样式及配对测试纳入 `design-ui/bin/copied-components-check.mjs`。图标、安装入口、菜单实现和主题 token 由各库本地提供。

- 非空 `routes` 优先于默认插槽；空数组回退到插槽。默认路由渲染仅前面的项目带链接，最后一项标记 `aria-current="page"`；`item-render` 自行控制链接。
- 分隔符优先级：子项插槽 → 子项属性 → 父级插槽 → 父级属性；支持 `0` 和空字符串。
- `max-count` 沿用现有边界：总数大于 `max-count + 1` 才折叠；保留首项和尾部项目，省略位置不触发原项的点击、链接或下拉菜单。
- 内置下拉选择派发 `select(route, event)`。动态增删、重排及 SSR 会同步计算索引和分隔符。
- Cedar 项内容新增 `__content` 包装，属性透传到该内容节点；Maple 原有主题变量继续通过 token 映射生效。
