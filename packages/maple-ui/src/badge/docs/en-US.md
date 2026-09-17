# Badge

The same scenarios, parameters and interactions as Cedar. Only component prefixes differ; themes and site shells remain independent.

## Examples

### Basic usage

```demo
../example/demos/basic.vue
```

### Inline and standalone

```demo
../example/demos/inline.vue
```

### Dot badges

```demo
../example/demos/dot.vue
```

### Custom content

```demo
../example/demos/content.vue
```

### Maximum and zero

```demo
../example/demos/max.vue
```

### Statuses and colors

```demo
../example/demos/color.vue
```

### Five sizes

```demo
../example/demos/size.vue
```

### Positions and offsets

```demo
../example/demos/position.vue
```

### Show and hide

```demo
../example/demos/show.vue
```

### Solid and outline

```demo
../example/demos/variant.vue
```

## API

<!-- same-source-api:start -->
### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| description | Fallback description text | `string` | `-` |
| content | Badge content | `number \| string` | `-` |
| max | Numeric overflow shows max+; strings are not capped | `number` | `99` |
| dot | Display a dot | `boolean` | `false` |
| offset-x | Horizontal offset; ignored in inline mode | `number` | `0` |
| offset-y | Vertical offset | `number` | `0` |
| color | Custom color; outline uses it for border and text | `string` | `-` |
| text-color | Content text color | `string` | `-` |
| mode | Layout mode | `'floating' \| 'inline'` | `floating` |
| position | Physical floating position, unchanged in RTL | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'left' \| 'right'` | `top-right` |
| inline-position | Logical inline position | `'start' \| 'end'` | `end` |
| size | Size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md` |
| status | Semantic status | `SemanticStatus` | `danger` |
| show | Show the badge | `boolean` | `true` |
| show-zero | Show numeric zero | `boolean` | `false` |
| variant | Appearance | `'outline' \| 'default'` | `default` |

### Events

No component-defined events.

### Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| default | Wrapped content; overrides description | — |
| content | Custom badge content | — |

### Methods

No public methods.

### Platform notes

Props and slots match. Without a default slot or description, the badge becomes standalone inline content. Omitted content displays a dot. Direction, theme and CSS prefix come from each platform.
<!-- same-source-api:end -->

## Types

```ts
type SemanticStatus = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'secondary' | 'tertiary'
type BadgeVariant = 'default' | 'outline'
type BadgeMode = 'floating' | 'inline'
type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'left' | 'right'
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

The default `status="danger"` uses a red background with white text. Explicit `status="default"` uses neutral colors. All five sizes (`xs | sm | md | lg | xl`) are implemented.
