# Skeleton

### Intro

Display some space occupying elements with transition effect to optimize the loading process.

## Basic examples

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

## Content and presentation

### Skeleton content shapes

Compare text-row placeholders with avatar and card shapes according to the final content layout.

```demo
../example/demos/content-comparison.vue
```

### Animation

```demo
../example/demos/animation.vue
```

### Fullscreen Mode

The demo restores content after two seconds using its own timer. Skeleton neither fetches data nor finishes loading automatically; control `loading` from the result of your application request.

```demo
../example/demos/fullscreen-mode.vue
```

## Customization and slots

### Custom Template

```demo
../example/demos/custom-template.vue
```

## API

### Props

| Arguments | Description | Type | Default |
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

| Slot | Description | Arguments |
| --- | -- | --- |
| `default` | Content not loaded | `-` |
| `template` | Custom loading placeholder | `-` |

The package also exports `SkeletonLine` and `SkeletonShape`, available as `Skeleton.Line` and `Skeleton.Shape` for custom templates.

### Style variables

The following CSS variables support customization with [StyleProvider](#/en-US/style-provider).

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

## Shared implementation and platform boundaries

Each platform maintains a complete local implementation. They do not import a common core or share component instances or reactive state. Changes must update both implementations. Component bodies, props, key styles and paired tests have read-only source consistency checks; theme tokens and installation entries remain local to each library.

Skeleton, SkeletonLine and SkeletonShape use independently copied source. Each library maintains its skeleton theme and size tokens.

### Managed defaults

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

### Motion variables

| Token | Default |
| --- | --- |
| `--mp-skeleton-animation-duration` | `1s` |
| `--mp-skeleton-transition-duration` | `var(--mp-sys-motion-duration-slow)` |

Built-in motion follows prefers-reduced-motion: reduce, preserving content/state feedback while disabling decorative spinning, shimmer and ripples. Icon name changes skip waiting and cancel unfinished transitions. Ripple duration variables affect only CSS; the 250ms lifecycle timer remains unchanged, so each visual stage should not exceed 250ms. Callers must adapt custom animation classes.
