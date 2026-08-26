# Badge

### Intro

A red dot, number, or text that appears on an icon or text to indicate new or pending content.

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

### Theme Color Badge

Set different theme colors via `status`.

```html
<mp-badge dot status="primary" />
<mp-badge dot status="info" />
<mp-badge dot status="success" />
<mp-badge dot status="warning" />
<mp-badge dot status="danger" />
```

### Dot Badge

```html
<mp-badge dot status="danger">
  <mp-tag>Badge</mp-tag>
</mp-badge>
```

### Custom Content

```html
<mp-badge status="danger" content="hot">
  <mp-tag>Badge</mp-tag>
</mp-badge>
<mp-badge status="danger" :content="66">
  <mp-tag>Badge</mp-tag>
</mp-badge>
```

### Maximum

When numeric `content` exceeds `max`, it shows `${max}+`.

```html
<mp-badge status="danger" :content="188" :max="99">
  <mp-tag>Badge</mp-tag>
</mp-badge>
```

### Position

```html
<mp-badge dot status="danger" position="top-right" />
<mp-badge dot status="danger" position="top-left" />
<mp-badge dot status="danger" position="bottom-right" />
<mp-badge dot status="danger" position="bottom-left" />
```

### Offset

```html
<mp-badge status="danger" dot :offset-x="6" :offset-y="6">
  <mp-tag>Badge</mp-tag>
</mp-badge>
```

### Hidden

```html
<mp-badge status="danger" dot :show="false">
  <mp-tag>Badge</mp-tag>
</mp-badge>
```

### Inline Mode

Use `mode="inline"` with `description` for inline badges.

```html
<mp-badge mode="inline" status="success" dot description="Online" />
<mp-badge mode="inline" status="warning" dot description="Away" />
```

### Size

```html
<mp-badge mode="inline" status="primary" :content="6" size="xs" description="xs" />
<mp-badge mode="inline" status="primary" :content="6" size="sm" description="sm" />
<mp-badge mode="inline" status="primary" :content="6" size="md" description="md" />
<mp-badge mode="inline" status="primary" :content="6" size="lg" description="lg" />
<mp-badge mode="inline" status="primary" :content="6" size="xl" description="xl" />
```

### Outline Variant

```html
<mp-badge mode="inline" variant="outline" status="primary" :content="6" description="primary" />
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
