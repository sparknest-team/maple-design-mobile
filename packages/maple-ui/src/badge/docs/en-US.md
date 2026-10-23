# Badge

The same scenarios, parameters and interactions as Cedar. Only component prefixes differ; themes and site shells remain independent.

## Examples

### Basic usage

```demo
../example/demos/basic.vue
```

### Five sizes

```demo
../example/demos/size.vue
```

### Solid and outline

```demo
../example/demos/variant.vue
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

### Positions and offsets

```demo
../example/demos/position.vue
```

### Show and hide

```demo
../example/demos/show.vue
```

### Appearance combinations

Use this example for notification counts and markers. Adjust variant, status, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

```demo
../example/demos/appearance-lab.vue
```

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

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

All public Badge variables and their default values:

| Variable | Default |
| --- | --- |
| `--mp-badge-font-weight` | `var(--mp-sys-font-weight-medium)` |
| `--mp-badge-description-size-xs-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-badge-description-size-sm-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-badge-description-size-md-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-badge-description-size-lg-font-size` | `var(--mp-sys-font-size-lg)` |
| `--mp-badge-description-size-xl-font-size` | `var(--mp-sys-font-size-xl)` |
| `--mp-badge-description-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-badge-size-xs-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-badge-size-sm-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-badge-size-md-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-badge-size-lg-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-badge-size-xl-font-size` | `var(--mp-sys-font-size-lg)` |
| `--mp-badge-size-xs-scale` | `0.6667` |
| `--mp-badge-size-sm-scale` | `0.8333` |
| `--mp-badge-size-md-scale` | `1` |
| `--mp-badge-size-lg-scale` | `1` |
| `--mp-badge-size-xl-scale` | `1` |
| `--mp-badge-size-xs-dot-width` | `4px` |
| `--mp-badge-size-sm-dot-width` | `5px` |
| `--mp-badge-size-md-dot-width` | `6px` |
| `--mp-badge-size-lg-dot-width` | `7px` |
| `--mp-badge-size-xl-dot-width` | `8px` |
| `--mp-badge-size-xs-dot-height` | `4px` |
| `--mp-badge-size-sm-dot-height` | `5px` |
| `--mp-badge-size-md-dot-height` | `6px` |
| `--mp-badge-size-lg-dot-height` | `7px` |
| `--mp-badge-size-xl-dot-height` | `8px` |
| `--mp-badge-size-xs-space` | `0px` |
| `--mp-badge-size-sm-space` | `var(--mp-sys-space-1)` |
| `--mp-badge-size-md-space` | `var(--mp-sys-space-3)` |
| `--mp-badge-size-lg-space` | `var(--mp-sys-space-3)` |
| `--mp-badge-size-xl-space` | `var(--mp-sys-space-4)` |
| `--mp-badge-size-xs-padding` | `0 var(--mp-sys-space-3)` |
| `--mp-badge-size-sm-padding` | `0 var(--mp-sys-space-3)` |
| `--mp-badge-size-md-padding` | `0 var(--mp-sys-space-4)` |
| `--mp-badge-size-lg-padding` | `0 var(--mp-sys-space-4)` |
| `--mp-badge-size-xl-padding` | `0 10px` |
| `--mp-badge-size-xs-height` | `20px` |
| `--mp-badge-size-sm-height` | `20px` |
| `--mp-badge-size-md-height` | `24px` |
| `--mp-badge-size-lg-height` | `28px` |
| `--mp-badge-size-xl-height` | `32px` |
| `--mp-badge-size-xs-border-radius` | `20px` |
| `--mp-badge-size-sm-border-radius` | `20px` |
| `--mp-badge-size-md-border-radius` | `24px` |
| `--mp-badge-size-lg-border-radius` | `28px` |
| `--mp-badge-size-xl-border-radius` | `32px` |
| `--mp-badge-bg-color` | `var(--mp-sys-color-status-danger)` |
| `--mp-badge-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-badge-status-default-bg-color` | `#e0e0e0` |
| `--mp-badge-status-default-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-badge-status-info-bg-color` | `var(--mp-sys-color-status-info)` |
| `--mp-badge-status-info-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-badge-status-success-bg-color` | `var(--mp-sys-color-status-success)` |
| `--mp-badge-status-success-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-badge-status-warning-bg-color` | `var(--mp-sys-color-status-warning)` |
| `--mp-badge-status-warning-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-badge-status-danger-bg-color` | `var(--mp-sys-color-status-danger)` |
| `--mp-badge-status-danger-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-badge-status-primary-bg-color` | `var(--mp-sys-color-action-primary)` |
| `--mp-badge-status-primary-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-badge-status-secondary-bg-color` | `rgb(var(--mp-gray-6))` |
| `--mp-badge-status-secondary-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-badge-status-tertiary-bg-color` | `rgb(var(--mp-gray-7))` |
| `--mp-badge-status-tertiary-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-badge-variant-outline-bg-color` | `transparent` |
| `--mp-badge-variant-outline-text-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-badge-variant-outline-status-info-text-color` | `var(--mp-sys-color-content-info)` |
| `--mp-badge-variant-outline-status-success-text-color` | `var(--mp-sys-color-content-success)` |
| `--mp-badge-variant-outline-status-warning-text-color` | `var(--mp-sys-color-content-warning)` |
| `--mp-badge-variant-outline-status-danger-text-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-badge-variant-outline-status-primary-text-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-badge-variant-outline-status-default-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-badge-variant-outline-status-secondary-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-badge-variant-outline-status-tertiary-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-badge-border-color` | `var(--mp-sys-color-surface-default)` |
| `--mp-badge-offset` | `2px` |
| `--mp-badge-ring-width` | `2px` |

Filled badges pair text with the background: bright statuses use `content-on-bright`; the dark tertiary gray in light mode uses `content-on-dark`, switching to dark text in dark mode. Both libraries use `content-on-dark` for primary in the Maple light brand. Default danger red `var(--mp-sys-color-status-danger)` and neutral background `#e0e0e0` remain component-specific.

Outline text and borders use `content-brand/info/success/warning/danger` on ordinary neutral surfaces; secondary and tertiary outlines use `content-secondary` for readability. `variant-outline-bg-color` works for every status and defaults to transparent. The `color` prop overrides outline text and border; `text-color` overrides text further. Both preserve control through the background variable. Recheck contrast after customizing foreground or background.

### Color override boundaries

Fallback bg-color follows system status-danger. The fixed neutral default fill and gray secondary/tertiary fills are intentional; override border-color to match a different host surface. Custom color/text-color contrast is caller-owned.
