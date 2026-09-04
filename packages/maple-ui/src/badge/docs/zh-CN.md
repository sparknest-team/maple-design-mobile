# 徽标 Badge

出现在图标或文字上的红色圆点、数字或者文字，表示有新内容或者待处理的信息。示例与 Cedar Design Web 保持一致，布局按移动端换行。

> ⚠️ **BREAKING**：本组件已与 PC 端 `CBadge` 对齐，旧 API 不兼容。迁移指南：

| 旧 API | 新 API |
| --- | --- |
| `type="primary"` 等 | `status="primary"` 等 |
| `type="floating\|inline"`（布局） | `mode="floating\|inline"` |
| `value` | `content` |
| `max-value` | `max` |
| `hidden` | `show`（取反） |
| `position="right-top"` | `position="top-right"` |
| `position="right-bottom"` | `position="bottom-right"` |
| `position="left-top"` | `position="top-left"` |
| `position="left-bottom"` | `position="bottom-left"` |
| `slot="value"` | `slot="content"` |
| `icon` / `namespace` | _移除（请改用 `slot="content"`）_ |

## 案例

### 基础用法

只需指定 `content` 或 `content` 插槽，即可显示徽标。

```html
<mp-space wrap align="center" :size="16">
  <mp-badge :content="9">
    <mp-avatar shape="square" :size="40">
      <m-icon-user-circle-fill />
    </mp-avatar>
  </mp-badge>
  <mp-badge :content="9" dot>
    <mp-avatar shape="square" :size="40">
      <m-icon-user-circle-fill />
    </mp-avatar>
  </mp-badge>
  <mp-badge>
    <template #content>
      <m-icon-history />
    </template>
    <mp-avatar shape="square" :size="40">
      <m-icon-user-circle-fill />
    </mp-avatar>
  </mp-badge>
</mp-space>
```

### 内联类型

`default` 插槽和 `description` 同时为空时会变为内联类型，也可以通过 `mode` 指定。可用 `description` 指定描述文本。

```html
<mp-badge :content="1000" />
<mp-badge :content="1000" dot />
<mp-badge :content="1000" mode="inline" description="描述文本" />
<mp-badge :content="1000" mode="inline" description="描述文本" inline-position="start" />
```

### 小红点

设置 `dot` 后只显示小红点。可用 `offset-x` / `offset-y` 微调位置。

```html
<mp-badge :content="9" dot :offset-x="6" :offset-y="-2">
  <a href="#">链接</a>
</mp-badge>
<mp-badge :content="9" dot :offset-x="2" :offset-y="-2">
  <m-icon-bell-fill />
</mp-badge>
```

### 自定义内容

设置 `content` 可显示文字徽标；`mode="inline"` 时与包裹内容行内排列。

```html
<mp-badge content="NEW">
  <mp-avatar shape="square" :size="40">
    <m-icon-user-circle-fill />
  </mp-avatar>
</mp-badge>
<mp-badge content="HOT" mode="inline" inline-position="end">
  <mp-avatar shape="square" :size="40">
    <m-icon-user-circle-fill />
  </mp-avatar>
</mp-badge>
```

### 最大值

设置 `max` 可限制最大显示数值，超出后加 `+` 后缀。`max` 默认为 `99`。`content` 为 `0` 且未开 `show-zero` 时不显示。

```html
<mp-badge :max="10" :content="0">
  <mp-avatar shape="square" :size="40" />
</mp-badge>
<mp-badge :max="10" :content="100">
  <mp-avatar shape="square" :size="40" />
</mp-badge>
<mp-badge :content="100">
  <mp-avatar shape="square" :size="40" />
</mp-badge>
<mp-badge :max="999" :content="1000">
  <mp-avatar shape="square" :size="40" />
</mp-badge>
```

### 状态和颜色

用 `status` 和 `color` 设置徽标状态和颜色，也可用 `text-color` 改文字色。

```html
<mp-badge color="#F53F3F" description="#F53F3F" mode="inline" inline-position="end" />
<mp-badge status="success" description="Success" mode="inline" />
<mp-badge status="danger" content="Danger" />
<mp-badge description="red #7BC616" content="1" color="red" text-color="#7BC616" />
```

### 尺寸

提供 `xs`、`sm`、`md`、`lg`、`xl` 五种尺寸，可用于小红点、数字和浮动徽标。

```html
<mp-badge dot :content="1" size="xs" mode="inline" description="描述文本" />
<mp-badge :content="1" size="md" mode="inline" description="描述文本" />
<mp-badge :content="1" size="lg">
  <mp-avatar shape="square" :size="40" />
</mp-badge>
```

### 位置

浮动模式提供四角（`top-right`、`top-left`、`bottom-right`、`bottom-left`）；内联模式用 `inline-position` 的 `start` / `end`。可用 `offset-x` / `offset-y` 微调。

```html
<mp-badge :content="100" position="top-right" :offset-x="offsetX" :offset-y="offsetY">
  <mp-avatar shape="square" :size="40" />
</mp-badge>
<mp-badge :content="100" mode="inline" inline-position="start">
  <mp-avatar shape="square" :size="40" />
</mp-badge>
```

### 显示与隐藏

`show` 控制是否显示；`show-zero` 控制 `content` 为 `0` 时是否显示。

```html
<mp-switch v-model="show" />
<mp-input-number v-model="content" size="sm" />
<mp-badge :content="0" :show-zero="true" :show="show" description="show-zero true" />
<mp-badge :content="content" :show="show" description="描述文本" />
<mp-badge :content="content" :show="show" description="描述文本" dot />
```

### 变体

提供 `outline` 和 `default` 两种变体。

```html
<mp-badge variant="outline" content="1" status="success">
  <mp-avatar shape="square" :size="40" />
</mp-badge>
<mp-badge variant="outline" content="1" status="danger" mode="inline" description="描述文本" />
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `description` | 徽标的描述文本（`mode=inline` 时显示在内容旁，`floating` 时通过 default slot） | `string` | `-` |
| `dot` | 是否显示为小红点 | `boolean` | `false` |
| `max` | 最大显示数值，超出时显示为 `${max}+`，`content` 为数字时有效 | `number` | `99` |
| `show` | 是否显示徽标 | `boolean` | `true` |
| `show-zero` | 当 `content` 为 `0` 时是否显示 | `boolean` | `false` |
| `offset-x` | 横向偏移量（px） | `number` | `0` |
| `offset-y` | 纵向偏移量（px） | `number` | `0` |
| `color` | 自定义背景色 | `string` | `-` |
| `text-color` | 自定义文字色 | `string` | `-` |
| `content` | 徽标显示的内容 | `string \| number` | `-` |
| `mode` | 布局类型：`floating`（浮在 default slot 角上）/ `inline`（与 description 行内排列） | `BadgeMode` | `'floating'` |
| `position` | floating 模式定位 | `BadgePosition` | `'top-right'` |
| `inline-position` | inline 模式定位 | `BadgeInlinePosition` | `'end'` |
| `size` | 尺寸 | `BadgeSize` | `'md'` |
| `status` | 状态色 | `BadgeStatus` | `'default'` |
| `variant` | 变体 | `BadgeVariant` | `'default'` |

### Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 被徽标包裹的内容（`mode=floating` 时） |
| `content` | 自定义徽标内容（替代 `content` prop） |

## 类型定义

```ts
type BadgeStatus = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary'
type BadgeVariant = 'default' | 'outline'
type BadgeMode = 'floating' | 'inline'
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
| `--mp-badge-description-text-color` | `var(--mp-color-text-1)` |

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
