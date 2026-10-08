# Skeleton

### Intro

Display some space occupying elements with transition effect to optimize the loading process.

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

### Custom Rows Width

```demo
../example/demos/custom-rows-width.vue
```

### Display Card

```demo
../example/demos/display-card.vue
```

### Custom Template

```demo
../example/demos/custom-template.vue
```

### Animation

```demo
../example/demos/animation.vue
```

### Fullscreen Mode

```demo
../example/demos/fullscreen-mode.vue
```

## API

### Props

| Prop | Description | Type | Default | 
| --- | --- | --- | --- | 
| `loading` | Loading Status Set to `true` to turn on the skeleton | _boolean_ | `true` |
| `animation` | Whether to enable the shimmer animation | _boolean_ | `true` |
| `title` | Whether to display the title | _boolean_ | `false` |
| `card` | Whether to display the card | _boolean_ | `false` |
| `avatar` | Whether to display the avatar | _boolean_ | `false` |
| `fullscreen` | Whether to enable fullscreen mode | _boolean_ | `false` |
| `fullscreen-z-index` | Fullscreen mode z-index | _string \| number_ | `100` |
| `title-width` | `50%` | _string \| number_ | `-` |
| `card-height` | `160px` | _string \| number_ | `-` |
| `avatar-size` | `34px` | _string \| number_ | `-` |
| `rows` | The paragraph number of rows | _string \| number_ | `3` |
| `rows-width` | The width of each line of a paragraph | _number[] \| string[]_ | `[]` |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Content not loaded | `-` |
| `template` | Custom loading placeholder | `-` |

The package also exports `SkeletonLine` and `SkeletonShape`, available as `Skeleton.Line` and `Skeleton.Shape` for custom templates.

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--mp-skeleton-content-padding` | `var(--mp-sys-space-6)` |
| `--skeleton-card-height` | `160px` |
| `--skeleton-card-border-radius` | `4px` |
| `--skeleton-card-margin-bottom` | `16px` |
| `--skeleton-card-background-color` | `rgba(0, 0, 0, 0.12)` |
| `--skeleton-animation-background` | `linear-gradient(90deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0.3), hsla(0, 0%, 100%, 0))` |
| `--skeleton-avatar-size` | `34px` |
| `--skeleton-avatar-border-radius` | `50%` |
| `--skeleton-avatar-margin-right` | `16px` |
| `--skeleton-avatar-background-color` | `rgba(0, 0, 0, 0.12)` |
| `--skeleton-title-width` | `50%` |
| `--skeleton-title-border-radius` | `10px` |
| `--skeleton-title-background-color` | `rgba(0, 0, 0, 0.12)` |
| `--skeleton-row-height` | `12px` |
| `--skeleton-row-border-radius` | `10px` |
| `--skeleton-row-margin-top` | `10px` |

### Governed defaults

| Token | Default |
| --- | --- |
| `--mp-skeleton-card-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-skeleton-card-margin-bottom` | `var(--mp-sys-space-6)` |
| `--mp-skeleton-card-background-color` | `var(--mp-sys-color-state-hover)` |
| `--mp-skeleton-animation-background` | `linear-gradient(90deg, transparent, var(--mp-sys-color-surface-default), transparent)` |
| `--mp-skeleton-avatar-border-radius` | `50%` |
| `--mp-skeleton-avatar-margin-right` | `var(--mp-sys-space-6)` |
| `--mp-skeleton-avatar-background-color` | `var(--mp-sys-color-state-hover)` |
| `--mp-skeleton-title-border-radius` | `10px` |
| `--mp-skeleton-title-background-color` | `var(--mp-sys-color-state-hover)` |
| `--mp-skeleton-row-height` | `12px` |
| `--mp-skeleton-row-border-radius` | `10px` |
| `--mp-skeleton-row-margin-top` | `10px` |
| `--mp-skeleton-shape-size-sm` | `36px` |
| `--mp-skeleton-shape-size-md` | `48px` |
| `--mp-skeleton-shape-size-lg` | `60px` |
| `--mp-skeleton-shape-border-radius` | `var(--mp-sys-radius-md)` |

### Motion tokens

| Token | Default |
| --- | --- |
| `--mp-skeleton-animation-duration` | `1s` |
| `--mp-skeleton-transition-duration` | `var(--mp-sys-motion-duration-slow)` |

Built-in motion honors prefers-reduced-motion: reduce. State/content remain visible; decorative spin, shimmer and ripple are suppressed. Icon name changes skip delays and cancel pending transitions. Ripple duration tokens control CSS only: its 250ms lifecycle timers are unchanged, so keep each visual duration at or below 250ms. Custom animation classes remain the caller’s responsibility.
