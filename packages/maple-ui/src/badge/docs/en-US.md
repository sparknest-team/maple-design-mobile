# Badge

A red dot, number, or text that appears on an icon or text to indicate new or pending content. Examples match Cedar Design Web, with a more compact mobile layout.

> ⚠️ **BREAKING**: Aligned with PC `CBadge`. Old API is not compatible. Migration:

| Old API | New API |
| --- | --- |
| `type="primary"` etc. | `status="primary"` etc. |
| `type="floating\|inline"` (layout) | `mode="floating\|inline"` |
| `value` | `content` |
| `max-value` | `max` |
| `hidden` | `show` (inverted) |
| `position="right-top"` | `position="top-right"` |
| `position="right-bottom"` | `position="bottom-right"` |
| `position="left-top"` | `position="top-left"` |
| `position="left-bottom"` | `position="bottom-left"` |
| `slot="value"` | `slot="content"` |
| `icon` / `namespace` | _removed (use `slot="content"`)_ |

## Examples

### Basic Usage

Set `content` or the `content` slot to show a badge.

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

### Inline

When both the default slot and `description` are empty, the badge becomes inline. You can also set `mode`. Use `description` for the label.

```html
<mp-badge :content="1000" />
<mp-badge :content="1000" dot />
<mp-badge :content="1000" mode="inline" description="Description" />
<mp-badge :content="1000" mode="inline" description="Description" inline-position="start" />
```

### Dot

Set `dot` to show only a red dot. Use `offset-x` / `offset-y` to nudge the position.

```html
<mp-badge :content="9" dot :offset-x="6" :offset-y="-2">
  <a href="#">Link</a>
</mp-badge>
<mp-badge :content="9" dot :offset-x="2" :offset-y="-2">
  <m-icon-bell-fill />
</mp-badge>
```

### Custom Content

Set `content` for text badges. With `mode="inline"` the badge sits in a row with the wrapped content.

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

### Max

`max` caps the numeric value and appends `+`. Default is `99`. `content` of `0` is hidden unless `show-zero` is on.

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

### Status and Color

Use `status` and `color` for semantic or custom colors, and `text-color` for the content color.

```html
<mp-badge color="#F53F3F" description="#F53F3F" mode="inline" inline-position="end" />
<mp-badge status="success" description="Success" mode="inline" />
<mp-badge status="danger" content="Danger" />
<mp-badge description="red #7BC616" content="1" color="red" text-color="#7BC616" />
```

### Size

Sizes: `xs`, `sm`, `md`, `lg`, `xl`. Works with dots, numbers, and floating badges.

```html
<mp-badge dot :content="1" size="xs" mode="inline" description="Description" />
<mp-badge :content="1" size="md" mode="inline" description="Description" />
<mp-badge :content="1" size="lg">
  <mp-avatar shape="square" :size="40" />
</mp-badge>
```

### Position

Floating mode supports four corners (`top-right`, `top-left`, `bottom-right`, `bottom-left`). Inline mode uses `inline-position` `start` / `end`. Nudge with `offset-x` / `offset-y`.

```html
<mp-badge :content="100" position="top-right" :offset-x="offsetX" :offset-y="offsetY">
  <mp-avatar shape="square" :size="40" />
</mp-badge>
<mp-badge :content="100" mode="inline" inline-position="start">
  <mp-avatar shape="square" :size="40" />
</mp-badge>
```

### Show and Hide

`show` toggles visibility. `show-zero` controls whether `content` of `0` is shown.

```html
<mp-switch v-model="show" />
<mp-input-number v-model="content" size="sm" />
<mp-badge :content="0" :show-zero="true" :show="show" description="show-zero true" />
<mp-badge :content="content" :show="show" description="Description" />
<mp-badge :content="content" :show="show" description="Description" dot />
```

### Variant

Variants: `outline` and `default`.

```html
<mp-badge variant="outline" content="1" status="success">
  <mp-avatar shape="square" :size="40" />
</mp-badge>
<mp-badge variant="outline" content="1" status="danger" mode="inline" description="Description" />
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `description` | Description text (shown beside content when `mode=inline`; floating uses default slot) | `string` | `-` |
| `dot` | Show as a red dot | `boolean` | `false` |
| `max` | Max numeric value; overflow shows `${max}+` | `number` | `99` |
| `show` | Whether to show the badge | `boolean` | `true` |
| `show-zero` | Show when `content` is `0` | `boolean` | `false` |
| `offset-x` | Horizontal offset (px) | `number` | `0` |
| `offset-y` | Vertical offset (px) | `number` | `0` |
| `color` | Custom background color | `string` | `-` |
| `text-color` | Custom text color | `string` | `-` |
| `content` | Badge content | `string \| number` | `-` |
| `mode` | Layout mode: `floating` / `inline` | `BadgeMode` | `'floating'` |
| `position` | Position when floating | `BadgePosition` | `'top-right'` |
| `inline-position` | Position when inline | `BadgeInlinePosition` | `'end'` |
| `size` | Size | `BadgeSize` | `'md'` |
| `status` | Semantic color | `BadgeStatus` | `'default'` |
| `variant` | Variant | `BadgeVariant` | `'default'` |

### Slots

| Name | Description |
| --- | --- |
| `default` | Wrapped content (`mode=floating`) |
| `content` | Custom badge content (overrides `content` prop) |

## Types

```ts
type BadgeStatus = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary'
type BadgeVariant = 'default' | 'outline'
type BadgeMode = 'floating' | 'inline'
type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
type BadgeInlinePosition = 'start' | 'end'
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
```

## Style Variables

### Common

| Name | Default |
| --- | --- |
| `--mp-badge-font-weight` | `500` |
| `--mp-badge-bg-color` | `#ef4444` |
| `--mp-badge-text-color` | `#ffffff` |
| `--mp-badge-description-text-color` | `var(--mp-color-text-1)` |

### Size (`xs / sm / md / lg / xl`)

| Name |
| --- |
| `--mp-badge-size-{size}-font-size` |
| `--mp-badge-size-{size}-scale` |
| `--mp-badge-size-{size}-dot-width` / `-dot-height` |
| `--mp-badge-size-{size}-padding` |
| `--mp-badge-size-{size}-height` |
| `--mp-badge-size-{size}-border-radius` |
| `--mp-badge-size-{size}-space` |
| `--mp-badge-description-size-{size}-font-size` |

### Status (`default / info / success / warning / danger / primary`)

| Name |
| --- |
| `--mp-badge-status-{status}-bg-color` |
| `--mp-badge-status-{status}-text-color` |
| `--mp-badge-variant-outline-status-{status}-text-color` |
