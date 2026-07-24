# 徽标 Badge

### 介绍

出现在图标或文字上的红色圆点、数字或者文字，表示有新内容或者待处理的信息。

> ⚠️ **BREAKING**：本组件已与 PC 端 `CBadge` 对齐，旧 API 不兼容。迁移指南：

| 旧 API | 新 API |
| --- | --- |
| `type="primary"` 等 | `status="primary"` 等 |
| `value` | `content` |
| `max-value` | `max` |
| `hidden` | `show`（取反） |
| `position="right-top"` | `position="top-right"` |
| `position="right-bottom"` | `position="bottom-right"` |
| `position="left-top"` | `position="top-left"` |
| `position="left-bottom"` | `position="bottom-left"` |
| `slot="value"` | `slot="content"` |
| `icon` / `namespace` | _移除（请改用 `slot="content"`）_ |

### 主题色徽标

通过 `status` 属性设置不同主题色的徽标。

```html
<mp-badge dot status="primary" />
<mp-badge dot status="info" />
<mp-badge dot status="success" />
<mp-badge dot status="warning" />
<mp-badge dot status="danger" />
```

### 小红点

```html
<mp-badge dot status="danger">
  <mp-tag>徽标</mp-tag>
</mp-badge>
```

### 自定义内容

```html
<mp-badge status="danger" content="hot">
  <mp-tag>徽标</mp-tag>
</mp-badge>
<mp-badge status="danger" :content="66">
  <mp-tag>徽标</mp-tag>
</mp-badge>
```

### 最大值

数字内容超过 `max` 时显示为 `${max}+`。

```html
<mp-badge status="danger" :content="188" :max="99">
  <mp-tag>徽标</mp-tag>
</mp-badge>
```

### 不同位置

```html
<mp-badge dot status="danger" position="top-right" />
<mp-badge dot status="danger" position="top-left" />
<mp-badge dot status="danger" position="bottom-right" />
<mp-badge dot status="danger" position="bottom-left" />
```

### 偏移

```html
<mp-badge status="danger" dot :offset-x="6" :offset-y="6">
  <mp-tag>徽标</mp-tag>
</mp-badge>
```

### 隐藏

```html
<mp-badge status="danger" dot :show="false">
  <mp-tag>徽标</mp-tag>
</mp-badge>
```

### Inline 模式

`type="inline"` 配合 `description` 显示行内徽标。

```html
<mp-badge type="inline" status="success" dot description="在线" />
<mp-badge type="inline" status="warning" dot description="离开" />
```

### 尺寸

```html
<mp-badge type="inline" status="primary" :content="6" size="xs" description="xs" />
<mp-badge type="inline" status="primary" :content="6" size="sm" description="sm" />
<mp-badge type="inline" status="primary" :content="6" size="md" description="md" />
<mp-badge type="inline" status="primary" :content="6" size="lg" description="lg" />
<mp-badge type="inline" status="primary" :content="6" size="xl" description="xl" />
```

### 描边变体

```html
<mp-badge type="inline" variant="outline" status="primary" :content="6" description="primary" />
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `description` | 徽标的描述文本（`type=inline` 时显示在内容旁，`floating` 时通过 default slot） | `string` | `-` |
| `dot` | 是否显示为小红点 | `boolean` | `false` |
| `max` | 最大显示数值，超出时显示为 `${max}+`，`content` 为数字时有效 | `number` | `99` |
| `show` | 是否显示徽标 | `boolean` | `true` |
| `show-zero` | 当 `content` 为 `0` 时是否显示 | `boolean` | `false` |
| `offset-x` | 横向偏移量（px） | `number` | `0` |
| `offset-y` | 纵向偏移量（px） | `number` | `0` |
| `color` | 自定义背景色 | `string` | `-` |
| `text-color` | 自定义文字色 | `string` | `-` |
| `content` | 徽标显示的内容 | `string \| number` | `-` |
| `type` | 布局类型：`floating`（浮在 default slot 角上）/ `inline`（与 description 行内排列） | `BadgeType` | `'floating'` |
| `position` | floating 模式定位 | `BadgePosition` | `'top-right'` |
| `inline-position` | inline 模式定位 | `BadgeInlinePosition` | `'end'` |
| `size` | 尺寸 | `BadgeSize` | `'md'` |
| `status` | 状态色 | `BadgeStatus` | `'default'` |
| `variant` | 变体 | `BadgeVariant` | `'default'` |

### Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 被徽标包裹的内容（`type=floating` 时） |
| `content` | 自定义徽标内容（替代 `content` prop） |

## 类型定义

```ts
type BadgeStatus = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary'
type BadgeVariant = 'default' | 'outline'
type BadgeType = 'floating' | 'inline'
type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
type BadgeInlinePosition = 'start' | 'end'
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
```

## 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

### 通用

| 名称 | 默认值 |
| --- | --- |
| `--mp-badge-font-weight` | `500` |
| `--mp-badge-bg-color` | `#ef4444` |
| `--mp-badge-text-color` | `#ffffff` |
| `--mp-badge-description-text-color` | `var(--mp-color-on-surface)` |

### 尺寸（`xs / sm / md / lg / xl`）

| 名称 |
| --- |
| `--mp-badge-size-{size}-font-size` |
| `--mp-badge-size-{size}-scale` |
| `--mp-badge-size-{size}-dot-width` / `-dot-height` |
| `--mp-badge-size-{size}-padding` |
| `--mp-badge-size-{size}-height` |
| `--mp-badge-size-{size}-border-radius` |
| `--mp-badge-size-{size}-space` |
| `--mp-badge-description-size-{size}-font-size` |

### 状态（`default / info / success / warning / danger / primary`）

| 名称 |
| --- |
| `--mp-badge-status-{status}-bg-color` |
| `--mp-badge-status-{status}-text-color` |
| `--mp-badge-variant-outline-status-{status}-text-color` |
